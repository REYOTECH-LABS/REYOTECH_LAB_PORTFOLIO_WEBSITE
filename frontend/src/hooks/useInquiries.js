import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as inquiryApi from '../service/inquiries'

export function useInquiries() {
  return useQuery({
    queryKey: ['inquiries'],
    queryFn: async () => {
      const data = await inquiryApi.fetchInquiries()
      return data.inquiries
    }
  })
}

export function useMarkInquiryRead() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: inquiryApi.markInquiryRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['inquiries'] })
  })
}

export function useDeleteInquiry() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: inquiryApi.deleteInquiry,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['inquiries'] })
  })
}
