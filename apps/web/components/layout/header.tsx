'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X, User, Heart, ChevronDown, ArrowRight } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useWishlist } from '@/lib/wishlist-context'
import { useSession, signOut } from 'next-auth/react'
import { CartDrawer } from './cart-drawer'
import { usePathname } from 'next/navigation'

const NAV = [
  { name: 'Shop All',     href: '/shop'        },
  { name: 'The Science',  href: '/science'     },
  { name: 'The System',   href: '/system'      },
  { name: 'Ingredients',  href: '/ingredients' },
  { name: 'Routines',     href: '/routines'    },
  { name: 'Journal',      href: '/journal'     },
  { name: 'About',        href: '/about'       },
]

const TIERS = [
  { name: 'T1 — Preservation',  href: '/shop?tier=t1', sub: 'Barrier & daily resilience'       },
  { name: 'T2 — Refinement',    href: '/shop?tier=t2', sub: 'Metabolic support & correction'   },
  { name: 'T3 — Regeneration',  href: '/shop?tier=t3', sub: 'Deep cellular renewal'            },
  { name: 'T4 — Longevity',     href: '/shop?tier=t4', sub: 'Maximum-potency intervention'     },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [tierOpen, setTierOpen]     = useState(false)
  const [mobileTierOpen, setMobileTierOpen] = useState(false)
  const { state: { items: cartItems }, setCartOpen } = useCart()
  const { state: { items: wishlistItems } } = useWishlist()
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const tierRef  = useRef<HTMLDivElement>(null)

  const cartCount     = cartItems.reduce((s, i) => s + i.quantity, 0)
  const wishlistCount = wishlistItems.length

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  // Close tier dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (tierRef.current && !tierRef.current.contains(e.target as Node)) {
        setTierOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const user      = session?.user as { name?: string; role?: string } | undefined
  const firstName = user?.name?.split(' ')[0]
  const isB2B     = ['PROFESSIONAL', 'ADMIN', 'OWNER'].includes(user?.role ?? '')

  return (
    <>
      {/* ── Main header bar ───────────────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50, width: '100%',
        backgroundColor: 'rgba(253,250,245,0.97)',
        borderBottom: '1px solid rgba(155, 71, 34,0.12)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', height: 60, gap: 0 }}>

            {/* ── Logo ── */}
            <Link href="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
              <span style={{
                fontFamily: 'var(--iv-font-serif)', fontSize: '1.15rem', fontWeight: 600,
                color: 'var(--iv-charcoal)', letterSpacing: '0.06em',
              }}>
                LIRI <em style={{ color: 'var(--iv-ochre)', fontStyle: 'italic' }}>ROMA</em>
              </span>
            </Link>

            {/* ── Desktop nav (md+) ── */}
            <nav style={{ display: 'none', alignItems: 'center', gap: '1.5rem', marginLeft: '2rem', flex: 1 }}
              className="md-nav">
              {/* Tier dropdown */}
              <div ref={tierRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setTierOpen(o => !o)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: 'var(--iv-charcoal)', opacity: 0.85,
                    padding: '4px 0',
                  }}
                >
                  Shop by Tier
                  <ChevronDown size={11} style={{ transition: 'transform 0.2s', transform: tierOpen ? 'rotate(180deg)' : 'none' }} />
                </button>

                {tierOpen && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                    minWidth: 240, zIndex: 100,
                    background: '#FDFAF5',
                    border: '1px solid rgba(155, 71, 34,0.14)',
                    borderRadius: 10,
                    boxShadow: '0 16px 48px rgba(60,30,20,0.12)',
                    overflow: 'hidden',
                  }}>
                    {TIERS.map(tier => (
                      <Link key={tier.href} href={tier.href} onClick={() => setTierOpen(false)}
                        style={{ display: 'block', padding: '11px 18px', textDecoration: 'none', borderBottom: '1px solid rgba(155, 71, 34,0.07)' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(155, 71, 34,0.04)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--iv-charcoal)', letterSpacing: '0.06em' }}>{tier.name}</span>
                        <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--iv-text-muted)', marginTop: 1, fontWeight: 400 }}>{tier.sub}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {NAV.map(item => (
                <Link key={item.href} href={item.href} style={{
                  fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'var(--iv-charcoal)', opacity: 0.85,
                  textDecoration: 'none', transition: 'opacity 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = 'var(--iv-ochre)'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.color = 'var(--iv-charcoal)'; }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* ── Right-side icons ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>

              {/* Professional portal — desktop only */}
              <Link href="/login/professional"
                className="pro-portal-link"
                style={{
                  display: 'none', alignItems: 'center',
                  fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: 'var(--iv-ochre)',
                  background: 'rgba(155, 71, 34,0.07)',
                  border: '1px solid rgba(155, 71, 34,0.22)',
                  borderRadius: 100, padding: '4px 12px',
                  textDecoration: 'none', marginRight: 8,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--iv-ochre)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(155, 71, 34,0.07)'; e.currentTarget.style.color = 'var(--iv-ochre)'; }}
              >
                Professional
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 8, color: 'var(--iv-charcoal)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(155, 71, 34,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span style={{ position: 'absolute', top: 4, right: 4, width: 14, height: 14, borderRadius: '50%', background: 'var(--iv-ochre)', color: '#fff', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button onClick={() => setCartOpen(true)}
                style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--iv-charcoal)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(155, 71, 34,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span style={{ position: 'absolute', top: 4, right: 4, width: 14, height: 14, borderRadius: '50%', background: 'var(--iv-ochre)', color: '#fff', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Account — desktop only */}
              <Link href={session ? '/account' : '/login'}
                className="account-icon-link"
                style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 8, color: 'var(--iv-charcoal)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(155, 71, 34,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <User size={18} />
              </Link>

              {/* ── Mobile hamburger — ALWAYS VISIBLE on mobile ── */}
              <button
                onClick={() => setMobileOpen(o => !o)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                className="mobile-hamburger"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 40, height: 40, borderRadius: 8, background: 'none',
                  border: 'none', cursor: 'pointer', color: 'var(--iv-charcoal)',
                }}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Full-screen mobile overlay ────────────────────────────────────── */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: 'fixed', inset: 0, zIndex: 49,
            background: '#FDFAF5',
            display: 'flex', flexDirection: 'column',
            overflowY: 'auto',
            // Slide in from right
            animation: 'mobileMenuIn 0.28s cubic-bezier(0.22,1,0.36,1) both',
          }}
        >
          {/* Top bar — logo + close */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 20px', height: 60, flexShrink: 0,
            borderBottom: '1px solid rgba(155, 71, 34,0.10)',
          }}>
            <Link href="/" style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--iv-charcoal)', letterSpacing: '0.06em', textDecoration: 'none' }}
              onClick={() => setMobileOpen(false)}>
              LIRI <em style={{ color: 'var(--iv-ochre)' }}>ROMA</em>
            </Link>
            <button onClick={() => setMobileOpen(false)}
              style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--iv-charcoal)', borderRadius: 8 }}>
              <X size={20} />
            </button>
          </div>

          {/* Nav content */}
          <div style={{ flex: 1, padding: '8px 0 32px' }}>

            {/* Greeting for logged-in users */}
            {session && firstName && (
              <div style={{ padding: '16px 24px 12px', borderBottom: '1px solid rgba(155, 71, 34,0.08)' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--iv-ochre)', marginBottom: 2 }}>
                  {isB2B ? 'Professional Account' : 'Your Account'}
                </p>
                <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--iv-charcoal)', fontFamily: 'var(--iv-font-serif)', fontStyle: 'italic' }}>
                  Welcome back, {firstName}.
                </p>
              </div>
            )}

            {/* Shop by Tier accordion */}
            <div style={{ borderBottom: '1px solid rgba(155, 71, 34,0.08)' }}>
              <button
                onClick={() => setMobileTierOpen(o => !o)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '18px 24px', background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--iv-charcoal)',
                }}
              >
                Shop by Tier
                <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: mobileTierOpen ? 'rotate(180deg)' : 'none', color: 'var(--iv-ochre)' }} />
              </button>
              {mobileTierOpen && (
                <div style={{ padding: '4px 0 12px', background: 'rgba(155, 71, 34,0.03)' }}>
                  {TIERS.map(tier => (
                    <Link key={tier.href} href={tier.href} onClick={() => setMobileOpen(false)}
                      style={{ display: 'block', padding: '12px 32px', textDecoration: 'none' }}>
                      <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--iv-charcoal)', letterSpacing: '0.04em' }}>{tier.name}</span>
                      <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--iv-text-muted)', marginTop: 1 }}>{tier.sub}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Main nav links */}
            {NAV.map(item => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '18px 24px', textDecoration: 'none',
                  fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: 'var(--iv-charcoal)',
                  borderBottom: '1px solid rgba(155, 71, 34,0.06)',
                }}
              >
                {item.name}
                <ArrowRight size={14} style={{ color: 'rgba(155, 71, 34,0.3)' }} />
              </Link>
            ))}

            {/* Professional portal */}
            <div style={{ margin: '20px 20px 0' }}>
              <Link href="/login/professional" onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '14px 20px', borderRadius: 10, textDecoration: 'none',
                  background: 'rgba(155, 71, 34,0.06)', border: '1px solid rgba(155, 71, 34,0.18)',
                  fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--iv-ochre)',
                }}
              >
                Professional Portal
              </Link>
            </div>

            {/* Account actions */}
            <div style={{ margin: '12px 20px 0' }}>
              {status === 'authenticated' ? (
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link href="/account" onClick={() => setMobileOpen(false)}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: '13px', borderRadius: 10, textDecoration: 'none',
                      background: 'var(--iv-ochre)', color: '#fff',
                      fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                    }}
                  >
                    My Account
                  </Link>
                  <button onClick={() => { signOut({ callbackUrl: '/' }); setMobileOpen(false) }}
                    style={{
                      padding: '13px 16px', borderRadius: 10, border: '1px solid rgba(155, 71, 34,0.18)',
                      background: 'transparent', cursor: 'pointer',
                      fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: 'var(--iv-text-muted)',
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '13px', borderRadius: 10, textDecoration: 'none',
                    background: 'var(--iv-ochre)', color: '#fff',
                    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                  }}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Bottom brand note */}
          <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(155, 71, 34,0.08)', textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(155, 71, 34,0.4)' }}>
              Formulated at Isola del Liri · Italy
            </p>
          </div>
        </div>
      )}

      <CartDrawer />
    </>
  )
}
