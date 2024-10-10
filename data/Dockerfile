# Python 3.10 이미지를 기반으로
FROM python:3.10-slim

# 필요한 시스템 패키지 설치
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    libssl-dev \
    libffi-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Rust 설치
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# 작업 디렉터리 설정
WORKDIR /app

# 가상 환경 생성 및 활성화
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .

# pip 업그레이드 및 패키지 설치
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt || \
    (cat requirements.txt | while read package; do pip install --no-cache-dir $package || echo "Failed to install $package"; done)

# 애플리케이션 소스 복사
COPY . .

# Flask 앱 실행
CMD ["python", "app.py"]