FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json .

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install

COPY . .

RUN pnpm build

FROM node:24-alpine AS production

WORKDIR /app

COPY --from=builder /app/dist .
COPY --from=builder /app/package.json .

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install --prod

CMD ["pnpm", "start:prod"]
