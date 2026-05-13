'use client'

import { useState } from 'react'
import Link from 'next/link'
import { RotateCcw, Check, Loader2 } from 'lucide-react'

const REASONS = [
  'Not right for my skin type',
  'Product arrived damaged',
  'Wrong item received',
  'Changed my mind',
  'Did not meet expectations',
  'Adverse skin reaction',
  'Other',
]

export default function ReturnsPage() {
  const [form, setForm] = useState({ orderNumber: '', reason: '', details: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const r = await fetch('/api/returns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!r.ok) {
        const d = await r.json()
        throw new Error(d.error ?? 'Submission failed')
      }
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-iv-black flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center py-24">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.20)' }}
          >
            <Check className="w-10 h-10" style={{ color: '#4ade80' }} />
          </div>
          <h1 className="text-3xl font-bold text-iv-white mb-4" style={{ fontFamily: 'var(--iv-font-serif)' }}>
            Return Request Submitted
          </h1>
          <p className="text-iv-cream/50 font-light leading-relaxed mb-10 max-w-sm mx-auto">
            We&apos;ll review your request and respond within 2 business days with return instructions.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/shop" className="btn-luxury" style={{ padding: '13px 30px', display: 'inline-flex', alignItems: 'center', fontSize: '0.7rem', letterSpacing: '0.18em' }}>
              Continue Shopping
            </Link>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 26px', border: '1px solid rgba(253,250,245,0.18)', color: 'rgba(253,250,245,0.65)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', borderRadius: 4 }}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-iv-black pb-32">
      {/* Hero */}
      <section
        className="border-b pt-32 pb-20 relative overflow-hidden"
        style={{ background: 'var(--iv-deep-green)', borderColor: 'rgba(145,56,50,0.12)' }}
      >
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div
            className="inline-block rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
            style={{ color: 'var(--iv-gold)', border: '1px solid rgba(145,56,50,0.20)', background: 'rgba(145,56,50,0.05)' }}
          >
            Satisfaction
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-iv-white" style={{ fontFamily: 'var(--iv-font-serif)' }}>
            Returns &amp; <span style={{ color: 'var(--iv-gold)' }}>Policy</span>
          </h1>
          <p className="text-xl text-iv-cream/60 max-w-2xl leading-relaxed font-light">
            We stand behind every formulation. If your protocol isn&apos;t right for you,
            we&apos;ll make it right — no questions, within 30 days.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl py-20">
        <div className="grid md:grid-cols-[1fr_420px] gap-12">

          {/* Policy */}
          <div className="space-y-8">
            <div
              className="rounded-2xl p-8"
              style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}
            >
              <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: 'var(--iv-gold)' }}>30-Day Guarantee</p>
              <p className="text-iv-cream/60 leading-relaxed font-light text-sm">
                You have 30 days from delivery to evaluate your protocol. If you experience unexpected reactions or are dissatisfied with the results, initiate a return below.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-iv-cream/40">The Process</p>
              {[
                ['01', 'Submit the form with your order number and reason'],
                ['02', 'We review and send a pre-paid returns label within 48 hrs'],
                ['03', 'Refund processed within 5–7 days of receipt'],
              ].map(([n, t]) => (
                <div key={n} className="flex gap-4 items-start">
                  <span className="text-[10px] font-black w-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--iv-gold)' }}>{n}.</span>
                  <p className="text-sm text-iv-cream/60 font-light">{t}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-iv-cream/25 font-light pt-4 border-t" style={{ borderColor: 'rgba(145,56,50,0.10)' }}>
              Clinical A-Series (B2B) products are subject to separate terms specified in your professional portal agreement.
            </p>
          </div>

          {/* Form */}
          <div
            className="rounded-2xl p-8 self-start"
            style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(145,56,50,0.12)' }}>
                <RotateCcw size={16} style={{ color: 'var(--iv-gold)' }} />
              </div>
              <p className="text-sm font-semibold text-iv-white">Initiate Return</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-iv-cream/40 mb-1.5">
                  Order Number *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. IV-00123"
                  value={form.orderNumber}
                  onChange={e => setForm(f => ({ ...f, orderNumber: e.target.value }))}
                  className="w-full rounded-xl px-4 py-3 text-sm text-iv-white placeholder-iv-cream/20 outline-none"
                  style={{ background: 'rgba(145,56,50,0.07)', border: '1px solid rgba(145,56,50,0.18)' }}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-iv-cream/40 mb-1.5">
                  Reason *
                </label>
                <select
                  required
                  value={form.reason}
                  onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
                  className="w-full rounded-xl px-4 py-3 text-sm text-iv-white outline-none"
                  style={{ background: 'rgba(145,56,50,0.07)', border: '1px solid rgba(145,56,50,0.18)' }}
                >
                  <option value="">Select a reason…</option>
                  {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-iv-cream/40 mb-1.5">
                  Details <span className="font-light normal-case tracking-normal text-iv-cream/25">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Any additional context, reactions, or feedback…"
                  value={form.details}
                  onChange={e => setForm(f => ({ ...f, details: e.target.value }))}
                  className="w-full rounded-xl px-4 py-3 text-sm text-iv-white placeholder-iv-cream/20 outline-none resize-none"
                  style={{ background: 'rgba(145,56,50,0.07)', border: '1px solid rgba(145,56,50,0.18)' }}
                />
              </div>

              {error && (
                <div className="px-4 py-3 rounded-xl text-sm text-red-300" style={{ background: 'rgba(145,56,50,0.15)', border: '1px solid rgba(145,56,50,0.25)' }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-luxury w-full flex items-center justify-center gap-2"
                style={{ padding: '14px', fontSize: '0.7rem', letterSpacing: '0.2em' }}
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <RotateCcw size={14} />}
                Submit Request
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
