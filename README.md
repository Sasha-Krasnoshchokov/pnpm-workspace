<h1>pnpm Workspace: Production-ready Docker & Node.js Starter Kit</h1>

This monorepo starter kit enforces consistency across services.
It follows a "Base Config" pattern, where apps inherit shared TypeScript, ESLint,
and Prettier configurations from a centralized <code>packages/config</code> directory,
eliminating configuration drift.

To ensure an optimal balance of speed, safety, and CI performance the workspace utilizes
the <code>pnpm</code> package manager.

<details open>
  <summary><h3>🚀 How to deploy locally</h3>h3></summary>
  
  ### Prerequisites
  
  Ensure you have the following installed:
  - [Docker](https://www.docker.com/)
  - [pnpm](https://pnpm.io/installation) (v8+ recommended)
  ### Setup Steps
  1. **Clone the repository**
  ```bash
  # Using SSH (Recommended for contributors)
  git clone git@github.com:Sasha-Krasnoshchokov/pnpm-workspace.git
  ```
  ```bash
  # Or using HTTPS
  git clone https://github.com/Sasha-Krasnoshchokov/pnpm-workspace.git
  ```
  2. **Install dependencies from the root directory**
  ```bash
  cd pnpm-workspace && pnpm install
  ```
  4. **Environment Setup: add the `.env` (for prod environments), and `.env.local` (for dev environments) file into the `apps/server` folder**
  - NODE_ENV=development/production
  - PORT=3210
  - SERVER_BASE_URL=http://localhost
  - API_PREFIX=/api/v1

### Global Development Commands

You can run workspace-wide commands from the root directory to ensure consistency across all apps and packages.

**Run the first two commands to make sure the dependencies are installed correctly**

```bash
# Runs ESLint using the shared `packages/config`.
pnpm lint
```

```bash
# Validates TypeScript across all apps (skips non-TS packages).
pnpm typecheck
```

### Build and run the server in Docker

```bash
# Using docker compose (Recommended)
docker compose up server-dev --build
```

```bash
# Or build and run separately
pnpm docker:build && pnpm docker:run
```

</details>

<details>
<summary><h3>Commit convention</h3></summary>
<p>To unify commit writing, this project uses <b>Husky</b> and <b>Commitlint</b>.</p>
<p><b>Structure:</b>&nbsp;<code>type(scope?): subject description</code></p>

<details>
  <summary>
    <b>List of the commit types</b>
  </summary>
  <table>
    <thead>
      <tr>
        <th>Commit type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>feat</code></td><td>New user-facing feature</td></tr>
      <tr><td><code>fix</code></td><td>Bug fix</td></tr>
      <tr><td><code>chore</code></td><td>Tooling, configuration, or maintenance</td></tr>
      <tr><td><code>refactor</code></td><td>Code change without behavior change</td></tr>
      <tr><td><code>style</code></td><td>Formatting (no logic)</td></tr>
      <tr><td><code>perf</code></td><td>Performance improvement</td></tr>
      <tr><td><code>docs</code></td><td>Documentation only</td></tr>
      <tr><td><code>ci</code></td><td>CI/CD pipeline and script improvements</td></tr>
    </tbody>
  </table>
</details>

<details>
  <summary>
    <b>List of the scope examples</b>
  </summary>
    <table>
    <thead>
      <tr>
        <th>Scope</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>deps</code></td><td>Package updates</td></tr>
      <tr><td><code>auth</code></td><td>Authentication and Authorization logic</td></tr>
      <tr><td><code>api</code></td><td>Data fetching, controllers, and routes</td></tr>
      <tr><td><code>web/ser</code></td><td>Specific part of the monorepo</td></tr>
      <tr><td><code>ui</code></td><td>UI components and styling</td></tr>
      <tr><td><code>github</code></td><td>GitHub Actions or repository settings</td></tr>
    </tbody>
  </table>
</details>

<details>
  <summary><b>View Examples</b></summary>
  <ul>
    <li><code>feat(web/auth): add login</code></li>
    <li><code>feat(ser/auth): add JWT login support</code></li>
    <li><code>fix(ser): resolve database connection timeout</code></li>
    <li><code>chore(deps): update typeorm to v0.3.20</code></li>
    <li><code>fix(ui): align login button</code></li>
  </ul>
</details>

</details>
