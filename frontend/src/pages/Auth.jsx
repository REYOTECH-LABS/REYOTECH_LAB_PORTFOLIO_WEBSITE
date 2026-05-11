import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, Eye, EyeOff, Shield } from 'lucide-react'
import { cn } from '../lib/utils'
import { login, signup } from '../service/auth'

const Auth = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        await login(formData.email, formData.password)
      } else {
        await signup(formData.name, formData.email, formData.password)
      }

      navigate('/admin')
    } catch (err) {
      const data = err.response?.data
      const msg = data?.errors?.map(e => e.message).join('. ') || data?.message || 'Something went wrong'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  return (
    <div className='min-h-screen bg-brand-dark flex items-center justify-center px-5 relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute top-20 left-20 w-72 h-72 bg-brand-teal rounded-full blur-3xl' />
        <div className='absolute bottom-20 right-20 w-96 h-96 bg-brand-teal/50 rounded-full blur-3xl' />
      </div>

      <div className='relative z-10 w-full max-w-md'>
        {/* Card */}
        <div className='bg-white rounded-[40px] max-lg:mt-40 p-8 md:p-10 shadow-2xl'>
          {/* Tabs */}
          <div className='flex bg-brand-light rounded-2xl p-1 mb-8'>
            <button
              onClick={() => {
                setIsLogin(true)
                setError('')
              }}
              className={cn(
                'flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300',
                isLogin
                  ? 'bg-brand-dark text-white shadow-lg'
                  : 'text-brand-silver hover:text-brand-dark'
              )}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                setError('')
              }}
              className={cn(
                'flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300',
                !isLogin
                  ? 'bg-brand-dark text-white shadow-lg'
                  : 'text-brand-silver hover:text-brand-dark'
              )}
            >
              Sign Up
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className='mb-6 px-4 py-3 bg-red-50 border border-red-100 rounded-2xl text-[10px] font-bold text-red-500 uppercase tracking-wider'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-5'>
            {!isLogin && (
              <div className='space-y-2'>
                <label className='text-[10px] font-black text-brand-silver uppercase tracking-widest ml-1'>
                  Full Name
                </label>
                <input
                  type='text'
                  name='name'
                  required
                  placeholder='John Doe'
                  className='w-full px-5 py-4 bg-brand-light rounded-2xl text-xs font-bold text-brand-dark outline-none border-2 border-transparent focus:border-brand-teal transition-all'
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className='space-y-2'>
              <label className='text-[10px] font-black text-brand-silver uppercase tracking-widest ml-1'>
                Email
              </label>
              <input
                type='email'
                name='email'
                required
                placeholder='admin@reyotech.com'
                className='w-full px-5 py-4 bg-brand-light rounded-2xl text-xs font-bold text-brand-dark outline-none border-2 border-transparent focus:border-brand-teal transition-all'
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className='space-y-2'>
              <label className='text-[10px] font-black text-brand-silver uppercase tracking-widest ml-1'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  required
                  minLength={5}
                  placeholder='••••••••'
                  className='w-full px-5 py-4 pr-12 bg-brand-light rounded-2xl text-xs font-bold text-brand-dark outline-none border-2 border-transparent focus:border-brand-teal transition-all'
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-brand-silver hover:text-brand-teal transition-colors'
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='btn-primary w-full py-5 text-xs disabled:opacity-50'
            >
              {loading ? (
                <span className='flex items-center justify-center gap-2'>
                  Processing...
                </span>
              ) : (
                <span className='flex items-center justify-center gap-2'>
                  {isLogin ? 'Sign In' : 'Create Account'}{' '}
                  <ArrowUpRight size={16} />
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className='text-center text-[10px] text-white/30 uppercase tracking-widest mt-8 font-medium'>
          Secured Access Only
        </p>
      </div>
    </div>
  )
}

export default Auth
