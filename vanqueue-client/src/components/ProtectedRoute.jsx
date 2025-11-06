import PropTypes from "prop-types"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loadingProfile } = useAuth()

  if (loadingProfile) {
    return (
      <div className="loading-state">
        <div className="loading-state__spinner" aria-hidden="true" />
        <p>Checking your session...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ProtectedRoute
