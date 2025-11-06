import './App.css'
import { endpoints } from './lib/api'

function App() {
  return (
    <main className="app">
      <section className="app__hero">
        <h1>Van Queue &amp; Departure System</h1>
        <p>
          Sprint 1 scaffolds the core infrastructure for the passenger, driver, and
          admin workflows. The frontend currently exposes a minimal shell while the
          backend delivers authentication, database schemas, and health checks.
        </p>
      </section>

      <section className="app__grid">
        <article>
          <h2>What&apos;s Ready</h2>
          <ul>
            <li>Environment configuration via <code>.env</code></li>
            <li>
              API health check at <code>{endpoints.health}</code>
            </li>
            <li>Authentication endpoints for registration and login</li>
          </ul>
        </article>

        <article>
          <h2>Up Next</h2>
          <ul>
            <li>Passenger booking and queue management UI</li>
            <li>Driver dashboards for payment verification</li>
            <li>Admin controls for routes, vans, and drivers</li>
          </ul>
        </article>
      </section>
    </main>
  )
}

export default App
