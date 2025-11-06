const SummaryPanel = () => (
  <section className="auth-summary">
    <div>
      <h1>Van Queue &amp; Departure System</h1>
      <p>
        Manage every step of the passenger experience in one place: browse routes,
        reserve queues, upload payment slips, and receive live departure updates.
      </p>
    </div>

    <ul>
      <li>
        <span>1</span>
        <div>
          <strong>Explore available routes</strong>
          <p>Preview destinations, distance, and departure hubs in a single dashboard.</p>
        </div>
      </li>
      <li>
        <span>2</span>
        <div>
          <strong>Reserve quickly with proof of payment</strong>
          <p>Upload slips for driver verification and lock in your seat ahead of time.</p>
        </div>
      </li>
      <li>
        <span>3</span>
        <div>
          <strong>Stay informed in real time</strong>
          <p>Receive push notifications when payments are approved and vans are departing.</p>
        </div>
      </li>
    </ul>
  </section>
)

export default SummaryPanel
