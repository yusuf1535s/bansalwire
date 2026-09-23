import { Navigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { Lock, Mail, KeyRound, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export default function AdminLoginPage() {
  const { isAdminLoggedIn, setAdminLogin } = useStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAdminLoggedIn) return <Navigate to="/admin/dashboard" replace />

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = password.trim()

    // Valid credentials: yusuf@gmail.com / Yusuf@12345
    if (cleanEmail === 'yusuf@gmail.com' && cleanPassword === 'Yusuf@12345') {
      setAdminLogin(true)
    } else {
      setError('Invalid email or password. Please check your credentials.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 py-12 px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-50 text-[#e31e24] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xs">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-['Lato']">
            Admin Portal Login
          </h2>
          <p className="text-xs text-slate-500 mt-1.5 font-normal">
            Bansal Wire Industries Ltd. Management Console
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} autoComplete="off" className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                name="admin_user_email"
                autoComplete="off"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] text-xs sm:text-sm text-slate-900 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                name="admin_user_secret"
                autoComplete="new-password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] text-xs sm:text-sm text-slate-900 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#e31e24] hover:bg-[#b81419] text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition duration-200 cursor-pointer mt-2"
          >
            Sign In to Admin
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
          Authorized Administrative Access Only
        </div>
      </div>
    </div>
  )
}
