import { Link } from 'react-router-dom';
import { ArrowUpRight, Target, Zap, Users, Globe, Award, TrendingUp } from 'lucide-react';

const stats = [
    { value: '50+', label: 'Projects Delivered', icon: TrendingUp },
    { value: '30+', label: 'Happy Clients', icon: Users },
    { value: '5+', label: 'Years Experience', icon: Award },
    { value: '10+', label: 'Countries Reached', icon: Globe },
];

const values = [
    { icon: Target, title: 'Precision-Driven', desc: 'We obsess over every detail from pixel-perfect design to robust architecture. Quality is non-negotiable.' },
    { icon: Zap, title: 'Innovation First', desc: 'We embrace cutting-edge technologies and bold ideas to craft solutions that are ahead of the curve.' },
    { icon: Users, title: 'People-Centered', desc: 'Our work begins and ends with people. We build for users, partner with clients, and grow with our community.' },
    { icon: Globe, title: 'Global Impact', desc: 'Based in Accra, building for the world. We create technology that transcends borders and drives real change.' },
];

const About = () => {
    return (
        <main className="min-h-screen bg-brand-light">
            {/* Hero Banner */}
            <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-28 px-5 sm:px-10 bg-brand-dark overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-brand-teal/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-teal/5 rounded-full blur-[100px]" />
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="inline-block px-4 py-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 mb-6 sm:mb-8">
                        <span className="text-brand-teal text-xs font-black uppercase tracking-[0.3em]">Who We Are</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6 sm:mb-8">
                        SHAPING AFRICA'S<br />
                        <span className="text-brand-teal">DIGITAL</span> FUTURE.
                    </h1>
                    <p className="text-white/60 text-base sm:text-lg font-medium max-w-2xl leading-relaxed">
                        Reyo Tech Lab is a premium technology studio based in Accra, Ghana — crafting world-class digital products, brands, and experiences that drive growth and inspire change.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 sm:py-16 px-5 sm:px-10 bg-white border-b border-brand-dark/5">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center group">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-teal/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-brand-teal transition-colors duration-300">
                                <stat.icon size={20} className="text-brand-teal group-hover:text-brand-dark transition-colors duration-300" />
                            </div>
                            <div className="text-3xl sm:text-4xl font-black text-brand-dark mb-1">{stat.value}</div>
                            <div className="text-[10px] font-bold text-brand-silver uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission */}
            <section className="py-16 sm:py-24 px-5 sm:px-10">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
                    <div>
                        <div className="text-[10px] font-black text-brand-teal uppercase tracking-[0.3em] mb-5">Our Mission</div>
                        <h2 className="text-3xl sm:text-5xl font-black text-brand-dark tracking-tighter leading-tight mb-6 sm:mb-8">
                            BUILDING THE<br />ECOSYSTEM.
                        </h2>
                        <p className="text-brand-silver text-sm sm:text-base leading-relaxed mb-5">
                            We identify and partner with the brightest minds to deliver exceptional digital products. Our approach builds a flourishing tech ecosystem and creates sustainable growth across Africa and beyond.
                        </p>
                        <p className="text-brand-silver text-sm sm:text-base leading-relaxed mb-8 sm:mb-10">
                            As a social-impact tech studio, every project we complete reinvests value into our community — through training, mentorship, and open collaboration.
                        </p>
                        <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                            Work With Us <ArrowUpRight size={14} />
                        </Link>
                    </div>
                    <div className="relative">
                        <div className="bg-brand-dark rounded-[30px] sm:rounded-[40px] p-7 sm:p-10 relative overflow-hidden">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-teal/20 rounded-full blur-3xl" />
                            <div className="relative z-10">
                                <div className="text-brand-teal text-[10px] font-black uppercase tracking-[0.3em] mb-5">Our Approach</div>
                                {[
                                    'Identify top talent & partner with visionary clients',
                                    'Apply best-in-class engineering & design practices',
                                    'Deliver products that create measurable impact',
                                    'Reinvest surplus into community & training',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 mb-5 last:mb-0">
                                        <div className="w-6 h-6 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-brand-dark text-xs font-black">{i + 1}</span>
                                        </div>
                                        <p className="text-white/80 text-sm font-medium leading-relaxed">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 sm:py-24 px-5 sm:px-10 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-16">
                        <div className="text-[10px] font-black text-brand-teal uppercase tracking-[0.3em] mb-4">Our Values</div>
                        <h2 className="text-3xl sm:text-5xl font-black text-brand-dark tracking-tighter">WHAT DRIVES US.</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                        {values.map((val, i) => (
                            <div key={i} className="group p-6 sm:p-8 rounded-[24px] sm:rounded-[30px] border border-brand-dark/5 hover:bg-brand-dark hover:border-brand-dark transition-all duration-500 cursor-default">
                                <div className="w-11 h-11 rounded-2xl bg-brand-teal/10 group-hover:bg-brand-teal/20 flex items-center justify-center mb-5 transition-colors">
                                    <val.icon size={18} className="text-brand-teal" />
                                </div>
                                <h3 className="text-base font-black text-brand-dark group-hover:text-white mb-2 uppercase tracking-tight transition-colors">{val.title}</h3>
                                <p className="text-brand-silver group-hover:text-white/60 text-sm leading-relaxed transition-colors">{val.desc}</p>
                            </div>
                        ))}
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

export default About;
