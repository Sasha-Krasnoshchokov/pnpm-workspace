<h1>📦 pnpm Workspace: Production-ready Monorepo Starter Kit</h1>

A fully featured monorepo template built with **pnpm workspaces** for scalable Node.js applications. This starter kit enforces consistency across services with:

- ✅ **Shared Configurations**: Centralized ESLint, TypeScript, and Prettier configs
- ✅ **Type-Safe**: End-to-end TypeScript with Zod schema validation
- ✅ **Database Ready**: Integrated Prisma ORM with PostgreSQL
- ✅ **Dockerized**: Multi-stage builds for development and production
- ✅ **Clean Architecture**: Repository pattern, schema layering, clean code practices
- ✅ **Standardized Commits**: Husky + Commitlint for conventional commits

## 📁 Project Structure

```
pnpm-workspace/
├── apps/
│   ├── client/               # TypeScript CLI/utility application
│   └── server/               # Fastify REST API server
├── configurations/
│   ├── eslint/               # Shared ESLint configuration
│   ├── prettier/             # Shared Prettier configuration
│   ├── typescript/           # Shared TypeScript configuration
├── packages/
│   ├── database/             # Prisma ORM + repositories + schemas
│   ├── schemas/              # Zod validation schemas (API contracts)
│   ├── types/                # Shared TypeScript types
│   └── utils/                # Shared utilities & constants
└── docker-compose.yaml       # PostgreSQL + App orchestration
```

<details open>
<summary><h3>🚀 Quick Start Guide</h3></summary>

### Prerequisites

Ensure you have the following installed:

