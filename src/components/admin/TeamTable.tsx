import { useState } from 'react'
import { useStore } from '../../store/useStore'
import { Trash2, UserCheck, Shield, User, Plus, X } from 'lucide-react'
import type { TeamMember } from '../../types'

export function TeamTable() {
  const { teamMembers, deleteTeamMember, addTeamMember } = useStore()
  const [showAddModal, setShowAddModal] = useState(false)
  const [name, setName] = useState('')
  const [designation, setDesignation] = useState('')
  const [division, setDivision] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !designation) return
    addTeamMember({
      id: Date.now().toString(),
      name,
      designation,
      division: division || 'Corporate Management',
      image: '/images/bansal/1-1.png'
    })
    setName('')
    setDesignation('')
    setDivision('')
    setShowAddModal(false)
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-['Lato']">Add Leadership Member</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  placeholder="e.g. Sh. Arun Gupta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Designation / Role <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  placeholder="e.g. Managing Director"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Division / Plant
                </label>
                <input
                  placeholder="e.g. Stainless Steel Wire Division"
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#e31e24] hover:bg-[#b81419] text-white px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md cursor-pointer"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden font-sans">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 font-['Lato']">
              Board of Directors &amp; Leadership Directory ({teamMembers.length})
            </h3>
            <p className="text-xs text-slate-500">Corporate leaders driving operational excellence</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#e31e24] hover:bg-[#b81419] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Member
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-5 py-3">Leadership Executive</th>
                <th className="px-5 py-3">Designation</th>
                <th className="px-5 py-3">Division / Portfolio</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        {member.name.replace(/^(Sh\.|Shri\.)\s*/i, '').charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{member.name}</div>
                        <div className="text-[10px] text-slate-400">Board Executive</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-800">
                    {member.designation}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-block bg-red-50 text-[#e31e24] font-bold px-2.5 py-1 rounded-md text-[11px]">
                      {member.division || 'Overall Executive'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => {
                        if (confirm(`Remove "${member.name}" from directory?`)) {
                          deleteTeamMember(member.id)
                        }
                      }}
                      className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition cursor-pointer"
                      title="Remove Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
