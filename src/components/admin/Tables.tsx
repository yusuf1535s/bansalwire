import { useStore } from '../../store/useStore'
import { ArrowUpRight, Package, MessageSquare, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export function RecentProducts() {
  const { products } = useStore()
  const recent = products.slice(0, 5)

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden font-sans">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-base text-slate-900 font-['Lato']">Live Wire Products</h3>
          <p className="text-xs text-slate-500">Recently updated catalog SKUs</p>
        </div>
        <Link to="/admin/products" className="text-[#e31e24] text-xs font-bold hover:underline flex items-center gap-1">
          All Products <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="divide-y divide-slate-100">
        {recent.map((product) => (
          <div key={product.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50 transition">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/bansal/Wires-320x320.jpg'
                    }}
                  />
                ) : (
                  <Package className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 font-['Lato']">{product.name}</div>
                <div className="text-xs text-slate-500">{product.category} &bull; {product.subCategory}</div>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
              Published
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RecentEnquiries() {
  const { enquiries } = useStore()
  const recent = enquiries.slice(0, 5)

  const statusColors: Record<string, string> = {
    new: 'bg-red-50 text-[#e31e24] border-red-200 font-bold',
    pending: 'bg-amber-50 text-amber-700 border-amber-200 font-semibold',
    contacted: 'bg-blue-50 text-blue-700 border-blue-200 font-semibold',
    resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold',
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden font-sans">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-base text-slate-900 font-['Lato']">Recent Inquiries &amp; Leads</h3>
          <p className="text-xs text-slate-500">Live incoming client RFQs</p>
        </div>
        <Link to="/admin/enquiries" className="text-[#e31e24] text-xs font-bold hover:underline flex items-center gap-1">
          View All <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="divide-y divide-slate-100">
        {recent.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-700">No customer enquiries received yet</p>
            <p className="text-[11px] text-slate-400 mt-1">Live inquiries submitted via the website Contact &amp; RFQ forms will appear here in real time.</p>
          </div>
        ) : (
          recent.map((enquiry) => (
            <Link
              key={enquiry.id}
              to="/admin/enquiries"
              className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50 transition block"
            >
              <div>
                <div className="text-sm font-bold text-slate-900 font-['Lato']">{enquiry.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {enquiry.productCategory || enquiry.category} &bull; <span className="text-slate-400">{enquiry.createdAt}</span>
                </div>
              </div>
              <span className={`text-[10px] px-2.5 py-1 rounded-full border ${statusColors[enquiry.status] || 'bg-slate-100'}`}>
                {enquiry.status === 'new' ? 'New Lead' : enquiry.status}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
