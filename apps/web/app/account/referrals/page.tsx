'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Copy, CheckCircle2, Gift, Users, Award, Share2 } from 'lucide-react'

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

interface ReferralEntry {
  refereeEmail: string | null
  status: 'PENDING' | 'ATTRIBUTED' | 'REWARDED'
  rewardCode: string | null
  convertedAt: string | null
}

interface ReferralData {
  code: string
  url: string
  stats: { invited: number; converted: number; rewards: string[] }
  referrals: ReferralEntry[]
}

export default function ReferralsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [data,    setData]    = useState<ReferralData | null>(null)
  const [copied,  setCopied]  = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login?callbackUrl=/account/referrals')
  }, [status, router])

  useEffect(() => {
    if (status !== 'authenticated') return
    fetch('/api/referral/link')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [status])

  if (status === 'loading' || loading) return <div style={{ minHeight: '100vh', background: C.page }} />
  if (!session) return null

  function copyLink() {
    if (!data?.url) return
    navigator.clipboard.writeText(data.url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  const shareUrl  = data?.url ?? ''
  const shareText = encodeURIComponent('Discover Isola Vitale — Italian luxury skincare formulated in Isola del Liri. Use my link for 10% off your first order.')
  const whatsappUrl = `https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`
  const twitterUrl  = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`

  return (
    <div style={{ minHeight: '100vh', background: C.page }}>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, background: C.page }}>
        <Link href="/account" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none' }}>
          <ArrowLeft size={12} /> Account
        </Link>
        <span style={{ color: C.border }}>·</span>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.charcoal }}>iv Ambassador</span>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 24px' }}>

        {/* Title */}
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.gold, marginBottom: 8 }}>iv Ambassador</p>
          <h1 style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '2rem', fontStyle: 'italic', fontWeight: 600, color: C.charcoal, margin: '0 0 10px' }}>
            Share your ritual.
          </h1>
          <p style={{ fontSize: '0.85rem', color: C.muted, margin: 0, lineHeight: 1.7, fontWeight: 300, maxWidth: 480 }}>
            When a friend places their first order using your link, you both receive 10% off — and they discover a ritual that was made for them.
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { icon: Users,  label: 'Invited',   value: data?.stats.invited   ?? 0 },
            { icon: Award,  label: 'Converted',  value: data?.stats.converted ?? 0 },
            { icon: Gift,   label: 'Rewards',    value: data?.stats.rewards.length ?? 0 },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} style={{ borderRadius: 14, border: `1px solid ${C.border}`, background: C.parchment, padding: '16px 18px', textAlign: 'center' }}>
              <Icon size={14} style={{ color: C.gold, marginBottom: 8 }} />
              <p style={{ fontSize: '1.4rem', fontWeight: 900, color: C.charcoal, margin: '0 0 2px', fontFamily: 'var(--iv-font-serif)' }}>{value}</p>
              <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Referral link card */}
        <div style={{ borderRadius: 18, border: `1px solid ${C.border}`, background: C.parchment, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ padding: '18px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Share2 size={14} style={{ color: C.gold }} />
            <p style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: C.gold, margin: 0 }}>Your Referral Link</p>
          </div>
          <div style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ flex: 1, padding: '11px 14px', background: C.card, borderRadius: 8, border: `1px solid ${C.border}`, fontSize: '0.8rem', color: C.espresso, fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {data?.url ?? '—'}
              </div>
              <button
                onClick={copyLink}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '11px 18px', background: copied ? 'rgba(45,106,79,0.12)' : C.gold, color: copied ? '#2D6A4F' : '#FDFAF5', border: copied ? '1px solid rgba(45,106,79,0.3)' : 'none', borderRadius: 8, fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s' }}
              >
                {copied ? <><CheckCircle2 size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
              </button>
            </div>

            {/* Share buttons */}
            <div style={{ display: 'flex', gap: 10 }}>
              <a
                href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px', borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none' }}
              >
                WhatsApp
              </a>
              <a
                href={twitterUrl} target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px', borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none' }}
              >
                Post on X
              </a>
            </div>
          </div>
        </div>

        {/* Reward codes */}
        {data && data.stats.rewards.length > 0 && (
          <div style={{ borderRadius: 18, border: `1px solid ${C.border}`, background: C.parchment, overflow: 'hidden', marginBottom: 20 }}>
            <div style={{ padding: '18px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Gift size={14} style={{ color: C.gold }} />
              <p style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: C.gold, margin: 0 }}>Your Ambassador Rewards</p>
            </div>
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {data.stats.rewards.map(code => (
                <div key={code} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: C.card, borderRadius: 10, border: `1px solid ${C.border}` }}>
                  <div>
                    <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, margin: '0 0 3px' }}>10% off — single use</p>
                    <p style={{ fontSize: '1rem', fontWeight: 900, color: C.charcoal, margin: 0, fontFamily: 'monospace', letterSpacing: '0.1em' }}>{code}</p>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(code)}
                    style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '8px 14px', background: C.gold, color: '#FDFAF5', border: 'none', borderRadius: 7, fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}
                  >
                    <Copy size={11} /> Copy
                  </button>
                </div>
              ))}
              <p style={{ fontSize: '0.7rem', color: C.muted, margin: 0, fontWeight: 300 }}>
                Apply at checkout. Each code is single-use and expires after redemption.
              </p>
            </div>
          </div>
        )}

        {/* Referral history */}
        {data && data.referrals.length > 0 && (
          <div style={{ borderRadius: 18, border: `1px solid ${C.border}`, background: C.parchment, overflow: 'hidden', marginBottom: 20 }}>
            <div style={{ padding: '18px 24px', borderBottom: `1px solid ${C.border}` }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: C.gold, margin: 0 }}>Invitation History</p>
            </div>
            <div style={{ padding: '8px 0' }}>
              {data.referrals.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: i < data.referrals.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <p style={{ fontSize: '0.8rem', color: C.espresso, margin: 0 }}>
                    {r.refereeEmail ?? <span style={{ color: C.muted, fontStyle: 'italic' }}>Awaiting signup</span>}
                  </p>
                  <span style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 99, background: 'rgba(145,56,50,0.06)', border: `1px solid ${C.border}`, color: r.status === 'REWARDED' ? '#2D6A4F' : C.muted }}>
                    {r.status === 'REWARDED' ? 'Rewarded' : r.status === 'ATTRIBUTED' ? 'Signed up' : 'Invited'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How it works */}
        <div style={{ borderRadius: 18, border: `1px solid ${C.border}`, background: C.parchment, padding: '20px 24px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: C.gold, margin: '0 0 16px' }}>How it works</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              ['Share your link', 'Copy and send your unique link to anyone you think would love Isola Vitale.'],
              ['They place their first order', 'When they complete their first purchase using your link, the reward triggers automatically.'],
              ['You both receive 10% off', 'Your discount code appears here and is emailed to you instantly. Theirs applies at checkout.'],
            ].map(([title, desc], i) => (
              <div key={i} style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(145,56,50,0.08)', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <span style={{ fontSize: '0.6rem', fontWeight: 900, color: C.gold }}>{i + 1}</span>
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, color: C.charcoal, margin: '0 0 3px' }}>{title}</p>
                  <p style={{ fontSize: '0.75rem', color: C.muted, margin: 0, fontWeight: 300, lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.7rem', color: C.muted, margin: '18px 0 0', fontWeight: 300, lineHeight: 1.6, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
            Self-referrals are not permitted. One reward per unique friend. Codes expire after first use.
          </p>
        </div>

      </div>
    </div>
  )
}
