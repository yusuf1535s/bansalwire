import { useStore } from '../../store/useStore'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function RecentProducts() {
  const { products } = useStore()
  const recent = products.slice(0, 5)

  return (
    <div className="bg-white rounded-xl border border-border-light">
      <div className="px-6 py-4 border-b border-border-light flex items-center justify-between">
        <h3 className="font-semibold text-text-primary">Recent Products</h3>
        <Link to="/admin/products" className="text-primary text-sm hover:underline flex items-center gap-1">
          View All <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="divide-y divide-border-light">
        {recent.map((product) => (
          <div key={product.id} className="px-6 py-3 flex items-center justify-between hover:bg-bg-light transition">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-sm">
                {product.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-medium text-text-primary">{product.name}</div>
                <div className="text-xs text-text-secondary">{product.category}</div>
              </div>
            </div>
            <span className="text-xs bg-bg-light text-text-secondary px-2 py-1 rounded">Active</span>
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
    new: 'bg-primary/10 text-primary',
    pending: 'bg-amber-100 text-amber-700',
    contacted: 'bg-accent/10 text-accent',
    resolved: 'bg-green-50 text-green-600',
  }

  return (
    <div className="bg-white rounded-xl border border-border-light">
      <div className="px-6 py-4 border-b border-border-light">
        <h3 className="font-semibold text-text-primary">Recent Enquiries</h3>
      </div>
      <div className="divide-y divide-border-light">
        {recent.map((enquiry) => (
          <div key={enquiry.id} className="px-6 py-3 flex items-center justify-between hover:bg-bg-light transition">
            <div>
              <div className="text-sm font-medium text-text-primary">{enquiry.name}</div>
              <div className="text-xs text-text-secondary">{enquiry.category} • {enquiry.createdAt}</div>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${statusColors[enquiry.status]}`}>
              {enquiry.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
