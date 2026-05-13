import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = { title: 'Order Confirmed' }

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  return (
    <div className="min-h-screen bg-iv-black flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center py-24">

        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ background: 'rgba(145,56,50,0.12)', border: '1px solid rgba(145,56,50,0.30)' }}
        >
          <CheckCircle2 className="w-10 h-10" style={{ color: 'var(--iv-gold)' }} />
        </div>

        <div
          className="inline-block rounded-full px-6 py-2 text-[11px] font-black uppercase tracking-[0.3em] mb-6"
          style={{ color: 'var(--iv-gold)', border: '1px solid rgba(145,56,50,0.20)', background: 'rgba(145,56,50,0.05)' }}
        >
          Payment Confirmed
        </div>

        <h1 className="iv-type-h2 font-bold text-iv-white mb-4" style={{ fontFamily: 'var(--iv-font-serif)' }}>
          Your Protocol is on its Way
        </h1>

        <p className="text-iv-cream/60 font-light leading-relaxed mb-4 max-w-md mx-auto">
          Order confirmed. A confirmation email has been sent with your order details and tracking information once dispatched from our Natural You Srl facility in Isola del Liri, Italy.
        </p>

        <div
          className="rounded-2xl p-6 mb-10 text-left"
          style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}
        >
          <p className="text-[11px] font-black uppercase tracking-[0.25em] mb-3" style={{ color: 'var(--iv-gold)' }}>
            What happens next
          </p>
          {[
            ['Within 48 hours', 'Order picking and quality check at our EU GMP facility'],
            ['3–5 working days', 'Delivery via tracked courier to your address'],
            ['Day of arrival', 'Your 48-hour Time To Wow begins'],
          ].map(([time, desc]) => (
            <div key={time} className="flex gap-4 mb-3 last:mb-0">
              <span className="text-[11px] font-black text-iv-gold uppercase tracking-widest w-28 flex-shrink-0 mt-0.5">{time}</span>
              <span className="text-sm text-iv-cream/60 font-light">{desc}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/shop"
            className="btn-luxury"
            style={{ padding: '13px 30px', display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.7rem', letterSpacing: '0.18em' }}
          >
            Continue Shopping
          </Link>
          <Link
            href="/account/orders"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 26px', border: '1px solid rgba(253,250,245,0.18)',
              color: 'rgba(253,250,245,0.65)', fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase', borderRadius: 4,
            }}
          >
            View Orders
          </Link>
        </div>

      </div>
    </div>
  )
}
