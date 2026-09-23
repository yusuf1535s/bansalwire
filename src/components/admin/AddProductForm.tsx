import { useState } from 'react'
import { useStore } from '../../store/useStore'
import { X, Save, Image as ImageIcon } from 'lucide-react'
import type { Product } from '../../types'

interface Props {
  onClose: () => void
  product?: Product
}

export function AddProductForm({ onClose, product }: Props) {
  const { addProduct, updateProduct } = useStore()
  const [form, setForm] = useState<Partial<Product>>(
    product || {
      name: '',
      category: 'Stainless Steel',
      subCategory: '',
      description: '',
      image: '/images/bansal/Wires-320x320.jpg',
      specifications: ['Diameter: 0.04mm - 15.65mm', 'High Tensile Quality'],
      applications: ['Automotive', 'Engineering']
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name) return

    if (product?.id) {
      updateProduct(product.id, form as Partial<Product>)
    } else {
      addProduct({
        ...(form as Product),
        id: Date.now().toString(),
        category: form.category || 'Stainless Steel',
        subCategory: form.subCategory || 'Standard Wires',
        description: form.description || '',
        image: form.image || '/images/bansal/Wires-320x320.jpg'
      })
    }
    onClose()
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-md font-sans">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-['Lato']">
            {product ? 'Edit Wire Product' : 'Add New Wire Product'}
          </h3>
          <p className="text-xs text-slate-500">
            {product ? 'Update product specifications and catalog image' : 'Publish a new wire SKU to the website catalog'}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Stainless Steel Spring Wire"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Product Category <span className="text-red-500">*</span>
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20"
            >
              <option value="Stainless Steel">Stainless Steel Wires</option>
              <option value="High Carbon">High Carbon Steel Wires</option>
              <option value="Mild Steel">Mild Steel Wires (Low Carbon)</option>
              <option value="Galvanized">Galvanized Wires (GI)</option>
              <option value="Profile">Profile / Shaped Wires</option>
              <option value="Cable Armouring">Cable Armouring Wires &amp; Strips</option>
              <option value="Aluminium">Aluminium Alloy Wires</option>
              <option value="Special Product">Special Products Portfolio</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Subcategory / Gauge Range
            </label>
            <input
              type="text"
              placeholder="e.g. 0.04mm - 15.65mm (Grade 304, 316)"
              value={form.subCategory}
              onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Image URL / Path
            </label>
            <div className="relative">
              <ImageIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="/images/bansal/Wires-320x320.jpg"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Product Description
          </label>
          <textarea
            rows={3}
            placeholder="Enter detailed technical description, standard ASTM/IS compliance..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20 resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#e31e24] hover:bg-[#b81419] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" /> {product ? 'Update Product' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  )
}
