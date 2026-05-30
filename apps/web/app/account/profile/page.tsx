'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, Lock, CheckCircle2, Loader2 } from 'lucide-react'

const C = {
  page:      '#FDFAF5',
  parchment: '#F4EAE2',
  card:      '#EDE8E0',
  charcoal:  '#1A1614',
  espresso:  '#3D2B20',
  muted:     '#7A5C4E',
  gold:      '#913832',
  border:    'rgba(145,56,50,0.14)',
}

const INPUT: React.CSSProperties = {
  display: 'block', width: '100%', padding: '11px 14px',
  background: C.card, border: `1px solid ${C.border}`,
  borderRadius: 8, fontSize: '0.875rem', color: C.charcoal,
  outline: 'none', boxSizing: 'border-box',
}

const LABEL: React.CSSProperties = {
  display: 'block', fontSize: '0.6rem', fontWeight: 700,
  letterSpacing: '0.2em', textTransform: 'uppercase' as const,
  color: C.muted, marginBottom: 6,
}

export default function AccountProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [pwForm,    setPwForm]    = useState({ current: '', next: '', confirm: '' })
  const [pwError,   setPwError]   = useState('')
  const [pwSuccess, setPwSuccess] = useState(false)
  const [pwLoading, setPwLoading] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login?callbackUrl=/account/profile')
  }, [status, router])

  if (status === 'loading') return <div style={{ minHeight: '100vh', background: C.page }} />
  if (!session) return null

  const user      = session.user as { name?: string; email?: string; role?: string }
  const firstName = user.name?.split(' ')[0] ?? ''

  function setPw(field: string, value: string) {
    setPwForm(prev => ({ ...prev, [field]: value }))
    setPwError('')
    setPwSuccess(false)
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()
    if (pwForm.next.length < 8)          { setPwError('New password must be at least 8 characters.'); return }
    if (pwForm.next !== pwForm.confirm)  { setPwError('Passwords do not match.'); return }
    if (!pwForm.current)                 { setPwError('Please enter your current password.'); return }

    setPwLoading(true)
    setPwError('')

    try {
      const res  = await fetch('/api/auth/change-password', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next }),
      })
      const data = await res.json()
      if (!res.ok) { setPwError(data.error ?? 'Password update failed.'); return }
      setPwSuccess(true)
      setPwForm({ current: '', next: '', confirm: '' })
    } catch {
      setPwError('Something went wrong. Please try again.')
    } finally {
      setPwLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: C.page }}>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, background: C.page }}>
        <Link href="/account" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none' }}>
          <ArrowLeft size={12} /> Account
        </Link>
        <span style={{ color: C.border }}>·</span>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.charcoal }}>Profile</span>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.gold, marginBottom: 8 }}>Account Profile</p>
          <h1 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '2rem', fontStyle: 'italic', fontWeight: 600, color: C.charcoal, margin: 0 }}>
            {firstName ? `${firstName}'s details` : 'Your details'}
          </h1>
        </div>

        {/* Identity card */}
        <div style={{ borderRadius: 18, border: `1px solid ${C.border}`, background: C.parchment, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ padding: '18px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <User size={14} style={{ color: C.gold }} />
            <p style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: C.gold, margin: 0 }}>Account Details</p>
          </div>
          <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={LABEL}>Full Name</label>
              <div style={{ ...INPUT, color: C.muted, cursor: 'default' }}>{user.name ?? '—'}</div>
            </div>
            <div>
              <label style={LABEL}>Email Address</label>
              <div style={{ ...INPUT, color: C.muted, cursor: 'default' }}>{user.email ?? '—'}</div>
            </div>
            <div>
              <label style={LABEL}>Account Type</label>
              <div style={{ ...INPUT, color: C.muted, cursor: 'default', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {user.role === 'PROFESSIONAL' ? 'Professional' : user.role === 'ADMIN' || user.role === 'OWNER' ? 'Administrator' : 'Consumer'}
              </div>
            </div>
            <p style={{ fontSize: '0.7rem', color: C.muted, margin: 0, fontWeight: 300, lineHeight: 1.6 }}>
              To update your name or email address, contact our concierge team at{' '}
              <a href="mailto:shams@1hubsolutions.com" style={{ color: C.gold, textDecoration: 'none', fontWeight: 600 }}>shams@1hubsolutions.com</a>
            </p>
          </div>
        </div>

        {/* Change password card */}
        <div style={{ borderRadius: 18, border: `1px solid ${C.border}`, background: C.parchment, overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Lock size={14} style={{ color: C.gold }} />
            <p style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: C.gold, margin: 0 }}>Change Password</p>
          </div>
          <div style={{ padding: '20px 24px' }}>

            {pwSuccess && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'rgba(45,106,79,0.08)', border: '1px solid rgba(45,106,79,0.2)', borderRadius: 10, marginBottom: 20 }}>
                <CheckCircle2 size={15} style={{ color: '#2D6A4F', flexShrink: 0 }} />
                <p style={{ fontSize: '0.8rem', color: '#2D6A4F', margin: 0, fontWeight: 600 }}>Password updated successfully.</p>
              </div>
            )}

            {pwError && (
              <div style={{ padding: '12px 16px', background: 'rgba(145,56,50,0.07)', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 20 }}>
                <p style={{ fontSize: '0.8rem', color: C.espresso, margin: 0 }}>{pwError}</p>
              </div>
            )}

            <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={LABEL}>Current Password</label>
                <input
                  type="password" value={pwForm.current} required
                  onChange={e => setPw('current', e.target.value)}
                  placeholder="Your current password"
                  autoComplete="current-password"
                  style={INPUT}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(145,56,50,0.4)')}
                  onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                />
              </div>
              <div>
                <label style={LABEL}>New Password</label>
                <input
                  type="password" value={pwForm.next} required
                  onChange={e => setPw('next', e.target.value)}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  style={INPUT}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(145,56,50,0.4)')}
                  onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                />
              </div>
              <div>
                <label style={LABEL}>Confirm New Password</label>
                <input
                  type="password" value={pwForm.confirm} required
                  onChange={e => setPw('confirm', e.target.value)}
                  placeholder="Repeat new password"
                  autoComplete="new-password"
                  style={INPUT}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(145,56,50,0.4)')}
                  onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                />
              </div>
              <button
                type="submit" disabled={pwLoading}
                style={{
                  padding: '13px 24px', background: pwLoading ? 'rgba(145,56,50,0.5)' : C.gold,
                  color: '#FDFAF5', border: 'none', borderRadius: 10,
                  fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.2em',
                  textTransform: 'uppercase', cursor: pwLoading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start',
                }}
              >
                {pwLoading ? <><Loader2 size={13} className="animate-spin" /> Updating…</> : 'Update Password'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
