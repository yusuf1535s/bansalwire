import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Lock, LogOut, Phone, Mail, Search } from 'lucide-react'
import { mainNavItems } from '../../data/navigation'
import { useStore } from '../../store/useStore'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const { isAdminLoggedIn, setAdminLogin } = useStore()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="w-full z-50 transition-all duration-300">
      {/* Top Info Bar */}
      <div className="bg-[#1c1c1c] text-white/80 text-xs py-1.5 px-4 sm:px-8 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-white transition">
              <Phone className="w-3.5 h-3.5 text-[#e31e24]" />
              <a href="tel:011-23651890">011-23651890-93</a>
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition">
              <Mail className="w-3.5 h-3.5 text-[#e31e24]" />
              <a href="mailto:info@bansal-group.com">info@bansal-group.com</a>
            </span>
            <span className="text-white/60">
              India's Largest Stainless Steel Wire Manufacturer
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white/70 text-[11px]">Since 1938</span>
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin/dashboard"
                  className="bg-[#e31e24] text-white px-2.5 py-0.5 rounded text-xs font-semibold hover:bg-[#ff333a] transition"
                >
                  Admin Panel
                </Link>
                <button
                  onClick={() => setAdminLogin(false)}
                  className="text-white/60 hover:text-white p-0.5"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="flex items-center gap-1 text-white/70 hover:text-white hover:text-[#e31e24] transition text-xs"
              >
                <Lock className="w-3 h-3 text-[#e31e24]" />
                Admin Portal
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full bg-white transition-all duration-300 ${
          isScrolled
            ? 'fixed top-0 left-0 right-0 shadow-md border-b border-gray-200 py-2'
            : 'relative border-b border-gray-100 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src="/images/bansal/BANSAL-LOGO-2.png"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/logo.png'
                }}
                alt="Bansal Wire Industries Ltd."
                className="h-11 sm:h-13 w-auto object-contain transition-transform duration-200 hover:scale-102"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {mainNavItems.map((item) => {
                const itemActive = isActive(item.path)
                const hasChildren = item.children && item.children.length > 0

                return (
                  <div
                    key={item.label}
                    className="relative group py-2"
                    onMouseEnter={() => hasChildren && setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {hasChildren ? (
                      <div className="flex items-center cursor-pointer">
                        <Link
                          to={item.path !== '#' ? item.path : '#'}
                          onClick={(e) => {
                            if (item.path === '#') e.preventDefault()
                          }}
                          className={`px-3 py-1.5 text-[13.5px] font-semibold tracking-tight transition-colors flex items-center gap-1 ${
                            itemActive
                              ? 'text-[#e31e24]'
                              : 'text-[#222222] hover:text-[#e31e24]'
                          }`}
                        >
                          {item.label}
                          <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#e31e24] transition-transform group-hover:rotate-180" />
                        </Link>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`px-3 py-1.5 text-[13.5px] font-semibold tracking-tight transition-colors ${
                          itemActive
                            ? 'text-[#e31e24]'
                            : 'text-[#222222] hover:text-[#e31e24]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}

                    {/* Dropdown Menu */}
                    {hasChildren && (
                      <div
                        className={`absolute top-full left-0 mt-0 w-64 bg-white rounded-b-md shadow-2xl border-t-2 border-[#e31e24] py-2 z-50 transition-all duration-200 ${
                          openDropdown === item.label
                            ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                            : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                        }`}
                      >
                        {item.children?.map((sub) => {
                          const hasSubChildren = sub.children && sub.children.length > 0
                          if (sub.isHeader) {
                            return (
                              <div key={sub.label} className="pt-2 pb-1 px-4">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                  {sub.label}
                                </span>
                                {sub.children?.map((nested) => (
                                  <Link
                                    key={nested.label}
                                    to={nested.path}
                                    className="block px-2 py-1.5 text-[13px] text-gray-700 hover:text-[#e31e24] hover:bg-red-50/50 rounded transition-colors"
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    {nested.label}
                                  </Link>
                                ))}
                              </div>
                            )
                          }
                          return (
                            <Link
                              key={sub.label}
                              to={sub.path}
                              className="block px-4 py-2 text-[13.5px] font-medium text-gray-700 hover:text-[#e31e24] hover:bg-red-50/60 border-b border-gray-50 last:border-0 transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {sub.label}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}

              <Link
                to="/contact"
                className="ml-2 bg-[#e31e24] text-white text-[13px] font-bold px-4 py-2 rounded shadow-sm hover:bg-[#b81419] transition uppercase tracking-wider"
              >
                Enquiry
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                to="/contact"
                className="bg-[#e31e24] text-white text-xs font-bold px-3 py-1.5 rounded uppercase"
              >
                Enquiry
              </Link>
              <button
                className="p-2 text-gray-700 hover:text-[#e31e24]"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-3 max-h-[80vh] overflow-y-auto shadow-xl">
            {mainNavItems.map((item) => (
              <div key={item.label} className="border-b border-gray-100 py-2">
                {item.children ? (
                  <div>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                      className="w-full flex items-center justify-between text-[14px] font-bold text-gray-800 py-1"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 transition-transform ${
                          openDropdown === item.label ? 'rotate-180 text-[#e31e24]' : ''
                        }`}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="pl-4 py-1 space-y-1 bg-gray-50 rounded mt-1">
                        {item.children.map((sub) => (
                          <div key={sub.label}>
                            <Link
                              to={sub.path}
                              className="block py-1.5 text-xs font-medium text-gray-700 hover:text-[#e31e24]"
                              onClick={() => setMobileOpen(false)}
                            >
                              {sub.label}
                            </Link>
                            {sub.children?.map((nested) => (
                              <Link
                                key={nested.label}
                                to={nested.path}
                                className="block pl-3 py-1 text-xs text-gray-600 hover:text-[#e31e24]"
                                onClick={() => setMobileOpen(false)}
                              >
                                • {nested.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className="block text-[14px] font-bold text-gray-800 hover:text-[#e31e24] py-1"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-3 pb-2 flex justify-between items-center text-xs text-gray-500 border-t border-gray-100 mt-2">
              <span>Bansal Wire Industries Ltd.</span>
              <Link to="/admin/login" className="text-[#e31e24] font-semibold" onClick={() => setMobileOpen(false)}>
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
