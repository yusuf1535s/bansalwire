import { useStore } from '../../store/useStore'
import { Edit2, Trash2 } from 'lucide-react'
import type { Enquiry } from '../../types'

const statusColors: Record<string, string> = {
  new: 'bg-primary/10 text-primary',
  pending: 'bg-amber-100 text-amber-700',
  contacted: 'bg-accent/10 text-accent',
  resolved: 'bg-green-50 text-green-600',
}

function EnquiryRow({ enquiry }: { enquiry: Enquiry }) {
  const { updateEnquiryStatus, deleteEnquiry } = useStore()
  const nextStatus = enquiry.status === 'new' ? 'contacted' : enquiry.status === 'contacted' ? 'resolved' : 'new'

  return (
    <tr className="border-b border-border-light hover:bg-bg-light">
      <td className="px-6 py-3 text-sm text-text-secondary">{enquiry.id}</td>
      <td className="px-6 py-3">
        <div className="text-sm font-medium text-text-primary">{enquiry.name}</div>
        <div className="text-xs text-text-secondary">{enquiry.email}</div>
      </td>
      <td className="px-6 py-3 text-sm text-text-secondary">{enquiry.category}</td>
      <td className="px-6 py-3">
        <span className={`text-xs px-2 py-0.5 rounded ${statusColors[enquiry.status]}`}>{enquiry.status}</span>
      </td>
      <td className="px-6 py-3">
        <div className="flex gap-2">
          <button onClick={() => updateEnquiryStatus(enquiry.id, nextStatus)} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20">
            {enquiry.status === 'resolved' ? 'Reset' : 'Advance'}
          </button>
          <button onClick={() => deleteEnquiry(enquiry.id)} className="p-1 hover:bg-red-50 rounded text-danger">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export function EnquiryListTable() {
  const { enquiries } = useStore()

  return (
    <div className="bg-white rounded-xl border border-border-light overflow-hidden">
      <div className="px-6 py-4 border-b border-border-light">
        <h3 className="font-semibold text-text-primary">All Enquiries</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-bg-light text-xs text-text-secondary uppercase">
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name / Email</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <EnquiryRow key={enquiry.id} enquiry={enquiry} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
