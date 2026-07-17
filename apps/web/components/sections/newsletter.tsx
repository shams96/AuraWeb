'use client'

import { useState } from 'react'
import { Mail, Check, Star, Shield } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const r = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!r.ok) {
        const d = await r.json()
        throw new Error(d.error ?? 'Subscription failed')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 bg-iv-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-iv-gold/[0.02] pointer-events-none"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-iv-white mb-6 uppercase tracking-widest">
              Join the Chiarelle Society
            </h2>
            <p className="text-xl text-iv-cream/70 leading-relaxed max-w-2xl mx-auto">
              Subscribe for exclusive access to advanced formulations,
              private events, and the latest in metabolic skincare science.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="bg-iv-deep-green/30 rounded-2xl shadow-2xl p-10 max-w-2xl mx-auto border border-iv-gold/10 backdrop-blur-md">
            {submitted ? (
              <div className="flex flex-col items-center space-y-4 py-6">
                <div className="w-14 h-14 rounded-full bg-iv-gold/10 border border-iv-gold/30 flex items-center justify-center">
                  <Check className="w-7 h-7 text-iv-gold" />
                </div>
                <p className="text-iv-white font-bold text-lg uppercase tracking-widest">Welcome to the Society</p>
                <p className="text-iv-cream/65 text-sm">You&apos;ll receive your first dispatch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    placeholder="Your email address"
                    className="flex-1 px-6 py-4 bg-iv-black border border-iv-gold/20 rounded-md focus:outline-none focus:border-iv-gold text-iv-white placeholder-iv-white/20 transition-all font-medium"
                    required
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-iv-gold hover:bg-iv-gold-light disabled:opacity-60 text-iv-black px-10 py-4 rounded-md font-bold transition-all flex items-center justify-center space-x-3 uppercase tracking-widest text-xs shadow-lg hover:shadow-iv-gold/20"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{loading ? 'Joining…' : 'Join Now'}</span>
                  </button>
                </div>
                {error && (
                  <p className="mt-3 text-red-400 text-xs font-medium">{error}</p>
                )}
              </form>
            )}

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-3">
                <Check className="w-4 h-4 text-iv-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest text-iv-cream/65">Exclusive access</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Star className="w-4 h-4 text-iv-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest text-iv-cream/65">Science reports</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Check className="w-4 h-4 text-iv-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest text-iv-cream/65">Early releases</span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-10">
            <div className="flex items-center space-x-3 text-iv-cream/65">
              <Shield className="w-5 h-5 text-iv-gold/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Privacy Secured</span>
            </div>
            <div className="flex items-center space-x-3 text-iv-cream/65">
              <Mail className="w-5 h-5 text-iv-gold/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Curated Weekly</span>
            </div>
            <div className="flex items-center space-x-3 text-iv-cream/65">
              <Star className="w-5 h-5 text-iv-gold/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Expert Validated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
