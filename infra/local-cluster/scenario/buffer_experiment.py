"""
proxy_buffer_size sweep for the SSE location (proxy_buffering off).
For each buffer size, a throwaway nginx-debug container (same nginx.conf, only proxy_buffer_size changed) proxies one
SSE connection; the debug log tells how many upstream reads (recv) and client writes (writev) one event cost.

    python3 scenario/buffer_experiment.py      # cluster must be up; prints a markdown table
"""
import re, subprocess, tempfile, time, urllib.request
from pathlib import Path

import scenario as sc

NET, PORT = "local-cluster_default", 8090
SIZES = ["128", "256", "512", "1k", "2k", "4k", "8k", "16k"]
QUEUE_LENGTHS = [10, 50, 100]          # waitings in the owner's snapshot


def set_waitings(ft, n):
    sc.sql("DELETE FROM waiting")
    if n:
        rows = ",".join(f"({2 + i % 40},{ft},{100 + i},1,NOW())" for i in range(n))
        sc.sql(f"INSERT INTO waiting(member_id,foodtruck_id,number,is_cancellable,changed_at) VALUES {rows}")


def run(size, ft, conf_template, tmp):
    conf = Path(tmp, f"nginx-{size}.conf")
    conf.write_text(conf_template.replace("proxy_buffer_size 8k;", f"proxy_buffer_size {size};")
                    .replace("worker_processes auto;", "worker_processes 1;\nerror_log /dev/stderr debug;"))
    subprocess.run(["docker", "rm", "-f", "nx-exp"], capture_output=True)
    subprocess.run(["docker", "run", "-d", "--name", "nx-exp", "--network", NET, "-p", f"{PORT}:80",
                    "-v", f"{conf}:/etc/nginx/nginx.conf:ro", "nginx:1.27-alpine",
                    "nginx-debug", "-g", "daemon off;"], check=True, capture_output=True)
    time.sleep(1)
    req = urllib.request.Request(f"http://localhost:{PORT}/api/v1/waiting/owners/{ft}",
                                 headers={"Authorization": sc.jwt(1, "OWNER")})
    status, body = None, b""
    try:
        with urllib.request.urlopen(req, timeout=3) as r:
            status = r.status
            while b"\n\n" not in body:            # first frame = connected snapshot
                body += r.read1(65536)
    except urllib.error.HTTPError as e:
        status = e.code
    except Exception:
        pass
    log = subprocess.run(["docker", "logs", "nx-exp"], capture_output=True, text=True).stderr
    subprocess.run(["docker", "rm", "-f", "nx-exp"], capture_output=True)
    if "[emerg]" in log:
        return "nginx -t fail: " + re.search(r'\[emerg\] \S+ (.*?) in /etc', log).group(1)[:60], False, 0, 0, 0
    too_big = "upstream sent too big header" in log
    # fd of the upstream socket = the one nginx reads response bytes from (not the client request recv)
    reads = re.findall(r"recv: fd:(\d+) (\d+) of (\d+)", log)
    up_fd = reads[-1][0] if reads else None
    up_reads = sum(1 for fd, _, _ in reads if fd == up_fd)
    writes = len(re.findall(r"writev: \d+ of \d+", log))
    frame = body.split(b"\n\n")[0] if body else b""
    return status, too_big, len(frame) + 2 if frame else 0, up_reads, writes


def main():
    ft = int(sc.sql("SELECT foodtruck_id FROM foodtruck LIMIT 1"))
    template = (sc.ROOT / "nginx/nginx.conf").read_text()
    header = subprocess.run(["curl", "-s", "-o", "/dev/null", "-D", "-", "-m", "1", "-H",
                             f"Authorization: {sc.jwt(1, 'OWNER')}", f"localhost:8081/api/v1/waiting/owners/{ft}"],
                            capture_output=True).stdout
    print(f"Spring response header block: {len(header)} bytes\n")
    print("| waitings | proxy_buffer_size | status | snapshot frame (B) | upstream recv | client writev |")
    print("|---|---|---|---|---|---|")
    with tempfile.TemporaryDirectory(dir=Path(__file__).parent) as tmp:
        for n in QUEUE_LENGTHS:
            set_waitings(ft, n)
            for size in SIZES:
                status, too_big, frame, reads, writes = run(size, ft, template, tmp)
                shown = "502 (too big header)" if too_big else status
                print(f"| {n} | {size} | {shown} | {frame} | {reads} | {writes} |")
    set_waitings(ft, 0)


if __name__ == "__main__":
    main()
