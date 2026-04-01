#!/bin/bash

mkdir -p src/commons/certificates && \
    mkcert -install && \
    mkcert -cert-file src/commons/certificates/localhost.pem \
           -key-file src/commons/certificates/localhost-key.pem \
           localhost 127.0.0.1 ::1

export https_enable=true

pnpm install && pnpm start:dev