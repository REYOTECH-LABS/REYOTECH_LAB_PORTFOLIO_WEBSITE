import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as serviceApi from '../service/services'

export function useServiceCategories() {
  return useQuery({
    queryKey: ['serviceCategories'],
    queryFn: async () => {
      const [catData, svcData] = await Promise.all([
        serviceApi.fetchCategories(),
        serviceApi.fetchServices()
      ])
      const services = svcData.services || []
      return (catData.categories || []).map(cat => ({
        ...cat,
        services: services.filter(s => s.categoryId === cat._id)
      }))
    }
  })
}

export function useAddCategory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data) => serviceApi.addCategory(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['serviceCategories'] })
  })
}

export function useUpdateCategory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ _id, ...data }) => serviceApi.updateCategory(_id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['serviceCategories'] })
  })
}

export function useDeleteCategory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => serviceApi.deleteCategory(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['serviceCategories'] })
  })
}

export function useAddService() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data) => serviceApi.addService(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['serviceCategories'] })
  })
}

export function useUpdateService() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ serviceId, ...data }) => serviceApi.updateService(serviceId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['serviceCategories'] })
  })
}

export function useDeleteService() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (serviceId) => serviceApi.deleteService(serviceId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['serviceCategories'] })
  })
}
