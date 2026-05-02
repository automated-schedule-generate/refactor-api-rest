#!/bin/bash

# mkdir -p /app/src/commons/certificates && \
#     mkcert -install && \
#     mkcert -cert-file /app/src/commons/certificates/localhost.pem \
#            -key-file /app/src/commons/certificates/localhost-key.pem \
#            localhost 127.0.0.1 ::1

# export DENO_TLS_CA_STORE=system
# export DENO_CERT=/app/src/commons/certificates/localhost.pem

# export https_enable=true


rm -Rf dist/ node_modules/ .pnpm-store/ pnpm-lock.yaml deno.lock

pnpm install 
deno install

pnpm sequelize-cli db:migrate --name 20260429003454-enable-unaccent
pnpm sequelize-cli db:migrate --name 20260429011230-subject-name-index-unaccent
pnpm sequelize-cli db:migrate --name 20260429011429-course-name-index-unaccent
pnpm sequelize-cli db:migrate --name 20260429011439-user-name-index-unaccent

pnpm nodemon --exec 'deno check src/main.ts && pnpm build && deno serve -A --port ${PORT} dist/main.js'
