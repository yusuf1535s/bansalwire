import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react'
import { useStore } from '../../store/useStore'

export const majorSectors = [
  {
    name: 'Automotive',
    description: 'Spring wires, control cables, spokes, fasteners, and exhaust components.',
    iconImg: '/images/bansal/1-1.png'
  },
  {
    name: 'General Engineering',
    description: 'Precision machining, industrial springs, pins, rivets, and components.',
    iconImg: '/images/bansal/2-1.png'
  },
  {
    name: 'Infrastructure',
    description: 'Prestressed concrete wires, structural stays, scaffolding, and binding.',
    iconImg: '/images/bansal/3-1.png'
  },
  {
    name: 'Hardware',
    description: 'Nails, screws, wire meshes, handles, chains, and household fixtures.',
    iconImg: '/images/bansal/4-1.png'
  },
  {
    name: 'Consumer Durables',
    description: 'Appliance wire shelving, cooker grills, handles, and refrigerator racks.',
    iconImg: '/images/bansal/5.png'
  },
  {
    name: 'Power & Transmission',
    description: 'ACSR core wire, earth wires, stay wires, and cable armouring strips.',
    iconImg: '/images/bansal/6.png'
  },
  {
    name: 'Agriculture',
    description: 'Vineyard trellising, fencing wire, bale ties, and greenhouse frames.',
    iconImg: '/images/bansal/7.png'
  },
  {
    name: 'Auto Replacement',
    description: 'Clutch cables, brake cables, wiper linkage wires, and repair components.',
    iconImg: '/images/bansal/8.png'
  }
]

export const productList = [
  {
    id: 'stainless-steel-wires',
    name: 'Stainless Steel Wires',
    category: 'Stainless Steel',
    image: '/images/bansal/Wires-320x320.jpg',
    description: 'Grades 200, 300, 400 series. Diameter 0.04 mm to 15.65 mm for spring, weaving, welding, and cold heading.',
    features: ['High Tensile Strength', 'Superior Corrosion Resistance', 'Smooth Bright Finish', 'Uniform Diameter Tolerance'],
    slug: 'stainless-steel-wires'
  },
  {
    id: 'low-carbon-steel-wires',
    name: 'Mild Steel Wires (Low Carbon)',
    category: 'Mild Steel',
    image: '/images/bansal/Low-Carbon-Steel-Wires--320x320.png',
    description: 'Drawn from high quality mild steel wire rods for general engineering, binding, hardware, and fasteners.',
    features: ['Excellent Ductility', 'Consistent Chemical Composition', 'Annealed & Hard Bright', 'High Formability'],
    slug: 'low-carbon-steel-wires'
  },
  {
    id: 'high-carbon-wires',
    name: 'High Carbon Steel Wires',
    category: 'High Carbon',
    image: '/images/bansal/630c9aa3-ffc1-4bd7-9c09-24d2905d93f6-1-320x320.png',
    description: 'Spring wires, tyre bead wires, mattress wire, rope wires, and auto control cables with precise heat treatment.',
    features: ['High Fatigue Resistance', 'Consistent Tensile Properties', 'Patented Microstructure', 'Superior Elasticity'],
    slug: 'high-carbon-wires'
  },
  {
    id: 'profile-shaped-wires',
    name: 'Profile / Shaped Wires',
    category: 'Shaped Wires',
    image: '/images/bansal/Profile-Shaped-Wires-Updated.jpg',
    description: 'Custom profile cross-sections including Flat, Square, Half-Round, Oval, Trapezoidal, and Wedge wire shapes.',
    features: ['Custom Geometry', 'Sharp Edge / Radius Corners', 'Tight Dimensional Control', 'Bright Clean Surface'],
    slug: 'profile-shaped-wires'
  },
  {
    id: 'aluminium-alloy-wires',
    name: 'Aluminium Alloy Wires',
    category: 'Aluminium Alloy',
    image: '/images/bansal/Aluminium-Alloy-Wires-Supplier-in-India-320x320.png',
    description: 'High conductivity and lightweight alloy wires for electrical cables, cold heading, and precision meshes.',
    features: ['Lightweight & Durable', 'Excellent Electrical Conductivity', 'Corrosion Proof', 'High Flexibility'],
    slug: 'aluminium-alloy-wires'
  },
  {
    id: 'galvanized-wires',
    name: 'Galvanized Wires (GI)',
    category: 'Galvanized',
    image: '/images/bansal/Galvanized-Wire.jpg',
    description: 'Hot dip and electro-galvanized wires with high zinc coating for fences, stay wires, netting, and vineyards.',
    features: ['Heavy Zinc Coating', 'Rust & Weather Protection', 'Uniform Coating Adhesion', 'High Tensile Strength'],
    slug: 'galvanized-wires'
  },
  {
    id: 'cable-armouring',
    name: 'Cable Armouring Wires & Strips',
    category: 'Cable Armouring',
    image: '/images/bansal/Cable-Armouring-Wires-Strips.jpg',
    description: 'Formed galvanized round wires and flat formed strips for mechanical protection of underground power & telecom cables.',
    features: ['High Torsion Resistance', 'Accurate Dimensions', 'Zinc Coating as per IS 3975', 'Defect-free Coils'],
    slug: 'cable-armouring'
  },
  {
    id: 'acsr-core-wire',
    name: 'Galvanized Steel Core for ACSR',
    category: 'Power Transmission',
    image: '/images/bansal/Galvanized-Steel-Core-Wire-for-ACSR-Conductors.jpg',
    description: 'High tensile galvanized core wire for aluminium conductors steel reinforced (ACSR) in power transmission overhead lines.',
    features: ['Conforms to IEC / IS 398', 'Heavy Galvanizing (Class A)', 'High Breaking Load', 'Stress-Relieved'],
    slug: 'galvanized-wires'
  }
]

