import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Globe } from 'lucide-react';

const Impact = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.impact-content > *', {
                x: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            });

            gsap.from('.impact-visual', {
                scale: 0.9,
                opacity: 0,
                duration: 1.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="impact" ref={sectionRef} className="py-24 px-10 overflow-hidden bg-brand-light">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="impact-content text-brand-dark">
                    <div className="text-brand-teal font-black uppercase tracking-widest text-[10px] mb-6">A Ghanaian Tech Powerhouse</div>
                    <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] uppercase tracking-tighter">
                        LOCAL IMPACT. <br />
                        <span className="text-brand-teal text-[0.8em]">GLOBAL SCALE.</span>
                    </h2>
                    <p className="text-brand-silver text-lg mb-12 leading-relaxed max-w-lg font-medium">
                        Reyo Tech Lab bridges the gap between local innovation and international excellence. We build digital products that pride themselves on Ghanaian ingenuity and world-class quality.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {[
                            { label: 'INNOVATION', value: 'Cutting-edge tech stacks for local solutions.' },
                            { label: 'COMMUNITY', value: 'Empowering Ghana\'s digital future.' },
                            { label: 'PREMIUM', value: 'Meticulous attention to every pixel.' },
                            { label: 'AGILE', value: 'Fast delivery without compromising quality.' }
                        ].map((item, idx) => (
                            <div key={idx} className="group cursor-default border-l-2 border-brand-teal/20 pl-6 hover:border-brand-teal transition-colors">
                                <div className="text-[10px] font-black text-brand-teal tracking-[0.3em] mb-2 group-hover:translate-x-2 transition-transform">{item.label}</div>
                                <div className="text-brand-silver text-sm leading-snug font-bold group-hover:text-brand-dark transition-colors">{item.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="impact-visual relative">
                    <div className="aspect-square bg-white rounded-[80px] border border-brand-dark/5 shadow-2xl relative overflow-hidden group">
                        <iframe
                            title="Accra, Ghana"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254508.38926854076!2d-0.30433766419!3d5.598038699999988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(20%) contrast(1.05)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 w-full h-full"
                        />
                        {/* Overlay label */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg border border-brand-dark/5 z-10 pointer-events-none">
                            <span className="text-[10px] font-black text-brand-dark uppercase tracking-[0.3em]">GH<span className="text-brand-teal">ACCRA</span></span>
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-[40px] border border-brand-dark/5 shadow-xl -z-10 rotate-12" />
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-teal/5 rounded-full blur-3xl -z-10" />
                </div>
            </div>
        </section>
    );
};

export default Impact;
