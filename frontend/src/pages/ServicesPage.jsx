import { Link } from 'react-router-dom'
import { Code, Palette, Zap, ArrowUpRight, CheckCircle } from 'lucide-react'
import { useServiceCategories } from '../hooks/useServices'

const iconMap = { Code, Palette, Zap }

const ServicesPage = () => {
  const { data: categories = [] } = useServiceCategories()

  return (
    <main className="min-h-screen bg-brand-light">
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-28 px-5 sm:px-10 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-brand-teal/8 rounded-full blur-[150px] -translate-x-1/2" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block px-4 py-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 mb-6 sm:mb-8">
            <span className="text-brand-teal text-xs font-black uppercase tracking-[0.3em]">What We Do</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6 sm:mb-8">
            OUR <span className="text-brand-teal">SERVICES</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">End-to-end digital solutions that span engineering, design, and strategy.</p>
        </div>
      </section>

      {categories.map((cat, ci) => {
        const Icon = iconMap[cat.icon] || Code
        return (
          <section key={cat._id} className={`py-16 sm:py-24 px-5 sm:px-10 ${ci % 2 === 1 ? 'bg-white' : 'bg-brand-light'}`}>
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-start">
                <div className={ci % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 flex items-center justify-center mb-5"><Icon size={22} className="text-brand-teal" /></div>
                  <div className="text-[10px] font-black text-brand-teal uppercase tracking-[0.3em] mb-2">{cat.label}</div>
                  <h2 className="text-2xl sm:text-4xl font-black text-brand-dark tracking-tighter mb-4 uppercase leading-tight">{cat.tagline}</h2>
                  <p className="text-brand-silver text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">{cat.desc}</p>
                  <Link to="/contact" className="btn-primary inline-flex items-center gap-2">Get a Quote <ArrowUpRight size={14} /></Link>
                </div>
                <div className={`space-y-4 ${ci % 2 === 1 ? 'md:order-1' : ''}`}>
                  {(cat.services || []).map((svc) => (
                    <div key={svc._id} className="group p-5 sm:p-6 rounded-[20px] sm:rounded-[24px] border border-brand-dark/5 bg-white hover:bg-brand-dark transition-all duration-500 cursor-default">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-black text-brand-dark group-hover:text-white text-sm sm:text-base uppercase tracking-tight transition-colors">{svc.name}</h3>
                        <ArrowUpRight size={15} className="text-brand-teal opacity-0 group-hover:opacity-100 transition-all mt-0.5 flex-shrink-0" />
                      </div>
                      <p className="text-brand-silver group-hover:text-white/60 text-xs sm:text-sm leading-relaxed mb-4 transition-colors">{svc.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {(svc.highlights || []).map((h, hi) => (
                          <span key={hi} className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-brand-teal bg-brand-teal/10 group-hover:bg-brand-teal/20 px-2 sm:px-3 py-1.5 rounded-full transition-colors">
                            <CheckCircle size={8} /> {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      })}

      <section className="py-16 sm:py-24 px-5 sm:px-10 bg-brand-dark">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[10px] font-black text-brand-teal uppercase tracking-[0.3em] mb-5">Start a Project</div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter mb-6 sm:mb-8">GOT A PROJECT IN MIND?</h2>
          <p className="text-white/50 font-medium mb-8 sm:mb-10 max-w-lg mx-auto text-sm">Tell us about your challenge and let's figure out the best solution together.</p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">Contact Us <ArrowUpRight size={14} /></Link>
        </div>
      </section>
    </main>
  )
}

export default ServicesPage
