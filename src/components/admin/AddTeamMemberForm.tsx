import { useStore } from '../../store/useStore'
import { useState } from 'react'
import { X, Save } from 'lucide-react'
import type { TeamMember } from '../../types'

interface Props {
  onClose: () => void
  member?: TeamMember
}

export function AddTeamMemberForm({ onClose, member }: Props) {
  const { addProduct } = useStore()
  const [form, setForm] = useState<Partial<TeamMember>>(member || { name: '', designation: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Use products store as team storage for simplicity
    addProduct({
      id: Date.now().toString(),
      name: form.name || '',
      category: 'Team',
      subCategory: form.division || '',
      description: form.designation || '',
    })
    onClose()
  }

  return (
    <div className="bg-white rounded-xl border border-border-light p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-text-primary">{member ? 'Edit' : 'Add'} Team Member</h3>
        <button onClick={onClose}><X className="w-5 h-5 text-text-secondary" /></button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border-light text-sm" />
        <input required placeholder="Designation" value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border-light text-sm" />
        <input placeholder="Division" value={form.division} onChange={e => setForm({ ...form, division: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border-light text-sm" />
        <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-light transition flex items-center gap-2">
          <Save className="w-4 h-4" /> {member ? 'Update' : 'Add'} Member
        </button>
      </form>
    </div>
  )
}
