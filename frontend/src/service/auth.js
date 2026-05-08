import { api } from './axios.js'

export async function login(email, password) {
  const { data } = await api.post('/login', { email, password })
  return data
}

export async function signup(name, email, password) {
  const { data } = await api.post('/signup', { name, email, password })
  return data
}
