import React, { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  Search, MessageSquare, Briefcase, Layers, Filter, Loader2,
  Settings, HelpCircle, Bell, Box, ShoppingCart, Users, FileText,
  CreditCard, Store, Moon, Menu, ChevronLeft, ChevronRight
} from 'lucide-react'
import { cn } from '../lib/utils'
import { api } from '../service/axios'

const Admin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState('')
  const [authChecking, setAuthChecking] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Auto-collapse on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true)
      } else {
        setIsCollapsed(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    async function verifyAuth() {
      try {
        await api.get('/projects')
        setAuthChecking(false)
      } catch (error) {
        if (error.response?.status === 401) {
          navigate('/auth', { replace: true })
        } else {
          setAuthChecking(false)
        }
      }
    }
    verifyAuth()
  }, [navigate])

  if (authChecking) {
    return (
      <div className='min-h-screen bg-[#f8f9fa] flex items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <Loader2 className='w-10 h-10 text-brand-teal animate-spin' />
          <p className='text-xs font-semibold text-gray-500 uppercase tracking-widest'>
            Loading Dashboard...
          </p>
        </div>
      </div>
    )
  }

  const mainTabs = [
    { id: 'overview', label: 'Dashboard', icon: Layers, path: '' },
    { id: 'services', label: 'Services', icon: Filter, path: 'services' },
    { id: 'projects', label: 'Projects', icon: Briefcase, path: 'projects' },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare, path: 'inquiries' }
  ]

  const settingsTabs = [
    { id: 'marketplace', label: 'Marketplace Sync', icon: Store, path: '#' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '#' },
  ]

  const isMini = isCollapsed && !mobileOpen;

  return (
    <div className='min-h-screen flex bg-[#f5f6f8] text-[#1a1c23] font-sans relative'>
      
      {/* Mobile Toggle Button (Visible only on small screens) */}
      <button 
        onClick={() => setMobileOpen(!mobileOpen)}
        className='md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#4b6bfb] text-white rounded-full shadow-xl shadow-[#4b6bfb]/30 flex items-center justify-center hover:bg-[#3a5cea] transition-colors'
      >
        <Menu size={24} />
      </button>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div 
          className='md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm'
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          'bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 shrink-0 transition-all duration-300 z-50',
          isMini ? 'w-[80px]' : 'w-[260px]',
          // Mobile responsive logic
          'absolute md:relative md:translate-x-0',
          mobileOpen ? 'translate-x-0 w-[260px]' : '-translate-x-full'
        )}
      >
        {/* Toggle Collapse Button (Desktop) */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className='hidden md:flex absolute -right-3 top-24 w-6 h-6 bg-white border border-gray-100 rounded-full items-center justify-center text-gray-400 hover:text-[#4b6bfb] shadow-sm z-10 transition-colors'
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div className='flex-1 mt-20 overflow-y-auto px-4 py-2 custom-scrollbar overflow-x-hidden'>
          <div className='mb-6'>
            {!isMini && <p className='text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-3 transition-opacity'>Main</p>}
            <div className='space-y-1'>
              {mainTabs.map(tab => (
                <NavLink
                  key={tab.id}
                  to={tab.path}
                  end={tab.path === ''}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-colors relative group',
                      isMini ? 'justify-center px-0' : 'px-3',
                      isActive
                        ? 'bg-[#f4f6ff] text-[#4b6bfb]'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    )
                  }
                  title={isMini ? tab.label : ''}
                >
                  <tab.icon size={20} strokeWidth={2} className='shrink-0' />
                  {!isMini && <span className='truncate'>{tab.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>

          <div className='mb-6'>
            {!isMini && <p className='text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-3'>Settings</p>}
            <div className='space-y-1'>
              {settingsTabs.map(tab => (
                <a
                  key={tab.id}
                  href={tab.path}
                  className={cn(
                    'flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors group',
                    isMini ? 'justify-center px-0' : 'px-3'
                  )}
                  title={isMini ? tab.label : ''}
                >
                  <tab.icon size={20} strokeWidth={2} className='shrink-0' />
                  {!isMini && <span className='truncate'>{tab.label}</span>}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className='p-4 mt-auto border-t border-gray-50'>
          <div className={cn('flex items-center mb-2', isMini ? 'justify-center' : 'justify-between px-3')}>
            <div className='flex items-center gap-2 text-sm text-gray-500 font-medium' title={isMini ? "Dark Mode" : ""}>
              <Moon size={20} className='shrink-0' />
              {!isMini && "Dark Mode"}
            </div>
            {!isMini && (
              <div className='w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer shrink-0'>
                <div className='w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm'></div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={cn(
        'flex-1 flex flex-col min-w-0 max-h-screen overflow-y-auto transition-all duration-300',
        mobileOpen ? 'opacity-50 md:opacity-100 pointer-events-none md:pointer-events-auto' : ''
      )}>
        {/* Dynamic Content */}
        <main className='flex-1 px-5 sm:px-8 pb-8 pt-[100px] md:pt-[120px]'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Admin
