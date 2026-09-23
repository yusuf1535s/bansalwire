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
      <div className="bg-neutral-900 text-white py-14 px-4 text-center border-b-4 border-[#e31e24]">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-['Lato'] uppercase tracking-wide">
          Special Products Portfolio
        </h1>
        <p className="text-gray-300 mt-2 text-sm max-w-2xl mx-auto font-normal">
          High-performance customized wire solutions engineered for rigorous industrial demands.
        </p>
      </div>

      <SpecialProductsSection />

      {/* Building Materials Deep Dive */}
      <section className="py-16 bg-gray-50 border-t border-gray-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#e31e24] font-bold text-xs uppercase tracking-widest">Construction &amp; Structural</span>
            <h2 className="text-3xl font-extrabold text-gray-900 font-['Lato'] mt-1 bansal-heading-center">
              Engineered Building Material Products
            </h2>
            <p className="text-gray-600 mt-4 text-sm font-normal">
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
                <div className="h-32 bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center p-2">
                  <img
                    src={item.img}
                    alt={item.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/bansal/Anchor-Bolt1.jpg'
                    }}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
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
