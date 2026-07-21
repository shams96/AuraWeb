'use client'

import { useEffect, useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[0-9\s\-().]{7,20}$/

const MARQUEE_TEXT = 'CHIAREL — Coming Soon'

export function ComingSoonBanner() {
  const [count, setCount] = useState<number | null>(null)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle')
  const [result, setResult] = useState<{ isFounding: boolean; alreadyJoined?: boolean } | null>(null)

  useEffect(() => {
    fetch('/api/waitlist')
      .then(r => (r.ok ? r.json() : null))
      .then(data => { if (data) setCount(data.count) })
      .catch(() => {})
  }, [])

  const spotsRemain = count === null || count < 100

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    if (!PHONE_RE.test(phone.trim())) {
      setError('Please enter a valid phone number.')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), phone: phone.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setStatus('idle')
        return
      }
      setResult(data)
      setStatus('done')
    } catch {
      setError('Something went wrong. Please try again.')
      setStatus('idle')
    }
  }

  return (
    <div style={{ background: 'var(--iv-ochre, #9B4722)', color: 'var(--iv-cloud-dancer, #F0F2EB)', overflow: 'hidden' }}>
      {/* Marquee row */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255,255,255,0.14)',
          padding: '0.4rem 0',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            display: 'flex',
            width: 'max-content',
            whiteSpace: 'nowrap',
            animation: 'coming-soon-marquee 22s linear infinite',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{ marginRight: '3rem' }}>{MARQUEE_TEXT}</span>
          ))}
        </div>
        {/* Screen-reader / no-JS accessible single instance */}
        <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
          {MARQUEE_TEXT}
        </span>
      </div>

      {/* Waitlist row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.9rem',
          padding: '0.65rem 1rem',
        }}
      >
        {status === 'done' && result ? (
          <p style={{ fontSize: '0.8rem', fontWeight: 600, margin: 0 }}>
            {result.alreadyJoined
              ? "You're already with us — we'll be in touch."
              : result.isFounding
                ? 'Welcome to the Founding One Hundred. Your invitation is on its way.'
                : "You're on the list. We'll be in touch."}
          </p>
        ) : (
          <>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.04em', margin: 0, fontWeight: 500 }}>
              {spotsRemain
                ? 'The Founding One Hundred receive fifty percent — join the list:'
                : 'Join our waitlist for early access:'}
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                aria-label="Email address"
                required
                style={{
                  fontSize: '0.75rem',
                  padding: '0.4rem 0.7rem',
                  borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  minWidth: 180,
                }}
              />
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Phone number"
                aria-label="Phone number"
                required
                style={{
                  fontSize: '0.75rem',
                  padding: '0.4rem 0.7rem',
                  borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  minWidth: 150,
                }}
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.45rem 1.1rem',
                  borderRadius: 4,
                  border: 'none',
                  background: 'var(--iv-cloud-dancer, #F0F2EB)',
                  color: 'var(--iv-ochre, #9B4722)',
                  cursor: status === 'submitting' ? 'default' : 'pointer',
                  opacity: status === 'submitting' ? 0.7 : 1,
                }}
              >
                {status === 'submitting' ? 'Joining…' : 'Join the List'}
              </button>
            </form>
          </>
        )}
        {error && (
          <p style={{ fontSize: '0.7rem', margin: 0, color: '#FFE1D6' }}>{error}</p>
        )}
      </div>
    </div>
  )
}
