import { useStore } from '../../store/useStore'
import { Edit2, Trash2 } from 'lucide-react'
import type { Product } from '../../types'

function ProductRow({ product }: { product: Product }) {
  const { deleteProduct } = useStore()
  return (
    <tr className="border-b border-border-light hover:bg-bg-light">
      <td className="px-6 py-3 text-sm text-text-secondary">{product.id}</td>
      <td className="px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center text-primary font-bold text-xs">
            {product.name.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-medium text-text-primary">{product.name}</div>
            <div className="text-xs text-text-secondary">{product.subCategory}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-3 text-sm text-text-secondary">{product.category}</td>
      <td className="px-6 py-3 text-sm">
        <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded text-xs">Active</span>
      </td>
      <td className="px-6 py-3">
        <div className="flex gap-2">
          <button className="p-1 hover:bg-primary/10 rounded text-primary"><Edit2 className="w-4 h-4" /></button>
          <button onClick={() => deleteProduct(product.id)} className="p-1 hover:bg-red-50 rounded text-danger">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export function ProductListTable() {
  const { products } = useStore()

  return (
    <div className="bg-white rounded-xl border border-border-light overflow-hidden">
      <div className="px-6 py-4 border-b border-border-light">
        <h3 className="font-semibold text-text-primary">All Products</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-bg-light text-xs text-text-secondary uppercase">
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
