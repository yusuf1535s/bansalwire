import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Users,
  FileText,
  Settings,
  BarChart3,
  ChevronRight,
  X,
} from 'lucide-react'
import { useStore } from '../../store/useStore'

const menuItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/products', label: 'Products', icon: Package },
  { path: '/admin/pages', label: 'Pages', icon: FileText },
  { path: '/admin/enquiries', label: 'Enquiries', icon: ClipboardList },
  { path: '/admin/team', label: 'Team', icon: Users },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const location = useLocation()
  const { isAdminLoggedIn, setAdminLogin } = useStore()

  if (!isAdminLoggedIn) return null

  return (
    <aside className="w-64 bg-primary-dark text-white flex flex-col fixed inset-y-0 left-0 z-40 hidden md:flex">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-accent text-primary font-bold text-lg w-10 h-10 rounded-lg flex items-center justify-center">
            BW
          </div>
          <div>
            <h2 className="font-semibold">Admin Panel</h2>
            <p className="text-xs text-white/50">Bansal Wire Industries</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                active
                  ? 'bg-accent text-primary font-medium'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="w-4 h-4" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => setAdminLogin(false)}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-danger transition w-full px-3 py-2 rounded hover:bg-danger/10"
        >
          <X className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
