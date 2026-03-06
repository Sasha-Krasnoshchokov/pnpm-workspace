FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=true
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Stage 2: Prune & Fetch (Optimized for pnpm caching)
FROM base AS fetcher
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/types/package.json ./packages/
COPY apps/server/package.json ./apps/server/

RUN pnpm fetch --prefer-offline

FROM fetcher AS builder
COPY . .
RUN pnpm install --frozen-lockfile --prefer-offline
RUN pnpm --filter @repo/server run build

FROM builder AS development
ENV NODE_ENV=development
ENV PORT=3210
EXPOSE 3210
WORKDIR /app/apps/server
CMD ["pnpm", "--filter @repo/server", "dev:watch"]

FROM node:22-alpine AS production
ENV NODE_ENV=production
ENV PORT=6543

RUN apk add --no-cache curl \
&& addgroup -S app && adduser -S app -G app

# Copy pruned node_modules and built assets
COPY --from=builder /app/apps/server/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/apps/server/dist ./dist

RUN corepack enable && pnpm install --prod --frozen-lockfile

USER app
EXPOSE $PORT

# Healthcheck using the curl installed in base
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f $SERVER_BASE_URL:$PORT/health || exit 1

# Increased memory limit slightly for Node 20 stability
CMD ["node", "--max-old-space-size=512", "dist/server.js"]
