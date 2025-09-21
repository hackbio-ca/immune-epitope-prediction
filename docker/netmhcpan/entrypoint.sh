#!/bin/bash

mkdir -p /tools/src
ln -sf /opt/netMHCpan-4.2 /tools/src/netMHCpan-4.2

export PATH="/opt/netMHCpan-4.2:/opt/netMHCpan-4.2/Linux_x86_64/bin:$PATH"

exec /opt/netMHCpan-4.2/netMHCpan "$@"
