FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \ 
    build-essential \ 
    wget \ 
    perl \
    python3 \
    python3-pip \ 
    python3-venv && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /opt
COPY IEDB_NetChop-3.0.tar.gz /opt/
RUN tar -xvzf IEDB_NetChop-3.0.tar.gz && \
    rm IEDB_NetChop-3.0.tar.gz

WORKDIR /opt/netchop
RUN python3 -m venv venv

RUN ./venv/bin/pip install --upgrade pip && \
    ./venv/bin/pip install --no-cache-dir -r requirements.txt

ENV PATH="/opt/netchop/venv/bin:$PATH"

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /data

ENTRYPOINT ["/entrypoint.sh"]
