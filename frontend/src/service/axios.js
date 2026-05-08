import axios from 'axios'

const baseUrl = '/api/admin'

export const api = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
  timeout: 5000
})

let isRefreshing = false
let queue = []

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    const isNetworkError =
      !error.response ||
      error.code === 'ERR_NETWORK' ||
      error.code === 'ECONNABORTED'
    if (isNetworkError) {
      return Promise.reject(error)
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url === '/refresh') {
        window.location.href = '/auth'
        return Promise.reject(error)
      }

      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push(() => {
            resolve(api(originalRequest))
          })
        })
      }

      isRefreshing = true

      try {
        await api.post(
          '/refresh',
          {},
          {
            _isRefresh: true
          }
        )

        queue.forEach(cb => cb())
        queue = []

        return api(originalRequest)
      } catch (refreshError) {
        queue.forEach(cb => cb())
        queue = []

        window.location.href = '/auth'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)
