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

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, width: '100%', backgroundColor: 'rgba(6,12,9,0.97)', borderBottom: '1px solid rgba(184,151,47,0.2)', backdropFilter: 'blur(20px)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.06em' }}>ISOLA VITALE</span>
              <span style={{ width: 1, height: 18, backgroundColor: 'rgba(184,151,47,0.4)', display: 'inline-block', marginLeft: 4 }} />
              <span style={{ fontSize: '0.6rem', fontWeight: 600, color: 'rgba(184,151,47,0.8)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Milano</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center" style={{ gap: '2rem', marginLeft: '2.5rem' }}>
            {/* Tiers Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsTierDropdownOpen(true)}
              onMouseLeave={() => setIsTierDropdownOpen(false)}
            >
              <button style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(245,230,192,0.75)', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                Shop by Tier
                <svg style={{ width: 12, height: 12, transition: 'transform 0.2s', transform: isTierDropdownOpen ? 'rotate(180deg)' : 'none' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {isTierDropdownOpen && (
                <div style={{ position: 'absolute', top: '100%', left: 0, paddingTop: 8, minWidth: 200, zIndex: 100 }}>
                  <div style={{ backgroundColor: '#0D2B20', border: '1px solid rgba(184,151,47,0.25)', borderRadius: 8, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                    {tiers.map((tier) => (
                      <Link
                        key={tier.name}
                        href={tier.href}
                        style={{ display: 'block', padding: '10px 18px', fontSize: '0.78rem', color: 'rgba(245,230,192,0.8)', letterSpacing: '0.05em', transition: 'all 0.15s ease' }}
                        onMouseEnter={e => { (e.target as HTMLElement).style.backgroundColor = 'rgba(184,151,47,0.1)'; (e.target as HTMLElement).style.color = '#D4B450'; }}
                        onMouseLeave={e => { (e.target as HTMLElement).style.backgroundColor = 'transparent'; (e.target as HTMLElement).style.color = 'rgba(245,230,192,0.8)'; }}
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
                style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(245,230,192,0.75)', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s ease' }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = '#D4B450'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(245,230,192,0.75)'; }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center" style={{ gap: '1rem' }}>
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
            <div style={{ backgroundColor: '#0D2B20', borderBottom: '1px solid rgba(184,151,47,0.2)', padding: '12px 16px' }}>
              <div style={{ paddingBottom: 8, borderBottom: '1px solid rgba(184,151,47,0.15)', marginBottom: 8 }}>
                <span style={{ display: 'block', padding: '4px 8px', fontSize: '0.65rem', fontWeight: 700, color: 'rgba(184,151,47,0.8)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Shop by Tier</span>
                {tiers.map((tier) => (
                  <Link
                    key={tier.name}
                    href={tier.href}
                    style={{ display: 'block', padding: '8px 12px', fontSize: '0.82rem', color: 'rgba(245,230,192,0.8)', letterSpacing: '0.04em' }}
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
                  style={{ display: 'block', padding: '10px 12px', fontSize: '0.82rem', color: 'rgba(245,230,192,0.8)', letterSpacing: '0.05em', borderRadius: 6 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
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
