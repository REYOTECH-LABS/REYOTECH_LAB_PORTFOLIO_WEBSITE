import { useState } from 'react'
import { Plus, Edit2, Trash2, Layers, Globe, Palette, Smartphone, BarChart, Code, Briefcase, Zap, ChevronRight } from 'lucide-react'
import { useServiceCategories, useAddService, useUpdateService, useDeleteService, useAddCategory, useUpdateCategory, useDeleteCategory } from '../../../hooks/useServices'
import ServiceModal from '../ServiceModal'
import CategoryModal from '../CategoryModal'

const iconMap = { Globe, Palette, Smartphone, Layers, BarChart, Code, Briefcase, Zap }

const ManageServices = () => {
  const { data: categories = [], isLoading } = useServiceCategories()
  const addService = useAddService()
  const updateService = useUpdateService()
  const deleteService = useDeleteService()
  const addCategory = useAddCategory()
  const updateCategory = useUpdateCategory()
  const deleteCategory = useDeleteCategory()

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [editingCategory, setEditingCategory] = useState(null)
  const [activeCategoryId, setActiveCategoryId] = useState(null)

  const handleSaveService = (serviceData) => {
    if (editingService) {
      updateService.mutate({ serviceId: editingService._id, ...serviceData })
    } else {
      addService.mutate({ categoryId: activeCategoryId, ...serviceData })
    }
    setIsServiceModalOpen(false)
    setEditingService(null)
  }

  const handleSaveCategory = (catData) => {
    if (editingCategory) {
      updateCategory.mutate(catData)
    } else {
      addCategory.mutate(catData)
    }
    setIsCategoryModalOpen(false)
    setEditingCategory(null)
  }

  const handleDeleteCategory = (cat) => {
    if (window.confirm(`Delete "${cat.label}" and all its services?`)) {
      deleteCategory.mutate(cat._id)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-teal border-t-transparent rounded-full animate-spin" /></div>
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black uppercase tracking-tight text-brand-dark">Service Categories</h2>
        <button onClick={() => { setEditingCategory(null); setIsCategoryModalOpen(true) }}
          className="btn-primary py-2 px-4 text-[10px]"><Plus size={14} /> Add Category</button>
      </div>
      {categories.map((category) => {
        const Icon = iconMap[category.icon] || Layers
        return (
          <div key={category._id} className="space-y-4">
            <div className="flex items-center justify-between bg-brand-dark text-white p-6 rounded-[32px] shadow-xl group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-brand-teal"><Icon size={24} /></div>
                <div>
                  <h3 className="font-black text-lg uppercase tracking-tight">{category.label}</h3>
                  <p className="text-xs text-white/60 font-medium">{category.tagline}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { setEditingCategory(category); setIsCategoryModalOpen(true) }}
                  className="p-2 rounded-xl bg-white/10 text-white hover:bg-white hover:text-brand-dark transition-all opacity-0 group-hover:opacity-100"><Edit2 size={14} /></button>
                <button onClick={() => handleDeleteCategory(category)}
                  className="p-2 rounded-xl bg-white/10 text-red-300 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button>
                <button onClick={() => { setEditingService(null); setActiveCategoryId(category._id); setIsServiceModalOpen(true) }}
                  className="bg-brand-teal text-brand-dark p-3 rounded-2xl hover:scale-105 transition-transform"><Plus size={20} /></button>
              </div>
            </div>
            <div className="grid gap-3 pl-4 border-l-2 border-brand-dark/5 ml-6">
              {(category.services || []).map((service) => (
                <div key={service._id} className="glass rounded-2xl p-4 flex items-center justify-between group hover:border-brand-teal/30 transition-all">
                  <div className="flex items-center gap-4">
                    <ChevronRight size={14} className="text-brand-teal" />
                    <div>
                      <h4 className="font-black text-brand-dark text-sm uppercase">{service.name}</h4>
                      <div className="flex gap-2 mt-1">
                        {(service.highlights || []).map((h, i) => (
                          <span key={i} className="text-[8px] font-bold text-brand-silver uppercase bg-brand-light px-2 py-0.5 rounded-full">{h}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingService(service); setActiveCategoryId(category._id); setIsServiceModalOpen(true) }}
                      className="p-2 rounded-xl hover:bg-brand-light text-brand-dark"><Edit2 size={14} /></button>
                    <button onClick={() => deleteService.mutate(service._id)}
                      className="p-2 rounded-xl hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
      <ServiceModal isOpen={isServiceModalOpen} onClose={() => setIsServiceModalOpen(false)} onAdd={handleSaveService} service={editingService} />
      <CategoryModal isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)} onSave={handleSaveCategory} category={editingCategory} />
    </div>
  )
}

export default ManageServices
