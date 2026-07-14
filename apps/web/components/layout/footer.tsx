import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react'
import { Wordmark } from '@/components/brand/wordmark'

export function Footer() {
  const footerLinks = {
    collection: [
      { name: 'The Collection', href: '/shop' },
      { name: 'Liri Essence™', href: '/shop' },
      { name: 'Preservation Protocol', href: '/shop?tier=t1' },
      { name: 'Ritual Membership', href: '/account/subscription' },
    ],
    science: [
      { name: 'The Ritual System', href: '/system' },
      { name: 'The Science', href: '/system#science' },
      { name: 'Clinical Results', href: '/clinical-results' },
      { name: 'The Isola Journal', href: '/journal' },
    ],
    house: [
      { name: 'Our Story', href: '/about' },
      { name: 'Isola del Liri', href: '/about#origin' },
      { name: 'Press', href: '/press' },
      { name: 'Careers', href: '/careers' },
    ],
    concierge: [
      { name: 'Contact Concierge', href: '/contact' },
      { name: 'Skin Consultation', href: '/#skin-scan' },
      { name: 'iv Circle', href: '/loyalty' },
      { name: 'Professional Access', href: '/login/professional' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
  ]

  return (
    <footer className="bg-iv-black border-t border-iv-gold" style={{ borderColor: 'rgba(184, 151, 47, 0.1)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-1">
              <Wordmark size="1.6rem" color="var(--iv-white)" />
            </div>
            <p className="text-iv-cream text-opacity-60 leading-relaxed font-light text-sm max-w-sm">
              The world's first Adaptive Skin Science™ house. La Bella Figura — the Italian practice of living beautifully — expressed through biological resilience. Formulated at Isola del Liri, Italy.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-iv-cream text-opacity-30 hover:text-iv-gold transition-all duration-300 transform hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Collection */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-iv-white uppercase tracking-[0.2em]">The Collection</h3>
            <ul className="space-y-4">
              {footerLinks.collection.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-iv-gold transition-colors text-[11px] font-medium uppercase tracking-widest" style={{ color: 'rgba(250,247,240,0.75)' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Science */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-iv-white uppercase tracking-[0.2em]">The Science</h3>
            <ul className="space-y-4">
              {footerLinks.science.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-iv-gold transition-colors text-[11px] font-medium uppercase tracking-widest" style={{ color: 'rgba(250,247,240,0.75)' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* The House */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-iv-white uppercase tracking-[0.2em]">The House</h3>
            <ul className="space-y-4">
              {footerLinks.house.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-iv-gold transition-colors text-[11px] font-medium uppercase tracking-widest" style={{ color: 'rgba(250,247,240,0.75)' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Concierge */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-iv-white uppercase tracking-[0.2em]">Concierge</h3>
            <ul className="space-y-4">
              {footerLinks.concierge.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-iv-gold transition-colors text-[11px] font-medium uppercase tracking-widest" style={{ color: 'rgba(250,247,240,0.75)' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-iv-gold" style={{ borderColor: 'rgba(184, 151, 47, 0.1)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(250,247,240,0.75)' }}>
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4" style={{ color: 'rgba(184, 151, 47, 0.6)' }} />
              <span>concierge@liriroma.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4" style={{ color: 'rgba(184, 151, 47, 0.6)' }} />
              <span>+1 (214) 714-3597</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4" style={{ color: 'rgba(184, 151, 47, 0.6)' }} />
              <span>Allen, Texas &middot; Isola del Liri, Italy</span>
            </div>
          </div>
        </div>

        {/* Country / Currency selector */}
        <div className="mt-10 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3">
            <span style={{ fontSize: '1.2rem' }}>🇺🇸</span>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: 'rgba(250,247,240,0.75)' }}>Shipping to</p>
              <p className="text-[11px] font-bold" style={{ color: 'rgba(250,247,240,0.70)' }}>United States · USD ($)</p>
            </div>
            <select
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(250,247,240,0.75)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }}
              defaultValue="US"
            >
              <option value="US">United States (USD)</option>
              <option value="GB">United Kingdom (GBP)</option>
              <option value="EU">European Union (EUR)</option>
              <option value="CA">Canada (CAD)</option>
              <option value="AU">Australia (AUD)</option>
              <option value="JP">Japan (JPY)</option>
              <option value="AE">UAE (AED)</option>
            </select>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="text-[10px] font-black uppercase tracking-widest hover:text-iv-gold transition-colors" style={{ color: 'rgba(250,247,240,0.65)' }}>
              Privacy
            </Link>
            <Link href="/terms" className="text-[10px] font-black uppercase tracking-widest hover:text-iv-gold transition-colors" style={{ color: 'rgba(250,247,240,0.65)' }}>
              Terms
            </Link>
            <Link href="/accessibility" className="text-[10px] font-black uppercase tracking-widest hover:text-iv-gold transition-colors" style={{ color: 'rgba(250,247,240,0.65)' }}>
              Accessibility
            </Link>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(250,247,240,0.55)' }}>
            &copy; {new Date().getFullYear()} LIRI ROMA · Allen, TX · Isola del Liri, Italy
          </p>
        </div>
      </div>
    </footer>
  )
}
