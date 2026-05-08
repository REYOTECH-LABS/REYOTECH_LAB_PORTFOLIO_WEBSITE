import React, { useState, useRef, useEffect } from 'react';
import { X, ArrowUpRight, Image as ImageIcon, Upload } from 'lucide-react';

const ProjectModal = ({ isOpen, onClose, onAdd, project }) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web',
    tags: '',
    desc: '',
    image: '',
    color: 'from-brand-teal/20 to-brand-dark/5'
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags
      });
      setPreviewImage(project.image);
    } else {
      setFormData({
        title: '',
        category: 'Web',
        tags: '',
        desc: '',
        image: '',
        color: 'from-brand-teal/20 to-brand-dark/5'
      });
      setPreviewImage(null);
    }
  }, [project, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : formData.tags
    });
    onClose();
  };

  const handleImageChange = (url) => {
    setFormData({ ...formData, image: url });
    setPreviewImage(url);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setPreviewImage(blobUrl);
      setFormData({ ...formData, image: blobUrl });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md" onClick={onClose} />
      <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col md:flex-row">
        
        {/* Preview Side */}
        <div className="w-full md:w-1/3 bg-brand-light p-8 border-r border-brand-dark/5 flex flex-col justify-center items-center text-center">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileUpload}
          />
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full aspect-square rounded-[32px] overflow-hidden bg-white shadow-inner mb-6 relative flex items-center justify-center border-2 border-dashed border-brand-dark/10 group cursor-pointer hover:border-brand-teal transition-all duration-500"
          >
            {previewImage ? (
              <>
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                  <Upload size={24} className="mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Change Image</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-brand-silver group-hover:text-brand-teal transition-colors">
                <ImageIcon size={48} strokeWidth={1} />
                <span className="text-[10px] font-black uppercase tracking-widest">Click to Upload</span>
              </div>
            )}
          </div>
          <h3 className="text-xl font-black text-brand-dark uppercase tracking-tighter truncate w-full px-2">
            {formData.title || 'Project Title'}
          </h3>
          <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest mt-2">
            {formData.category}
          </p>
        </div>

        {/* Form Side */}
        <div className="flex-1 p-8 md:p-10 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tighter">
                    {project ? 'Edit' : 'New'} <span className="text-brand-teal">Project.</span>
                  </h2>
                  <p className="text-brand-silver text-[10px] font-black uppercase tracking-widest mt-1">
                    {project ? 'Update existing project' : 'Project Deployment'}
                  </p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-3 rounded-2xl bg-brand-light text-brand-dark hover:bg-brand-dark hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* ... existing fields ... */}
                {/* Note: I'm skipping fields to keep the diff small, assuming they are unchanged */}
                {/* But wait, I need to keep the code intact. I'll use TargetContent/ReplacementContent carefully */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-silver uppercase tracking-widest ml-1">Project Title</label>
                <input 
                  required
                  type="text" 
                  placeholder="E.G. REYO PORTAL"
                  className="w-full px-5 py-4 bg-brand-light rounded-2xl text-xs font-bold text-brand-dark outline-none border-2 border-transparent focus:border-brand-teal transition-all uppercase"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-silver uppercase tracking-widest ml-1">Category</label>
                <select 
                  className="w-full px-5 py-4 bg-brand-light rounded-2xl text-xs font-bold text-brand-dark outline-none border-2 border-transparent focus:border-brand-teal transition-all appearance-none"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  {['Web', 'Mobile', 'Design', 'Branding'].map(cat => (
                    <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-silver uppercase tracking-widest ml-1">Unsplash Image URL</label>
              <input 
                type="text" 
                placeholder="HTTPS://IMAGES.UNSPLASH.COM/..."
                className="w-full px-5 py-4 bg-brand-light rounded-2xl text-xs font-bold text-brand-dark outline-none border-2 border-transparent focus:border-brand-teal transition-all"
                value={formData.image}
                onChange={(e) => handleImageChange(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-silver uppercase tracking-widest ml-1">Stack (Comma Separated)</label>
              <input 
                type="text" 
                placeholder="REACT, TAILWIND, REDUX"
                className="w-full px-5 py-4 bg-brand-light rounded-2xl text-xs font-bold text-brand-dark outline-none border-2 border-transparent focus:border-brand-teal transition-all uppercase"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-silver uppercase tracking-widest ml-1">Project Brief</label>
              <textarea 
                required
                rows="3"
                placeholder="WHAT DID WE BUILD?"
                className="w-full px-5 py-4 bg-brand-light rounded-2xl text-xs font-bold text-brand-dark outline-none border-2 border-transparent focus:border-brand-teal transition-all uppercase resize-none"
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
              />
            </div>

            <div className="pt-4">
              <button type="submit" className="btn-primary w-full py-5 text-xs">
                {project ? 'Update Project' : 'Launch Project'} <ArrowUpRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
