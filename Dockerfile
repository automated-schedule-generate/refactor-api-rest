FROM node:24-alpine AS base

FROM base AS builder

WORKDIR /app

COPY package.json .

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install

COPY . .

RUN pnpm build

FROM base AS production

WORKDIR /app

COPY --from=builder /app/dist .
COPY --from=builder /app/package.json .

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install --prod

ENV TZ=America/Sao_Paulo

CMD ["pnpm", "start:prod"]
