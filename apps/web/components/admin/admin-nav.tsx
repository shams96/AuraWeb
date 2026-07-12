'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingBag, BarChart3, RotateCcw, Megaphone } from 'lucide-react'

const NAV = [
  { href: '/admin',           label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/admin/products',  label: 'Products',   icon: Package },
  { href: '/admin/orders',    label: 'Orders',     icon: ShoppingBag },
  { href: '/admin/returns',   label: 'Returns',    icon: RotateCcw },
  { href: '/admin/campaigns', label: 'Campaigns',  icon: Megaphone },
  { href: '/admin/analytics', label: 'Analytics',  icon: BarChart3 },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 p-4 space-y-1">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
            style={{
              color:      active ? 'var(--iv-white)'    : 'rgba(253,250,245,0.55)',
              background: active ? 'rgba(155, 71, 34,0.18)' : 'transparent',
              borderLeft: active ? '2px solid var(--iv-gold)' : '2px solid transparent',
            }}
          >
            <Icon size={16} style={{ color: active ? 'var(--iv-gold)' : undefined }} />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
