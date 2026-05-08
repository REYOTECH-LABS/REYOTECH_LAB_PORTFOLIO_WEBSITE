import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';

const ServiceModal = ({ isOpen, onClose, onAdd, service }) => {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    highlights: ''
  });

  useEffect(() => {
    if (service) {
      setFormData({
        ...service,
        highlights: Array.isArray(service.highlights) ? service.highlights.join(', ') : service.highlights
      });
    } else {
      setFormData({
        name: '',
        desc: '',
        highlights: ''
      });
    }
  }, [service, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      highlights: typeof formData.highlights === 'string' ? formData.highlights.split(',').map(h => h.trim()).filter(h => h !== '') : formData.highlights
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md" onClick={onClose} />
      <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 md:p-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tighter">
                {service ? 'Edit' : 'New'} <span className="text-brand-teal">Service.</span>
              </h2>
              <p className="text-brand-silver text-[10px] font-black uppercase tracking-widest mt-1">
                {service ? 'Modify service details' : 'Define new service capability'}
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
            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-silver uppercase tracking-widest ml-1">Service Name</label>
              <input 
                required
                type="text" 
                placeholder="E.G. ENTERPRISE WEB APPS"
                className="w-full px-5 py-4 bg-brand-light rounded-2xl text-xs font-bold text-brand-dark outline-none border-2 border-transparent focus:border-brand-teal transition-all uppercase"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-silver uppercase tracking-widest ml-1">Highlights (Comma Separated)</label>
              <input 
                required
                type="text" 
                placeholder="REACT / NEXT.JS, NODE.JS, DOCKER"
                className="w-full px-5 py-4 bg-brand-light rounded-2xl text-xs font-bold text-brand-dark outline-none border-2 border-transparent focus:border-brand-teal transition-all uppercase"
                value={formData.highlights}
                onChange={(e) => setFormData({...formData, highlights: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-silver uppercase tracking-widest ml-1">Service Description</label>
              <textarea 
                required
                rows="3"
                placeholder="WHAT DOES THIS SERVICE PROVIDE?"
                className="w-full px-5 py-4 bg-brand-light rounded-2xl text-xs font-bold text-brand-dark outline-none border-2 border-transparent focus:border-brand-teal transition-all uppercase resize-none"
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
              />
            </div>

            <div className="pt-4">
              <button type="submit" className="btn-primary w-full py-5 text-xs">
                {service ? 'Update Service' : 'Add Service'} <ArrowUpRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
