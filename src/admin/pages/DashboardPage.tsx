import { AdminGuard } from '../../admin/guards'
import { PageMeta } from '../../components/common/PageMeta'
import { useStore } from '../../store/useStore'
import { StatCard } from '../../components/admin/StatCard'
import { RecentEnquiries, RecentProducts } from '../../components/admin/Tables'
import { BarChart, LineChart } from '../../components/admin/Charts'
import { TrendingUp, Package, Users, MessageSquare, Globe, Building2, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function DashboardPage() {
  const { products, enquiries, users, teamMembers } = useStore()
  const unreadCount = enquiries.filter((e) => e.status === 'new' || e.status === 'pending').length

  return (
    <AdminGuard>
      <div className="space-y-8 font-sans">
        <PageMeta title="Enterprise Admin Dashboard | Bansal Wire" description="Admin Dashboard" />

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 bg-[#e31e24] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" /> Corporate Management Console
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-['Lato'] text-white">
              Welcome back, Yusuf
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal">
              Live enterprise dashboard for Bansal Wire Industries Ltd. Monitoring 3,000+ SKUs across 5 manufacturing units and global export inquiries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/admin/enquiries"
              className="bg-[#e31e24] hover:bg-[#b81419] text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center gap-2"
            >
              <Bell className="w-4 h-4" />
              <span>{unreadCount} New Inquiries</span>
            </Link>
            <Link
              to="/admin/products"
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition border border-white/20"
            >
              Manage Catalog
            </Link>
          </div>
        </div>

        {/* Top KPI Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            icon={Package}
            label="Active Wire SKUs"
            value={`${products.length} Products`}
            trend="Live in Catalog"
            color="primary"
          />
          <StatCard
            icon={MessageSquare}
            label="Customer Enquiries"
            value={`${enquiries.length} Leads`}
            trend={`${unreadCount} New pending`}
            color="accent"
          />
          <StatCard
            icon={Building2}
            label="Manufacturing Plants"
            value="5 Facilities"
            trend="Dadri & Ghaziabad"
            color="warning"
          />
          <StatCard
            icon={Globe}
            label="Global Reach"
            value="50+ Countries"
            trend="Exports Active"
            color="success"
          />
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChart />
          <LineChart />
        </div>

        {/* Real-time Content Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentProducts />
          <RecentEnquiries />
        </div>
      </div>
    </AdminGuard>
  )
}
