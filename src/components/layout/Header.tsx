import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bell, Search, ExternalLink, CheckCheck, MessageSquare, Clock, User, X, CheckCircle2 } from 'lucide-react'
import { useStore } from '../../store/useStore'

export function Header() {
  const { notifications, markNotificationRead, markAllNotificationsRead, latestToast, clearToast, isAdminLoggedIn } = useStore()
  const [notifOpen, setNotifOpen] = useState(false)
  const navigate = useNavigate()

  const unreadNotifications = notifications.filter((n) => !n.isRead)
  const unreadCount = unreadNotifications.length

  // Auto-dismiss real-time toast after 5 seconds
  useEffect(() => {
    if (latestToast) {
      const timer = setTimeout(() => {
        clearToast()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [latestToast, clearToast])

  return (
    <>
      {/* Real-time Toast Notification Alert in Admin View */}
      {latestToast && (
        <div className="fixed top-5 right-5 z-50 animate-in slide-in-from-top-4 duration-300">
          <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border-2 border-[#e31e24] flex items-start gap-3.5 max-w-sm">
            <div className="w-9 h-9 rounded-xl bg-[#e31e24] text-white flex items-center justify-center shrink-0 animate-bounce">
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1 pr-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Live Customer Query</span>
                <button onClick={clearToast} className="text-slate-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <h5 className="font-bold text-sm text-white font-['Lato'] mt-0.5">{latestToast.title}</h5>
              <p className="text-xs text-slate-300 mt-0.5 line-clamp-2">{latestToast.message}</p>
              <button
                onClick={() => {
                  clearToast()
                  navigate('/admin/enquiries')
                }}
                className="mt-2 text-xs font-bold text-[#e31e24] hover:text-red-400 flex items-center gap-1"
              >
                Open in Enquiries &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30 font-sans shadow-xs">
        
        {/* Left: Global Search & Breadcrumb info */}
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products, enquiries, SKUs..."
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20 focus:border-[#e31e24] w-64 md:w-80 transition"
            />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3.5">
          
          {/* Link to public website */}
          <Link
            to="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#e31e24] bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition"
            title="View Live Website"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Live Website
          </Link>

          {/* Interactive Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] bg-[#e31e24] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-pulse border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                
                {/* Notification Drawer Header */}
                <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-red-400" />
                    <h4 className="font-bold text-sm font-['Lato']">Live Contact Enquiries</h4>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => markAllNotificationsRead()}
                      className="text-[11px] text-red-400 hover:text-white flex items-center gap-1 transition cursor-pointer"
                    >
                      <CheckCheck className="w-3 h-3" /> Mark all read
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-400">
                      No notifications yet.
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id)
                          setNotifOpen(false)
                          navigate('/admin/enquiries')
                        }}
                        className={`p-3.5 hover:bg-slate-50 transition cursor-pointer flex items-start gap-3 ${
                          !n.isRead ? 'bg-red-50/40 border-l-4 border-l-[#e31e24]' : ''
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-red-100 text-[#e31e24] flex items-center justify-center shrink-0 mt-0.5">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-xs text-slate-900">{n.title}</h5>
                            <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Drawer Footer */}
                <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                  <Link
                    to="/admin/enquiries"
                    onClick={() => setNotifOpen(false)}
                    className="text-xs font-bold text-[#e31e24] hover:underline"
                  >
                    View All Customer Enquiries &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Badge */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
            <div className="w-9 h-9 rounded-full bg-[#0f172a] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              YS
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-slate-900 leading-tight">Yusuf</div>
              <div className="text-[10px] text-slate-500 font-medium">Super Admin</div>
            </div>
          </div>

        </div>
      </header>
    </>
  )
}
