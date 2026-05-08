import { api } from './axios.js'

export async function fetchProjects () {
  try {
    const response = await api.get('/projects')
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function addProject (projectData) {
  try {
    const response = await api.post('/projects', projectData)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function editProject (id, projectData) {
  try {
    const response = await api.put(`/projects/${id}`, projectData)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteProject (id) {
  try {
    const response = await api.delete(`/projects/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
