import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { AppWrapper } from '../components/layout/AppWrapper'
import { PageMeta } from '../components/common/PageMeta'
import { productList, majorSectors } from '../components/home/ProductsSection'
import { SpecialProductsSection } from '../components/home/SpecialProductsSection'
import { ArrowRight, ChevronRight, CheckCircle2, Search, SlidersHorizontal, Sparkles } from 'lucide-react'

const slugCategoryMap: Record<string, string> = {
  'stainless-steel-wires': 'Stainless Steel',
  'stainless-steel': 'Stainless Steel',
  'mild-steel-wires': 'Mild Steel',
  'low-carbon-steel-wires': 'Mild Steel',
  'mild-steel': 'Mild Steel',
  'high-carbon-wires': 'High Carbon',
  'high-carbon': 'High Carbon',
  'profile-shaped-wires': 'Shaped Wires',
  'shaped-wires': 'Shaped Wires',
  'aluminium-alloy': 'Aluminium Alloy',
  'aluminium-alloy-wires': 'Aluminium Alloy',
  'galvanized-wires': 'Galvanized',
  'galvanized': 'Galvanized',
  'cable-armouring': 'Cable Armouring',
  'cable-armouring-wires': 'Cable Armouring',
  'search-by-industry': 'All',
  'search-by-product': 'All',
}

export default function ProductsPage() {
  const { slug } = useParams<{ slug?: string }>()
  const location = useLocation()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (slug) {
      const mapped = slugCategoryMap[slug.toLowerCase()]
      if (mapped) {
        setSelectedCategory(mapped)
      }
      if (slug === 'search-by-industry') {
        setTimeout(() => {
          document.getElementById('industry-sectors')?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    } else {
      setSelectedCategory('All')
    }
  }, [slug, location.pathname])

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
      <div className="bg-white py-4 sm:py-5 px-4 text-center border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#e31e24] font-bold text-[11px] sm:text-xs uppercase tracking-wider block mb-0.5">
            Global Specification Catalog
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-['Lato'] tracking-tight bansal-heading-center">
            Engineered Wire Products
          </h1>
          <p className="text-gray-500 mt-1.5 text-xs sm:text-[13px] max-w-xl mx-auto font-normal leading-normal">
            Over 3,000 SKUs manufactured with diameters from 0.04 mm to 15.65 mm complying with global ASTM, DIN, JIS, and IS standards.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 font-sans">
        
        {/* Search & Filter Bar */}
        <div className="bg-[#fcfcfc] p-4 sm:p-5 rounded-xl border border-gray-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
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
                <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden border-b border-gray-100 flex items-center justify-center p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/bansal/Wires-320x320.jpg'
                    }}
                    className="w-full h-full object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-[#e31e24] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider z-10 shadow-xs">
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
                  to={`/contact?product=${encodeURIComponent(product.name)}&segment=${encodeURIComponent(product.category)}`}
                  className="text-xs font-bold text-[#e31e24] hover:text-[#b81419] flex items-center gap-1 uppercase tracking-wider"
                >
                  Request Sample / Quote <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Sectors Overview */}
        <div id="industry-sectors" className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-[#e31e24] font-bold text-xs uppercase tracking-widest">Industry Verticals</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-['Lato'] tracking-tight bansal-heading-center">
              Target Industries &amp; Applications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {majorSectors.map((sec, index) => (
              <div 
                key={sec.name} 
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#e31e24]/40 transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                <div className="relative aspect-square sm:aspect-[4/3] bg-slate-50 overflow-hidden border-b border-gray-100 flex items-center justify-center p-3">
                  <span className="absolute top-3 left-3 text-[10px] font-black tracking-widest text-gray-700 bg-white/90 px-2 py-0.5 rounded-md z-10 shadow-xs">
                    0{index + 1}
                  </span>
                  <img
                    src={sec.iconImg}
                    alt={sec.name}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/bansal/1-1.png'
                    }}
                    className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h4 className="font-bold text-gray-900 text-base font-['Lato'] mb-1.5 group-hover:text-[#e31e24] transition-colors">
                    {sec.name}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed flex-1">
                    {sec.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <SpecialProductsSection />
    </AppWrapper>
  )
}
