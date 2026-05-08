import React from 'react';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';

const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
];

const serviceLinks = [
    'Web Development',
    'Mobile Apps Development',
    'Cloud Solutions',
    'UI/UX Design',
];

const socials = [
    {
        label: 'reyotechlabs',
        href: 'https://www.tiktok.com/@reyotech.labs?_r=1&_t=ZS-94r1F68GJU4',
        icon: (
            // TikTok
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.76a4.85 4.85 0 0 1-1.03-.07z" />
            </svg>
        ),
        bg: 'bg-black',
    },
    {
        label: 'reyotechlabs',
        href: 'https://www.instagram.com/reyotechlabs?igsh=MXg0dDZqdnZsamNncQ==',
        icon: (
            // Instagram
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
        bg: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400',
    },
    {
        label: 'reyotechlabs',
        href: 'https://www.facebook.com/share/14XF49UYCKc/?mibextid=wwXIfr',
        icon: (
            // Facebook
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
        bg: 'bg-blue-600',
    },
];

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#0D1117' }} className="text-white">
            {/* Top divider line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-teal/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

                    {/* Col 1 – Brand */}
                    <div className="flex flex-col gap-5">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-teal rounded-xl flex items-center justify-center font-black text-brand-dark text-sm shadow-lg shadow-brand-teal/30">
                                R
                            </div>
                            <div>
                                <span className="font-black uppercase tracking-tighter text-white text-base leading-none block">
                                    REYO<span className="text-brand-teal">TECH</span>
                                </span>
                                <span className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">
                                    LABS
                                </span>
                            </div>
                        </div>

                        <p className="text-white/50 text-sm leading-relaxed font-medium max-w-xs">
                            REYOTECH LABS delivers cutting-edge software solutions that drive
                            innovation and accelerate your business growth. From concept to
                            development, we bring your vision to life.
                        </p>
                    </div>

                    {/* Col 2 – Quick Links */}
                    <div>
                        <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">
                            Quick Links
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-white/50 text-sm font-medium hover:text-brand-teal transition-colors duration-200 flex items-center gap-1.5 group"
                                    >
                                        <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-brand-teal">›</span>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3 – Services */}
                    <div>
                        <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">
                            Services
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {serviceLinks.map((s) => (
                                <li key={s}>
                                    <a
                                        href="/services"
                                        className="text-white/50 text-sm font-medium hover:text-brand-teal transition-colors duration-200 flex items-center gap-1.5 group"
                                    >
                                        <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-brand-teal">›</span>
                                        {s}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4 – Contact & Social */}
                    <div>
                        <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">
                            Contact
                        </h4>
                        <div className="flex flex-col gap-4">
                            {/* Email */}
                            <a
                                href="mailto:reyotechlabs@gmail.com"
                                className="flex items-center gap-3 group"
                            >
                                <div className="w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0 shadow-md">
                                    <Mail size={16} className="text-white" />
                                </div>
                                <span className="text-white/60 text-sm font-medium group-hover:text-brand-teal transition-colors duration-200">
                                    reyotechlabs@gmail.com
                                </span>
                            </a>

                            {/* Phone */}
                            <a
                                href="tel:+233599557817"
                                className="flex items-center gap-3 group"
                            >
                                <div className="w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0 shadow-md">
                                    <Phone size={16} className="text-white" />
                                </div>
                                <span className="text-white/60 text-sm font-medium group-hover:text-brand-teal transition-colors duration-200">
                                    059 955 7817
                                </span>
                            </a>

                            {/* Social row */}
                            <div className="flex items-center gap-3 mt-1">
                                {socials.map((s, i) => (
                                    <a
                                        key={i}
                                        href={s.href}
                                        target="_blank" rel="noopener noreferrer"
                                        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md hover:scale-110 transition-transform duration-200 ${s.bg}`}
                                        title={s.label}
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                                <span className="text-white/40 text-sm font-medium">reyotechlabs</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="text-white/30 text-xs font-medium">
                        © {new Date().getFullYear()} Reyo Tech Lab. All rights reserved. · Accra, Ghana.
                    </span>
                    <a
                        href="/"
                        className="group flex items-center gap-1.5 text-white/30 text-xs font-black uppercase tracking-widest hover:text-brand-teal transition-colors duration-200"
                    >
                        Back to top
                        <ArrowUpRight size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
