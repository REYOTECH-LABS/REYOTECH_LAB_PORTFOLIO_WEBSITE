import React, { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import {
  ChevronDown,
  ArrowUpRight,
  Palette,
  Code,
  Zap,
  Menu,
  X
} from 'lucide-react'
import { cn } from '../lib/utils'

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const location = useLocation()
  const isAdminLocation = location.pathname.includes('/admin')

  // Navbar should have dark content when scrolled or when mobile menu is open.
  // Otherwise, since all heroes are now dark, content should be white.
  const requiresDarkContent = isScrolled || mobileOpen || isAdminLocation

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  const closeMobile = () => {
    setMobileOpen(false)
    setMobileServicesOpen(false)
  }

  const serviceCategories = [
    {
      id: 'eng',
      label: 'Engineering',
      icon: Code,
      services: [
        {
          title: 'Enterprise Web Apps',
          desc: 'Scalable, high-performance solutions.'
        },
        { title: 'Mobile Development', desc: 'iOS & Android excellence.' },
        { title: 'Cloud Solutions', desc: 'Secure cloud infrastructure.' }
      ]
    },
    {
      id: 'design',
      label: 'Design',
      icon: Palette,
      services: [
        { title: 'UI/UX Design', desc: 'User-centric experiences.' },
        { title: 'Graphic Production', desc: 'Premium visual assets.' },
        { title: 'Brand Identity', desc: 'Strategic brand definition.' }
      ]
    },
    {
      id: 'strategy',
      label: 'Strategy',
      icon: Zap,
      services: [
        { title: 'Digital Transformation', desc: 'Modernizing your business.' },
        { title: 'AI Integration', desc: 'Next-gen intelligence.' },
        { title: 'Consultancy', desc: 'Strategic tech advice.' }
      ]
    }
  ]

  const [activeCategory, setActiveCategory] = useState(serviceCategories[0])

  const navLinkClass = ({ isActive }) =>
    cn(
      'text-xs font-black uppercase tracking-widest transition-colors',
      isActive
        ? 'text-brand-teal'
        : requiresDarkContent
        ? 'text-brand-dark hover:text-brand-teal'
        : 'text-white hover:text-brand-teal'
    )

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-500 py-5 px-5 sm:px-10',
          isScrolled || mobileOpen || isAdminLocation
            ? 'bg-white/95 backdrop-blur-md border-b border-brand-dark/5 py-4'
            : 'bg-transparent'
        )}
      >
        <div className='max-w-7xl mx-auto flex justify-between items-center'>
          {/* Logo */}
          <Link
            to='/'
            onClick={closeMobile}
            className='flex items-center gap-2 group cursor-pointer z-10'
          >
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 ${
                requiresDarkContent || isAdminLocation ? 'bg-brand-dark' : 'bg-white'
              } rounded-xl flex items-center justify-center group-hover:bg-brand-teal transition-colors duration-500`}
            >
              <span
                className={`${
                  requiresDarkContent || isAdminLocation ? 'text-white' : 'text-brand-dark'
                } font-black text-lg sm:text-xl`}
              >
                R
              </span>
            </div>
            <span
              className={`text-lg sm:text-xl font-black tracking-tighter ${
                requiresDarkContent || isAdminLocation ? 'text-brand-dark' : 'text-white'
              }`}
            >
              REYO<span className='text-brand-teal'>TECH</span>
            </span>
          </Link>

          {/* Desktop Nav Links + CTA — right side group */}
          <div className='hidden md:flex items-center gap-8'>
            <NavLink to='/' className={navLinkClass}>
              Home
            </NavLink>
            <div
              className='relative group py-2'
              onMouseEnter={() => setActiveMenu('services')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <NavLink
                to='/services'
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-1 text-xs font-black uppercase tracking-widest transition-colors',
                    isActive
                      ? 'text-brand-teal'
                      : requiresDarkContent || isAdminLocation
                      ? 'text-brand-dark hover:text-brand-teal'
                      : 'text-white hover:text-brand-teal'
                  )
                }
              >
                Services{' '}
                <ChevronDown
                  size={14}
                  className={cn(
                    'transition-transform duration-300',
                    activeMenu === 'services' && 'rotate-180'
                  )}
                />
              </NavLink>

              {/* Services Dropdown */}
              <div
                className={cn(
                  'absolute top-full left-1/2 -translate-x-[40%] lg:-translate-x-1/2 mt-0 w-[580px] lg:w-[750px] bg-white rounded-[24px] lg:rounded-[40px] shadow-2xl border border-brand-dark/5 p-4 lg:p-6 transition-all duration-500 origin-top overflow-hidden',
                  activeMenu === 'services' 
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
                )}
              >
                <div className='grid grid-cols-12 gap-5 lg:gap-8 h-[280px] lg:h-[360px]'>
                  {/* Left: Image / Highlight */}
                  <div className='col-span-5 relative rounded-[28px] overflow-hidden group/img h-full'>
                    <div className='absolute inset-0 bg-brand-dark/20 z-10 group-hover/img:bg-brand-dark/10 transition-colors duration-500' />
                    <img
                      src='https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800'
                      alt='Our Services'
                      className='w-full h-full object-cover transform group-hover/img:scale-105 transition-transform duration-700'
                    />
                    <div className='absolute bottom-4 left-4 lg:bottom-6 lg:left-6 z-20'>
                      <div className='text-[9px] lg:text-[10px] font-black text-brand-teal uppercase tracking-[0.2em] lg:tracking-[0.3em] mb-1 lg:mb-2 bg-white/95 text-brand-dark px-2 lg:px-3 py-1 rounded-full inline-block backdrop-blur-sm'>
                        Expertise
                      </div>
                      <h4 className='text-white text-lg lg:text-xl font-black leading-tight drop-shadow-md'>
                        WHAT WE
                        <br />
                        CAN DO
                      </h4>
                    </div>
                  </div>

                  {/* Right: List of Services Links */}
                  <div className='col-span-7 flex flex-col justify-center gap-2 pr-4'>
                    <div className='text-[8px] sm:text-[10px] font-black text-brand-teal uppercase tracking-[0.3em] mb-1 px-4'>
                      Our Core Offerings
                    </div>
                    {[
                      {
                        title: 'Enterprise Web Apps',
                        desc: 'Scalable, high-performance solutions.',
                        to: '/services'
                      },
                      {
                        title: 'Mobile Development',
                        desc: 'iOS & Android app excellence.',
                        to: '/services'
                      },
                      {
                        title: 'UI/UX Design',
                        desc: 'User-centric stunning interfaces.',
                        to: '/services'
                      },
                      {
                        title: 'Digital Strategy',
                        desc: 'Modernizing your business tech.',
                        to: '/services'
                      }
                    ].map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.to}
                        className='mega-menu-item group/item py-2'
                        onClick={() => setActiveMenu(null)}
                      >
                        <div className='flex justify-between items-center mb-0.5'>
                          <h4 className='text-xs sm:text-sm font-black text-brand-dark group-hover/item:text-brand-teal transition-colors uppercase'>
                            {item.title}
                          </h4>
                          <ArrowUpRight
                            size={14}
                            className='text-brand-teal opacity-0 group-hover/item:opacity-100 transition-all'
                          />
                        </div>
                        <p className='text-[10px] sm:text-xs text-brand-silver leading-snug'>
                          {item.desc}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <NavLink to='/portfolio' className={navLinkClass}>
              Projects
            </NavLink>
            <NavLink to='/admin' className={navLinkClass}>
              Admin
            </NavLink>
            {/* About Mega Menu */}
            <div
              className='relative group py-2'
              onMouseEnter={() => setActiveMenu('about')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <NavLink
                to='/about'
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-1 text-xs font-black uppercase tracking-widest transition-colors',
                    isActive
                      ? 'text-brand-teal'
                      : requiresDarkContent
                      ? 'text-brand-dark hover:text-brand-teal'
                      : 'text-white hover:text-brand-teal'
                  )
                }
              >
                About{' '}
                <ChevronDown
                  size={14}
                  className={cn(
                    'transition-transform duration-300',
                    activeMenu === 'about' && 'rotate-180'
                  )}
                />
              </NavLink>

              {/* About Dropdown */}
              <div
                className={cn(
                  'absolute top-full left-1/2 -translate-x-[75%] lg:-translate-x-[85%] mt-0 w-[580px] lg:w-[750px] bg-white rounded-[24px] lg:rounded-[40px] shadow-2xl border border-brand-dark/5 p-4 lg:p-6 transition-all duration-500 origin-top overflow-hidden',
                  activeMenu === 'about'
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
                )}
              >
                <div className='grid grid-cols-12 gap-5 lg:gap-8 h-[280px] lg:h-[360px]'>
                  {/* Left: Image / Highlight */}
                  <div className='col-span-5 relative rounded-[28px] overflow-hidden group/img h-full'>
                    <div className='absolute inset-0 bg-brand-dark/20 z-10 group-hover/img:bg-brand-dark/10 transition-colors duration-500' />
                    <img
                      src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
                      alt='Reyo Tech Team'
                      className='w-full h-full object-cover transform group-hover/img:scale-105 transition-transform duration-700'
                    />
                    <div className='absolute bottom-4 left-4 lg:bottom-6 lg:left-6 z-20'>
                      <div className='text-[9px] lg:text-[10px] font-black text-brand-teal uppercase tracking-[0.2em] lg:tracking-[0.3em] mb-1 lg:mb-2 bg-white/95 text-brand-dark px-2 lg:px-3 py-1 rounded-full inline-block backdrop-blur-sm'>
                        Reyo Tech Lab
                      </div>
                      <h4 className='text-white text-lg lg:text-xl font-black leading-tight drop-shadow-md'>
                        SHAPING THE
                        <br />
                        DIGITAL FUTURE
                      </h4>
                    </div>
                  </div>

                  {/* Right: List of About Links */}
                  <div className='col-span-7 flex flex-col justify-center gap-2 pr-4 '>
                    <div className='text-[8px] sm:text-[10px] font-black text-brand-teal uppercase tracking-[0.3em] mb-1 px-4'>
                      Discover
                    </div>
                    {[
                      {
                        title: 'Who We Are',
                        desc: 'Our journey and mission.',
                        to: '/about'
                      },
                      {
                        title: 'Our Vision',
                        desc: 'Building the ecosystem for tech growth.',
                        to: '/about'
                      },
                      {
                        title: 'Our Method',
                        desc: 'Engineering meets human-centered design.',
                        to: '/process'
                      },
                      {
                        title: 'Careers',
                        desc: 'Craft world-class digital experiences.',
                        to: '/about'
                      }
                    ].map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.to}
                        className='mega-menu-item group/item py-2'
                        onClick={() => setActiveMenu(null)}
                      >
                        <div className='flex justify-between items-center mb-0.5'>
                          <h4 className='text-xs sm:text-sm font-black text-brand-dark group-hover/item:text-brand-teal transition-colors uppercase'>
                            {item.title}
                          </h4>
                          <ArrowUpRight
                            size={14}
                            className='text-brand-teal opacity-0 group-hover/item:opacity-100 transition-all'
                          />
                        </div>
                        <p className='text-[10px] sm:text-xs text-brand-silver leading-snug'>
                          {item.desc}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop CTA — inside the right group */}
            <Link to='/contact' className='btn-primary flex items-center gap-2'>
              Contact Us <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Mobile Hamburger + contact */}
          <div className='md:hidden flex items-center gap-3'>
            {/* Mobile: small contact link */}
            <Link
              to='/contact'
              onClick={closeMobile}
              className='text-[10px] font-black uppercase tracking-widest text-brand-teal border border-brand-teal/30 rounded-full px-3 py-2'
            >
              Contact
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden w-10 h-10 rounded-xl ${
                requiresDarkContent ? 'bg-brand-dark' : 'bg-white'
              } flex items-center justify-center transition-colors`}
              aria-label='Toggle menu'
            >
              {mobileOpen ? (
                <X
                  size={18}
                  className={
                    requiresDarkContent ? 'text-white' : 'text-brand-dark'
                  }
                />
              ) : (
                <Menu
                  size={18}
                  className={
                    requiresDarkContent ? 'text-white' : 'text-brand-dark'
                  }
                />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-all duration-500',
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className='absolute inset-0 bg-brand-dark/30 backdrop-blur-sm'
          onClick={closeMobile}
        />

        {/* Drawer */}
        <div
          className={cn(
            'absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-500 overflow-y-auto',
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className='pt-24 pb-10 px-6'>
            {/* Nav Items */}
            <div className='space-y-1'>
              {/* Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className='w-full flex justify-between items-center py-4 text-sm font-black uppercase tracking-widest text-brand-dark border-b border-brand-dark/5'
                >
                  Services
                  <ChevronDown
                    size={16}
                    className={cn(
                      'text-brand-teal transition-transform duration-300',
                      mobileServicesOpen && 'rotate-180'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    mobileServicesOpen
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  )}
                >
                  <div className='py-3 pl-4 space-y-1'>
                    {serviceCategories.map(cat => (
                      <div key={cat.id}>
                        <div className='text-[9px] font-black text-brand-teal uppercase tracking-widest mt-3 mb-1'>
                          {cat.label}
                        </div>
                        {cat.services.map((svc, si) => (
                          <Link
                            key={si}
                            to='/services'
                            onClick={closeMobile}
                            className='block py-2 text-xs font-bold text-brand-silver hover:text-brand-dark transition-colors uppercase tracking-wide'
                          >
                            {svc.title}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {[
                { to: '/', label: 'Home' },
                { to: '/portfolio', label: 'Projects' },
                { to: '/about', label: 'About' },
                { to: '/admin', label: 'Admin' },
                { to: '/career', label: 'Career' }
              ].map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    cn(
                      'block py-4 text-sm font-black uppercase tracking-widest border-b border-brand-dark/5 transition-colors',
                      isActive ? 'text-brand-teal' : 'text-brand-dark'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* CTA */}
            <div className='mt-8'>
              <Link
                to='/contact'
                onClick={closeMobile}
                className='btn-primary w-full justify-center gap-2 flex'
              >
                Contact Us <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Footer info */}
            <div className='mt-8 pt-6 border-t border-brand-dark/5'>
              <p className='text-[10px] font-medium text-brand-silver'>
                Reyo Tech Lab · Accra, Ghana
              </p>
              <p className='text-[10px] font-medium text-brand-silver mt-1'>
                hello@reyotechlab.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
