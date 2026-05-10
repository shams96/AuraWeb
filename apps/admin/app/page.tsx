import { DashboardOverview } from '@/components/dashboard/overview'
import { Sidebar } from '@/components/layout/sidebar'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <DashboardOverview />
          </div>
        </div>
      </main>
    </div>
  )
}
