import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TrendingUp, ShoppingBag, Clock, Package } from 'lucide-react'

export const metadata = { title: 'Admin Dashboard — Isola Vitale' }

async function getStats() {
  try {
    const [totalOrders, pendingOrders, totalProducts] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.product.count({ where: { status: 'ACTIVE' } }),
    ])

    const revenueResult = await prisma.order.aggregate({
      _sum: { total: true },
      where: { paymentStatus: 'PAID' },
    })

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const todayOrders = await prisma.order.count({
      where: { createdAt: { gte: todayStart } },
    })

    return {
      totalRevenue: Number(revenueResult._sum.total ?? 0),
      totalOrders,
      pendingOrders,
      todayOrders,
      activeProducts: totalProducts,
    }
  } catch {
    return { totalRevenue: 0, totalOrders: 0, pendingOrders: 0, todayOrders: 0, activeProducts: 0 }
  }
}

async function getRecentOrders() {
  try {
    return await prisma.order.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } } },
    })
  } catch {
    return []
  }
}

const STATUS_COLOURS: Record<string, string> = {
  PENDING:    'rgba(145,56,50,0.25)',
  CONFIRMED:  'rgba(31,81,41,0.35)',
  PROCESSING: 'rgba(0,95,107,0.35)',
  SHIPPED:    'rgba(31,81,41,0.55)',
  DELIVERED:  'rgba(31,81,41,0.75)',
  CANCELLED:  'rgba(145,56,50,0.45)',
  REFUNDED:   'rgba(145,56,50,0.30)',
}

export default async function AdminDashboardPage() {
  const [stats, recentOrders] = await Promise.all([getStats(), getRecentOrders()])
  const session = await getServerSession(authOptions)

  const KPI = [
    { label: 'Total Revenue',   value: `$${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, icon: TrendingUp, note: 'All paid orders' },
    { label: 'Total Orders',    value: stats.totalOrders.toString(),   icon: ShoppingBag, note: 'All time' },
    { label: 'Orders Today',    value: stats.todayOrders.toString(),   icon: Clock,       note: 'Since midnight' },
    { label: 'Pending Orders',  value: stats.pendingOrders.toString(), icon: Package,     note: 'Awaiting action' },
  ]

  return (
    <div>
      <div className="mb-8">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--iv-gold)' }}>Overview</p>
        <h1 className="text-3xl font-bold text-iv-white" style={{ fontFamily: 'var(--iv-font-serif)' }}>
          Welcome back{session?.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''}
        </h1>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {KPI.map(({ label, value, icon: Icon, note }) => (
          <div
            key={label}
            className="rounded-2xl p-6"
            style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(145,56,50,0.12)' }}
              >
                <Icon size={18} style={{ color: 'var(--iv-gold)' }} />
              </div>
              <span className="text-xs text-iv-cream/55 font-light">{note}</span>
            </div>
            <p className="text-2xl font-bold text-iv-white mb-1">{value}</p>
            <p className="text-xs text-iv-cream/50 uppercase tracking-widest font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}
      >
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(145,56,50,0.14)' }}>
          <p className="text-sm font-semibold text-iv-white">Recent Orders</p>
          <a href="/admin/orders" className="text-xs uppercase tracking-widest font-black" style={{ color: 'var(--iv-gold)' }}>
            View All →
          </a>
        </div>
        {recentOrders.length === 0 ? (
          <div className="px-6 py-12 text-center text-iv-cream/40 text-sm">No orders yet</div>
        ) : (
          <div className="divide-y" style={{ borderColor: 'rgba(145,56,50,0.08)' }}>
            {recentOrders.map((order) => (
              <div key={order.id} className="px-6 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-iv-white truncate">{order.orderNumber}</p>
                  <p className="text-xs text-iv-cream/40 mt-0.5">
                    {(order.user as { name?: string; email?: string } | null)?.name ?? (order.user as { name?: string; email?: string } | null)?.email ?? 'Guest'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-iv-white">
                    ${Number(order.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-iv-cream/55 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
                <span
                  className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{
                    background: STATUS_COLOURS[order.status] ?? 'rgba(145,56,50,0.15)',
                    color: 'var(--iv-cream)',
                  }}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
