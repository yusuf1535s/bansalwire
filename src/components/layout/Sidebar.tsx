import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Users,
  FileText,
  Settings,
  ChevronRight,
  LogOut,
  ExternalLink,
  X
} from 'lucide-react'
import { useStore } from '../../store/useStore'

const menuItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/products', label: 'Products & SKUs', icon: Package },
  { path: '/admin/enquiries', label: 'Enquiries & Leads', icon: ClipboardList, badge: true },
  { path: '/admin/team', label: 'Board & Leadership', icon: Users },
  { path: '/admin/pages', label: 'CMS Page Content', icon: FileText },
  { path: '/admin/users', label: 'Admin Users', icon: Users },
  { path: '/admin/settings', label: 'System Settings', icon: Settings },
]

interface SidebarProps {
  mobileOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const location = useLocation()
  const { isAdminLoggedIn, setAdminLogin, enquiries } = useStore()

  if (!isAdminLoggedIn) return null

  const unreadEnquiriesCount = enquiries.filter((e) => e.status === 'new' || e.status === 'pending').length

  const sidebarContent = (
    <div className="w-64 bg-[#0f172a] text-white flex flex-col h-full font-sans border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <Link to="/admin/dashboard" onClick={onClose} className="flex items-center gap-3">
          <div className="bg-[#e31e24] text-white font-black text-sm w-9 h-9 rounded-xl flex items-center justify-center shadow-md">
            BW
          </div>
          <div>
            <h2 className="font-extrabold text-sm font-['Lato'] text-white tracking-wide">
              BANSAL WIRE
            </h2>
            <p className="text-[10px] text-slate-400 font-medium">
              Enterprise Admin Portal
            </p>
          </div>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3.5 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Management
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon
          const active = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 group ${
                active
                  ? 'bg-[#e31e24] text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                <span>{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {item.badge && unreadEnquiriesCount > 0 && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    active ? 'bg-white text-[#e31e24]' : 'bg-[#e31e24] text-white'
                  }`}>
                    {unreadEnquiriesCount}
                  </span>
                )}
                {active && <ChevronRight className="w-4 h-4 opacity-70" />}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer Info & Sign Out */}
      <div className="p-4 border-t border-slate-800/80 space-y-2">
        <Link
          to="/"
          target="_blank"
          onClick={onClose}
          className="flex items-center justify-between text-xs text-slate-400 hover:text-white px-3 py-2 rounded-xl hover:bg-slate-800 transition"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            Open Website
          </span>
          <span className="text-[10px] text-slate-500">Live</span>
        </Link>

        <button
          onClick={() => {
            onClose?.()
            setAdminLogin(false)
          }}
          className="flex items-center gap-2.5 text-xs font-semibold text-red-400 hover:text-white hover:bg-red-950/40 w-full px-3 py-2 rounded-xl transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="w-64 fixed inset-y-0 left-0 z-40 hidden md:flex flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          {/* Drawer Panel */}
          <aside className="fixed inset-y-0 left-0 z-50 w-64 shadow-2xl animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}
