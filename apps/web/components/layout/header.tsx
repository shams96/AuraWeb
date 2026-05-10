'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Search, Menu, X, User, Heart } from 'lucide-react'
import { Button } from '@aurabiosphere/ui'
import { useCart } from '@/lib/cart-context'
import { useWishlist } from '@/lib/wishlist-context'
import { useSession, signIn, signOut } from 'next-auth/react'
import { CartDrawer } from './cart-drawer'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { state: { items: cartItems }, setCartOpen } = useCart()
  const { state: { items: wishlistItems } } = useWishlist()
  const { data: session, status } = useSession()

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlistItems.length

  const navigation = [
    { name: 'Shop All', href: '/shop' },
    { name: 'The Science', href: '/science' },
    { name: 'Results', href: '/clinical-results' },
    { name: 'The System', href: '/system' },
    { name: 'Ingredients', href: '/ingredients' },
    { name: 'Routines', href: '/routines' },
    { name: 'Journal', href: '/journal' },
    { name: 'iv Circle', href: '/loyalty' },
    { name: 'About', href: '/about' },
  ]
  
  const tiers = [
    { name: 'T1 Teen (13-19)', href: '/shop?tier=t1' },
    { name: 'T2 Twenties (20-29)', href: '/shop?tier=t2' },
    { name: 'T3 Thirties+ (30-49)', href: '/shop?tier=t3' },
    { name: 'T4 Mature+ (50+)', href: '/shop?tier=t4' },
  ]
  
  const [isTierDropdownOpen, setIsTierDropdownOpen] = useState(false)

  const OCHRE = '#913832'
  const OCHRE_HOVER = '#C05040'
  const NAV_COLOR = 'rgba(26,22,20,0.65)'
  const NAV_HOVER = OCHRE

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, width: '100%', backgroundColor: 'rgba(253,250,245,0.97)', borderBottom: '1px solid rgba(145,56,50,0.12)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2.5">
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 600, color: '#1A1614', letterSpacing: '0.08em' }}>ISOLA VITALE</span>
              <span style={{ width: 1, height: 16, backgroundColor: 'rgba(145,56,50,0.3)', display: 'inline-block' }} />
              <span style={{ fontSize: '0.55rem', fontWeight: 700, color: 'rgba(145,56,50,0.7)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Milano</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center" style={{ gap: '1.75rem', marginLeft: '2rem' }}>
            {/* Tiers Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsTierDropdownOpen(true)}
              onMouseLeave={() => setIsTierDropdownOpen(false)}
            >
              <button style={{ fontSize: '0.7rem', fontWeight: 600, color: NAV_COLOR, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                Shop by Age
                <svg style={{ width: 10, height: 10, transition: 'transform 0.2s', transform: isTierDropdownOpen ? 'rotate(180deg)' : 'none' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {isTierDropdownOpen && (
                <div style={{ position: 'absolute', top: '100%', left: 0, paddingTop: 8, minWidth: 210, zIndex: 100 }}>
                  <div style={{ backgroundColor: '#FDFAF5', border: '1px solid rgba(145,56,50,0.15)', borderRadius: 10, overflow: 'hidden', boxShadow: '0 20px 60px rgba(60,30,20,0.14)' }}>
                    {tiers.map((tier) => (
                      <Link
                        key={tier.name}
                        href={tier.href}
                        style={{ display: 'block', padding: '10px 18px', fontSize: '0.78rem', color: '#3D2B20', letterSpacing: '0.04em', transition: 'all 0.15s ease' }}
                        onMouseEnter={e => { (e.target as HTMLElement).style.backgroundColor = 'rgba(145,56,50,0.06)'; (e.target as HTMLElement).style.color = OCHRE; }}
                        onMouseLeave={e => { (e.target as HTMLElement).style.backgroundColor = 'transparent'; (e.target as HTMLElement).style.color = '#3D2B20'; }}
                        onClick={() => setIsTierDropdownOpen(false)}
                      >
                        {tier.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                style={{ fontSize: '0.7rem', fontWeight: 600, color: NAV_COLOR, letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'color 0.2s ease' }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = NAV_HOVER; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = NAV_COLOR; }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center" style={{ gap: '0.75rem' }}>
            <Link href="/professional" className="professional-portal-badge hidden md:inline-flex">
              Professional Portal
            </Link>
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden md:flex"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <div className="relative">
              <Button variant="ghost" size="icon" onClick={() => setCartOpen(true)}>
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground pointer-events-none">
                  {totalItems}
                </span>
              )}
            </div>

            {/* Account */}
            {status === 'loading' ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
            ) : session ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => signOut()}
                  className="hidden md:flex"
                >
                  <User className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden"
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => signIn()}
                className="hidden md:flex"
              >
                <User className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div style={{ backgroundColor: '#FDFAF5', borderBottom: '1px solid rgba(145,56,50,0.12)', padding: '12px 16px' }}>
              <div style={{ paddingBottom: 8, borderBottom: '1px solid rgba(145,56,50,0.10)', marginBottom: 8 }}>
                <span style={{ display: 'block', padding: '4px 8px', fontSize: '0.6rem', fontWeight: 700, color: 'rgba(145,56,50,0.6)', textTransform: 'uppercase', letterSpacing: '0.16em' }}>Shop by Age</span>
                {tiers.map((tier) => (
                  <Link
                    key={tier.name}
                    href={tier.href}
                    style={{ display: 'block', padding: '8px 12px', fontSize: '0.82rem', color: '#3D2B20', letterSpacing: '0.04em' }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {tier.name}
                  </Link>
                ))}
              </div>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{ display: 'block', padding: '10px 12px', fontSize: '0.82rem', color: '#3D2B20', letterSpacing: '0.05em', borderRadius: 6 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(145,56,50,0.10)' }}>
                <Link href="/professional" style={{ display: 'block', padding: '10px 12px', fontSize: '0.78rem', fontWeight: 700, color: '#913832', letterSpacing: '0.1em', textTransform: 'uppercase' }} onClick={() => setIsMenuOpen(false)}>
                  Professional Portal →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center justify-center h-full px-4">
              <div className="w-full max-w-2xl">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <CartDrawer />
    </header>
  )
}
