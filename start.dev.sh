#!/bin/bash

# mkdir -p /app/src/commons/certificates && \
#     mkcert -install && \
#     mkcert -cert-file /app/src/commons/certificates/localhost.pem \
#            -key-file /app/src/commons/certificates/localhost-key.pem \
#            localhost 127.0.0.1 ::1

# export DENO_TLS_CA_STORE=system
# export DENO_CERT=/app/src/commons/certificates/localhost.pem

# export https_enable=true

pnpm install && pnpm nodemon --exec 'pnpm build && deno task dev:docker'
