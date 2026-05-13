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
    { name: 'Shop',       href: '/shop' },
    { name: 'The System', href: '/system' },
    { name: 'Science',    href: '/science' },
    { name: 'Results',    href: '/clinical-results' },
    { name: 'Protocols',  href: '/routines' },
    { name: 'Journal',    href: '/journal' },
    { name: 'iv Circle',  href: '/loyalty' },
  ]

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, width: '100%', backgroundColor: 'rgba(253,250,245,0.97)', borderBottom: '1px solid rgba(145,56,50,0.12)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2.5">
              <span style={{ fontFamily: 'var(--iv-font-serif)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--iv-white)', letterSpacing: '0.08em' }}>ISOLA VITALE</span>
              <span style={{ width: 1, height: 16, backgroundColor: 'rgba(145,56,50,0.28)', display: 'inline-block' }} />
              <span style={{ fontSize: '0.55rem', fontWeight: 700, color: 'var(--iv-gold)', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.70 }}>Milano</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center" style={{ gap: '1.75rem', marginLeft: '2rem' }}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--iv-cream)', letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'color 0.2s ease', opacity: 0.70 }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--iv-gold)'; (e.target as HTMLElement).style.opacity = '1'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--iv-cream)'; (e.target as HTMLElement).style.opacity = '0.70'; }}
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
            <div style={{ backgroundColor: 'var(--iv-black)', borderBottom: '1px solid rgba(145,56,50,0.12)', padding: '12px 16px' }}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{ display: 'block', padding: '10px 12px', fontSize: '0.82rem', color: 'var(--iv-cream)', letterSpacing: '0.05em', borderRadius: 6 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(145,56,50,0.10)' }}>
                <Link href="/professional" style={{ display: 'block', padding: '10px 12px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--iv-gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }} onClick={() => setIsMenuOpen(false)}>
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
