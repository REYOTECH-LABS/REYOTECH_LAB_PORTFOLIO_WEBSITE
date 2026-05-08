import React, { useState, useEffect } from 'react'
import { X, ArrowUpRight } from 'lucide-react'

const icons = ['Code', 'Palette', 'Zap', 'Globe', 'Server', 'Lightbulb']

const CategoryModal = ({ isOpen, onClose, onSave, category }) => {
  const [formData, setFormData] = useState({ icon: 'Code', label: '', tagline: '', desc: '' })

  useEffect(() => {
    if (category) {
      setFormData({ icon: category.icon || 'Code', label: category.label || '', tagline: category.tagline || '', desc: category.desc || '' })
    } else {
      setFormData({ icon: 'Code', label: '', tagline: '', desc: '' })
    }
  }, [category, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.label || !formData.tagline || !formData.desc) return
    onSave(category ? { ...formData, _id: category._id } : formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md" onClick={onClose} />
      <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 md:p-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tighter">
                {category ? 'Edit' : 'New'} <span className="text-brand-teal">Category.</span>
              </h2>
              <p className="text-brand-silver text-[10px] font-black uppercase tracking-widest mt-1">
                {category ? 'Modify category details' : 'Define a new service category'}
              </p>
            </div>
            <button onClick={onClose} className="p-3 rounded-2xl bg-brand-light text-brand-dark hover:bg-brand-dark hover:text-white transition-all">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-silver uppercase tracking-widest ml-1">Icon</label>
              <div className="grid grid-cols-6 gap-2">
                {icons.map(icon => (
                  <button key={icon} type="button" onClick={() => setFormData({ ...formData, icon })}
                    className={`p-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                      formData.icon === icon
                        ? 'bg-brand-dark text-white shadow-lg'
                        : 'bg-brand-light text-brand-silver hover:bg-brand-dark/10'
                    }`}
                  >
                    {icon === 'Code' ? '{ }' : icon === 'Palette' ? '🎨' : icon === 'Zap' ? '⚡' : icon === 'Globe' ? '🌐' : icon === 'Server' ? '🖥' : '💡'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-silver uppercase tracking-widest ml-1">Label</label>
              <input required type="text" placeholder="E.G. ENGINEERING"
                className="w-full px-5 py-4 bg-brand-light rounded-2xl text-xs font-bold text-brand-dark outline-none border-2 border-transparent focus:border-brand-teal transition-all uppercase"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-silver uppercase tracking-widest ml-1">Tagline</label>
              <input required type="text" placeholder="E.G. ROBUST. SCALABLE."
                className="w-full px-5 py-4 bg-brand-light rounded-2xl text-xs font-bold text-brand-dark outline-none border-2 border-transparent focus:border-brand-teal transition-all uppercase"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-silver uppercase tracking-widest ml-1">Description</label>
              <textarea required rows="3" placeholder="WHAT THIS CATEGORY COVERS"
                className="w-full px-5 py-4 bg-brand-light rounded-2xl text-xs font-bold text-brand-dark outline-none border-2 border-transparent focus:border-brand-teal transition-all uppercase resize-none"
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              />
            </div>

            <div className="pt-4">
              <button type="submit" className="btn-primary w-full py-5 text-xs">
                {category ? 'Update Category' : 'Create Category'} <ArrowUpRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CategoryModal
