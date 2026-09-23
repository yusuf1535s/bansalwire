import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { FloatingWidgets } from '../common/FloatingWidgets'
import { ReactNode } from 'react'

export function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#e31e24] selection:text-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWidgets />
    </div>
  )
}
