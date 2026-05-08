import React, { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: 'Real Estate Platform',
        desc: 'Modern property listing and management platform with virtual tours, smart search, and seamless agent-buyer communication.',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=80',
        tags: ['React', 'Node.js', 'PostgreSQL'],
        category: 'Web App',
        href: '#',
    },
    {
        title: 'Healthcare Management System',
        desc: 'Comprehensive healthcare solution enabling patient management, appointment scheduling, and real-time diagnostics.',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80',
        tags: ['React', 'Node.js', 'PostgreSQL'],
        category: 'Enterprise',
        href: '#',
    },
    {
        title: 'E-Commerce Mobile App',
        desc: 'Feature-rich shopping experience with real-time inventory, secure payments, and personalised product recommendations.',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80',
        tags: ['React Native', 'Firebase', 'Stripe'],
        category: 'Mobile',
        href: '#',
    },
];

const ProjectCard = ({ project, index }) => (
    <div
        className="project-card group relative flex flex-col bg-white border border-brand-dark/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-teal/10 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
    >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: '220px' }}>
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay  */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

            {/* Category chip */}
            <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-dark text-[10px] font-black uppercase tracking-widest rounded-full">
                    {project.category}
                </span>
            </div>

            {/* View link */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="w-9 h-9 rounded-full bg-brand-teal flex items-center justify-center shadow-lg">
                    <ArrowUpRight size={16} className="text-brand-dark" />
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
            <h3 className="text-brand-dark font-black text-xl uppercase tracking-tight mb-2 leading-tight group-hover:text-brand-teal transition-colors duration-300">
                {project.title}
            </h3>
            <p className="text-brand-silver text-sm leading-relaxed font-medium flex-1 mb-5">
                {project.desc}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                    <span
                        key={i}
                        className="px-3 py-1 bg-brand-teal/10 text-brand-teal text-[11px] font-black uppercase tracking-wider rounded-full border border-brand-teal/20"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

const Featured = () => {
    const sectionRef = useRef(null);

    // useEffect(() => {
    //     const ctx = gsap.context(() => {
    //         gsap.from('.featured-heading', {
    //             y: 40,
    //             opacity: 0,
    //             duration: 0.8,
    //             ease: 'power3.out',
    //             scrollTrigger: {
    //                 trigger: sectionRef.current,
    //                 start: 'top 80%',
    //             },
    //         });

    //         gsap.from('.project-card', {
    //             y: 60,
    //             opacity: 0,
    //             duration: 0.8,
    //             stagger: 0.15,
    //             ease: 'power3.out',
    //             scrollTrigger: {
    //                 trigger: '.projects-grid',
    //                 start: 'top 80%',
    //             },
    //         });

    //         gsap.from('.featured-cta', {
    //             y: 20,
    //             opacity: 0,
    //             duration: 0.6,
    //             ease: 'power3.out',
    //             scrollTrigger: {
    //                 trigger: '.featured-cta',
    //                 start: 'top 90%',
    //             },
    //         });
    //     }, sectionRef);

    //     return () => ctx.revert();
    // }, []);

    return (
        <section
            id="featured"
            ref={sectionRef}
            className="py-24 px-6 md:px-10 bg-brand-light relative overflow-hidden"
        >
            {/* Subtle dot grid */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#0D1117 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="featured-heading text-center mb-14">
                    <div className="inline-flex items-center gap-2 mb-5">
                        <div className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-silver">
                            Our Work
                        </span>
                        <div className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-pulse" />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-brand-dark uppercase tracking-tighter mb-4">
                        Featured{' '}
                        <span className="text-brand-teal">Projects</span>
                    </h2>
                    <p className="text-brand-silver text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
                        Comprehensive digital solutions tailored to your unique needs
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="projects-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {projects.map((project, idx) => (
                        <ProjectCard key={idx} project={project} index={idx} />
                    ))}
                </div>

                {/* CTA */}
                <div className="featured-cta flex justify-center">
                    <a
                        href="/portfolio"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-dark text-white font-black uppercase tracking-widest text-[11px] rounded-full hover:bg-brand-teal hover:text-brand-dark transition-all duration-300 shadow-lg hover:shadow-brand-teal/30"
                    >
                        View All Projects
                        <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform duration-300"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Featured;
