FROM node:24-alpine AS base

RUN corepack enable && corepack prepare pnpm@latest --activate



FROM base AS builder

WORKDIR /app

COPY . .

RUN pnpm approve-builds --all
RUN pnpm install

RUN pnpm generate:imports

RUN pnpm build



# FROM base AS production

# WORKDIR /app

# COPY --from=builder /app/package.json /app/package.json
# COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-lock.yaml

# # RUN pnpm install --prod --prefer-frozen-lockfile



FROM denoland/deno:alpine AS runtime

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/deno.json /app/deno.json
# COPY --from=production /app/node_modules /app/node_modules

RUN deno cache dist/main.js

ENV TZ=America/Sao_Paulo

CMD ["sh", "-c", "deno serve --parallel -A --port ${PORT} --cached-only dist/main.js"]
