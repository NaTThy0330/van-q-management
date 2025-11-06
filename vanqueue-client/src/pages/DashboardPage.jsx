import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const DashboardPage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="inline-actions">
          <span className="tag">{user?.role?.toUpperCase()}</span>
          <button type="button" onClick={handleLogout}>
            Sign out
          </button>
        </div>
        <h1>Welcome back, {user?.name ?? "Passenger"}</h1>
        <p>
          Your passenger dashboard will soon surface live queue updates, trip history,
          and upcoming departures. Sprint 3 will connect these widgets to the booking
          APIs and Socket.IO events prepared in Sprint 1.
        </p>
      </header>

      <section className="dashboard__grid">
        <article className="dashboard__card">
          <h2>Next milestones</h2>
          <ul>
            <li>Wire available routes and trip schedules directly from the API</li>
            <li>Enable queue reservations with slip uploads and driver approval</li>
            <li>Stream queue status notifications with Socket.IO updates</li>
          </ul>
        </article>
        <article className="dashboard__card">
          <h2>Account details</h2>
          <p>
            <strong>Name:</strong> {user?.name ?? "-"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email ?? "-"}
          </p>
          <p>
            <strong>Role:</strong> {user?.role ?? "-"}
          </p>
        </article>
      </section>
    </div>
  )
}

export default DashboardPage
