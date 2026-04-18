FROM node:22-alpine AS base
RUN apk add --no-cache curl
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=true
RUN corepack enable && corepack prepare pnpm@10.27.0 --activate
WORKDIR /app

FROM base AS fetcher
COPY .npmrc ./
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

COPY packages/database/package.json ./packages/database/
COPY packages/schemas/package.json ./packages/schemas/
COPY packages/utils/package.json ./packages/utils/
COPY packages/types/package.json ./packages/types/
COPY apps/server/package.json ./apps/server/

RUN corepack enable && pnpm install --frozen-lockfile


FROM fetcher AS development
ENV NODE_ENV=development
ENV PORT=3210
EXPOSE 3210

COPY . .

HEALTHCHECK --interval=300s --timeout=3s \
  CMD curl -f http://localhost:3210/health || exit 1

CMD ["pnpm", "--filter", "@repo/server", "dev"]


FROM fetcher AS builder

COPY . .
RUN pnpm --filter @repo/database db:generate
RUN pnpm --filter @repo/server... build
RUN pnpm --filter @repo/server --prod deploy /out/server

FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=6543

RUN apk add --no-cache curl openssl && addgroup -S app && adduser -S app -G app

COPY --from=builder /out/server .
COPY --from=builder /app/packages/database/prisma ./prisma

RUN chown -R app:app /app


HEALTHCHECK --interval=120s --timeout=3s \
  CMD curl -f http://localhost:6543/health || exit 1

USER app
EXPOSE 6543

CMD ["node", "--max-old-space-size=512", "dist/server.js"]
