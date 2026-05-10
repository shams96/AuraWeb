'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff, ArrowRight, Loader2, User, Briefcase } from 'lucide-react'

type AccountType = 'personal' | 'business'

export default function RegisterPage() {
  const router = useRouter()

  const [accountType, setAccountType] = useState<AccountType>('personal')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy.')
      return
    }

    startTransition(async () => {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, accountType }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed. Please try again.')
        return
      }

      // Auto sign-in after successful registration
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Account created! Please sign in.')
        router.push('/login')
      } else {
        router.push('/')
        router.refresh()
      }
    })
  }

  const inputStyle: React.CSSProperties = {
    display: 'block', width: '100%', padding: '12px 16px',
    background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.18)',
    borderRadius: 8, fontSize: '0.9rem', color: 'var(--iv-white)',
    outline: 'none', transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.7rem', fontWeight: 700,
    color: 'var(--iv-text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase',
    marginBottom: 6,
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--iv-black)' }}>
      {/* Left decorative panel */}
      <div
        className="hidden lg:flex lg:w-2/5 flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, var(--iv-red-ochre) 0%, #6B2420 100%)' }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(250,214,201,0.22) 0%, transparent 60%)' }} />
        <div className="relative z-10 text-center px-12 space-y-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#FDFAF5', letterSpacing: '0.1em' }}>ISOLA VITALE</span>
          </Link>
          <div className="space-y-6">
            {[
              'Personalized 4-tier protocol for your biological age',
              'Access your full diagnostic history',
              'iv Circle loyalty rewards from day one',
              'Exclusive early access to new formulations',
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 text-left">
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FAD6C9', flexShrink: 0, marginTop: 6 }} />
                <span style={{ fontSize: '0.82rem', color: 'rgba(253,250,245,0.8)', lineHeight: 1.5 }}>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 overflow-y-auto">
        {/* Mobile logo */}
        <Link href="/" className="lg:hidden mb-10">
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: 'var(--iv-white)', letterSpacing: '0.1em' }}>ISOLA VITALE</span>
        </Link>

        <div className="w-full max-w-md space-y-7">
          <div className="space-y-2">
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: 'var(--iv-white)', letterSpacing: '-0.01em' }}>
              Create your account
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--iv-text-muted)' }}>
              Already have one?{' '}
              <Link href="/login" style={{ color: 'var(--iv-gold)', fontWeight: 600, textDecoration: 'none' }}>
                Sign in
              </Link>
            </p>
          </div>

          {/* Account type selector */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {([
              { value: 'personal', label: 'Personal', icon: <User size={15} />, desc: 'Individual skincare' },
              { value: 'business', label: 'Professional', icon: <Briefcase size={15} />, desc: 'Clinic / Salon' },
            ] as const).map(({ value, label, icon, desc }) => (
              <button
                key={value}
                type="button"
                onClick={() => setAccountType(value)}
                style={{
                  padding: '14px 16px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
                  border: accountType === value ? '1.5px solid var(--iv-gold)' : '1.5px solid rgba(145,56,50,0.18)',
                  background: accountType === value ? 'rgba(145,56,50,0.07)' : 'var(--iv-deep-green)',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ color: accountType === value ? 'var(--iv-gold)' : 'var(--iv-text-muted)', marginBottom: 4 }}>{icon}</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--iv-white)' }}>{label}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--iv-text-muted)', marginTop: 2 }}>{desc}</div>
              </button>
            ))}
          </div>

          {error && (
            <div
              style={{
                padding: '12px 16px', borderRadius: 8,
                background: 'rgba(145,56,50,0.08)', border: '1px solid rgba(145,56,50,0.25)',
                fontSize: '0.8rem', color: 'var(--iv-gold)', fontWeight: 500,
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label style={labelStyle}>{accountType === 'business' ? 'Business / Clinic Name' : 'Full Name'}</label>
              <input
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={accountType === 'business' ? 'Elysian Aesthetics Clinic' : 'Sofia Rossi'}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--iv-gold)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(145,56,50,0.18)')}
              />
            </div>

            <div>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--iv-gold)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(145,56,50,0.18)')}
              />
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  style={{ ...inputStyle, paddingRight: 44 }}
                  onFocus={e => (e.target.style.borderColor = 'var(--iv-gold)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(145,56,50,0.18)')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--iv-text-muted)', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Confirm Password</label>
              <input
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--iv-gold)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(145,56,50,0.18)')}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, paddingTop: 4 }}>
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={e => setAgreedToTerms(e.target.checked)}
                style={{ marginTop: 2, accentColor: 'var(--iv-gold)', width: 15, height: 15, flexShrink: 0, cursor: 'pointer' }}
              />
              <label htmlFor="terms" style={{ fontSize: '0.75rem', color: 'var(--iv-text-muted)', lineHeight: 1.5, cursor: 'pointer' }}>
                I agree to the{' '}
                <Link href="/terms" style={{ color: 'var(--iv-gold)', textDecoration: 'none' }}>Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" style={{ color: 'var(--iv-gold)', textDecoration: 'none' }}>Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              style={{
                width: '100%', padding: '14px 24px', marginTop: 8,
                background: isPending ? 'rgba(145,56,50,0.5)' : 'var(--iv-gold)',
                color: 'var(--iv-black)', border: 'none', borderRadius: 8,
                fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase',
                cursor: isPending ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s',
              }}
            >
              {isPending ? (
                <><Loader2 size={15} className="animate-spin" /> Creating account…</>
              ) : (
                <>Create Account <ArrowRight size={15} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
