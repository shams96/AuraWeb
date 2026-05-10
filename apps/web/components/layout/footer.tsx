import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react'

export function Footer() {
  const footerLinks = {
    product: [
      { name: 'All Products', href: '/shop' },
      { name: 'Best Sellers', href: '/shop/best-sellers' },
      { name: 'New Arrivals', href: '/shop/new-arrivals' },
      { name: 'Bundles', href: '/shop/bundles' },
    ],
    routines: [
      { name: 'Morning Routine', href: '/routines/morning' },
      { name: 'Evening Routine', href: '/routines/evening' },
      { name: 'Sensitive Skin', href: '/routines/sensitive' },
      { name: 'Acne-Prone', href: '/routines/acne' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Press', href: '/press' },
      { name: 'Careers', href: '/careers' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Shipping', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
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
            <div className="flex items-center">
              <span className="text-3xl font-bold tracking-tighter text-iv-white uppercase tracking-widest">Isola <span className="text-iv-gold italic serif">Vitale</span></span>
            </div>
            <p className="text-iv-cream text-opacity-60 leading-relaxed font-light text-sm max-w-sm">
              The Italian Scientific Authority in Age-Appropriate Perfection. Bridging the gap between ancient botanical wisdom and 2026 pharmaceutical breakthroughs.
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

          {/* Product Links */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-iv-white uppercase tracking-[0.2em]">Acquisitions</h3>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-iv-cream text-opacity-40 hover:text-iv-gold transition-colors text-[11px] font-medium uppercase tracking-widest"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Protocols Links */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-iv-white uppercase tracking-[0.2em]">Protocols</h3>
            <ul className="space-y-4">
              {footerLinks.routines.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-iv-cream text-opacity-40 hover:text-iv-gold transition-colors text-[11px] font-medium uppercase tracking-widest"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-iv-white uppercase tracking-[0.2em]">The House</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-iv-cream text-opacity-40 hover:text-iv-gold transition-colors text-[11px] font-medium uppercase tracking-widest"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-iv-white uppercase tracking-[0.2em]">Concierge</h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-iv-cream text-opacity-40 hover:text-iv-gold transition-colors text-[11px] font-medium uppercase tracking-widest"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-iv-gold" style={{ borderColor: 'rgba(184, 151, 47, 0.1)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[10px] font-black uppercase tracking-widest text-iv-cream text-opacity-40">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4" style={{ color: 'rgba(184, 151, 47, 0.6)' }} />
              <span>shams@1hubsolutions.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4" style={{ color: 'rgba(184, 151, 47, 0.6)' }} />
              <span>+1 (214) 1HubSolutions</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4" style={{ color: 'rgba(184, 151, 47, 0.6)' }} />
              <span>Allen, Texas &middot; Isola del Liri, Italy</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-iv-gold flex flex-col md:flex-row justify-between items-center gap-8" style={{ borderColor: 'rgba(184, 151, 47, 0.1)' }}>
          <p className="text-[10px] font-black uppercase tracking-widest text-iv-cream text-opacity-30">
            &copy; {new Date().getFullYear()} Isola Vitale. A 1HubSolutions LLC Company.
          </p>
          <div className="flex flex-wrap justify-center space-x-8">
            <Link href="/privacy" className="text-[10px] font-black uppercase tracking-widest text-iv-cream text-opacity-30 hover:text-iv-gold transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-[10px] font-black uppercase tracking-widest text-iv-cream text-opacity-30 hover:text-iv-gold transition-colors">
              Terms
            </Link>
            <Link href="/accessibility" className="text-[10px] font-black uppercase tracking-widest text-iv-cream text-opacity-30 hover:text-iv-gold transition-colors">
              Accessibility
            </Link>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-iv-gold text-opacity-40 flex items-center">
            <Heart className="h-3 w-3 mr-2" />
            Designed for Metabolic Longevity
          </p>
        </div>
      </div>
    </footer>
  )
}
