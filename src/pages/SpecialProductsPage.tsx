import { AppWrapper } from '../components/layout/AppWrapper'
import { SpecialProductsSection, specialProductsList } from '../components/home/SpecialProductsSection'
import { PageMeta } from '../components/common/PageMeta'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react'

export default function SpecialProductsPage() {
  return (
    <AppWrapper>
      <PageMeta
        title="Special Wire Products | Bansal Wire Industries Ltd."
        description="Engineered special wire products including wire rope, tyre bead wire, aluminium alloy wire mesh, stainless steel scrubber wire, building material accessories, and barbed wire."
      />
      
      {/* Banner */}
      <div className="bg-white py-4 sm:py-5 px-4 text-center border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#e31e24] font-bold text-[11px] sm:text-xs uppercase tracking-wider block mb-0.5">
            Niche Engineering Portfolio
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-['Lato'] tracking-tight bansal-heading-center">
            Special Products Portfolio
          </h1>
          <p className="text-gray-500 mt-1.5 text-xs sm:text-[13px] max-w-xl mx-auto font-normal leading-normal">
            High-performance customized wire solutions engineered for rigorous industrial demands.
          </p>
        </div>
      </div>

      <SpecialProductsSection />

      {/* Building Materials Deep Dive */}
      <section className="py-8 sm:py-10 bg-gray-50 border-t border-gray-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-[#e31e24] font-bold text-[11px] sm:text-xs uppercase tracking-wider block mb-0.5">Construction &amp; Structural</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-['Lato'] tracking-tight bansal-heading-center">
              Engineered Building Material Products
            </h2>
            <p className="text-gray-500 mt-2 text-xs sm:text-sm font-normal">
              High tensile masonry fasteners, wall ties, anchor bolts, and connector hooks manufactured under strict ISO quality standards.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Anchor Bolts', img: '/images/bansal/Anchor-Bolt1.jpg' },
              { name: 'Structural Clamps', img: '/images/bansal/Clamps.jpg' },
              { name: 'Masonry Hooks', img: '/images/bansal/Hooks1.jpg' },
              { name: 'Cavity Wall Ties', img: '/images/bansal/Wall-Ties1.jpg' },
              { name: 'Cross Connectors', img: '/images/bansal/Cross-Connectors.jpg' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-xs hover:border-[#e31e24] transition group">
                <div className="aspect-[4/3] bg-slate-50 rounded-lg overflow-hidden mb-3 flex items-center justify-center p-2">
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/bansal/Anchor-Bolt1.jpg'
                    }}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm font-['Lato'] group-hover:text-[#e31e24] transition-colors">
                  {item.name}
                </h4>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#e31e24] hover:bg-[#b81419] text-white font-bold px-8 py-3 rounded text-xs uppercase tracking-wider shadow transition"
            >
              Request Custom Building Material Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </AppWrapper>
  )
}
