"""
End-to-end scenarios against the local cluster (docker compose up -d first).
Stdlib only:  python3 scenario/scenario.py
Exits non-zero on the first failed check.
"""
import base64, hashlib, hmac, http.client, json, queue, subprocess, sys, threading, time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SECRET = b"local-cluster-secret-key-at-least-32-bytes!!"   # matches docker-compose.yml
NGINX, API1, API2 = ("localhost", 8080), ("localhost", 8081), ("localhost", 8082)
USERS = 41


def sh(*args, check=True):
    return subprocess.run(["docker", "compose", *args], cwd=ROOT, check=check, capture_output=True, text=True).stdout


def sql(query):
    return sh("exec", "-T", "mysql", "mysql", "-ufooding", "-pfooding", "fooding", "-N", "-e", query)


def redis(*args):
    return sh("exec", "-T", "redis", "redis-cli", *args).strip()


def jwt(member_id, role):
    enc = lambda d: base64.urlsafe_b64encode(json.dumps(d, separators=(",", ":")).encode()).rstrip(b"=")
    body = enc({"alg": "HS256"}) + b"." + enc(
        {"sub": str(member_id), "memberId": member_id, "authorities": role, "exp": int(time.time()) + 3600})
    sig = base64.urlsafe_b64encode(hmac.new(SECRET, body, hashlib.sha256).digest()).rstrip(b"=")
    return "Bearer " + (body + b"." + sig).decode()


def call(target, method, path, token):
    c = http.client.HTTPConnection(*target, timeout=10)
    c.request(method, path, headers={"Authorization": token})
    r = c.getresponse()
    body = r.read().decode()
    c.close()
    return r.status, body


class SseClient:
    """Reads an SSE stream in a background thread and queues (event, data, received_at)."""

    def __init__(self, target, path, token, name):
        self.name, self.events, self.closed = name, queue.Queue(), threading.Event()
        self.conn = http.client.HTTPConnection(*target, timeout=None)
        self.conn.request("GET", path, headers={"Authorization": token, "Accept": "text/event-stream"})
        self.resp = self.conn.getresponse()
        self.headers = dict(self.resp.getheaders())
        threading.Thread(target=self._read, daemon=True).start()

    def _read(self):
        event, data = None, []
        try:
            while True:
                line = self.resp.readline()
                if not line:
                    break
                line = line.decode().rstrip("\r\n")
                if line.startswith("event:"):
                    event = line[6:]
                elif line.startswith("data:"):
                    data.append(line[5:])
                elif line == "" and event:
                    self.events.put((event, "\n".join(data), time.time()))
                    event, data = None, []
        except Exception:
            pass
        self.closed.set()

    def next(self, name, timeout=5):
        deadline = time.time() + timeout
        while time.time() < deadline:
            try:
                ev, data, at = self.events.get(timeout=max(0.01, deadline - time.time()))
            except queue.Empty:
                break
            if ev == name:
                return json.loads(data), at
        raise AssertionError(f"[{self.name}] no '{name}' event within {timeout}s")

    def drain(self, name):
        n = 0
        while not self.events.empty():
            if self.events.get()[0] == name:
                n += 1
        return n

    def close(self):
        try:
            self.conn.sock.shutdown(2)
        except Exception:
            pass
        self.conn.close()


def check(cond, msg):
    print(("  PASS " if cond else "  FAIL ") + msg)
    if not cond:
        sys.exit(1)


def wait_healthy(*targets, timeout=120):
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            if all(call(t, "GET", "/actuator/health", "")[0] == 200 for t in targets):
                return
        except Exception:
            pass
        time.sleep(2)
    raise AssertionError(f"not healthy: {targets}")


def seed():
    sql("SET FOREIGN_KEY_CHECKS=0; TRUNCATE waiting; TRUNCATE waiting_log; TRUNCATE foodtruck; TRUNCATE member;"
        "SET FOREIGN_KEY_CHECKS=1;"
        "INSERT INTO member(email,nickname,gender,ages,provider,status,role,created_at)"
        " VALUES ('owner@local','owner','M','30','NAVER','ACTIVE','OWNER',NOW());")
    rows = ",".join(f"('u{i}@local','user{i:02d}','F','20','NAVER','ACTIVE','USER',NOW())" for i in range(USERS))
    sql(f"INSERT INTO member(email,nickname,gender,ages,provider,status,role,created_at) VALUES {rows};")
    sql("INSERT INTO foodtruck(member_id,license_number,name,introduction,category,open_status,opened_at,closed_at,"
        "location,waiting_number,created_at) VALUES (1,'123-45-67890','test-truck','','KOREAN','OPENED',NOW(),NOW(),"
        "ST_GeomFromText('POINT(37.5 127.0)',4326),100,NOW());")
    return int(sql("SELECT foodtruck_id FROM foodtruck LIMIT 1")), list(range(2, USERS + 2))


def reserve(target, ft, user):
    status, body = call(target, "POST", f"/api/v1/waiting/users?ft-id={ft}", jwt(user, "USER"))
    return status


