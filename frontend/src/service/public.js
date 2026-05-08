import axios from 'axios'

const publicApi = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

export async function submitContact({ name, email, subject, message }) {
  const response = await publicApi.post('/contact', { name, email, subject, message })
  return response.data
}

export default publicApi
