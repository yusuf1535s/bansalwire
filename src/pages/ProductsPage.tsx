import { useState } from 'react'
import { AppWrapper } from '../components/layout/AppWrapper'
import { PageMeta } from '../components/common/PageMeta'
import { productList, majorSectors } from '../components/home/ProductsSection'
import { SpecialProductsSection } from '../components/home/SpecialProductsSection'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, CheckCircle2, Search, SlidersHorizontal } from 'lucide-react'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    'All',
    'Stainless Steel',
    'Mild Steel',
    'High Carbon',
    'Galvanized',
    'Shaped Wires',
    'Cable Armouring',
    'Aluminium Alloy'
  ]

  const filtered = productList.filter((p) => {
    const matchesCat =
      selectedCategory === 'All' ||
      p.category.toLowerCase().includes(selectedCategory.toLowerCase())
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <AppWrapper>
      <PageMeta
        title="Products Catalog | Stainless Steel, High Carbon, Mild Steel Wires | Bansal Wire"
        description="Explore over 3,000 SKUs of Stainless Steel wires, Mild Steel wires, High Carbon wires, Shaped wires, Galvanized wires, and Cable Armouring strips."
      />

      {/* Banner */}
      <div className="bg-neutral-900 text-white py-14 px-4 text-center border-b-4 border-[#e31e24]">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-['Lato'] uppercase tracking-wide">
          Engineered Wire Products
        </h1>
        <p className="text-gray-300 mt-2 text-sm max-w-2xl mx-auto font-normal">
          Over 3,000 SKUs manufactured with diameters from 0.04 mm to 15.65 mm complying with global ASTM, DIN, JIS, and IS standards.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
        
        {/* Search & Filter Bar */}
        <div className="bg-[#fcfcfc] p-4 sm:p-6 rounded-xl border border-gray-200 shadow-xs mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories Pill Bar */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition uppercase tracking-wider ${
                  selectedCategory === cat
                    ? 'bg-[#e31e24] text-white shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search wire grade or application..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bansal-card bg-white rounded-xl overflow-hidden border border-gray-200 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 bg-gray-100 overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/bansal/Wires-320x320.jpg'
                    }}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-[#e31e24] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-[#e31e24] transition-colors font-['Lato']">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-3 font-normal leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-4 space-y-1">
                    {product.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-gray-500 font-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#e31e24] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-gray-100 flex items-center justify-between">
                <Link
                  to="/contact"
                  className="text-xs font-bold text-[#e31e24] hover:text-[#b81419] flex items-center gap-1 uppercase tracking-wider"
                >
                  Request Sample / Quote <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Sectors Overview */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[#e31e24] font-bold text-xs uppercase tracking-widest">Industry Verticals</span>
            <h2 className="text-3xl font-extrabold text-gray-900 font-['Lato'] mt-1 bansal-heading-center">
              Target Industries &amp; Applications
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {majorSectors.map((sec) => (
              <div key={sec.name} className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
                <img
                  src={sec.iconImg}
                  alt={sec.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/bansal/1-1.png'
                  }}
                  className="w-10 h-10 object-contain mx-auto mb-2"
                />
                <h4 className="font-bold text-gray-900 text-xs font-['Lato']">{sec.name}</h4>
              </div>
            ))}
          </div>
        </div>

      </div>

      <SpecialProductsSection />
    </AppWrapper>
  )
}
