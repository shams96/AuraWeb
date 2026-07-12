'use client'

import { useState } from 'react'
import { Send, Loader2, Check } from 'lucide-react'

const TEMPLATES = [
  { id: 'newsletter', label: 'Newsletter Welcome', desc: 'Send to new subscribers — welcome + intro offer' },
  { id: 'reorder',    label: 'Protocol Reorder',   desc: '90-day follow-up — time to resupply nudge' },
  { id: 'custom',     label: 'Custom Campaign',    desc: 'Write your own subject line and body' },
]

export default function AdminCampaignsPage() {
  const [template, setTemplate]     = useState('newsletter')
  const [subject, setSubject]       = useState('')
  const [body, setBody]             = useState('')
  const [recipientType, setRecipientType] = useState<'all' | 'email'>('all')
  const [email, setEmail]           = useState('')
  const [loading, setLoading]       = useState(false)
  const [result, setResult]         = useState<{ ok: boolean; message: string } | null>(null)

  async function send() {
    setLoading(true)
    setResult(null)
    try {
      const r = await fetch('/api/admin/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template, subject, body, recipientType, email }),
      })
      const d = await r.json()
      setResult({ ok: r.ok, message: r.ok ? 'Campaign sent successfully.' : (d.error ?? 'Send failed.') })
    } catch {
      setResult({ ok: false, message: 'Network error — try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: 'var(--iv-gold)' }}>Marketing</p>
        <h1 className="text-2xl font-bold text-iv-white" style={{ fontFamily: 'var(--iv-font-serif)' }}>Campaigns</h1>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-8">

        {/* Template selector */}
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-iv-cream/55 mb-4">Template</p>
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className="w-full text-left rounded-xl px-4 py-4 transition-all"
              style={{
                background: template === t.id ? 'rgba(155, 71, 34,0.18)' : 'var(--iv-deep-green)',
                border: `1px solid ${template === t.id ? 'rgba(155, 71, 34,0.40)' : 'rgba(155, 71, 34,0.14)'}`,
              }}
            >
              <p className="text-sm font-semibold text-iv-white mb-1">{t.label}</p>
              <p className="text-xs text-iv-cream/40 font-light">{t.desc}</p>
            </button>
          ))}
        </div>

        {/* Compose */}
        <div
          className="rounded-2xl p-8"
          style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(155, 71, 34,0.14)' }}
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-iv-cream/55 mb-6">Compose</p>

          <div className="space-y-5">
            {/* Recipients */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-iv-cream/40 mb-2">Recipients</label>
              <div className="flex gap-3">
                {(['all', 'email'] as const).map(rt => (
                  <button
                    key={rt}
                    onClick={() => setRecipientType(rt)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                    style={{
                      background: recipientType === rt ? 'rgba(155, 71, 34,0.25)' : 'rgba(155, 71, 34,0.07)',
                      border: `1px solid ${recipientType === rt ? 'rgba(155, 71, 34,0.40)' : 'rgba(155, 71, 34,0.15)'}`,
                      color: recipientType === rt ? 'var(--iv-cream)' : 'rgba(253,250,245,0.40)',
                    }}
                  >
                    {rt === 'all' ? 'All Subscribers' : 'Single Email'}
                  </button>
                ))}
              </div>
            </div>

            {recipientType === 'email' && (
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-iv-cream/40 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="customer@example.com"
                  className="w-full rounded-xl px-4 py-3 text-sm text-iv-white placeholder-iv-cream/20 outline-none"
                  style={{ background: 'rgba(155, 71, 34,0.07)', border: '1px solid rgba(155, 71, 34,0.18)' }}
                />
              </div>
            )}

            {template === 'custom' && (
              <>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-iv-cream/40 mb-1.5">Subject Line</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="Your Protocol Results — Week 4 Update"
                    className="w-full rounded-xl px-4 py-3 text-sm text-iv-white placeholder-iv-cream/20 outline-none"
                    style={{ background: 'rgba(155, 71, 34,0.07)', border: '1px solid rgba(155, 71, 34,0.18)' }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-iv-cream/40 mb-1.5">Message Body (HTML or plain text)</label>
                  <textarea
                    rows={8}
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    placeholder="<p>Dear customer,</p>..."
                    className="w-full rounded-xl px-4 py-3 text-sm text-iv-white placeholder-iv-cream/20 outline-none resize-none font-mono"
                    style={{ background: 'rgba(155, 71, 34,0.07)', border: '1px solid rgba(155, 71, 34,0.18)' }}
                  />
                </div>
              </>
            )}

            {result && (
              <div
                className="px-4 py-3 rounded-xl text-sm flex items-center gap-3"
                style={{
                  background: result.ok ? 'rgba(74,222,128,0.08)' : 'rgba(155, 71, 34,0.15)',
                  border: `1px solid ${result.ok ? 'rgba(74,222,128,0.20)' : 'rgba(155, 71, 34,0.25)'}`,
                  color: result.ok ? '#4ade80' : '#fca5a5',
                }}
              >
                {result.ok && <Check size={14} />}
                {result.message}
              </div>
            )}

            <button
              onClick={send}
              disabled={loading || (template === 'custom' && (!subject || !body)) || (recipientType === 'email' && !email)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-black uppercase tracking-widest disabled:opacity-40 transition-opacity"
              style={{ background: 'var(--iv-gold)', color: 'var(--iv-white)' }}
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              Send Campaign
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
