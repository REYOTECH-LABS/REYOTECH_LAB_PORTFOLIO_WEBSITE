import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Clock, ChevronRight, Zap, Users, Heart, TrendingUp } from 'lucide-react';

const perks = [
    { icon: Zap, title: 'Fast Growth', desc: 'Work on cutting-edge projects and level up your skills rapidly.' },
    { icon: Users, title: 'Great Team', desc: 'Collaborate with talented, driven, and supportive professionals.' },
    { icon: Heart, title: 'Work-Life Balance', desc: 'Flexible hours and a culture that respects your time.' },
    { icon: TrendingUp, title: 'Competitive Pay', desc: 'We reward top talent with market-leading compensation.' },
];

const roles = [
    { title: 'Senior Frontend Engineer', dept: 'Engineering', type: 'Full-time', location: 'Accra / Remote', level: 'Senior' },
    { title: 'UI/UX Designer', dept: 'Design', type: 'Full-time', location: 'Accra, Ghana', level: 'Mid-Level' },
    { title: 'Backend Engineer (Node.js)', dept: 'Engineering', type: 'Full-time', location: 'Remote', level: 'Mid-Level' },
    { title: 'Brand Strategist', dept: 'Design', type: 'Contract', location: 'Remote', level: 'Senior' },
    { title: 'Digital Marketing Lead', dept: 'Strategy', type: 'Full-time', location: 'Accra, Ghana', level: 'Mid-Level' },
    { title: 'Mobile Developer (React Native)', dept: 'Engineering', type: 'Full-time', location: 'Accra / Remote', level: 'Mid-Level' },
];

const deptColors = {
    Engineering: 'bg-blue-500/10 text-blue-600',
    Design: 'bg-purple-500/10 text-purple-600',
    Strategy: 'bg-brand-teal/10 text-brand-teal',
};

const Career = () => {
    return (
        <main className="min-h-screen bg-brand-light">
            {/* Hero */}
            <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-28 px-5 sm:px-10 bg-brand-dark overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-brand-teal/10 rounded-full blur-[150px]" />
                    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[120px]" />
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="inline-block px-4 py-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 mb-6 sm:mb-8">
                        <span className="text-brand-teal text-xs font-black uppercase tracking-[0.3em]">Join The Team</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6 sm:mb-8">
                        BUILD THE<br />
                        <span className="text-brand-teal">FUTURE</span> WITH US.
                    </h1>
                    <p className="text-white/60 text-base sm:text-lg font-medium max-w-2xl leading-relaxed">
                        We're looking for bold, creative, and driven individuals to join our growing team.
                    </p>
                </div>
            </section>

            {/* Perks */}
            <section className="py-16 sm:py-24 px-5 sm:px-10 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-16">
                        <div className="text-[10px] font-black text-brand-teal uppercase tracking-[0.3em] mb-4">Why Reyo</div>
                        <h2 className="text-3xl sm:text-5xl font-black text-brand-dark tracking-tighter">LIFE AT REYO TECH.</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                        {perks.map((perk, i) => (
                            <div key={i} className="group p-6 sm:p-8 rounded-[24px] sm:rounded-[30px] border border-brand-dark/5 hover:bg-brand-dark transition-all duration-500">
                                <div className="w-11 h-11 rounded-2xl bg-brand-teal/10 group-hover:bg-brand-teal/20 flex items-center justify-center mb-5 transition-colors">
                                    <perk.icon size={18} className="text-brand-teal" />
                                </div>
                                <h3 className="font-black text-brand-dark group-hover:text-white text-base uppercase tracking-tight mb-2 transition-colors">{perk.title}</h3>
                                <p className="text-brand-silver group-hover:text-white/60 text-sm leading-relaxed transition-colors">{perk.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Roles */}
            <section className="py-16 sm:py-24 px-5 sm:px-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-8 sm:mb-12">
                        <div>
                            <div className="text-[10px] font-black text-brand-teal uppercase tracking-[0.3em] mb-3">Open Positions</div>
                            <h2 className="text-3xl sm:text-5xl font-black text-brand-dark tracking-tighter">CURRENT ROLES.</h2>
                        </div>
                        <span className="text-brand-silver text-sm font-medium">{roles.length} positions open</span>
                    </div>
                    <div className="space-y-4">
                        {roles.map((role, i) => (
                            <div key={i} className="group p-5 sm:p-6 rounded-[20px] sm:rounded-[24px] bg-white border border-brand-dark/5 hover:border-brand-dark hover:shadow-lg transition-all duration-300 cursor-pointer">
                                <div className="flex justify-between items-start gap-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${deptColors[role.dept]}`}>{role.dept}</span>
                                            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-brand-silver bg-brand-light px-2.5 py-1 rounded-full">{role.level}</span>
                                        </div>
                                        <h3 className="font-black text-brand-dark text-base sm:text-lg uppercase tracking-tight group-hover:text-brand-teal transition-colors leading-tight">{role.title}</h3>
                                        <div className="flex flex-wrap items-center gap-3 mt-2 text-brand-silver">
                                            <div className="flex items-center gap-1.5 text-xs font-medium">
                                                <Clock size={11} /> {role.type}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs font-medium">
                                                <MapPin size={11} /> {role.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-9 h-9 rounded-full bg-brand-light group-hover:bg-brand-dark flex items-center justify-center transition-colors flex-shrink-0">
                                        <ChevronRight size={15} className="text-brand-dark group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 sm:py-24 px-5 sm:px-10 bg-brand-dark">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="text-[10px] font-black text-brand-teal uppercase tracking-[0.3em] mb-5">Don't see your role?</div>
                    <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter mb-5">WE WANT TO HEAR FROM YOU.</h2>
                    <p className="text-white/50 font-medium mb-8 sm:mb-10 max-w-lg mx-auto text-sm">Send us your CV and portfolio — we're always looking for exceptional talent.</p>
                    <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                        Send Open Application <ArrowUpRight size={14} />
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default Career;
