FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    build-essential \
    wget \
    perl \
    python3 \
    python3-pip \
    tcsh \
    gawk && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /opt
COPY netMHCpan-4.2b.Linux.tar.gz /opt/
RUN tar -xvzf netMHCpan-4.2b.Linux.tar.gz && \
    rm netMHCpan-4.2b.Linux.tar.gz

ENV NMHOME=/opt/netMHCpan-4.2
ENV TMPDIR=$NMHOME/tmp
ENV PATH="$NMHOME:$NMHOME/Linux_x86_64/bin:$PATH"

RUN mkdir -p /tools/src && \
    ln -sf $NMHOME /tools/src/netMHCpan-4.2 && \
    mkdir -p $TMPDIR

RUN chmod +x $NMHOME/netMHCpan && \
    chmod +x $NMHOME/Linux_x86_64/bin/*

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /data

ENTRYPOINT ["/entrypoint.sh"]
