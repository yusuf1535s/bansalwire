import { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export function AdminLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        <Header />
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
