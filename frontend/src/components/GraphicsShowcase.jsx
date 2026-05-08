import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';



gsap.registerPlugin(ScrollTrigger);
import { cn } from '../lib/utils';

const GraphicsShowcase = () => {
    const scrollRef = useRef(null);

    const projects = [
        { title: 'Brand Identity', category: 'Graphic Design', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800' },
        { title: 'UI Kit', category: 'Product Design', img: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800' },
        { title: 'Social Campaign', category: 'Marketing', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800' },
        { title: 'App Interface', category: 'Mobile', img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800' },
    ];

    // useEffect(() => {
    //     const ctx = gsap.context(() => {
    //         gsap.from('.project-card', {
    //             y: 100,
    //             opacity: 0,
    //             duration: 1,
    //             stagger: 0.2,
    //             scrollTrigger: {
    //                 trigger: scrollRef.current,
    //                 start: 'top 80%',
    //             }
    //         });
    //     }, scrollRef);

    //     return () => ctx.revert();
    // }, []);

    return (
        <section id="portfolio" ref={scrollRef} className="py-24 px-10 relative bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-brand-dark">
                    <div className="max-w-xl">
                        <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">PRODUCTION <br /><span className="text-brand-teal">GALLERY.</span></h2>
                        <p className="text-brand-silver font-medium leading-relaxed">
                            Meticulous craftsmanship in every visual asset. We define the high-end standard for Ghanaian graphics production.
                        </p>
                    </div>
                    <button className="text-brand-dark font-black flex items-center gap-2 group border-b-2 border-brand-teal pb-1 text-[10px] uppercase tracking-widest hover:text-brand-teal transition-all">
                        View All Work <div className="w-6 h-0.5 bg-brand-teal group-hover:w-10 transition-all" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projects.map((project, idx) => (
                        <div key={idx} className="project-card group relative overflow-hidden rounded-[40px] aspect-[4/3] bg-brand-light cursor-pointer border border-brand-dark/5 shadow-sm hover:shadow-2xl transition-all duration-500">
                            <img
                                src={project.img}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

                            <div className="absolute bottom-10 left-10 transition-transform duration-500 group-hover:translate-x-2">
                                <div className="text-brand-teal text-[10px] font-black uppercase tracking-[0.3em] mb-3">{project.category}</div>
                                <h3 className="text-3xl font-black uppercase leading-none text-brand-dark">{project.title}</h3>
                            </div>

                            <div className="absolute top-10 right-10 w-14 h-14 bg-white shadow-xl rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                <ArrowUpRight className="text-brand-teal" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GraphicsShowcase;
