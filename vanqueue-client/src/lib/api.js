export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api'

export const endpoints = {
  health: `${API_BASE_URL}/health`,
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    profile: `${API_BASE_URL}/auth/profile`,
  },
}
