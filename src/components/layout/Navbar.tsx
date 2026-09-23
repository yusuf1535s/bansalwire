import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react'
import { mainNavItems } from '../../data/navigation'
import { useStore } from '../../store/useStore'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const { isDarkMode, toggleDarkMode } = useStore()

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

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="w-full z-50 transition-all duration-300">
      {/* Main Navigation Bar */}
      <nav
        className={`w-full bg-white dark:bg-[#0f172a] transition-all duration-300 ${
          isScrolled
            ? 'fixed top-0 left-0 right-0 shadow-md border-b border-gray-200 dark:border-slate-800 py-2'
            : 'relative border-b border-gray-100 dark:border-slate-800/80 py-3'
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
                className="h-11 sm:h-13 w-auto object-contain transition-transform duration-200 hover:scale-102 dark:brightness-110"
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
                              ? 'text-[#e31e24] dark:text-[#ff4d52]'
                              : 'text-slate-800 dark:text-slate-100 hover:text-[#e31e24] dark:hover:text-[#ff4d52]'
                          }`}
                        >
                          {item.label}
                          <ChevronDown className="w-3.5 h-3.5 text-gray-400 dark:text-slate-400 group-hover:text-[#e31e24] dark:group-hover:text-[#ff4d52] transition-transform group-hover:rotate-180" />
                        </Link>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`px-3 py-1.5 text-[13.5px] font-semibold tracking-tight transition-colors ${
                          itemActive
                            ? 'text-[#e31e24] dark:text-[#ff4d52]'
                            : 'text-slate-800 dark:text-slate-100 hover:text-[#e31e24] dark:hover:text-[#ff4d52]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}

                    {/* Dropdown Menu */}
                    {hasChildren && (
                      <div
                        className={`absolute top-full left-0 mt-0 w-64 bg-white dark:bg-[#151c2e] rounded-b-md shadow-2xl border-t-2 border-[#e31e24] py-2 z-50 transition-all duration-200 ${
                          openDropdown === item.label
                            ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                            : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                        }`}
                      >
                        {item.children?.map((sub) => {
                          if (sub.isHeader) {
                            return (
                              <div key={sub.label} className="pt-2 pb-1 px-4">
                                <span className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">
                                  {sub.label}
                                </span>
                                {sub.children?.map((nested) => (
                                  <Link
                                    key={nested.label}
                                    to={nested.path}
                                    className="block px-2 py-1.5 text-[13px] text-gray-700 dark:text-slate-200 hover:text-[#e31e24] dark:hover:text-[#ff4d52] hover:bg-red-50/50 dark:hover:bg-red-950/40 rounded transition-colors"
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
                              className="block px-4 py-2 text-[13.5px] font-medium text-gray-700 dark:text-slate-200 hover:text-[#e31e24] dark:hover:text-[#ff4d52] hover:bg-red-50/60 dark:hover:bg-red-950/40 border-b border-gray-50 dark:border-slate-800/60 last:border-0 transition-colors"
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

              {/* Primary Contact / Enquire CTA */}
              <Link
                to="/contact"
                className="ml-2 bg-[#e31e24] hover:bg-[#b81419] text-white text-[13px] font-bold px-4 py-2 rounded shadow-sm transition uppercase tracking-wider whitespace-nowrap"
              >
                Contact / Enquire
              </Link>

              {/* Dark Mode Toggle Button (Beside Contact / Enquire on Desktop) */}
              <button
                onClick={toggleDarkMode}
                aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="ml-1.5 p-2 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-200 hover:text-[#e31e24] dark:hover:text-[#ff4d52] hover:bg-gray-100 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>
            </div>

            {/* Mobile Menu Action Area */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
              <Link
                to="/contact"
                className="bg-[#e31e24] text-white text-[11px] font-bold px-2.5 sm:px-3 py-1.5 rounded uppercase tracking-wider whitespace-nowrap shadow-xs"
              >
                Contact / Enquire
              </Link>

              {/* Dark Mode Toggle Button on Mobile Header */}
              <button
                onClick={toggleDarkMode}
                aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="p-1.5 sm:p-2 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-200 hover:text-[#e31e24] dark:hover:text-[#ff4d52] hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-center"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>

              <button
                className="p-1.5 sm:p-2 text-gray-700 dark:text-slate-200 hover:text-[#e31e24] dark:hover:text-[#ff4d52] cursor-pointer"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Mobile Navigation Drawer & Backdrop */}
        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative z-50 lg:hidden bg-white dark:bg-[#0f172a] border-t border-gray-200 dark:border-slate-800 px-4 py-3 max-h-[82vh] overflow-y-auto shadow-2xl animate-in slide-in-from-top-2 duration-200">
              
              {/* Quick Theme Switch Bar inside Mobile Drawer */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-100 dark:border-slate-800">
                <span className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Appearance</span>
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 text-xs font-semibold text-gray-700 dark:text-slate-200 hover:border-[#e31e24] transition cursor-pointer"
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-slate-700" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              </div>

              {mainNavItems.map((item) => (
                <div key={item.label} className="border-b border-gray-100 dark:border-slate-800/80 py-2">
                  {item.children ? (
                    <div>
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === item.label ? null : item.label)
                        }
                        className="w-full flex items-center justify-between text-[14px] font-bold text-gray-800 dark:text-slate-100 py-1 cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-500 dark:text-slate-400 transition-transform ${
                            openDropdown === item.label ? 'rotate-180 text-[#e31e24] dark:text-[#ff4d52]' : ''
                          }`}
                        />
                      </button>
                      {openDropdown === item.label && (
                        <div className="pl-4 py-1 space-y-1 bg-gray-50 dark:bg-[#161f30] rounded-lg mt-1">
                          {item.children.map((sub) => (
                            <div key={sub.label}>
                              <Link
                                to={sub.path}
                                className="block py-1.5 text-xs font-medium text-gray-700 dark:text-slate-200 hover:text-[#e31e24] dark:hover:text-[#ff4d52]"
                                onClick={() => setMobileOpen(false)}
                              >
                                {sub.label}
                              </Link>
                              {sub.children?.map((nested) => (
                                <Link
                                  key={nested.label}
                                  to={nested.path}
                                  className="block pl-3 py-1 text-xs text-gray-600 dark:text-slate-400 hover:text-[#e31e24] dark:hover:text-[#ff4d52]"
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
                      className="block text-[14px] font-bold text-gray-800 dark:text-slate-100 hover:text-[#e31e24] dark:hover:text-[#ff4d52] py-1"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-4 pb-2 border-t border-gray-100 dark:border-slate-800 mt-2 space-y-2">
                <Link
                  to="/contact"
                  className="block text-center bg-[#e31e24] hover:bg-[#b81419] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact / Enquire (RFQ)
                </Link>
                <div className="text-center text-[11px] text-gray-400 dark:text-slate-500">
                  <span>Bansal Wire Industries Ltd.</span>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}
