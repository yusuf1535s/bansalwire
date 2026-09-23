import { useStore } from '../../store/useStore'
import { User } from '../../types'

export function TeamTable() {
  const { teamMembers } = useStore()

  return (
    <div className="bg-white rounded-xl border border-border-light overflow-hidden">
      <div className="px-6 py-4 border-b border-border-light">
        <h3 className="font-semibold text-text-primary">Leadership Team</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-bg-light text-xs text-text-secondary uppercase">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Designation</th>
              <th className="px-6 py-3 text-left">Division</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr key={member.id} className="border-b border-border-light hover:bg-bg-light">
                <td className="px-6 py-3 text-sm font-medium text-text-primary">{member.name}</td>
                <td className="px-6 py-3 text-sm text-text-secondary">{member.designation}</td>
                <td className="px-6 py-3 text-sm text-accent">{member.division || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
