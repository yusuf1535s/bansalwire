import { useStore } from '../../store/useStore'
import { Edit2, Trash2 } from 'lucide-react'
import type { User } from '../../types'

export function UserTable() {
  const { users, deleteUser } = useStore()

  return (
    <div className="bg-white rounded-xl border border-border-light overflow-hidden">
      <div className="px-6 py-4 border-b border-border-light">
        <h3 className="font-semibold text-text-primary">All Users</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-bg-light text-xs text-text-secondary uppercase">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id} className="border-b border-border-light hover:bg-bg-light">
                <td className="px-6 py-3 text-sm font-medium text-text-primary">{user.name}</td>
                <td className="px-6 py-3 text-sm text-text-secondary">{user.email}</td>
                <td className="px-6 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${user.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${user.isActive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <button className="p-1 hover:bg-primary/10 rounded text-primary"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => deleteUser(user.id)} className="p-1 hover:bg-red-50 rounded text-danger ml-1"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
