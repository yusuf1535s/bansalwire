import { useState } from 'react'
import { useStore } from '../../store/useStore'
import { X, Save } from 'lucide-react'
import type { Product } from '../../types'
import { categories } from '../../data/static'

interface Props {
  onClose: () => void
  product?: Product
}

export function AddProductForm({ onClose, product }: Props) {
  const { addProduct, updateProduct } = useStore()
  const [form, setForm] = useState<Partial<Product>>(product || {
    name: '', category: '', subCategory: '', description: '', specifications: [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (product?.id) {
      updateProduct(product.id, form as Partial<Product>)
    } else {
      addProduct({ ...(form as Product), id: Date.now().toString() })
    }
    onClose()
  }

  return (
    <div className="bg-white rounded-xl border border-border-light p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-text-primary">{product ? 'Edit' : 'Add'} Product</h3>
        <button onClick={onClose}><X className="w-5 h-5 text-text-secondary" /></button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input required placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border-light text-sm" />
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border-light text-sm">
            <option value="">Select Category</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <input placeholder="Sub Category" value={form.subCategory} onChange={e => setForm({ ...form, subCategory: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border-light text-sm" />
        <textarea placeholder="Description" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border-light text-sm resize-none" />
        <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-light transition flex items-center gap-2">
          <Save className="w-4 h-4" /> {product ? 'Update' : 'Add'} Product
        </button>
      </form>
    </div>
  )
}
