import { prisma } from '@/lib/prisma'
import { TrendingUp, ShoppingBag, Users, BarChart3 } from 'lucide-react'

export const metadata = { title: 'Analytics — Admin' }

async function getAnalytics() {
  try {
    const [
      revenueResult,
      totalOrders,
      totalCustomers,
      ordersByStatus,
      recentRevenue,
    ] = await Promise.all([
      prisma.order.aggregate({ _sum: { total: true }, where: { paymentStatus: 'PAID' } }),
      prisma.order.count(),
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
      prisma.order.groupBy({ by: ['status'], _count: { id: true } }),
      prisma.order.findMany({
        take: 30,
        orderBy: { createdAt: 'desc' },
        where: { paymentStatus: 'PAID' },
        select: { total: true, createdAt: true },
      }),
    ])

    const revenue = Number(revenueResult._sum.total ?? 0)
    const aov = totalOrders > 0 ? revenue / totalOrders : 0

    // Group revenue by day for the last 7 days
    const today = new Date()
    const dailyRevenue: Record<string, number> = {}
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      dailyRevenue[d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })] = 0
    }
    for (const order of recentRevenue) {
      const key = new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
      if (key in dailyRevenue) dailyRevenue[key] += Number(order.total)
    }

    return { revenue, totalOrders, totalCustomers, aov, ordersByStatus, dailyRevenue }
  } catch {
    return {
      revenue: 0, totalOrders: 0, totalCustomers: 0, aov: 0,
      ordersByStatus: [], dailyRevenue: {},
    }
  }
}

async function getTopProducts() {
  try {
    const items = await prisma.orderItem.groupBy({
      by: ['name'],
      _sum: { quantity: true },
      _count: { id: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    })
    return items
  } catch {
    return []
  }
}

export default async function AdminAnalyticsPage() {
  const [analytics, topProducts] = await Promise.all([getAnalytics(), getTopProducts()])

  const { revenue, totalOrders, totalCustomers, aov, ordersByStatus, dailyRevenue } = analytics

  const maxDaily = Math.max(...Object.values(dailyRevenue), 1)

  const KPI = [
    { label: 'Total Revenue',    value: `£${revenue.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`, icon: TrendingUp },
    { label: 'Total Orders',     value: totalOrders.toString(),                                               icon: ShoppingBag },
    { label: 'Customers',        value: totalCustomers.toString(),                                            icon: Users },
    { label: 'Avg. Order Value', value: `£${aov.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`,    icon: BarChart3 },
  ]

  return (
    <div>
      <div className="mb-8">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: 'var(--iv-gold)' }}>Insights</p>
        <h1 className="text-2xl font-bold text-iv-white" style={{ fontFamily: "'Playfair Display', serif" }}>Analytics</h1>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {KPI.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl p-6" style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(145,56,50,0.12)' }}>
              <Icon size={16} style={{ color: 'var(--iv-gold)' }} />
            </div>
            <p className="text-2xl font-bold text-iv-white mb-1">{value}</p>
            <p className="text-xs text-iv-cream/40 uppercase tracking-widest font-medium">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_320px] gap-8">

        {/* Revenue chart (CSS bar chart) */}
        <div className="rounded-2xl p-8" style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}>
          <p className="text-[10px] font-black uppercase tracking-widest text-iv-cream/30 mb-6">Revenue — Last 7 Days</p>
          <div className="flex items-end gap-2 h-40">
            {Object.entries(dailyRevenue).map(([day, val]) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <p className="text-[10px] text-iv-cream/50 font-semibold">
                  {val > 0 ? `£${val.toFixed(0)}` : ''}
                </p>
                <div
                  className="w-full rounded-t-lg transition-all"
                  style={{
                    height: `${Math.max((val / maxDaily) * 120, val > 0 ? 4 : 2)}px`,
                    background: val > 0
                      ? 'linear-gradient(to top, var(--iv-gold), rgba(145,56,50,0.5))'
                      : 'rgba(145,56,50,0.10)',
                  }}
                />
                <p className="text-[9px] text-iv-cream/30 font-medium text-center leading-tight" style={{ fontSize: '10px' }}>
                  {day}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">

          {/* Orders by status */}
          <div className="rounded-2xl p-6" style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}>
            <p className="text-[10px] font-black uppercase tracking-widest text-iv-cream/30 mb-4">Orders by Status</p>
            {(ordersByStatus as { status: string; _count: { id: number } }[]).length === 0 ? (
              <p className="text-xs text-iv-cream/30">No data yet</p>
            ) : (
              <div className="space-y-2.5">
                {(ordersByStatus as { status: string; _count: { id: number } }[]).map(({ status, _count }) => {
                  const pct = totalOrders > 0 ? (_count.id / totalOrders) * 100 : 0
                  return (
                    <div key={status} className="flex items-center gap-3">
                      <p className="text-xs font-medium text-iv-cream/60 w-24 flex-shrink-0">{status}</p>
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(145,56,50,0.12)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, background: 'var(--iv-gold)' }}
                        />
                      </div>
                      <p className="text-xs text-iv-cream/40 w-6 text-right">{_count.id}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Top products */}
          <div className="rounded-2xl p-6" style={{ background: 'var(--iv-deep-green)', border: '1px solid rgba(145,56,50,0.14)' }}>
            <p className="text-[10px] font-black uppercase tracking-widest text-iv-cream/30 mb-4">Top Products</p>
            {topProducts.length === 0 ? (
              <p className="text-xs text-iv-cream/30">No data yet</p>
            ) : (
              <div className="space-y-3">
                {topProducts.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-3">
                    <span className="text-[10px] font-black w-4 text-iv-cream/25">{i + 1}</span>
                    <p className="flex-1 text-xs text-iv-cream/70 font-medium truncate">{p.name}</p>
                    <span className="text-xs text-iv-cream/40">{p._sum.quantity ?? 0} sold</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
