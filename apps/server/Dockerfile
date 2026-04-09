FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=true
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

FROM base AS fetcher
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/server/package.json ./apps/server/
COPY packages/database/package.json ./packages/database/
COPY packages/types/package.json ./packages/types/
COPY packages/utils/package.json ./packages/utils/

RUN pnpm fetch --prefer-offline
RUN pnpm install --frozen-lockfile --prefer-offline

FROM fetcher AS builder
COPY . .
RUN pnpm --filter @repo/server run build
RUN pnpm --filter @repo/server deploy /prod/server --legacy

FROM builder AS development
ENV NODE_ENV=development
ENV PORT=3210
EXPOSE 3210

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:$PORT/health || exit 1

WORKDIR /app/apps/server
CMD ["pnpm", "--filter @repo/server", "dev:watch"]
