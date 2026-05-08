import { api } from './axios.js'

export async function fetchCategories() {
  const response = await api.get('/categories')
  return response.data
}

export async function addCategory(categoryData) {
  const response = await api.post('/categories', categoryData)
  return response.data
}

export async function updateCategory(id, categoryData) {
  const response = await api.put(`/categories/${id}`, categoryData)
  return response.data
}

export async function deleteCategory(id) {
  const response = await api.delete(`/categories/${id}`)
  return response.data
}

export async function fetchServices(categoryId) {
  const params = categoryId ? { categoryId } : {}
  const response = await api.get('/services', { params })
  return response.data
}

export async function addService(serviceData) {
  const response = await api.post('/services', serviceData)
  return response.data
}

export async function updateService(id, serviceData) {
  const response = await api.put(`/services/${id}`, serviceData)
  return response.data
}

export async function deleteService(id) {
  const response = await api.delete(`/services/${id}`)
  return response.data
}
