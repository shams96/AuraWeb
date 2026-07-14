'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'

const C = {
  page:      'var(--iv-black)',
  parchment: 'var(--iv-deep-green)',
  charcoal:  'var(--iv-charcoal)',
  espresso:  'var(--iv-text)',
  muted:     'var(--iv-text-muted)',
  gold:      'var(--iv-gold)',
  border:    'rgba(155, 71, 34,0.14)',
}

function ResetPasswordForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const token        = searchParams.get('token') ?? ''

  const [password,     setPassword]     = useState('')
  const [confirm,      setConfirm]      = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error,        setError]        = useState('')
  const [loading,      setLoading]      = useState(false)
  const [success,      setSuccess]      = useState(false)

  if (!token) {
    return (
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <AlertCircle size={44} style={{ color: C.gold, margin: '0 auto 20px' }} />
        <h1 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '1.6rem', fontStyle: 'italic', fontWeight: 600, color: C.charcoal, margin: '0 0 12px' }}>
          Invalid reset link.
        </h1>
        <p style={{ fontSize: '0.85rem', color: C.muted, lineHeight: 1.7, marginBottom: 24 }}>
          This link is missing a reset token. Please request a new password reset.
        </p>
        <Link href="/forgot-password" style={{ color: C.gold, fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>
          Request New Link →
        </Link>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (password !== confirm) { setError('Passwords do not match.'); return }

    setLoading(true)
    setError('')

    try {
      const res  = await fetch('/api/auth/reset-password', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Something went wrong.'); return }
      setSuccess(true)
      setTimeout(() => router.push('/login'), 2500)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <CheckCircle2 size={44} style={{ color: C.gold, margin: '0 auto 20px' }} />
        <h1 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '1.6rem', fontStyle: 'italic', fontWeight: 600, color: C.charcoal, margin: '0 0 12px' }}>
          Password updated.
        </h1>
        <p style={{ fontSize: '0.85rem', color: C.muted, lineHeight: 1.7 }}>
          Your password has been changed successfully. Redirecting you to sign in…
        </p>
      </div>
    )
  }

  return (
    <>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.gold, marginBottom: 8 }}>Password Reset</p>
        <h1 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '1.8rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--iv-garden)', margin: '0 0 10px' }}>
          Choose a new password
        </h1>
        <p style={{ fontSize: '0.8rem', color: C.muted, margin: 0, lineHeight: 1.6 }}>
          Minimum 8 characters. You will be signed in automatically after resetting.
        </p>
      </div>

      {error && (
        <div style={{ marginBottom: 20, padding: '12px 16px', background: 'rgba(155, 71, 34,0.07)', border: `1px solid ${C.border}`, borderRadius: 10 }}>
          <p style={{ color: C.espresso, fontSize: '0.8rem', margin: 0 }}>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted, marginBottom: 6 }}>
            New Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              placeholder="Min. 8 characters"
              required
              autoComplete="new-password"
              style={{
                display: 'block', width: '100%', padding: '12px 44px 12px 16px',
                background: C.parchment, border: `1px solid ${C.border}`,
                borderRadius: 8, fontSize: '0.875rem', color: C.charcoal,
                outline: 'none', boxSizing: 'border-box',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = C.border)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 0 }}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted, marginBottom: 6 }}>
            Confirm Password
          </label>
          <input
            type="password"
            value={confirm}
            onChange={e => { setConfirm(e.target.value); setError('') }}
            placeholder="Repeat your password"
            required
            autoComplete="new-password"
            style={{
              display: 'block', width: '100%', padding: '12px 16px',
              background: C.parchment, border: `1px solid ${C.border}`,
              borderRadius: 8, fontSize: '0.875rem', color: C.charcoal,
              outline: 'none', boxSizing: 'border-box',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.5)')}
            onBlur={e => (e.currentTarget.style.borderColor = C.border)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', padding: '14px', marginTop: 4,
            background: loading ? 'rgba(155, 71, 34,0.5)' : C.gold,
            color: '#FDFAF5', border: 'none', borderRadius: 10,
            fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.22em',
            textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          {loading ? <><Loader2 size={13} className="animate-spin" /> Updating…</> : 'Update Password'}
        </button>
      </form>

      <p style={{ marginTop: 24, fontSize: '0.75rem', color: C.muted, textAlign: 'center' }}>
        Remembered it?{' '}
        <Link href="/login" style={{ color: C.gold, textDecoration: 'none', fontWeight: 700 }}>Sign in</Link>
      </p>
    </>
  )
}

export default function ResetPasswordPage() {
  return (
    <div style={{ minHeight: '100vh', background: C.page, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <Suspense fallback={<div />}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}
