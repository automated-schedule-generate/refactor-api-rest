FROM node:24-alpine AS base

RUN corepack enable && corepack prepare pnpm@latest --activate



FROM base AS builder

WORKDIR /app

COPY package.json .

RUN pnpm install

RUN pnpm generate:imports

COPY . .

RUN pnpm build



FROM base AS production

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json

RUN pnpm install --prod --prefer-frozen-lockfile

ENV TZ=America/Sao_Paulo

CMD ["pnpm", "start:prod"]
