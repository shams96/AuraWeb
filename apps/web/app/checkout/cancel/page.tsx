import type { Metadata } from 'next'
import Link from 'next/link'
import { XCircle } from 'lucide-react'

export const metadata: Metadata = { title: 'Checkout Cancelled' }

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-iv-black flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center py-24">

        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ background: 'rgba(145,56,50,0.06)', border: '1px solid rgba(145,56,50,0.18)' }}
        >
          <XCircle className="w-10 h-10" style={{ color: 'var(--iv-gold)', opacity: 0.6 }} />
        </div>

        <h1 className="iv-type-h2 font-bold text-iv-white mb-4" style={{ fontFamily: 'var(--iv-font-serif)' }}>
          Checkout Cancelled
        </h1>
        <p className="text-iv-cream/50 font-light leading-relaxed mb-10 max-w-sm mx-auto">
          No charge was made. Your cart is still saved — return whenever you're ready.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/shop" className="btn-luxury" style={{ padding: '13px 30px', display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.7rem', letterSpacing: '0.18em' }}>
            Return to Shop
          </Link>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', border: '1px solid rgba(253,250,245,0.18)', color: 'rgba(253,250,245,0.65)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', borderRadius: 4 }}>
            Need Help?
          </Link>
        </div>

      </div>
    </div>
  )
}
