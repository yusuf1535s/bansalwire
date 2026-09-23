import { Navigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { Lock, User } from 'lucide-react'
import { useState } from 'react'

export default function AdminLoginPage() {
  const { isAdminLoggedIn, setAdminLogin } = useStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (isAdminLoggedIn) return <Navigate to="/admin/dashboard" replace />

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAdminLogin(true)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-bg-bg-light py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-border-light p-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary">Admin Login</h2>
          <p className="text-sm text-text-secondary mt-2">Sign in to access the admin panel</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="email"
                placeholder="admin@bansalwire.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-light focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-border-light focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
            />
          </div>
          <button type="submit" className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-primary transition">
            Sign In
          </button>
        </form>
        <p className="text-xs text-text-secondary text-center mt-4">Demo: just click Sign In to login</p>
      </div>
    </div>
  )
}
