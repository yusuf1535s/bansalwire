import { AdminGuard } from '../../admin/guards'
import { PageMeta } from '../../components/common/PageMeta'
import { useStore } from '../../store/useStore'
import { StatCard } from '../../components/admin/StatCard'
import { RecentEnquiries, RecentProducts } from '../../components/admin/Tables'
import { BarChart, LineChart } from '../../components/admin/Charts'
import { TrendingUp, Package, Users, MessageSquare } from 'lucide-react'

export default function DashboardPage() {
  const { products, enquiries, users } = useStore()

  return (
    <AdminGuard>
      <>
        <PageMeta title="Dashboard" description="Admin Dashboard" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Package} label="Total Products" value={products.length} trend="+12%" color="primary" />
          <StatCard icon={Users} label="Users" value={users.length} trend="+3%" color="accent" />
          <StatCard icon={MessageSquare} label="Enquiries" value={enquiries.length} trend="+8%" color="success" />
          <StatCard icon={TrendingUp} label="Growth" value="24%" trend="+5%" color="warning" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <BarChart />
          <LineChart />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <RecentProducts />
          <RecentEnquiries />
        </div>
      </>
    </AdminGuard>
  )
}
