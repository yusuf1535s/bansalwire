import { Bell, Search, Menu } from 'lucide-react'

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-border-light flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button className="md:hidden p-2">
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 bg-bg-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-text-secondary hover:text-primary transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
            AD
          </div>
          <span className="text-sm font-medium hidden sm:block">Admin</span>
        </div>
      </div>
    </header>
  )
}
