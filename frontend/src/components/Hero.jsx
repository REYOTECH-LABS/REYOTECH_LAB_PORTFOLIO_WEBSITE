import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Play, CheckCircle2, Globe, Code, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import image from '../assets/hero.jpg';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Anime = () => {
    return (
        <DotLottieReact
            src="https://lottie.host/18b42eec-7b46-490f-a555-47d1cc54cbb2/ALU7KL1YJQ.lottie"
            loop
            autoplay
        />
    );
};
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6 })
                .from('.hero-title span', {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1,
                    skewY: 7,
                    ease: 'power4.out'
                }, '-=0.3')
                .from('.hero-desc', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
                .from('.hero-btns', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6');

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-5 sm:px-10 overflow-hidden">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src={image}
                    alt="Team working on laptops"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70" />
            </div>

            <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center text-center mt-10 sm:mt-0">
                <div className="hero-badge flex items-center justify-center gap-2 mb-6 sm:mb-8">
                    <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Top Software Development Agency</span>
                    </div>
                </div>

                <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter text-white mb-6 uppercase">
                    <span className="block overflow-hidden">WE BUILD <span className="text-brand-teal">BETTER</span></span>
                    <span className="block overflow-hidden">DIGITAL PRODUCTS.</span>
                </h1>

                <p className="hero-desc text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                    Leading Software Development House and Graphics Production company based in Ghana, delivering high-impact digital solutions for global brands.
                </p>

                <div className="hero-btns flex flex-wrap justify-center gap-4">
                    <Link to="/contact" className="btn-primary group">
                        Start Your Project <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                    <Link to="/process" className="px-6 py-3.5 rounded-full border border-white/30 text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-brand-dark transition-all flex items-center gap-2 group">
                        Our Methodology <Play size={14} fill="currentColor" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
