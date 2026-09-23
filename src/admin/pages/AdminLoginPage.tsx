import { Navigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { Lock, Mail, KeyRound, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function AdminLoginPage() {
  const { isAdminLoggedIn, setAdminLogin, users, updateUser } = useStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  if (isAdminLoggedIn) return <Navigate to="/admin/dashboard" replace />

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = password.trim()

    // 1. Look for user in store
    const matchedUser = users.find((u) => u.email.toLowerCase() === cleanEmail)

    // 2. Master super-admin fallback
    const isMasterAdmin = cleanEmail === 'yusuf@gmail.com' && cleanPassword === 'Yusuf@12345'

    if (matchedUser) {
      if (!matchedUser.isActive) {
        setError('This account is inactive/suspended. Please contact an administrator.')
        return
      }

      // Check user password (or default fallback for seed users)
      const validPassword = matchedUser.password || (cleanEmail === 'yusuf@gmail.com' ? 'Yusuf@12345' : 'Bansal@12345')

      if (cleanPassword === validPassword || isMasterAdmin) {
        // Record last login timestamp
        const now = new Date()
        const formatted = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0].substring(0, 5)}`
        updateUser(matchedUser.id, { lastLogin: formatted })
        setAdminLogin(true)
        return
      }
    } else if (isMasterAdmin) {
      setAdminLogin(true)
      return
    }

    setError('Invalid email or password. Please verify your credentials.')
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
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl flex items-center gap-2 animate-in fade-in">
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
                placeholder="Enter registered admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] text-xs sm:text-sm text-slate-900 transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="admin_user_secret"
                autoComplete="new-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] text-xs sm:text-sm text-slate-900 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 rounded cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
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
