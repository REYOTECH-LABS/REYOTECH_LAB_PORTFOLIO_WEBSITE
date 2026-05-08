import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as projectApi from '../service/projects'

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const data = await projectApi.fetchProjects()
      return data.projects
    }
  })
}

export function useAddProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: projectApi.addProject,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] })
  })
}

export function useUpdateProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ _id, id, ...data }) => projectApi.editProject(_id || id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] })
  })
}

export function useDeleteProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => projectApi.deleteProject(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] })
  })
}
