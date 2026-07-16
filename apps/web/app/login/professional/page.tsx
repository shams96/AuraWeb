'use client'

import { Wordmark } from '@/components/brand/wordmark'
import { Suspense, useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff, Loader2, FlaskConical } from 'lucide-react'

const INPUT: React.CSSProperties = {
  display: 'block', width: '100%', padding: '12px 16px',
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(155, 71, 34,0.22)',
  borderRadius: 8, fontSize: '0.875rem', color: '#FDFAF5',
  outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
}

function ProfessionalLoginForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl  = searchParams.get('callbackUrl') || '/professional'

  const [email,        setEmail]        = useState('')
  const [password,     setPassword]     = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error,        setError]        = useState('')
  const [isPending,    startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      const result = await signIn('credentials', { email, password, redirect: false })
      if (result?.error) {
        setError('Invalid credentials. Please try again.')
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    })
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#1A1614' }}>

      {/* Left authority panel */}
      <div
        className="hidden lg:flex lg:w-[55%] flex-col justify-between relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #004B37 0%, #004B37 60%, #0D2B20 100%)' }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(155, 71, 34,0.12) 0%, transparent 55%)' }} />

        {/* Top brand */}
        <div className="relative z-10 p-12">
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Wordmark size="1.1rem" color="#FDFAF5" />
            <span style={{ width: 1, height: 16, background: 'rgba(250,214,201,0.3)', display: 'inline-block' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(250,214,201,0.6)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              Professional
            </span>
          </Link>
        </div>

        {/* Centre content */}
        <div className="relative z-10 px-12 py-16 space-y-10">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(155, 71, 34,0.30)', borderRadius: 999, padding: '6px 16px', background: 'rgba(155, 71, 34,0.08)' }}>
            <FlaskConical size={11} style={{ color: '#9B4722' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9B4722' }}>Clinical Portal</span>
          </div>

          <blockquote style={{ fontFamily: 'var(--iv-font-serif)', fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontStyle: 'italic', color: '#FDFAF5', lineHeight: 1.4, maxWidth: 400, margin: 0 }}>
            "For practitioners who demand clinical-grade formulations."
          </blockquote>

          <p style={{ fontSize: '0.8rem', color: 'rgba(253,250,245,0.55)', lineHeight: 1.8, maxWidth: 380, fontWeight: 300 }}>
            Access the full A-Series clinical range, wholesale pricing, and IRB study data — exclusively for verified practitioners.
          </p>

          {/* Credential stats */}
          <div style={{ display: 'flex', gap: 24 }}>
            {[
              { v: '4 RCTs',   l: 'Independent Trials' },
              { v: 'EU GMP',   l: 'Certified Facility'  },
              { v: 'A-Series', l: 'Clinical Exclusives'  },
            ].map(({ v, l }) => (
              <div key={l}>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#FAD6C9', fontFamily: 'var(--iv-font-serif)' }}>{v}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(253,250,245,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div className="relative z-10 p-12 pt-0">
          <p style={{ fontSize: '0.75rem', color: 'rgba(253,250,245,0.65)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Natural You Srl · Isola del Liri, Lazio, Italy
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16" style={{ background: '#1A1614' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>

          {/* Mobile brand */}
          <div className="lg:hidden mb-10 text-center">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Wordmark size="1.3rem" color="#FDFAF5" />
            </Link>
          </div>

          <div style={{ marginBottom: 36 }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#9B4722', marginBottom: 8 }}>Professional Access</p>
            <h1 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '1.8rem', fontWeight: 600, color: '#FDFAF5', fontStyle: 'italic', margin: 0 }}>
              Sign in to your practice
            </h1>
          </div>

          {error && (
            <div style={{ marginBottom: 20, padding: '12px 16px', background: 'rgba(155, 71, 34,0.12)', border: '1px solid rgba(155, 71, 34,0.30)', borderRadius: 10 }}>
              <p style={{ color: '#FAD6C9', fontSize: '0.8rem', margin: 0 }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(253,250,245,0.75)', marginBottom: 6 }}>
                Practice Email
              </label>
              <input
                type="email" value={email} required
                onChange={e => setEmail(e.target.value)}
                placeholder="dr.name@practice.com"
                style={INPUT}
                autoComplete="email"
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.6)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.22)')}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(253,250,245,0.75)', marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password} required
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ ...INPUT, paddingRight: 44 }}
                  autoComplete="current-password"
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.6)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.22)')}
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(253,250,245,0.35)', padding: 0 }}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link href="/forgot-password" style={{ fontSize: '0.75rem', color: 'rgba(155, 71, 34,0.8)', textDecoration: 'none', fontWeight: 600 }}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit" disabled={isPending}
              style={{
                width: '100%', padding: '14px', marginTop: 4,
                background: isPending ? 'rgba(155, 71, 34,0.5)' : '#9B4722',
                color: '#FDFAF5', border: 'none', borderRadius: 10,
                fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.22em',
                textTransform: 'uppercase', cursor: isPending ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'background 0.2s',
              }}
            >
              {isPending ? <><Loader2 size={13} className="animate-spin" /> Signing in…</> : 'Access Professional Portal'}
            </button>
          </form>

          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ fontSize: '0.7rem', color: 'rgba(253,250,245,0.35)', textAlign: 'center', margin: 0 }}>
              Not a registered practitioner?{' '}
              <Link href="/register/professional" style={{ color: '#9B4722', textDecoration: 'none', fontWeight: 700 }}>
                Apply for access
              </Link>
            </p>
            <p style={{ fontSize: '0.7rem', color: 'rgba(253,250,245,0.35)', textAlign: 'center', margin: 0 }}>
              Consumer account?{' '}
              <Link href="/login" style={{ color: 'rgba(253,250,245,0.5)', textDecoration: 'none', fontWeight: 600 }}>
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProfessionalLoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#1A1614' }} />}>
      <ProfessionalLoginForm />
    </Suspense>
  )
}
