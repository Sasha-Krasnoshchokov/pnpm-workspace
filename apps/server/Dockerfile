FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Stage 2: Prune & Fetch (Optimized for pnpm caching)
FROM base AS fetcher
COPY pnpm-lock.yaml ./
# This allows pnpm to download only the necessary bins/libs to a virtual store
RUN pnpm fetch

FROM fetcher AS builder
COPY . .
RUN pnpm install --frozen-lockfile --offline
RUN pnpm run build

FROM builder AS development
ENV NODE_ENV=development
EXPOSE 3210
CMD ["pnpm", "dev"]

FROM node:20-alpine AS production
ENV NODE_ENV=production
ENV PORT=6543
# Security: Non-root user
RUN apk add --no-cache curl \
&& addgroup -S app \
&& adduser -S app -G app

# Copy pruned node_modules and built assets
COPY --from=builder --chown=app:app /app/package.json ./package.json
COPY --from=builder --chown=app:app /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder --chown=app:app /app/dist ./dist
RUN corepack enable && pnpm install --prod --frozen-lockfile

USER app
EXPOSE $PORT

# Healthcheck using the curl installed in base
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:$PORT/health || exit 1

# Increased memory limit slightly for Node 20 stability
CMD ["node", "--max-old-space-size=512", "dist/server.js"]
