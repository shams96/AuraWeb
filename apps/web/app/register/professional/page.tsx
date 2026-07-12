'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Loader2, CheckCircle2, FlaskConical } from 'lucide-react'

const INPUT: React.CSSProperties = {
  display: 'block', width: '100%', padding: '12px 16px',
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(155, 71, 34,0.22)',
  borderRadius: 8, fontSize: '0.875rem', color: '#FDFAF5',
  outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
}
const SELECT: React.CSSProperties = {
  ...INPUT,
  appearance: 'none', cursor: 'pointer',
}
const LABEL: React.CSSProperties = {
  display: 'block', fontSize: '0.75rem', fontWeight: 700,
  letterSpacing: '0.2em', textTransform: 'uppercase' as const,
  color: 'rgba(253,250,245,0.45)', marginBottom: 6,
}

const PRACTICE_TYPES = [
  'Dermatology',
  'Aesthetic Medicine',
  'Plastic Surgery',
  'General Practice',
  'Medical Spa / Medspa',
  'Cosmetology / Beauty',
  'Pharmacy / Dispensary',
  'Wellness Clinic',
  'Other',
]

export default function ProfessionalRegisterPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '',
    practiceName: '', practiceType: '', licenseNumber: '', country: 'US',
  })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.firstName || !form.lastName) { setError('Please enter your full name.'); return }
    if (!form.email.includes('@'))         { setError('Please enter a valid email address.'); return }
    if (form.password.length < 8)          { setError('Password must be at least 8 characters.'); return }
    if (!form.practiceName)                { setError('Please enter your practice or business name.'); return }
    if (!form.practiceType)                { setError('Please select your practice type.'); return }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:        `${form.firstName} ${form.lastName}`,
          email:       form.email,
          password:    form.password,
          accountType: 'business',
          practiceName:  form.practiceName,
          practiceType:  form.practiceType,
          licenseNumber: form.licenseNumber,
          country:       form.country,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Registration failed. Please try again.'); return }

      setSuccess(true)
      // Auto sign-in
      await signIn('credentials', { email: form.email, password: form.password, redirect: false })
      setTimeout(() => router.push('/professional'), 1800)
    } catch {
      setError('Something went wrong. Please try again or contact our concierge team at concierge@liriroma.com.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#1A1614' }}>

      {/* Left panel */}
      <div
        className="hidden lg:flex lg:w-[45%] flex-col justify-between relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #004B37 0%, #004B37 50%, #0D2B20 100%)' }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(155, 71, 34,0.10) 0%, transparent 55%)' }} />

        <div className="relative z-10 p-10">
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '1rem', fontWeight: 700, color: '#FDFAF5', letterSpacing: '0.12em', textTransform: 'uppercase' }}>LIRI ROMA</span>
            <span style={{ width: 1, height: 14, background: 'rgba(250,214,201,0.3)' }} />
            <span style={{ fontSize: '0.5rem', fontWeight: 700, color: 'rgba(250,214,201,0.55)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Professional</span>
          </Link>
        </div>

        <div className="relative z-10 px-10 py-12 space-y-8">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(155, 71, 34,0.28)', borderRadius: 999, padding: '5px 14px', background: 'rgba(155, 71, 34,0.07)' }}>
            <FlaskConical size={10} style={{ color: '#9B4722' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#9B4722' }}>Clinical Access</span>
          </div>
          <p style={{ fontFamily: 'var(--iv-font-serif)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontStyle: 'italic', color: '#FDFAF5', lineHeight: 1.45, margin: 0, maxWidth: 340 }}>
            "The full A-Series range. Wholesale pricing. IRB study data."
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Full Clinical A-Series access',
              '40–50% wholesale pricing',
              'IRB & RCT study dossiers',
              'Dedicated account manager',
              'Territory exclusivity options',
              'Co-marketing support',
            ].map(b => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#9B4722', flexShrink: 0 }} />
                <span style={{ fontSize: '0.75rem', color: 'rgba(253,250,245,0.6)', fontWeight: 300 }}>{b}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'rgba(253,250,245,0.65)', fontStyle: 'italic', margin: 0 }}>
            Applications reviewed within 5 business days.
          </p>
        </div>

        <div className="relative z-10 p-10 pt-0">
          <p style={{ fontSize: '0.75rem', color: 'rgba(253,250,245,0.65)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Natural You Srl · Isola del Liri, Lazio, Italy
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
        <div style={{ width: '100%', maxWidth: 440 }}>

          {success ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <CheckCircle2 size={44} style={{ color: '#9B4722', margin: '0 auto 20px' }} />
              <h2 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '1.6rem', fontStyle: 'italic', color: '#FDFAF5', margin: '0 0 12px' }}>Application received.</h2>
              <p style={{ fontSize: '0.8rem', color: 'rgba(253,250,245,0.5)', lineHeight: 1.7, margin: 0 }}>
                We are reviewing your application. You will hear from us within 5 business days. Redirecting to your portal…
              </p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#9B4722', marginBottom: 8 }}>Apply for Professional Access</p>
                <h1 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '1.7rem', fontWeight: 600, color: '#FDFAF5', fontStyle: 'italic', margin: 0 }}>
                  Register your practice
                </h1>
              </div>

              {error && (
                <div style={{ marginBottom: 20, padding: '12px 16px', background: 'rgba(155, 71, 34,0.12)', border: '1px solid rgba(155, 71, 34,0.30)', borderRadius: 10 }}>
                  <p style={{ color: '#FAD6C9', fontSize: '0.8rem', margin: 0 }}>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {/* Name row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={LABEL}>First Name</label>
                    <input type="text" value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Dr. First" style={INPUT} required
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.6)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.22)')} />
                  </div>
                  <div>
                    <label style={LABEL}>Last Name</label>
                    <input type="text" value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Last" style={INPUT} required
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.6)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.22)')} />
                  </div>
                </div>

                <div>
                  <label style={LABEL}>Practice Email</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="dr.name@practice.com" style={INPUT} required
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.6)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.22)')} />
                </div>

                <div>
                  <label style={LABEL}>Password</label>
                  <input type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min. 8 characters" style={INPUT} required
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.6)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.22)')} />
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 18, marginTop: 4 }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(253,250,245,0.65)', marginBottom: 14 }}>Practice Details</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div>
                      <label style={LABEL}>Practice / Business Name</label>
                      <input type="text" value={form.practiceName} onChange={e => set('practiceName', e.target.value)} placeholder="City Dermatology Group" style={INPUT} required
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.6)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.22)')} />
                    </div>
                    <div>
                      <label style={LABEL}>Practice Type</label>
                      <select value={form.practiceType} onChange={e => set('practiceType', e.target.value)} style={SELECT} required
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.6)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.22)')}>
                        <option value="" style={{ background: '#1A1614' }}>Select type…</option>
                        {PRACTICE_TYPES.map(t => <option key={t} value={t} style={{ background: '#1A1614' }}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={LABEL}>Medical / Business License # <span style={{ color: 'rgba(253,250,245,0.25)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                      <input type="text" value={form.licenseNumber} onChange={e => set('licenseNumber', e.target.value)} placeholder="License or registration number" style={INPUT}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.6)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.22)')} />
                    </div>
                    <div>
                      <label style={LABEL}>Country</label>
                      <select value={form.country} onChange={e => set('country', e.target.value)} style={SELECT}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.6)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(155, 71, 34,0.22)')}>
                        {[
                          ['US','United States'], ['GB','United Kingdom'], ['CA','Canada'],
                          ['AU','Australia'], ['DE','Germany'], ['FR','France'],
                          ['IT','Italy'], ['AE','UAE'], ['SG','Singapore'],
                        ].map(([v, l]) => <option key={v} value={v} style={{ background: '#1A1614' }}>{l}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit" disabled={loading}
                  style={{
                    width: '100%', padding: '14px', marginTop: 8,
                    background: loading ? 'rgba(155, 71, 34,0.5)' : '#9B4722',
                    color: '#FDFAF5', border: 'none', borderRadius: 10,
                    fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.22em',
                    textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'background 0.2s',
                  }}
                >
                  {loading ? <><Loader2 size={13} className="animate-spin" /> Submitting…</> : 'Submit Application'}
                </button>
              </form>

              <p style={{ marginTop: 24, fontSize: '0.75rem', color: 'rgba(253,250,245,0.65)', textAlign: 'center' }}>
                Already have an account?{' '}
                <Link href="/login/professional" style={{ color: '#9B4722', textDecoration: 'none', fontWeight: 700 }}>Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
