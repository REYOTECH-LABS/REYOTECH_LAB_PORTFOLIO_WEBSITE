import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const processSteps = [
    { step: '01', event: 'Discovery & Strategy', desc: 'We dive deep into your business goals, target audience, and market landscape to define a clear product roadmap.' },
    { step: '02', event: 'UI/UX Design', desc: 'Our design team crafts intuitive, pixel-perfect interfaces focused on human-centered experiences and brand alignment.' },
    { step: '03', event: 'Architecture & Planning', desc: 'We engineer a scalable, secure technical blueprint tailored to support your product’s long-term growth.' },
    { step: '04', event: 'Agile Development', desc: 'Our developers bring the designs to life using modern tech stacks, maintaining transparent sprint cycles.' },
    { step: '05', event: 'Quality Assurance', desc: 'Rigorous automated and manual testing ensures the product is bug-free, performant, and secure before launch.' },
    { step: '06', event: 'Deployment & Support', desc: 'We smoothly deploy your product to live environments and provide ongoing maintenance and feature scaling.' },
];

const Process = () => {
    return (
        <main className="min-h-screen bg-brand-light">
            {/* Hero Banner */}
            <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-28 px-5 sm:px-10 bg-brand-dark overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-brand-teal/5 rounded-full blur-[140px]" />
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="inline-block px-4 py-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 mb-6 sm:mb-8">
                        <span className="text-brand-teal text-xs font-black uppercase tracking-[0.3em]">Our Methodology</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6 sm:mb-8">
                        HOW WE<br />
                        <span className="text-brand-teal">BUILD</span> SUCCESS.
                    </h1>
                    <p className="text-white/60 text-base sm:text-lg font-medium max-w-2xl leading-relaxed">
                        A transparent, step-by-step production process designed to mitigate risk, ensure quality, and deliver high-impact digital products on time.
                    </p>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-16 sm:py-24 px-5 sm:px-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-16">
                        <div className="text-[10px] font-black text-brand-teal uppercase tracking-[0.3em] mb-4">Production Process</div>
                        <h2 className="text-3xl sm:text-5xl font-black text-brand-dark tracking-tighter">OUR METHODOLOGY.</h2>
                    </div>
                    {/* Mobile: simple stacked list */}
                    <div className="md:hidden space-y-4">
                        {processSteps.map((m, i) => (
                            <div key={i} className="flex gap-4 p-5 rounded-[20px] border border-brand-dark/5 bg-white">
                                <div className="w-10 h-10 rounded-full bg-brand-dark border-2 border-brand-teal flex items-center justify-center flex-shrink-0">
                                    <div className="w-2 h-2 rounded-full bg-brand-teal" />
                                </div>
                                <div>
                                    <div className="text-brand-teal text-[10px] font-black uppercase tracking-widest mb-1">Phase {m.step}</div>
                                    <h4 className="text-brand-dark font-black text-sm mb-1 uppercase tracking-tight">{m.event}</h4>
                                    <p className="text-brand-dark/70 text-xs leading-relaxed">{m.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Desktop: alternating timeline */}
                    <div className="hidden md:block relative">
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-brand-dark/10" />
                        <div className="space-y-12">
                            {processSteps.map((m, i) => (
                                <div key={i} className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                    <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                        <div className="inline-block p-6 rounded-[24px] border border-brand-dark/5 bg-white hover:shadow-lg transition-shadow">
                                            <div className="text-brand-teal text-xs font-black uppercase tracking-widest mb-2">Phase {m.step}</div>
                                            <h4 className="text-brand-dark font-black text-lg mb-2 uppercase tracking-tight">{m.event}</h4>
                                            <p className="text-brand-dark/70 text-sm leading-relaxed">{m.desc}</p>
                                        </div>
                                    </div>
                                    <div className="relative z-10 w-10 h-10 rounded-full bg-brand-dark border-4 border-brand-teal flex-shrink-0 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-brand-teal" />
                                    </div>
                                    <div className="flex-1" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 sm:py-24 px-5 sm:px-10 bg-brand-dark">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="text-[10px] font-black text-brand-teal uppercase tracking-[0.3em] mb-5">Ready to Start?</div>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 sm:mb-8">LET'S BUILD SOMETHING GREAT.</h2>
                    <p className="text-white/50 font-medium mb-8 sm:mb-10 max-w-lg mx-auto text-sm sm:text-base">Whether you have a project in mind or just want to explore possibilities, we're here to help.</p>
                    <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-sm">
                        Get In Touch <ArrowUpRight size={16} />
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default Process;
