import { useState } from 'react'
import { useStore } from '../../store/useStore'
import { Edit2, Trash2, Package, Search, Image as ImageIcon } from 'lucide-react'
import type { Product } from '../../types'
import { AddProductForm } from './AddProductForm'

function ProductRow({
  product,
  onEdit
}: {
  product: Product
  onEdit: (product: Product) => void
}) {
  const { deleteProduct } = useStore()
  const [imgError, setImgError] = useState(false)

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/80 transition font-sans">
      <td className="px-5 py-4 text-xs font-mono text-slate-400">#{product.id}</td>
      
      {/* Product Image & Name */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
            {product.image && !imgError ? (
              <img
                src={product.image}
                alt={product.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <Package className="w-6 h-6 text-slate-400" />
            )}
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 font-['Lato']">{product.name}</div>
            <div className="text-xs text-slate-500 font-normal line-clamp-1">{product.description}</div>
          </div>
        </div>
      </td>

      {/* Category Pill */}
      <td className="px-5 py-4 text-xs">
        <span className="bg-red-50 text-[#e31e24] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider text-[10px]">
          {product.category}
        </span>
      </td>

      {/* Subcategory / SKU */}
      <td className="px-5 py-4 text-xs text-slate-600 font-medium">
        {product.subCategory || 'Standard'}
      </td>

      {/* Status */}
      <td className="px-5 py-4 text-xs">
        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> In Catalog
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onEdit(product)}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition cursor-pointer"
            title="Edit Product"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
                deleteProduct(product.id)
              }
            }}
            className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition cursor-pointer"
            title="Delete Product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export function ProductListTable() {
  const { products } = useStore()
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [search, setSearch] = useState('')

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {editingProduct && (
        <AddProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden font-sans">
        
        {/* Table Header Controls */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 font-['Lato']">
              All Engineered Wire Products ({filtered.length})
            </h3>
            <p className="text-xs text-slate-500">Live catalog shown to visitors on the website</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20"
            />
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Product Name &amp; Image</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Specification / SKU</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onEdit={(p) => setEditingProduct(p)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
