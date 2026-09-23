import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { AdminLayout } from '../components/layout/AdminLayout'

export function AdminGuard({ children }: { children: ReactNode }) {
  const { isAdminLoggedIn } = useStore()
  if (!isAdminLoggedIn) return <Navigate to="/admin/login" replace />
  return <AdminLayout>{children}</AdminLayout>
}
