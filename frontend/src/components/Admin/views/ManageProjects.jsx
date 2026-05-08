import { useState } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { useProjects, useAddProject, useUpdateProject, useDeleteProject } from '../../../hooks/useProjects'
import { cn } from '../../../lib/utils'
import ProjectModal from '../ProjectModal'

const ManageProjects = () => {
  const { data: projects = [], isLoading } = useProjects()
  const addProject = useAddProject()
  const updateProject = useUpdateProject()
  const deleteProject = useDeleteProject()
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)

  const handleSaveProject = (projectData) => {
    if (projectData._id || projectData.id) {
      updateProject.mutate(projectData)
    } else {
      addProject.mutate(projectData)
    }
    setIsProjectModalOpen(false)
    setEditingProject(null)
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black uppercase tracking-tight text-brand-dark">Manage Projects</h2>
        <button onClick={() => { setEditingProject(null); setIsProjectModalOpen(true) }} className="btn-primary py-2 px-4 text-[10px]"><Plus size={14} /> Add Project</button>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-teal border-t-transparent rounded-full animate-spin" /></div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-brand-silver text-xs font-black uppercase tracking-widest">No projects yet. Add your first project.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div key={project._id || project.id} className="bento-card bg-white p-5 group flex gap-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-brand-light relative">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className={cn('w-full h-full bg-gradient-to-br', project.color || 'from-brand-teal/20 to-brand-dark/5')} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[8px] font-black uppercase tracking-widest bg-brand-teal/10 text-brand-teal px-2 py-0.5 rounded-full">{project.category}</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => { setEditingProject(project); setIsProjectModalOpen(true) }} className="p-1.5 rounded-lg bg-brand-light text-brand-dark hover:bg-brand-teal hover:text-white transition-all"><Edit2 size={12} /></button>
                    <button onClick={() => deleteProject.mutate(project._id || project.id)} className="p-1.5 rounded-lg bg-brand-light text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={12} /></button>
                  </div>
                </div>
                <h4 className="font-black text-brand-dark text-sm mb-1 uppercase truncate">{project.title}</h4>
                <p className="text-[10px] text-brand-silver mb-2 line-clamp-2 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {(project.tags || []).map((tag, i) => (
                    <span key={i} className="text-[7px] font-bold text-brand-silver uppercase tracking-tighter">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ProjectModal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} onAdd={handleSaveProject} project={editingProject} />
    </div>
  )
}

export default ManageProjects
