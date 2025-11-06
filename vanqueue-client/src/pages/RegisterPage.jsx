import { Navigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { useAuth } from '../context/AuthContext'
import SummaryPanel from './components/SummaryPanel'

const RegisterPage = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="auth-wrapper">
      <SummaryPanel />
      <AuthForm mode="register" />
    </div>
  )
}

export default RegisterPage