export function ProductsSection() {
  const { products } = useStore()
  const [activeTab, setActiveTab] = useState('all')

  const displayList = products && products.length > 0 ? products : productList

  const filteredProducts =
    activeTab === 'all'
      ? displayList
      : displayList.filter((p) => p.category.toLowerCase().includes(activeTab.toLowerCase()))

  return (
    <section className="py-16 bg-slate-50 dark:bg-[#0b0f19] font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Major Sectors Section */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white uppercase tracking-wide font-['Lato'] bansal-heading-center">
              Major Sectors
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-4 text-sm sm:text-base font-normal">
              We are working in all possible verticals of commercial industries and are currently serving the wire needs of significant industries:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {majorSectors.map((sector, index) => (
              <div
                key={sector.name}
                className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-[#e31e24]/40 dark:hover:border-[#e31e24]/60 transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                {/* Large Visual Image Display */}
                <div className="relative aspect-square sm:aspect-[4/3] bg-slate-50 dark:bg-slate-800/40 overflow-hidden border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-center p-3">
                  <span className="absolute top-3 left-3 text-[10px] font-black tracking-widest text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-800/90 px-2 py-0.5 rounded-md backdrop-blur-xs z-20 shadow-xs">
                    0{index + 1}
                  </span>
                  <img
                    src={sector.iconImg}
                    alt={sector.name}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/bansal/1-1.png'
                    }}
                    className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white font-['Lato'] text-lg mb-2 group-hover:text-[#e31e24] dark:group-hover:text-[#ff6b6e] transition-colors">
                    {sector.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed flex-1">
                    {sector.description}
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-[#e31e24] dark:text-[#ff6b6e]">
                    <span>Key Applications</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Showcase Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white uppercase tracking-wide font-['Lato'] bansal-heading-center">
            Our Products
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-4 text-sm sm:text-base font-normal">
            Precision manufactured engineered wires with custom chemical &amp; physical specifications.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[
              { label: 'All Products', value: 'all' },
              { label: 'Stainless Steel', value: 'stainless' },
              { label: 'Mild Steel', value: 'mild' },
              { label: 'High Carbon', value: 'high carbon' },
              { label: 'Galvanized', value: 'galvanized' },
              { label: 'Shaped Wires', value: 'shaped' }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition uppercase tracking-wider cursor-pointer ${
                  activeTab === tab.value
                    ? 'bg-[#e31e24] text-white shadow-sm'
                    : 'bg-white dark:bg-[#111827] text-gray-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bansal-card bg-white dark:bg-[#111827] rounded-xl overflow-hidden border border-gray-200 dark:border-slate-800 flex flex-col justify-between group"
            >
              <div>
                {/* Product Image Container - Aspect 4:3 */}
                <div className="relative aspect-[4/3] bg-slate-50 dark:bg-[#151d2e] overflow-hidden border-b border-gray-100 dark:border-slate-800 flex items-center justify-center p-3">
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
                  <span className="absolute top-3 left-3 bg-[#e31e24] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider z-20 shadow-xs">
                    {product.category}
                  </span>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#e31e24] dark:group-hover:text-[#ff6b6e] transition-colors font-['Lato']">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-slate-300 mt-2 line-clamp-3 font-normal leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-4 space-y-1">
                    {(((product as any).specifications || (product as any).features || (product as any).applications || []) as string[]).slice(0, 2).map((feat: string, i: number) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-slate-400 font-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#e31e24] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-5 pb-5 pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  to={`/products`}
                  className="text-xs font-bold text-[#e31e24] hover:text-[#b81419] dark:hover:text-[#ff6b6e] flex items-center gap-1 uppercase tracking-wider"
                >
                  View Details <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/contact"
                  className="text-[11px] bg-gray-100 dark:bg-slate-800 hover:bg-[#e31e24] dark:hover:bg-[#e31e24] hover:text-white dark:hover:text-white text-gray-700 dark:text-slate-200 px-3 py-1 rounded font-semibold transition"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#e31e24] hover:bg-[#b81419] text-white font-bold px-8 py-3.5 rounded text-xs sm:text-sm uppercase tracking-wider shadow-lg transition duration-200"
          >
            Browse Complete Product Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}

export function ProductShowcase() {
  return null
}