def main():
    wait_healthy(API1, API2)
    ft, users = seed()
    owner = jwt(1, "OWNER")
    sse_path = f"/api/v1/waiting/owners/{ft}"
    redis("FLUSHALL")

    print("S1. cross-instance delivery: owner on api-1, guest request on api-2")
    tab = SseClient(API1, sse_path, owner, "owner@api-1")
    snap, _ = tab.next("connected")
    check(snap == {"waitingLine": [], "orderLine": []}, "initial snapshot is empty")
    t0 = time.time()
    check(reserve(API2, ft, users[0]) == 200, "reserve via api-2 -> 200")
    ev, at = tab.next("reserved")
    check(ev["userName"] == "user00", f"owner on api-1 got 'reserved' in {(at - t0) * 1000:.0f}ms")
    status, _ = call(API2, "DELETE", f"/api/v1/waiting/users/{ft}/{ev['waitingId']}", jwt(users[0], "USER"))
    check(status == 200, "cancel via api-2 -> 200")
    ev2, _ = tab.next("canceled")
    check(ev2["waitingId"] == ev["waitingId"], "owner on api-1 got 'canceled' with the same waitingId")

    print("S2. two connections for one truck (tablet on api-1, phone on api-2)")
    phone = SseClient(API2, sse_path, owner, "owner@api-2")
    phone.next("connected")
    check(reserve(NGINX, ft, users[1]) == 200, "reserve via nginx -> 200")
    a, _ = tab.next("reserved")
    b, _ = phone.next("reserved")
    check(a["waitingId"] == b["waitingId"], "both connections received the same event")
    time.sleep(0.5)
    check(tab.drain("reserved") == 0 and phone.drain("reserved") == 0, "each connection received it exactly once")

    print("S3. Redis connection registry")
    keys = redis("--scan", "--pattern", f"sse:conn:{ft}:*").split()
    owners = sorted(redis("GET", k) for k in keys)
    check(owners == ["api-1", "api-2"], f"registry has one key per connection with its instance: {owners}")
    ttl = int(redis("TTL", keys[0]))
    check(0 < ttl <= 30, f"registry keys carry a TTL ({ttl}s)")
    phone.close()
    deadline = time.time() + 35   # 1st write after client close still succeeds; the 2nd fails (heartbeat 10s)
    while time.time() < deadline and len(redis("--scan", "--pattern", f"sse:conn:{ft}:*").split()) != 1:
        time.sleep(2)
    left = [redis("GET", k) for k in redis("--scan", "--pattern", f"sse:conn:{ft}:*").split()]
    check(left == ["api-1"], f"closed phone connection removed from registry, remaining: {left}")
    tab.close()

    print("S4. through nginx: no proxy buffering")
    via = SseClient(NGINX, sse_path, owner, "owner@nginx")
    snap, _ = via.next("connected")
    n = int(sql("SELECT COUNT(*) FROM waiting"))
    check(len(snap["waitingLine"]) == n, f"snapshot through nginx lists the {n} current waitings")
    check(via.headers.get("Content-Type", "").startswith("text/event-stream"), "stream opened through nginx")
    lat = []
    for u in users[3:13]:
        t0 = time.time()
        reserve(NGINX, ft, u)
        _, at = via.next("reserved")
        lat.append((at - t0) * 1000)
    lat.sort()
    check(lat[-1] < 500, f"10 events through nginx, request->owner p50={lat[5]:.0f}ms max={lat[-1]:.0f}ms (buffered would stall)")

    print("S5. failover: stop the instance holding the owner's stream")
    key = redis("--scan", "--pattern", f"sse:conn:{ft}:*").split()
    holder = redis("GET", key[0])
    survivor = "api-2" if holder == "api-1" else "api-1"
    sh("kill", holder)                     # SIGKILL: no shutdown hooks, so its registry keys are left behind
    check(via.closed.wait(15), f"owner stream dropped when {holder} was killed")
    reconnect = SseClient(NGINX, sse_path, owner, "owner@reconnect")   # nginx skips the dead upstream
    snap, _ = reconnect.next("connected", timeout=15)
    n = int(sql("SELECT COUNT(*) FROM waiting"))
    check(len(snap["waitingLine"]) == n, f"reconnect lands on the survivor and the snapshot restores all {n} waitings")
    check(reserve(NGINX, ft, users[13]) == 200, "reserve while one instance is down -> 200")
    reconnect.next("reserved")
    print(f"  PASS event delivered by survivor {survivor}")
    stale = [k for k in redis("--scan", "--pattern", f"sse:conn:{ft}:*").split() if redis("GET", k) == holder]
    check(len(stale) == 1, f"crashed {holder} left {len(stale)} stale registry key")
    time.sleep(32)
    stale = [k for k in redis("--scan", "--pattern", f"sse:conn:{ft}:*").split() if redis("GET", k) == holder]
    check(stale == [], f"stale registry keys of {holder} expired by themselves")
    sh("start", holder)
    wait_healthy(API1, API2)

    print("S6. Redis outage does not fail guest requests")
    sh("stop", "redis")
    t0 = time.time()
    check(reserve(NGINX, ft, users[14]) == 200, "reserve with Redis down -> 200 (DB committed, publish failure isolated)")
    check(time.time() - t0 < 2, f"...and it does not hang ({(time.time() - t0) * 1000:.0f}ms)")
    sh("start", "redis")
    deadline, got = time.time() + 40, False
    while time.time() < deadline and not got:   # listener container re-subscribes on its own
        time.sleep(3)
        reserve(NGINX, ft, users[15])
        try:
            reconnect.next("reserved", timeout=2)
            got = True
        except AssertionError:
            pass
    check(got, "after Redis restarts, Pub/Sub delivery resumes without restarting the apps")
    reconnect.close()

    print("S7. load for the dashboard: 3 owner tabs across instances, 25 reservations via nginx")
    owners = [SseClient(t, sse_path, owner, f"tab{i}") for i, t in enumerate([API1, API2, NGINX])]
    for o in owners:
        o.next("connected")
    for u in users[16:41]:
        reserve(NGINX, ft, u)
        time.sleep(0.2)
    time.sleep(1)
    counts = [o.drain("reserved") for o in owners]
    check(counts == [25, 25, 25], f"every tab received all 25 events: {counts}")
    for o in owners:
        o.close()
    print("ALL SCENARIOS PASSED")


if __name__ == "__main__":
    main()
