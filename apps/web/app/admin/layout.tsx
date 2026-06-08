import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { AdminNav } from '@/components/admin/admin-nav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session?.user || !['ADMIN', 'OWNER'].includes((session.user as { role?: string }).role ?? '')) {
    redirect('/login?callbackUrl=/admin')
  }

  return (
    <div className="min-h-screen flex bg-iv-black">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 border-r flex flex-col" style={{ borderColor: 'rgba(145,56,50,0.14)', background: 'var(--iv-deep-green)' }}>
        <div className="p-6 border-b" style={{ borderColor: 'rgba(145,56,50,0.14)' }}>
          <p className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: 'var(--iv-gold)' }}>Isola Vitale</p>
          <p className="text-xs text-iv-cream/40 mt-1 font-light">Admin Portal</p>
        </div>
        <AdminNav />
        <div className="p-4 border-t text-xs text-iv-cream/55 font-light" style={{ borderColor: 'rgba(145,56,50,0.10)' }}>
          Logged in as {session.user.email}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  )
}
