import { useState } from "react"
import PropTypes from "prop-types"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const initialErrors = {
  name: "",
  email: "",
  phone: "",
  password: "",
  general: "",
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const phoneRegex = /^[0-9]{9,15}$/

const AuthForm = ({ mode }) => {
  const isRegister = mode === "register"
  const title = isRegister ? "Create Passenger Account" : "Login to Continue"
  const subtitle = isRegister
    ? "Reserve queues and track your van departures."
    : "Enter your credentials to access booking and updates."

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  })
  const [errors, setErrors] = useState(initialErrors)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()
  const { register, login } = useAuth()

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }))
  }

  const validate = () => {
    const nextErrors = { ...initialErrors }
    if (isRegister && !values.name.trim()) {
      nextErrors.name = "Name is required"
    }
    if (!emailRegex.test(values.email)) {
      nextErrors.email = "Please provide a valid email address"
    }
    if (isRegister && !phoneRegex.test(values.phone)) {
      nextErrors.phone = "Phone number must contain 9-15 digits"
    }
    if (values.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters"
    }

    setErrors(nextErrors)
    return Object.values(nextErrors).every((value) => value === "")
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      if (isRegister) {
        await register({
          name: values.name.trim(),
          email: values.email.toLowerCase(),
          phone: values.phone,
          password: values.password,
        })
      } else {
        await login({
          email: values.email.toLowerCase(),
          password: values.password,
        })
      }
      navigate("/dashboard")
    } catch (error) {
      const message =
        error.response?.data?.message ?? "Unable to process request right now."
      setErrors((prev) => ({
        ...prev,
        general: message,
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-card">
      <header>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </header>

      <form className="auth-card__form" onSubmit={handleSubmit} noValidate>
        {isRegister && (
          <label>
            <span>Full name</span>
            <input
              name="name"
              placeholder="Somchai Jaidee"
              value={values.name}
              onChange={handleChange}
              autoComplete="name"
            />
            {errors.name && <small className="error">{errors.name}</small>}
          </label>
        )}

        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
            autoComplete="email"
          />
          {errors.email && <small className="error">{errors.email}</small>}
        </label>

        {isRegister && (
          <label>
            <span>Phone number</span>
            <input
              type="tel"
              name="phone"
              placeholder="0812345678"
              value={values.phone}
              onChange={handleChange}
              autoComplete="tel"
            />
            {errors.phone && <small className="error">{errors.phone}</small>}
          </label>
        )}

        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            placeholder="******"
            value={values.password}
            onChange={handleChange}
            autoComplete={isRegister ? "new-password" : "current-password"}
          />
          {errors.password && <small className="error">{errors.password}</small>}
        </label>

        {errors.general && <div className="error general-error">{errors.general}</div>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : isRegister ? "Create Account" : "Sign In"}
        </button>
      </form>

      <footer>
        {isRegister ? (
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        ) : (
          <p>
            Need an account? <Link to="/register">Create one</Link>
          </p>
        )}
      </footer>
    </div>
  )
}

AuthForm.propTypes = {
  mode: PropTypes.oneOf(["login", "register"]).isRequired,
}

export default AuthForm
