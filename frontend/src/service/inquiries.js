import { api } from './axios.js'

export async function fetchInquiries() {
  const response = await api.get('/inquiries')
  return response.data
}

export async function markInquiryRead(id) {
  const response = await api.patch(`/inquiries/${id}/read`)
  return response.data
}

export async function deleteInquiry(id) {
  const response = await api.delete(`/inquiries/${id}`)
  return response.data
}
