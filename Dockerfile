FROM node:24-alpine AS base

RUN corepack enable && corepack prepare pnpm@latest --activate



FROM base AS builder

WORKDIR /app

COPY . .

RUN pnpm approve-builds --all
RUN pnpm install

RUN pnpm generate:imports

RUN pnpm build



FROM denoland/deno:alpine AS runtime

ENV TZ=America/Sao_Paulo

WORKDIR /app

RUN apk add --no-cache nodejs

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json

RUN deno install --prod
RUN deno cache --sloppy-imports /app/dist/main.js

CMD ["sh", "-c", "deno serve --sloppy-imports --parallel -A --port ${PORT} --cached-only dist/main.js"]
