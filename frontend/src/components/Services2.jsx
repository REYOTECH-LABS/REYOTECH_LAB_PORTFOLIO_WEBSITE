import React, { useEffect, useRef } from 'react';
import { Code2, Palette, Layers, Film, Cpu, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: 'Web Development',
        desc: 'Custom web applications built with modern frameworks and best practices.',
        icon: Code2,
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
        span: 'col-span-1',
    },
    {
        title: 'Graphic Design',
        desc: 'Creative visuals that strengthen your brand identity.',
        icon: Palette,
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80',
        span: 'col-span-1',
    },
    {
        title: 'UI/UX',
        desc: 'User-focused designs for seamless digital experiences.',
        icon: Layers,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80',
        span: 'col-span-1',
    },
    {
        title: 'Motion Graphics',
        desc: 'High-quality animations created with creativity and precision.',
        icon: Film,
        image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&auto=format&fit=crop&q=80',
        span: 'col-span-1 md:col-span-1',
    },
    {
        title: 'Custom Digital Solutions',
        desc: 'Tailored digital systems developed with innovation and efficiency.',
        icon: Cpu,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80',
        span: 'col-span-1 md:col-span-1',
    },
];

const ServiceCard = ({ service, index }) => {
    const Icon = service.icon;
    return (
        <div
            className={`service-card group relative overflow-hidden rounded-2xl cursor-pointer ${service.span}`}
            style={{ minHeight: '260px' }}
        >
            {/* Background Image */}
            <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300 group-hover:from-black/90" />

            {/* Teal accent overlay on hover */}
            <div className="absolute inset-0 bg-brand-teal/0 group-hover:bg-brand-teal/10 transition-all duration-500" />

            {/* Icon Badge */}
            <div className="absolute top-4 left-4 z-10">
                <div className="p-2.5 rounded-xl bg-brand-dark/70 backdrop-blur-sm border border-white/10 group-hover:bg-brand-teal/90 transition-colors duration-300">
                    <Icon size={18} className="text-brand-teal group-hover:text-brand-dark transition-colors duration-300" />
                </div>
            </div>

            {/* Arrow */}
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <div className="p-2 rounded-full bg-brand-teal text-brand-dark">
                    <ArrowUpRight size={14} />
                </div>
            </div>

            {/* Content at bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
                <h3 className="text-white font-black text-xl mb-1.5 uppercase tracking-tight leading-tight">
                    {service.title}
                </h3>
                <p className="text-white/70 text-sm leading-snug font-medium max-w-xs group-hover:text-white/90 transition-colors duration-300">
                    {service.desc}
                </p>
            </div>
        </div>
    );
};

const Services2 = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.services2-heading', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });

            gsap.from('.service-card', {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.services2-grid',
                    start: 'top 80%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const topRow = services.slice(0, 3);
    const bottomRow = services.slice(3, 5);

    return (
        <section
            id="services2"
            ref={sectionRef}
            className="py-24 px-6 md:px-10 bg-white relative overflow-hidden"
        >
            {/* Subtle background pattern */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#0D1117 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="services2-heading text-center mb-14">
                    <div className="inline-flex items-center gap-2 mb-5">
                        <div className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-silver">
                            What We Do
                        </span>
                        <div className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-pulse" />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-brand-dark uppercase tracking-tighter mb-4">
                        Our{' '}
                        <span className="text-brand-teal">Services</span>
                    </h2>
                    <p className="text-brand-silver text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
                        Comprehensive digital solutions tailored to your unique needs
                    </p>
                </div>

                {/* Top row — 3 equal cards */}
                <div className="services2-grid grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {topRow.map((service, idx) => (
                        <ServiceCard key={idx} service={service} index={idx} />
                    ))}
                </div>

                {/* Bottom row — 2 wider cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bottomRow.map((service, idx) => (
                        <ServiceCard key={idx + 3} service={service} index={idx + 3} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services2;
