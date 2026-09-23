import { useState } from 'react'
import { useStore } from '../../store/useStore'
import { Trash2, Mail, Phone, Building2, Globe, Clock, Search, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react'
import type { Enquiry } from '../../types'

const statusBadges: Record<string, { label: string; style: string }> = {
  new: { label: 'New Lead', style: 'bg-red-50 text-[#e31e24] border-red-200 font-bold' },
  pending: { label: 'Pending Review', style: 'bg-amber-50 text-amber-700 border-amber-200 font-semibold' },
  contacted: { label: 'Contacted', style: 'bg-blue-50 text-blue-700 border-blue-200 font-semibold' },
  resolved: { label: 'Resolved / Closed', style: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold' },
}

export function EnquiryListTable() {
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = useStore()
  const [filter, setFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)

  const filtered = enquiries.filter((e) => {
    const matchesFilter = filter === 'all' || e.status === filter
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      (e.company && e.company.toLowerCase().includes(search.toLowerCase())) ||
      (e.productCategory && e.productCategory.toLowerCase().includes(search.toLowerCase())) ||
      e.message.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-6 font-sans">
      
      {/* Detail Modal View */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className={`text-[10px] uppercase px-2.5 py-1 rounded-full border ${statusBadges[selectedEnquiry.status]?.style || ''}`}>
                  {statusBadges[selectedEnquiry.status]?.label || selectedEnquiry.status}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-['Lato'] mt-2">
                  {selectedEnquiry.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Received on {selectedEnquiry.createdAt}
                </p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-slate-400 hover:text-slate-900 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block font-semibold uppercase">Email</span>
                <a href={`mailto:${selectedEnquiry.email}`} className="text-[#e31e24] font-medium hover:underline">
                  {selectedEnquiry.email}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold uppercase">Phone</span>
                <span className="text-slate-900 font-medium">
                  {selectedEnquiry.phone || 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold uppercase">Company</span>
                <span className="text-slate-900 font-medium">
                  {selectedEnquiry.company || 'Website Visitor'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold uppercase">Target Product</span>
                <span className="text-slate-900 font-bold">
                  {selectedEnquiry.productCategory || selectedEnquiry.category || 'General'}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                Customer Message &amp; Requirements
              </span>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed font-normal whitespace-pre-wrap">
                {selectedEnquiry.message || 'No additional message provided.'}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Update Status:</span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => {
                    const next = e.target.value as Enquiry['status']
                    updateEnquiryStatus(selectedEnquiry.id, next)
                    setSelectedEnquiry({ ...selectedEnquiry, status: next })
                  }}
                  className="text-xs px-2.5 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                >
                  <option value="new">New Lead</option>
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="bg-slate-900 text-white text-xs font-bold px-5 py-2 rounded-xl hover:bg-slate-800 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden font-sans">
        
        {/* Filter Tabs & Search Bar */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Inquiries' },
              { id: 'new', label: 'New Leads' },
              { id: 'pending', label: 'Pending' },
              { id: 'contacted', label: 'Contacted' },
              { id: 'resolved', label: 'Resolved' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#e31e24] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search enquiries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20"
            />
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-5 py-3">Client / Company</th>
                <th className="px-5 py-3">Product Segment</th>
                <th className="px-5 py-3">Message Snippet</th>
                <th className="px-5 py-3">Received At</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center">
                    <MessageSquare className="w-9 h-9 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-700">No customer enquiries received yet</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      Real inquiries and RFQs submitted by users across the website and AI assistant will appear here in real time.
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className={`hover:bg-slate-50/80 transition cursor-pointer ${
                      enquiry.status === 'new' ? 'bg-red-50/30 font-medium' : ''
                    }`}
                  >
                    {/* Client Name & Contact Info */}
                    <td className="px-5 py-4" onClick={() => setSelectedEnquiry(enquiry)}>
                      <div className="font-bold text-slate-900 text-sm">{enquiry.name}</div>
                      <div className="text-slate-500 text-xs mt-0.5 flex items-center gap-2">
                        <span>{enquiry.email}</span>
                        {enquiry.phone && <span>&bull; {enquiry.phone}</span>}
                      </div>
                      {enquiry.company && (
                        <span className="inline-block text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
                          {enquiry.company}
                        </span>
                      )}
                    </td>

                    {/* Product Segment */}
                    <td className="px-5 py-4" onClick={() => setSelectedEnquiry(enquiry)}>
                      <span className="inline-block bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-md text-[11px]">
                        {enquiry.productCategory || enquiry.category || 'Wire Requirement'}
                      </span>
                      {enquiry.productSubCategory && (
                        <div className="text-[10px] text-slate-500 mt-1">{enquiry.productSubCategory}</div>
                      )}
                    </td>

                    {/* Message */}
                    <td className="px-5 py-4 max-w-xs" onClick={() => setSelectedEnquiry(enquiry)}>
                      <p className="text-slate-600 line-clamp-2 leading-relaxed">
                        {enquiry.message}
                      </p>
                    </td>

                    {/* Timestamp */}
                    <td className="px-5 py-4 text-slate-500 whitespace-nowrap">
                      {enquiry.createdAt}
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <select
                        value={enquiry.status}
                        onChange={(e) => updateEnquiryStatus(enquiry.id, e.target.value as Enquiry['status'])}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border cursor-pointer ${
                          statusBadges[enquiry.status]?.style || 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        <option value="new">New Lead</option>
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedEnquiry(enquiry)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-[#e31e24] hover:text-white rounded-lg text-slate-700 text-xs font-semibold transition cursor-pointer"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete enquiry from "${enquiry.name}"?`)) {
                              deleteEnquiry(enquiry.id)
                            }
                          }}
                          className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition cursor-pointer"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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
