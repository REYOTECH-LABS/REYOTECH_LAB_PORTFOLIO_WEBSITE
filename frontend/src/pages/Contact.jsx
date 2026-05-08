import { useState } from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { submitContact } from '../service/public';

const contactInfo = [
    { icon: MapPin, label: 'Address', value: 'Accra, Ghana, West Africa' },
    { icon: Mail, label: 'Email', value: 'reyotechlabs@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+233 XX XXX XXXX' },
    { icon: Clock, label: 'Working Hours', value: 'Mon – Fri, 9am – 6pm GMT' },
];

const subjects = ['General Enquiry', 'Project Request', 'Partnership', 'Career', 'Other'];

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: 'General Enquiry', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleSubmit = async (e) => {
      e.preventDefault();
      setSending(true);
      setError('');
      try {
        await submitContact(form);
        setSubmitted(true);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to send message. Please try again.');
      } finally {
        setSending(false);
      }
    };

    return (
        <main className="min-h-screen bg-brand-light">
            {/* Hero */}
            <section className="relative pt-32 sm:pt-40 pb-12 sm:pb-20 px-5 sm:px-10 bg-brand-dark overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-brand-teal/10 rounded-full blur-[120px]" />
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="inline-block px-4 py-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 mb-6 sm:mb-8">
                        <span className="text-brand-teal text-xs font-black uppercase tracking-[0.3em]">Get In Touch</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-5">
                        LET'S TALK.
                    </h1>
                    <p className="text-white/60 text-base sm:text-lg font-medium max-w-xl leading-relaxed">
                        Ready to start a project or just want to say hello? We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 sm:py-24 px-5 sm:px-10">
                <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8 sm:gap-16">

                    {/* Left: Info */}
                    <div className="md:col-span-2 space-y-6 sm:space-y-8">
                        <div>
                            <div className="text-[10px] font-black text-brand-teal uppercase tracking-[0.3em] mb-3">Contact Details</div>
                            <h2 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tighter mb-6 sm:mb-8">REACH OUT ANYTIME.</h2>
                        </div>

                        <div className="space-y-3 sm:space-y-5">
                            {contactInfo.map((info, i) => (
                                <div key={i} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-[16px] sm:rounded-[20px] bg-white border border-brand-dark/5 hover:border-brand-dark/10 hover:shadow-md transition-all">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
                                        <info.icon size={14} className="text-brand-teal" />
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-black text-brand-silver uppercase tracking-widest mb-1">{info.label}</div>
                                        <div className="font-bold text-brand-dark text-xs sm:text-sm">{info.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="p-5 sm:p-6 rounded-[20px] sm:rounded-[24px] bg-brand-dark">
                            <div className="text-[10px] font-black text-brand-teal uppercase tracking-[0.3em] mb-4">Follow Us</div>
                            <div className="space-y-3">
                                {[
                                    { name: 'Instagram', handle: '@reyotechlabs', href: 'https://www.instagram.com/reyotechlabs?igsh=MXg0dDZqdnZsamNncQ==' },
                                    { name: 'TikTok', handle: '@reyotech.labs', href: 'https://www.tiktok.com/@reyotech.labs?_r=1&_t=ZS-94r1F68GJU4' },
                                    { name: 'Facebook', handle: 'Reyo Tech Lab', href: 'https://www.facebook.com/share/14XF49UYCKc/?mibextid=wwXIfr' },
                                    { name: 'Twitter / X', handle: '@reyotechlab', href: '#' },
                                    { name: 'LinkedIn', handle: 'Reyo Tech Lab', href: '#' },
                                ].map((s, i) => (
                                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="flex justify-between items-center group cursor-pointer block">
                                        <span className="text-white/50 text-xs font-medium">{s.name}</span>
                                        <span className="text-white text-xs font-black group-hover:text-brand-teal transition-colors">{s.handle} →</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="md:col-span-3">
                        <div className="bg-white rounded-[28px] sm:rounded-[40px] p-6 sm:p-10 border border-brand-dark/5 shadow-sm">
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-teal/10 flex items-center justify-center mb-5">
                                        <Send size={28} className="text-brand-teal" />
                                    </div>
                                    <h3 className="text-3xl font-black text-brand-dark tracking-tighter mb-3">MESSAGE SENT!</h3>
                                    <p className="text-brand-silver text-sm max-w-xs leading-relaxed">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="text-[10px] font-black text-brand-teal uppercase tracking-[0.3em] mb-2">Send a Message</div>
                                    <h3 className="text-xl sm:text-2xl font-black text-brand-dark tracking-tighter mb-6 sm:mb-8">WE'LL RESPOND WITHIN 24HRS.</h3>
                                    {error && (
                                      <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-2xl text-[10px] font-bold text-red-500 uppercase tracking-wider">{error}</div>
                                    )}
                                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[9px] font-black text-brand-silver uppercase tracking-widest mb-2">Your Name</label>
                                                <input
                                                    name="name" value={form.name} onChange={handleChange} required
                                                    placeholder="yourname"
                                                    className="w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-brand-light border border-brand-dark/5 text-brand-dark text-sm font-medium placeholder:text-brand-silver/50 focus:outline-none focus:border-brand-teal transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[9px] font-black text-brand-silver uppercase tracking-widest mb-2">Email Address</label>
                                                <input
                                                    name="email" type="email" value={form.email} onChange={handleChange} required
                                                    placeholder="you@company.com"
                                                    className="w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-brand-light border border-brand-dark/5 text-brand-dark text-sm font-medium placeholder:text-brand-silver/50 focus:outline-none focus:border-brand-teal transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-black text-brand-silver uppercase tracking-widest mb-2">Subject</label>
                                            <select
                                                name="subject" value={form.subject} onChange={handleChange}
                                                className="w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-brand-light border border-brand-dark/5 text-brand-dark text-sm font-medium focus:outline-none focus:border-brand-teal transition-colors appearance-none"
                                            >
                                                {subjects.map(s => <option key={s}>{s}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-black text-brand-silver uppercase tracking-widest mb-2">Message</label>
                                            <textarea
                                                name="message" value={form.message} onChange={handleChange} required rows={5}
                                                placeholder="Tell us about your project or enquiry..."
                                                className="w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-brand-light border border-brand-dark/5 text-brand-dark text-sm font-medium placeholder:text-brand-silver/50 focus:outline-none focus:border-brand-teal transition-colors resize-none"
                                            />
                                        </div>
                                        <button type="submit" disabled={sending} className="btn-primary w-full justify-center gap-2 py-3.5 sm:py-4 text-sm flex items-center disabled:opacity-50">
                                          {sending ? <><Loader2 size={15} className="animate-spin" /> Sending...</> : <>Send Message <ArrowUpRight size={15} /></>}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Contact;
