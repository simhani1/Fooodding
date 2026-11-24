# 로컬 SSE 클러스터

## 개요

로컬 Docker Compose에서 API 인스턴스 2대를 Nginx 뒤에 두고, 손님과 사장님이 서로 다른 인스턴스에 접속했을 때의 SSE 알림 전달과 장애 복구를 검증한다.

![로컬 SSE 클러스터 구성도](docs/architecture.png)

구성도는 draw.io에서 [원본 파일](docs/architecture.drawio)을 열어 편집한다.

## 구성 요소

| 서비스 | 포트(호스트 기준) | 역할 |
|---|---|---|
| Nginx | 8080 | 라운드로빈으로 요청을 분배하고 SSE 스트림을 전달한다. |
| api-1 / api-2 | 8081 / 8082 | 예약을 처리하고 각 인스턴스에 연결된 사장님 탭으로 알림을 보낸다. |
| MySQL | 외부 미공개 | 두 인스턴스의 예약 데이터를 저장한다. |
| Redis | 6379 | `sse:events` 채널로 이벤트를 전달하고 SSE 연결 정보를 기록한다. |
| Prometheus | 9090 | 인스턴스별 지표를 수집한다. |
| Grafana | 3000 | 연결 상태와 알림 전달 지표를 보여 준다. |

## 실행 방법

`infra/local-cluster` 디렉터리에서 실행한다.

```

## 시나리오 테스트

| 시나리오 | 확인 내용 |
|---|---|
| S1 | 사장님이 api-1에 연결한 상태에서 api-2로 예약하고 취소하면 두 알림이 모두 도착한다. |
| S2 | 같은 사장님의 탭을 두 인스턴스에 하나씩 연결하면 각 탭이 알림을 한 번씩 받는다. |
| S3 | Redis 키 `sse:conn:{foodTruckId}:{emitterId}`의 값이 인스턴스 ID이고 TTL이 30초인지 확인한다. 연결을 닫으면 키가 사라진다. |
| S4 | Nginx를 통해 스냅샷과 이벤트 10건을 받고, 버퍼링을 끈 상태에서 요청부터 사장님 수신까지 걸린 시간을 잰다. |
| S5 | SSE 연결을 맡은 인스턴스를 SIGKILL로 종료한다. Nginx를 통해 남은 인스턴스에 재연결하면 스냅샷으로 대기 목록을 복구하고, 이전 연결 키는 TTL이 지나면 사라진다. |
| S6 | Redis가 중단돼도 예약 요청은 지연 없이 HTTP 200으로 응답하고, Redis를 재시작하면 알림 전달이 재개된다. |
| S7 | 두 인스턴스에 나눠 연결한 탭 3개가 예약 25건의 알림을 각각 25건씩 받는다. |

## 관측

[Grafana](http://localhost:3000)에서 **푸딩 SSE 클러스터** 대시보드를 연다.

- 가동 중인 서버 수, 접속 중인 사장님 화면 수, 서버별 연결 수와 Redis에 기록된 연결 수
- Nginx의 서버별 요청 분배, 서버별 알림 발행 수, 같은 서버와 다른 서버를 거친 알림 전달 건수
- 예약부터 사장님 연결을 맡은 서버에 알림이 도착할 때까지의 시간(p99), 손님의 예약 응답 시간(p99)
- 선택 기간의 알림 발행 실패와 끊긴 연결 정리 건수, 이벤트 종류별 최대 크기와 Nginx 버퍼 크기 비교

Redis 연결 키는 접속 여부를 확인하는 데 쓴다. 10초마다 하트비트로 TTL을 갱신하며, 알림은 채널을 구독하는 모든 인스턴스가 받아 각자 보유한 연결로 보낸다.

## proxy_buffer_size 측정

SSE 경로에는 `proxy_buffering off`, `proxy_http_version 1.1`, `proxy_set_header Connection ""`, `gzip off`, `proxy_read_timeout 120s`, `send_timeout 30s`를 적용했다. 응답 헤더는 252B, 하트비트는 38B, 예약 이벤트는 129B였다. 스냅샷은 대기 한 건당 약 110B였다.

- 공식 Nginx 이미지에 포함된 `nginx-debug`를 `error_log /dev/stderr debug` 설정으로 실행했다.
- 버퍼 크기를 바꿔 가며 대기 100건의 스냅샷을 요청했다.
- 로그의 `recv: fd:N X of Y`와 `writev` 줄을 세어 각각 업스트림 읽기와 클라이언트 쓰기 횟수를 구했다.
- `scenario/buffer_experiment.py`로 같은 측정을 반복할 수 있다.

| waitings | size | result | snapshot B | upstream recv | client writev |
|---|---|---|---|---|---|
| any | 128 | 502 upstream sent too big header | – | – | – |
| 100 | 256 | 200 | 10955 | 44 | 44 |
| 100 | 512 | 200 | 10955 | 22 | 23 |
| 100 | 1k | 200 | 10955 | 11 | 12 |
| 100 | 2k | 200 | 10955 | 6 | 7 |
| 100 | 4k (default) | 200 | 10955 | 3 | 4 |
| 100 | **8k (chosen)** | 200 | 10955 | 2 | 3 |
| any | 16k | `nginx -t` fails: proxy_busy_buffers_size (2×) must be < proxy_buffers total − 1 | – | – | – |

대기 100건의 스냅샷(10955B)을 읽는 횟수가 기본값 4k에서 3회, 8k에서 2회여서 `proxy_buffer_size 8k`를 선택했다.

## 장애 테스트에서 발견한 문제

- **Redis 중단 시 예약 지연** — Lettuce가 연결이 끊긴 뒤에도 명령을 큐에 쌓아 예약 요청이 기본 제한 시간인 60초까지 대기했다. `commandTimeout`을 500ms로 줄이고 연결이 끊기면 `REJECT_COMMANDS`로 즉시 거절하도록 바꾼 뒤, 예약 요청은 19ms 만에 응답했다.
- **인스턴스 강제 종료 후 재연결 지연** — Nginx가 SIGKILL로 종료된 인스턴스에 연결하려고 60초를 기다렸다. `proxy_connect_timeout 1s`와 `max_fails=1 fail_timeout=10s`를 적용하자 약 1초 안에 남은 인스턴스로 전환됐다.
