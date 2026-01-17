<h1>pnpm Workspace: Production-ready Docker & Node.js Starter Kit</h1>



<details>
  <summary><h3>Commit convention</h3></summary>
  <p>To unify commit writing, this project uses <b>Husky</b> and <b>Commitlint</b>.</p>
  <p><b>Structure:</b>&nbsp;<code>type(scope?): subject description</code></p>
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

