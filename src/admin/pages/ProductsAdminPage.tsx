import { AdminGuard } from '../../admin/guards'
import { PageMeta } from '../../components/common/PageMeta'
import { ProductListTable } from '../../components/admin/ProductListTable'
import { AddProductForm } from '../../components/admin/AddProductForm'
import { useState } from 'react'
import { Plus, Package } from 'lucide-react'

export default function ProductsAdminPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <AdminGuard>
      <div className="font-sans space-y-6">
        <PageMeta title="Products Management | Bansal Wire Admin" description="Manage Products" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Package className="w-6 h-6 text-[#e31e24]" />
              <h1 className="text-2xl font-extrabold text-slate-900 font-['Lato']">
                Wire Products &amp; SKUs
              </h1>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Manage product listings, images, specifications, and categories across the website.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#e31e24] hover:bg-[#b81419] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> {showForm ? 'Close Form' : 'Add New Product'}
          </button>
        </div>

        {showForm && <AddProductForm onClose={() => setShowForm(false)} />}
        <ProductListTable />
      </div>
    </AdminGuard>
  )
}
