import { Navigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import NotFoundPage from '../../pages/NotFoundPage'

export default function AdminNotFoundPage() {
  const { isAdminLoggedIn } = useStore()
  if (!isAdminLoggedIn) return <Navigate to="/admin/login" replace />
  return <NotFoundPage />
}
