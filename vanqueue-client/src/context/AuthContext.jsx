import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { apiClient, endpoints } from '../lib/api'

const STORAGE_KEY = 'vanqueue-auth'

const AuthContext = createContext(null)

const readStoredAuth = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const writeStoredAuth = (value) => {
  try {
    if (!value) {
      window.localStorage.removeItem(STORAGE_KEY)
    } else {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    }
  } catch {
    // storage is best-effort; ignore quota/security exceptions
  }
}

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(() => readStoredAuth())
  const [loadingProfile, setLoadingProfile] = useState(false)

  useEffect(() => {
    writeStoredAuth(state)
  }, [state])

  useEffect(() => {
    if (state?.token) {
      apiClient.defaults.headers.common.Authorization = `Bearer ${state.token}`
    } else {
      delete apiClient.defaults.headers.common.Authorization
    }
  }, [state?.token])

  useEffect(() => {
    if (!state?.token || state?.user) return

    const controller = new AbortController()
    const fetchProfile = async () => {
      setLoadingProfile(true)
      try {
        const response = await apiClient.get(endpoints.auth.profile, {
          signal: controller.signal,
        })
        setState((prev) => ({
          ...prev,
          user: response.data.data,
        }))
      } catch (error) {
        console.error('Failed to refresh profile', error)
        setState(null)
      } finally {
        setLoadingProfile(false)
      }
    }

    fetchProfile()
    return () => controller.abort()
  }, [state?.token, state?.user])

  const register = async (payload) => {
    const response = await apiClient.post(endpoints.auth.register, payload)
    setState({
      token: response.data.data.token,
      user: {
        id: response.data.data.userId,
        role: response.data.data.role,
        name: payload.name,
        email: payload.email,
      },
    })
    return response
  }

  const login = async (payload) => {
    const response = await apiClient.post(endpoints.auth.login, payload)
    setState({
      token: response.data.token,
      user: response.data.user,
    })
    return response
  }

  const logout = () => {
    setState(null)
  }

  const value = useMemo(
    () => ({
      user: state?.user ?? null,
      token: state?.token ?? null,
      isAuthenticated: Boolean(state?.token),
      loadingProfile,
      register,
      login,
      logout,
    }),
    [state, loadingProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
