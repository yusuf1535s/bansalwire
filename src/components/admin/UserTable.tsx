import { useState } from 'react'
import { useStore } from '../../store/useStore'
import { Edit2, Trash2, UserPlus, Search, Shield, ShieldCheck, UserCheck, UserX, X, CheckCircle2, Lock, Eye, EyeOff, KeyRound } from 'lucide-react'
import type { User } from '../../types'

export function UserTable() {
  const { users, addUser, updateUser, deleteUser } = useStore()
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'editor'>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'editor' as 'admin' | 'editor',
    isActive: true
  })
  const [message, setMessage] = useState<string | null>(null)

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === 'all' || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  const handleOpenAdd = () => {
    setModalMode('add')
    setSelectedUserId(null)
    setShowPassword(false)
    setForm({
      name: '',
      email: '',
      password: '',
      role: 'editor',
      isActive: true
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (user: User) => {
    setModalMode('edit')
    setSelectedUserId(user.id)
    setShowPassword(false)
    setForm({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      isActive: user.isActive
    })
    setIsModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) return

    if (modalMode === 'add') {
      if (!form.password || form.password.trim().length < 4) {
        alert('Please provide a password of at least 4 characters for this user.')
        return
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password.trim(),
        role: form.role,
        isActive: form.isActive,
        lastLogin: 'Never'
      }
      addUser(newUser)
      setMessage(`User "${newUser.name}" added successfully with login password!`)
    } else if (modalMode === 'edit' && selectedUserId) {
      const updates: Partial<User> = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        role: form.role,
        isActive: form.isActive
      }
      if (form.password.trim()) {
        updates.password = form.password.trim()
      }
      updateUser(selectedUserId, updates)
      setMessage(`User details & credentials updated successfully!`)
    }

    setIsModalOpen(false)
    setTimeout(() => setMessage(null), 3500)
  }

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove user "${name}"?`)) {
      deleteUser(id)
      setMessage(`User "${name}" removed.`)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* Toast Feedback */}
      {message && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{message}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-emerald-500 hover:text-emerald-800 font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Add / Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-[#e31e24] flex items-center justify-center">
                  {modalMode === 'add' ? <UserPlus className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-['Lato']">
                    {modalMode === 'add' ? 'Add New Admin User' : 'Edit User Details'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {modalMode === 'add' ? 'Create portal credentials & assign role' : 'Modify user permissions & status'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-900 font-bold p-1 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20 focus:border-[#e31e24] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. user@bansalwire.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20 focus:border-[#e31e24] transition"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {modalMode === 'add' ? 'Login Password' : 'Change Password'}
                  </label>
                  {modalMode === 'edit' && (
                    <span className="text-[11px] text-slate-400 font-medium">Leave blank to keep existing</span>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={modalMode === 'add' ? 'Enter a secure login password' : 'Enter new password if changing'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required={modalMode === 'add'}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20 focus:border-[#e31e24] transition"
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Access Role
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value as 'admin' | 'editor' })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20 focus:border-[#e31e24] transition cursor-pointer"
                  >
                    <option value="admin">Super Admin</option>
                    <option value="editor">Editor / Sales</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Account Status
                  </label>
                  <select
                    value={form.isActive ? 'active' : 'inactive'}
                    onChange={(e) => setForm({ ...form, isActive: e.target.value === 'active' })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20 focus:border-[#e31e24] transition cursor-pointer"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive / Suspended</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#e31e24] hover:bg-[#b81419] shadow transition cursor-pointer uppercase tracking-wider"
                >
                  {modalMode === 'add' ? 'Create User' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden font-sans">
        
        {/* Header Toolbar */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Users' },
              { id: 'admin', label: 'Admins' },
              { id: 'editor', label: 'Editors' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setRoleFilter(tab.id as 'all' | 'admin' | 'editor')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  roleFilter === tab.id
                    ? 'bg-[#e31e24] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-60">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20"
              />
            </div>

            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 bg-[#e31e24] hover:bg-[#b81419] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow cursor-pointer uppercase tracking-wider shrink-0"
            >
              <UserPlus className="w-4 h-4" /> Add User
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Last Login</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    No users matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user: User) => (
                  <tr key={user.id} className="hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-sm font-['Lato']">{user.name}</div>
                      <div className="text-slate-500 text-xs">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-bold border ${
                        user.role === 'admin'
                          ? 'bg-red-50 text-[#e31e24] border-red-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {user.role === 'admin' ? <ShieldCheck className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
                        {user.role === 'admin' ? 'Super Admin' : 'Editor'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${
                        user.isActive
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {user.isActive ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {user.lastLogin || 'Never'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(user)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition cursor-pointer"
                          title="Edit User"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id, user.name)}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
