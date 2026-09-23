import { AdminGuard } from '../../admin/guards'
import { PageMeta } from '../../components/common/PageMeta'
import { ProductListTable } from '../../components/admin/ProductListTable'
import { AddProductForm } from '../../components/admin/AddProductForm'
import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function ProductsAdminPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <AdminGuard>
      <>
        <PageMeta title="Products Management" description="Manage Products" />
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Products</h1>
            <p className="text-text-secondary text-sm mt-1">Manage your product catalog</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-light transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        {showForm && <AddProductForm onClose={() => setShowForm(false)} />}
        <ProductListTable />
      </>
    </AdminGuard>
  )
}
