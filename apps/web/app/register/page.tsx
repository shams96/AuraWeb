'use client'

import { Wordmark } from '@/components/brand/wordmark'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff, ArrowRight, Loader2, User, Briefcase, CheckCircle2 } from 'lucide-react'

type AccountType = 'personal' | 'business'

const INPUT: React.CSSProperties = {
  display: 'block', width: '100%', padding: '12px 16px',
  background: 'var(--iv-deep-green)', border: '1px solid rgba(155, 71, 34,0.18)',
  borderRadius: 8, fontSize: '0.9rem', color: 'var(--iv-white)',
  outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
}

const LABEL: React.CSSProperties = {
  display: 'block', fontSize: '0.7rem', fontWeight: 700,
  color: 'var(--iv-text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6,
}

export default function RegisterPage() {
  const router = useRouter()

  const [accountType, setAccountType] = useState<AccountType>('personal')
  const [name,            setName]            = useState('')
  const [email,           setEmail]           = useState('')
  const [password,        setPassword]        = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword,    setShowPassword]    = useState(false)
  const [agreedToTerms,   setAgreedToTerms]   = useState(false)
  const [error,           setError]           = useState('')
  const [success,         setSuccess]         = useState(false)
  const [isPending,       startTransition]    = useTransition()

  function passwordStrength(p: string): { label: string; color: string; width: string } {
    if (p.length === 0)  return { label: '',        color: 'transparent',          width: '0%'   }
    if (p.length < 8)    return { label: 'Too short', color: '#C26039',            width: '20%'  }
    if (p.length < 12)   return { label: 'Fair',      color: '#B85834',            width: '50%'  }
    if (/[^a-zA-Z0-9]/.test(p)) return { label: 'Strong', color: '#004B37',       width: '100%' }
    return { label: 'Good', color: '#1F5F4B', width: '75%' }
  }

  const strength = passwordStrength(password)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) { setError('Passwords do not match.'); return }
    if (password.length < 8)          { setError('Password must be at least 8 characters.'); return }
    if (!agreedToTerms)               { setError('Please agree to the Terms of Service and Privacy Policy.'); return }

    startTransition(async () => {
      // 1. Create the account
      const res  = await fetch('/api/auth/register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, password, accountType }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed. Please try again.')
        return
      }

      // 2. Show success state
      setSuccess(true)

      // 4. Auto sign-in
      const result = await signIn('credentials', { email, password, redirect: false })

      if (result?.ok) {
        // Small delay so user sees the success state
        setTimeout(() => router.push('/'), 1200)
      } else {
        // Account created but auto-sign-in failed — send to login with message
        setTimeout(() => router.push('/login?registered=1'), 800)
      }
    })
  }

  // ── Success screen ──────────────────────────────────────────────────────

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--iv-black)' }}>
        <div className="text-center space-y-6 px-8 max-w-sm">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
            style={{ background: 'rgba(155, 71, 34,0.12)', border: '1px solid rgba(155, 71, 34,0.25)' }}>
            <CheckCircle2 size={30} style={{ color: 'var(--iv-gold)' }} />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--iv-white)', marginBottom: 8 }}>
              Account Created
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--iv-text-muted)', lineHeight: 1.6 }}>
              Welcome to Chiarel, <strong style={{ color: 'var(--iv-white)' }}>{name}</strong>.
              Signing you in now…
            </p>
          </div>
          <Loader2 size={18} className="animate-spin mx-auto" style={{ color: 'var(--iv-gold)' }} />
        </div>
      </div>
    )
  }

  // ── Registration form ───────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--iv-black)' }}>

      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-2/5 flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, var(--iv-formal-garden) 0%, var(--iv-deep-green) 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(250,214,201,0.18) 0%, transparent 60%)' }} />
        <div className="relative z-10 text-center px-12 space-y-10">
          <Link href="/" className="inline-block">
            <Wordmark size="1.5rem" color="#FDFAF5" />
          </Link>
          <div className="space-y-5">
            {[
              'Personalized protocol matched to your biology',
              'Access your full diagnostic history',
              'iv Circle loyalty rewards from day one',
              'Exclusive early access to new formulations',
            ].map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 text-left">
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(250,214,201,0.7)', flexShrink: 0, marginTop: 7 }} />
                <span style={{ fontSize: '0.82rem', color: 'rgba(253,250,245,0.75)', lineHeight: 1.6 }}>{benefit}</span>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: 8, borderTop: '1px solid rgba(253,250,245,0.1)' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(253,250,245,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Formulated at Isola del Liri, Italia
            </p>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 overflow-y-auto">
        <Link href="/" className="lg:hidden mb-10">
          <Wordmark size="1.3rem" color="var(--iv-white)" />
        </Link>

        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h1 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '1.9rem', fontWeight: 600, color: 'var(--iv-garden)', letterSpacing: '-0.02em' }}>
              Create your account
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--iv-text-muted)' }}>
              Already have one?{' '}
              <Link href="/login" style={{ color: 'var(--iv-gold)', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
            </p>
          </div>

          {/* Account type toggle */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {([
              { value: 'personal',  label: 'Personal',      icon: <User size={15} />,      desc: 'Individual skincare' },
              { value: 'business',  label: 'Professional',  icon: <Briefcase size={15} />, desc: 'Clinic / Salon' },
            ] as const).map(({ value, label, icon, desc }) => (
              <button key={value} type="button" onClick={() => setAccountType(value)}
                style={{
                  padding: '14px 16px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
                  border: accountType === value ? '1.5px solid var(--iv-gold)' : '1.5px solid rgba(155, 71, 34,0.18)',
                  background: accountType === value ? 'rgba(155, 71, 34,0.08)' : 'var(--iv-deep-green)',
                  transition: 'all 0.2s',
                }}>
                <div style={{ color: accountType === value ? 'var(--iv-gold)' : 'var(--iv-text-muted)', marginBottom: 4 }}>{icon}</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--iv-white)' }}>{label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--iv-text-muted)', marginTop: 2 }}>{desc}</div>
              </button>
            ))}
          </div>

          {error && (
            <div style={{ padding: '12px 16px', borderRadius: 8, background: 'rgba(155,71,34,0.07)', border: '1px solid rgba(155,71,34,0.25)', fontSize: '0.82rem', color: 'var(--iv-ochre-dark)', fontWeight: 500 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label style={LABEL}>{accountType === 'business' ? 'Business / Clinic Name' : 'Full Name'}</label>
              <input type="text" autoComplete="name" required value={name} onChange={e => setName(e.target.value)}
                placeholder={accountType === 'business' ? 'Elysian Aesthetics Clinic' : 'Sofia Rossi'}
                style={INPUT}
                onFocus={e => (e.target.style.borderColor = 'var(--iv-gold)')}
                onBlur={e  => (e.target.style.borderColor = 'rgba(155, 71, 34,0.18)')}
              />
            </div>

            <div>
              <label style={LABEL}>Email Address</label>
              <input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={INPUT}
                onFocus={e => (e.target.style.borderColor = 'var(--iv-gold)')}
                onBlur={e  => (e.target.style.borderColor = 'rgba(155, 71, 34,0.18)')}
              />
            </div>

            <div>
              <label style={LABEL}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} autoComplete="new-password" required
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  style={{ ...INPUT, paddingRight: 44 }}
                  onFocus={e => (e.target.style.borderColor = 'var(--iv-gold)')}
                  onBlur={e  => (e.target.style.borderColor = 'rgba(155, 71, 34,0.18)')}
                />
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--iv-text-muted)', padding: 0 }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {/* Strength bar */}
              {password.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ height: 3, borderRadius: 2, background: 'rgba(155, 71, 34,0.12)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: strength.width, background: strength.color, transition: 'all 0.3s' }} />
                  </div>
                  <p style={{ fontSize: '0.75rem', color: strength.color, marginTop: 4, letterSpacing: '0.08em' }}>{strength.label}</p>
                </div>
              )}
            </div>

            <div>
              <label style={LABEL}>Confirm Password</label>
              <input type="password" autoComplete="new-password" required
                value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  ...INPUT,
                  borderColor: confirmPassword && confirmPassword !== password ? 'var(--iv-ochre-light)' : 'rgba(155, 71, 34,0.18)',
                }}
                onFocus={e => (e.target.style.borderColor = confirmPassword !== password ? 'var(--iv-ochre-light)' : 'var(--iv-gold)')}
                onBlur={e  => (e.target.style.borderColor = confirmPassword !== password ? 'var(--iv-ochre-light)' : 'rgba(155, 71, 34,0.18)')}
              />
              {confirmPassword && confirmPassword !== password && (
                <p style={{ fontSize: '0.75rem', color: 'var(--iv-ochre-dark)', marginTop: 4 }}>Passwords don&apos;t match</p>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, paddingTop: 4 }}>
              <input id="terms" type="checkbox" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)}
                style={{ marginTop: 3, accentColor: 'var(--iv-gold)', width: 15, height: 15, flexShrink: 0, cursor: 'pointer' }} />
              <label htmlFor="terms" style={{ fontSize: '0.75rem', color: 'var(--iv-text-muted)', lineHeight: 1.5, cursor: 'pointer' }}>
                I agree to the{' '}
                <Link href="/terms"   style={{ color: 'var(--iv-gold)', textDecoration: 'none' }}>Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" style={{ color: 'var(--iv-gold)', textDecoration: 'none' }}>Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" disabled={isPending}
              style={{
                width: '100%', padding: '14px 24px', marginTop: 8,
                background: isPending ? 'rgba(155, 71, 34,0.5)' : 'var(--iv-gold)',
                color: 'var(--iv-black)', border: 'none', borderRadius: 8,
                fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase',
                cursor: isPending ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s',
              }}>
              {isPending
                ? <><Loader2 size={15} className="animate-spin" /> Creating account…</>
                : <>Create Account <ArrowRight size={15} /></>
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
