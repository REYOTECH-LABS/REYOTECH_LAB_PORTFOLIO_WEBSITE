import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { useProjects } from '../hooks/useProjects'

const categories = ['All', 'Web', 'Mobile', 'Design', 'Branding']

const Portfolio = () => {
  const { data: projects = [], isLoading } = useProjects()
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <main className="min-h-screen bg-brand-light">
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-5 sm:px-10 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-brand-teal/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-block px-4 py-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 mb-6 sm:mb-8">
            <span className="text-brand-teal text-xs font-black uppercase tracking-[0.3em]">Our Work</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6 sm:mb-8">PORTFOLIO</h1>
          <p className="text-white/60 text-base sm:text-lg font-medium max-w-2xl leading-relaxed">A curated selection of projects that showcase our craft — from enterprise platforms to bold brand identities.</p>
        </div>
      </section>

      <section className="py-5 sm:py-8 px-5 sm:px-10 bg-white border-b border-brand-dark/5 sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`whitespace-nowrap px-4 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 flex-shrink-0 ${active === cat ? 'bg-brand-dark text-white' : 'bg-brand-light text-brand-silver hover:bg-brand-dark/5 hover:text-brand-dark'}`}>{cat}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 px-5 sm:px-10">
        {isLoading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-teal border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((proj, i) => (
              <div key={proj._id || i} className="group relative rounded-[24px] sm:rounded-[30px] overflow-hidden border border-brand-dark/5 bg-white hover:shadow-2xl transition-all duration-500 cursor-pointer">
                <div className={`h-44 sm:h-52 bg-gradient-to-br ${proj.color || 'from-brand-teal/20 to-brand-dark/5'} relative flex items-end p-5 sm:p-6 overflow-hidden`}>
                  {proj.image && (
                    <img src={proj.image} alt={proj.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  )}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-brand-dark/80 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest">View Project <ExternalLink size={14} /></div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-white/90 text-brand-dark px-3 py-1.5 rounded-full relative z-10">{proj.category}</span>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-black text-brand-dark text-base sm:text-lg uppercase tracking-tight mb-2 group-hover:text-brand-teal transition-colors">{proj.title}</h3>
                  <p className="text-brand-silver text-xs sm:text-sm leading-relaxed mb-4">{proj.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {(proj.tags || []).map((tag, ti) => (
                      <span key={ti} className="text-[9px] sm:text-[10px] font-black text-brand-teal bg-brand-teal/10 px-2.5 py-1 rounded-full uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="py-16 sm:py-24 px-5 sm:px-10 bg-brand-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter mb-5">YOUR PROJECT COULD BE NEXT.</h2>
          <p className="text-white/50 font-medium mb-8 sm:mb-10 max-w-lg mx-auto text-sm">We'd love to add your success story to our portfolio.</p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">Start a Project <ArrowUpRight size={14} /></Link>
        </div>
      </section>
    </main>
  )
}

export default Portfolio
