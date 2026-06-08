'use client'

import { Suspense, useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'

const INPUT: React.CSSProperties = {
  display: 'block', width: '100%', padding: '12px 16px',
  background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.18)',
  borderRadius: 8, fontSize: '0.9rem', color: 'var(--iv-white)',
  outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
}

function LoginForm() {
  const router      = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl  = searchParams.get('callbackUrl') || '/'
  const justRegistered = searchParams.get('registered') === '1'

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
        setError('Invalid email or password. Please try again.')
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    })
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--iv-black)' }}>

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, var(--iv-formal-garden) 0%, var(--iv-deep-green) 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(250,214,201,0.18) 0%, transparent 60%)' }} />
        <div className="relative z-10 text-center px-12 space-y-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <span style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '1.6rem', fontWeight: 700, color: '#FDFAF5', letterSpacing: '0.1em' }}>ISOLA VITALE</span>
            <span style={{ width: 1, height: 20, background: 'rgba(250,214,201,0.35)', display: 'inline-block' }} />
            <span style={{ fontSize: '0.55rem', fontWeight: 700, color: '#FAD6C9', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Milano</span>
          </Link>
          <blockquote style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '1.4rem', fontStyle: 'italic', color: '#FDFAF5', lineHeight: 1.5, maxWidth: 340 }}>
            "Precision formulated for your biological stage."
          </blockquote>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
            {[
              { v: '4.8★', l: '2,450+ Reviews' },
              { v: '97%',  l: 'See Results'    },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FAD6C9', fontFamily: 'var(--iv-font-serif)' }}>{v}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(253,250,245,0.75)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: 8, borderTop: '1px solid rgba(253,250,245,0.1)' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(253,250,245,0.65)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              An Isola Vitale Formulation
            </p>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <Link href="/" className="lg:hidden mb-10">
          <span style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--iv-white)', letterSpacing: '0.1em' }}>ISOLA VITALE</span>
        </Link>

        <div className="w-full max-w-md space-y-7">
          <div className="space-y-2">
            <h1 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--iv-white)', letterSpacing: '-0.01em' }}>
              Welcome back
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--iv-text-muted)' }}>
              Don&apos;t have an account?{' '}
              <Link href="/register" style={{ color: 'var(--iv-gold)', fontWeight: 600, textDecoration: 'none' }}>Create one free</Link>
            </p>
          </div>

          {/* Post-registration banner */}
          {justRegistered && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 8, background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)' }}>
              <CheckCircle2 size={16} style={{ color: '#4ade80', flexShrink: 0 }} />
              <p style={{ fontSize: '0.82rem', color: '#166534', fontWeight: 500 }}>
                Account created! Sign in below.
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ padding: '12px 16px', borderRadius: 8, background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', fontSize: '0.82rem', color: '#991B1B', fontWeight: 500 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="email" style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'var(--iv-text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Email Address
              </label>
              <input id="email" type="email" autoComplete="email" required
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={INPUT}
                onFocus={e => (e.target.style.borderColor = 'var(--iv-gold)')}
                onBlur={e  => (e.target.style.borderColor = 'rgba(145,56,50,0.18)')}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'var(--iv-text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Password
                </label>
                <Link href="/forgot-password" style={{ fontSize: '0.72rem', color: 'var(--iv-gold)', textDecoration: 'none', fontWeight: 500 }}>
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input id="password" type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password" required
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ ...INPUT, paddingRight: 44 }}
                  onFocus={e => (e.target.style.borderColor = 'var(--iv-gold)')}
                  onBlur={e  => (e.target.style.borderColor = 'rgba(145,56,50,0.18)')}
                />
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--iv-text-muted)', padding: 0 }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isPending}
              style={{
                width: '100%', padding: '14px 24px',
                background: isPending ? 'rgba(145,56,50,0.5)' : 'var(--iv-gold)',
                color: 'var(--iv-black)', border: 'none', borderRadius: 8,
                fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase',
                cursor: isPending ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s',
              }}>
              {isPending
                ? <><Loader2 size={15} className="animate-spin" /> Signing in…</>
                : <>Sign In <ArrowRight size={15} /></>
              }
            </button>
          </form>

          <div style={{ textAlign: 'center', paddingTop: 4 }}>
            <Link href="/professional"
              style={{ fontSize: '0.72rem', color: 'var(--iv-text-muted)', textDecoration: 'none', borderBottom: '1px solid rgba(145,56,50,0.25)', paddingBottom: 2 }}>
              Professional / B2B login →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--iv-black)' }} />}>
      <LoginForm />
    </Suspense>
  )
}