- **Node.js** ≥ 20.0.0 ([Download](https://nodejs.org/))
- **pnpm** ≥ 10.0.0 ([Installation Guide](https://pnpm.io/installation))
- **Docker** & **Docker Compose** ([Download](https://www.docker.com/products/docker-desktop))

### Step 1: Clone & Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd pnpm-workspace

# Install dependencies
pnpm install

# Set up Git hooks (Husky)
pnpm prepare
```

### Step 2: Environment Configuration

Create a `.env` file in the `apps/server/` folder:

```bash
# Server Configuration
NODE_ENV=development
PORT=3210
API_PREFIX=/api/v1
SERVER_BASE_URL=http://localhost:3210

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/monorepo
DOCKER_DEFAULT_IP=127.0.0.1

# Security (generate secure tokens for production)
CORS_ORIGINS=http://localhost:3000,http://localhost:3210
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here
```

For the Docker environment, also set PostgreSQL credentials:

```bash
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=monorepo
```

### Step 3: Verify Setup

```bash
# Lint all packages
pnpm lint

# Type check all packages
pnpm typecheck

# Build all packages
pnpm build
```

### Step 4: Run with Docker Compose (Recommended)

```bash
# Start PostgreSQL + Server
pnpm compose:up

# The server will be available at: http://localhost:3210
# Health check endpoint: http://localhost:3210/health
```

Test the health endpoints:

```bash
curl http://localhost:3210/health           # Basic health check
curl http://localhost:3210/health-db        # Database health check
```

To stop services:

```bash
pnpm compose:down
```

### Step 5: Run Locally (Without Docker)

```bash
# Development mode with hot-reload
pnpm dev

# Or run specific services
pnpm dev:server                 # Start Fastify server
pnpm dev:client                 # Start client app

# Watch mode for server
pnpm dev:server:watch

# Build for production
pnpm build

# Run production build
pnpm build:server && pnpm --filter @repo/server run start
```

---

## 📋 Available Commands

### Workspace Commands

| Command          | Description                           |
| ---------------- | ------------------------------------- |
| `pnpm install`   | Install dependencies for all packages |
| `pnpm lint`      | Run ESLint across all packages        |
| `pnpm typecheck` | Type-check all TypeScript files       |
| `pnpm build`     | Build all packages in parallel        |
| `pnpm dev`       | Start development mode for all apps   |

### Server Commands

| Command                                | Description                      |
| -------------------------------------- | -------------------------------- |
| `pnpm dev:server`                      | Start Fastify server (dev mode)  |
| `pnpm dev:server:watch`                | Start with nodemon auto-reload   |
| `pnpm build:server`                    | Compile TypeScript to JavaScript |
| `pnpm --filter @repo/server run start` | Run compiled server              |

### Database Commands

| Command                | Description                                 |
| ---------------------- | ------------------------------------------- |
| `pnpm db:migrate:init` | Initialize & create first migration         |
| `pnpm db:migrate:auto` | Auto-generate migration from schema changes |
| `pnpm db:generate`     | Generate Prisma client                      |
| `pnpm db:studio`       | Open Prisma Studio (visual DB manager)      |

### Docker Commands

| Command                  | Description                              |
| ------------------------ | ---------------------------------------- |
| `pnpm compose:up`        | Start all services (PostgreSQL + Server) |
| `pnpm compose:down`      | Stop all services                        |
| `pnpm compose:restart`   | Restart all services                     |
| `pnpm docker:dev:build`  | Build development Docker image           |
| `pnpm docker:dev:run`    | Run development container                |
| `pnpm docker:prod:build` | Build production Docker image            |
| `pnpm docker:prod:run`   | Run production container                 |

</details>

<details>
<summary><h3>📝 Commit Convention</h3></summary>

This project uses **Husky** and **Commitlint** to enforce [Conventional Commits](https://www.conventionalcommits.org/).

#### Format

```
type(scope?): short description
```

**Max length:** 72 characters for subject line

---

#### Commit Types

| Type       | Description                             | Example                                             |
| ---------- | --------------------------------------- | --------------------------------------------------- |
| `feat`     | New user-facing feature                 | `feat(health): add database health check endpoint`  |
| `fix`      | Bug fix                                 | `fix(server): resolve database connection timeout`  |
| `refactor` | Code restructuring (no behavior change) | `refactor(database): reorganize repository pattern` |
| `perf`     | Performance improvement                 | `perf(schemas): optimize zod validation`            |
| `chore`    | Maintenance, tooling, dependencies      | `chore(deps): upgrade typescript to 5.9.3`          |
| `style`    | Code formatting (no logic change)       | `style(code): add missing semicolons`               |
| `docs`     | Documentation only                      | `docs(readme): add environment setup guide`         |
| `ci`       | CI/CD pipeline updates                  | `ci(github): add linting workflow`                  |
| `test`     | Add or update tests                     | `test(health): add service unit tests`              |

---

#### Commit Scopes

Scopes should reference the package or feature being modified:

| Scope      | Description                                           |
| ---------- | ----------------------------------------------------- |
| `server`   | Server app (`apps/server/`)                           |
| `client`   | Client app (`apps/client/`)                           |
| `database` | Database package (`packages/database/`)               |
| `schemas`  | Schemas package (`packages/schemas/`)                 |
| `types`    | Types package (`packages/types/`)                     |
| `utils`    | Utils package (`packages/utils/`)                     |
| `config`   | Configuration packages (eslint, prettier, typescript) |
| `deps`     | Dependencies (package.json, pnpm-lock.yaml)           |

---

#### Commit Examples

```bash
# Feature: Add new endpoint
feat(server): add health database check endpoint

# Bug fix: Database issue
fix(database): handle prisma connection errors gracefully

# Refactor: Improve code structure
refactor(database): reorganize repository with type-safe parameters

# Performance: Optimize validation
perf(schemas): improve zod schema compilation

# Dependency update
chore(deps): upgrade prisma to 7.7.0

# Documentation
docs(readme): add environment setup instructions

# Type definitions
feat(types): export health check types from database package

# Configuration update
chore(config): add stricter typescript rules
```

---

#### Automatic Commit Validation

Commits that don't follow the convention will be **rejected** by the Husky pre-commit hook:

```bash
# ❌ INVALID - Will be rejected
git commit -m "fix the bug"

# ✅ VALID - Will be accepted
git commit -m "fix(server): resolve health check endpoint timeout"
```

To bypass validation (use cautiously):

```bash
git commit --no-verify
```

</details>

---

## 🛠 Technology Stack

### Core Framework

- **Fastify** (v5.8.4) - Fast and low-overhead web framework
- **TypeScript** (v5.9.3) - Type-safe development
- **Node.js** (v20 or higher) - JavaScript runtime

### Database & ORM

- **Prisma** (v7.7.0) - Next-generation ORM
- **PostgreSQL** (v15) - Production-grade database

### Validation & Types

- **Zod** (v4.3.5) - TypeScript-first schema validation
- **fastify-type-provider-zod** - Zod + Fastify integration

### Code Quality

- **ESLint** (v9.39.4) - Static code analysis
- **Prettier** (v3.8.1) - Code formatter
- **TypeScript Compiler** - Type checking

### Development Tools

- **pnpm** (v10.27.0) - Fast package manager
- **Husky** (v9.1.7) - Git hooks
- **Commitlint** (v20.5.0) - Commit message validation
- **Docker** - Containerization
- **Nodemon** (v3.1.11) - Auto-reload development

### Testing

- **Vitest** (v4.0.17) - Unit test framework

---

## ✨ Code Quality & Best Practices

This monorepo adheres to:

- **SOLID Principles** - Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **DRY** - Don't Repeat Yourself (schema composition, shared utilities)
- **KISS** - Keep It Simple, Stupid (clear, readable code)
- **YAGNI** - You Aren't Gonna Need It (no over-engineering)

### Architecture Patterns

- **Repository Pattern** - Data access abstraction
- **Schema Layering** - Input/Output validation separation
- **Barrel Exports** - Clean module interfaces (`_index.ts`)
- **Dependency Injection** - Loose coupling between modules

### Quality Metrics

```
Type Safety:        ✅ Strict - No `any` types allowed
Code Coverage:      📊 Configured with Vitest
Linting:            ✅ Strict ESLint rules
Formatting:         ✅ Automated with Prettier
```

---

## 🐛 Troubleshooting

### "Cannot find module '@repo/...'"

**Solution:** Run `pnpm install` and ensure the package is in `pnpm-workspace.yaml`

```bash
pnpm install
pnpm typecheck  # Verify imports work
```

### Docker Compose fails to start

**Solution:** Check if ports are available and PostgreSQL credentials match

```bash
# Kill existing containers
docker compose down -v

# Rebuild from scratch
pnpm compose:restart
```

### Database migration errors

**Solution:** Reset and reinitialize database

```bash
# Reset database (⚠️ deletes all data)
docker-compose down -v

# Regenerate Prisma client
pnpm db:generate

# Reinitialize migrations
pnpm db:migrate:init
```

### Port 3210 already in use

**Solution:** Change the port in `.env` or kill the process

```bash
# Linux/macOS
lsof -i :3210
kill -9 <PID>

# Windows
netstat -ano | findstr :3210
taskkill /PID <PID> /F
```

### TypeScript compilation errors

**Solution:** Ensure all packages are built in the correct order

```bash
# Clean build
rm -rf dist packages/*/dist apps/*/dist

# Rebuild
pnpm build
```

### ESLint import errors

**Solution:** Clear the cache and reinstall

```bash
rm -rf node_modules/.cache
pnpm install
pnpm lint
```

---

## 📚 Project Resources

- [pnpm Documentation](https://pnpm.io/) - Package manager guide
- [Fastify Documentation](https://www.fastify.io/) - Web framework
- [Prisma Documentation](https://www.prisma.io/docs/) - ORM guide
- [Zod Documentation](https://zod.dev/) - Schema validation
- [Conventional Commits](https://www.conventionalcommits.org/) - Commit conventions

---

## 📄 License

ISC © 2026

---

## 💡 Contributing

When contributing to this monorepo, please:

1. **Follow commit conventions** - Husky will validate your commits
2. **Run `pnpm lint`** before pushing - Fix any linting errors
3. **Run `pnpm typecheck`** - Ensure type safety
4. **Test your changes** - Write tests for new features
5. **Update README** - Document new packages or commands

</details>
