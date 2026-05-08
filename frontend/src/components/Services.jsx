import React, { useEffect, useRef } from 'react';
import { Code, Palette, Smartphone, Globe, BarChart, Layers, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: 'Enterprise Web Apps',
        desc: 'Scalable, high-performance web applications built for the modern era.',
        icon: Globe,
        color: 'bg-brand-light text-brand-teal',
        size: 'lg',
    },
    {
        title: 'Graphic Design',
        desc: 'Premium visual branding and production.',
        icon: Palette,
        color: 'bg-brand-light text-brand-dark',
        size: 'md',
    },
    {
        title: 'Mobile Apps',
        desc: 'iOS & Android excellence.',
        icon: Smartphone,
        color: 'bg-brand-light text-brand-teal',
        size: 'md',
    },
    {
        title: 'UI/UX Design',
        desc: 'User-centric digital experiences.',
        icon: Layers,
        color: 'bg-brand-light text-brand-silver',
        size: 'sm',
    },
    {
        title: 'Marketing',
        desc: 'Digital growth strategies.',
        icon: BarChart,
        color: 'bg-brand-light text-brand-dark',
        size: 'sm',
    },
    {
        title: 'Cloud Solutions',
        desc: 'Secure and reliable infrastructure.',
        icon: Code,
        color: 'bg-brand-dark text-white',
        size: 'md',
    },
];

const Services = () => {
    const sectionRef = useRef(null);

    // useEffect(() => {
    //     const ctx = gsap.context(() => {
    //         gsap.from('.bento-item', {
    //             y: 50,
    //             opacity: 0,
    //             duration: 1,
    //             stagger: 0.1,
    //             ease: 'power3.out',
    //             scrollTrigger: {
    //                 trigger: sectionRef.current,
    //                 start: 'top 80%',
    //             }
    //         });
    //     }, sectionRef);

    //     return () => ctx.revert();
    // }, []);

    return (
        <section id="services" ref={sectionRef} className="py-24 px-10 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <div className="text-brand-teal font-bold uppercase tracking-widest text-[10px] mb-4">Our Expertise</div>
                    <h2 className="text-5xl md:text-7xl font-black mb-6 text-brand-dark uppercase tracking-tighter">SERVICES <br /><span className="text-brand-teal">OFFERED.</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "bento-item bento-card flex flex-col justify-between group cursor-pointer overflow-hidden backdrop-blur-sm",
                                service.size === 'lg' ? 'md:col-span-2 md:row-span-2' :
                                    service.size === 'md' ? 'md:col-span-2' : 'md:col-span-1',
                                idx === 5 ? 'bg-brand-dark text-white border-brand-dark' : 'bg-brand-light'
                            )}
                        >
                            <div className="flex justify-between items-start">
                                <div className={cn("p-4 rounded-2xl", idx === 5 ? 'bg-white/10' : 'bg-white shadow-sm border border-brand-dark/5')}>
                                    <service.icon size={24} className={idx === 5 ? 'text-brand-teal' : 'text-brand-dark'} />
                                </div>
                                <ArrowUpRight className={cn(
                                    "opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300",
                                    idx === 5 ? 'text-brand-teal' : 'text-brand-dark'
                                )} />
                            </div>

                            <div>
                                <h3 className={cn("text-xl font-black mb-2 uppercase tracking-tight", idx === 5 ? 'text-white' : 'text-brand-dark')}>
                                    {service.title}
                                </h3>
                                <p className={cn("text-sm transition-colors font-medium", idx === 5 ? 'text-white/60' : 'text-brand-silver group-hover:text-brand-dark')}>
                                    {service.desc}
                                </p>
                            </div>

                            {/* Decorative Background Element */}
                            <div className={cn(
                                "absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700",
                                idx === 5 ? 'bg-brand-teal/10' : 'bg-brand-teal/5'
                            )} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
