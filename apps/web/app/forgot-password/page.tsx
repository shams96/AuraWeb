'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'

const C = {
  page:      '#FDFAF5',
  parchment: '#F4EAE2',
  charcoal:  '#1A1614',
  espresso:  '#3D2B20',
  muted:     '#7A5C4E',
  gold:      '#913832',
  border:    'rgba(145,56,50,0.14)',
}

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) { setError('Please enter a valid email address.'); return }

    setLoading(true)
    setError('')

    try {
      const res  = await fetch('/api/auth/forgot-password', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Something went wrong.'); return }
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: C.page, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        <Link
          href="/login"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none', marginBottom: 40 }}
        >
          <ArrowLeft size={12} /> Back to sign in
        </Link>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={44} style={{ color: C.gold, margin: '0 auto 20px' }} />
            <h1 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '1.6rem', fontStyle: 'italic', fontWeight: 600, color: C.charcoal, margin: '0 0 12px' }}>
              Check your inbox.
            </h1>
            <p style={{ fontSize: '0.85rem', color: C.muted, lineHeight: 1.7, margin: '0 0 28px' }}>
              If an account exists for <strong style={{ color: C.espresso }}>{email}</strong>, you will receive a password reset link within a few minutes.
            </p>
            <p style={{ fontSize: '0.75rem', color: C.muted, lineHeight: 1.6 }}>
              Didn&apos;t receive it? Check your spam folder, or{' '}
              <button
                onClick={() => { setSent(false); setEmail('') }}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: C.gold, fontWeight: 700, fontSize: '0.75rem' }}
              >
                try again
              </button>.
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.gold, marginBottom: 8 }}>Forgot Password</p>
              <h1 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '1.8rem', fontStyle: 'italic', fontWeight: 600, color: C.charcoal, margin: '0 0 10px' }}>
                Reset your password
              </h1>
              <p style={{ fontSize: '0.8rem', color: C.muted, margin: 0, lineHeight: 1.6 }}>
                Enter the email address for your account and we will send you a secure reset link.
              </p>
            </div>

            {error && (
              <div style={{ marginBottom: 20, padding: '12px 16px', background: 'rgba(145,56,50,0.07)', border: `1px solid ${C.border}`, borderRadius: 10 }}>
                <p style={{ color: C.espresso, fontSize: '0.8rem', margin: 0 }}>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted, marginBottom: 6 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                  style={{
                    display: 'block', width: '100%', padding: '12px 16px',
                    background: C.parchment, border: `1px solid ${C.border}`,
                    borderRadius: 8, fontSize: '0.875rem', color: C.charcoal,
                    outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(145,56,50,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '14px', marginTop: 4,
                  background: loading ? 'rgba(145,56,50,0.5)' : C.gold,
                  color: '#FDFAF5', border: 'none', borderRadius: 10,
                  fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.22em',
                  textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                {loading ? <><Loader2 size={13} className="animate-spin" /> Sending…</> : 'Send Reset Link'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
