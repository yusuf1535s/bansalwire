import { AdminGuard } from '../../admin/guards'
import { PageMeta } from '../../components/common/PageMeta'
import { TeamTable } from '../../components/admin/TeamTable'
import { AddTeamMemberForm } from '../../components/admin/AddTeamMemberForm'
import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function TeamAdminPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <AdminGuard>
      <>
        <PageMeta title="Team" description="Manage Team Members" />
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Team</h1>
            <p className="text-text-secondary text-sm mt-1">Manage leadership and team members</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-light transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Member
          </button>
        </div>
        {showForm && <AddTeamMemberForm onClose={() => setShowForm(false)} />}
        <TeamTable />
      </>
    </AdminGuard>
  )
}
