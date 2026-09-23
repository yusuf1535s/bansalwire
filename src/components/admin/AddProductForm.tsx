import { useState, useRef } from 'react'
import { useStore } from '../../store/useStore'
import { X, Save, Image as ImageIcon, Upload, CheckCircle2 } from 'lucide-react'
import type { Product } from '../../types'

interface Props {
  onClose: () => void
  product?: Product
}

export function AddProductForm({ onClose, product }: Props) {
  const { addProduct, updateProduct } = useStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadFileName, setUploadFileName] = useState<string>('')
  const [uploadError, setUploadError] = useState<string>('')

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WebP, SVG)')
      return
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError('Image size must be under 8MB')
      return
    }

    setUploadError('')
    setUploadFileName(file.name)

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64Url = event.target?.result as string
      setForm((prev) => ({ ...prev, image: base64Url }))
    }
    reader.readAsDataURL(file)
  }

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

        {/* Product Image Selection & Folder Upload Area */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Product Image
            </label>
            <span className="text-[11px] text-slate-500">Upload from device folder or enter image path</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Live Image Preview */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl border border-slate-200 bg-white p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-xs relative group">
              {form.image ? (
                <img
                  src={form.image}
                  alt="Product Preview"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/bansal/Wires-320x320.jpg'
                  }}
                />
              ) : (
                <ImageIcon className="w-8 h-8 text-slate-300" />
              )}
            </div>

            {/* Upload & Path Controls */}
            <div className="flex-1 space-y-2.5 w-full">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#e31e24] hover:bg-[#b81419] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload from Folder</span>
                </button>

                {uploadFileName && (
                  <span className="text-xs text-slate-600 font-medium truncate max-w-xs flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    {uploadFileName}
                  </span>
                )}
              </div>

              {uploadError && (
                <p className="text-xs text-red-600 font-medium">{uploadError}</p>
              )}

              {/* Manual URL / Path Input */}
              <div className="relative">
                <ImageIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Or enter Image URL / Path (e.g. /images/bansal/Wires-320x320.jpg)"
                  value={form.image}
                  onChange={(e) => {
                    setUploadFileName('')
                    setForm({ ...form, image: e.target.value })
                  }}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20"
                />
              </div>

              {/* Preset Image Options */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider mr-1">Presets:</span>
                {[
                  { label: 'SS Wires', path: '/images/bansal/Wires-320x320.jpg' },
                  { label: 'High Carbon', path: '/images/bansal/DSC_4109-1-scaled.jpg' },
                  { label: 'GI Galvanized', path: '/images/bansal/Electro-Galvanized-Wires-GI.jpg' },
                  { label: 'Cable Armouring', path: '/images/bansal/Cable-Armouring-Wires-Strips.jpg' },
                  { label: 'Profile Shaped', path: '/images/bansal/Profile-Shaped-Wires-Updated.jpg' },
                  { label: 'Aluminium Wire', path: '/images/bansal/Aluminium-Alloy-Wires-Supplier-in-India-320x320.png' }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setUploadFileName('')
                      setForm({ ...form, image: preset.path })
                    }}
                    className={`px-2 py-0.5 rounded text-[10.5px] font-medium border transition cursor-pointer ${
                      form.image === preset.path
                        ? 'bg-[#e31e24] text-white border-[#e31e24]'
                        : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
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
