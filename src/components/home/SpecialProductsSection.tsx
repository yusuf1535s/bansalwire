import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export const specialProductsList = [
  {
    name: 'Wire Rope',
    image: '/images/bansal/Wire-Rope-Updated-Last.jpg',
    description: 'High tensile engineered wire ropes for cranes, mining, elevators, marine, and heavy lifting applications.',
    specs: 'Strand constructions 6x19, 6x36, 8x19 with galvanized or ungalvanized finish.',
    slug: 'wire-rope'
  },
  {
    name: 'Tyre Bead Wire',
    image: '/images/bansal/Tyre-Bead-Banner-Updated-2-1.jpg',
    description: 'High carbon bronze-coated steel wire designed to anchor automobile tires securely to wheel rims.',
    specs: 'Tensile strength up to 2200-2800 MPa with optimal rubber adhesion.',
    slug: 'tyre-bead'
  },
  {
    name: 'Aluminium Alloy Wire Mesh',
    image: '/images/bansal/Aluminium-Alloy-Wire-Mesh-Banner-Updated.jpg',
    description: 'Precision woven and welded alloy meshes for insect screening, filtration, aerospace, and architecture.',
    specs: 'High corrosion resistance, lightweight structure, and aesthetic metallic look.',
    slug: 'aluminium-wire-mesh'
  },
  {
    name: 'Stainless Steel Scrubbers',
    image: '/images/bansal/Stainless-Steel-Scrubber-Wire-Banner-Updated-1349x400.jpg',
    description: 'Fine stainless steel flat flattened wires for scouring pads, industrial cleaning, and filtration.',
    specs: 'High rust resistance AISI 410 / 430 grade with magnetic properties and sharp cleaning edges.',
    slug: 'ss-scrubbers'
  },
  {
    name: 'Building Material Products',
    image: '/images/bansal/Anchor-Bolt1.jpg',
    description: 'Anchor bolts, clamps, masonry wall ties, hooks, and cross connectors for heavy structural engineering.',
    specs: 'Zinc electroplated, hot-dip galvanized or stainless steel grades for masonry support.',
    slug: 'building-material'
  },
  {
    name: 'Barbed Wire',
    image: '/images/bansal/BARBED-wire-Banner-Bansal.jpg',
    description: 'High tensile galvanized double strand barbed wire with 4-point barbs for high security boundary fencing.',
    specs: 'Conforms to IS 278 with uniform zinc coating and high puncture deterrent.',
    slug: 'barbed-wire'
  }
]

export function SpecialProductsSection() {
  return (
    <section className="py-16 bg-white font-sans border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] uppercase tracking-wide font-['Lato'] bansal-heading-center">
            Special Products
          </h2>
          <p className="text-gray-600 mt-4 text-sm sm:text-base font-normal">
            Specialized engineered wire products serving high-specification niche global industrial requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialProductsList.map((item) => (
            <div
              key={item.slug}
              className="bansal-card bg-white rounded-xl overflow-hidden border border-gray-200 flex flex-col justify-between group shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* Clean Image Showcase - No overlapping text */}
                <div className="relative h-52 bg-neutral-900 overflow-hidden border-b border-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/bansal/Wires-320x320.jpg'
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#e31e24] text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow">
                    Specialized
                  </span>
                </div>

                {/* Card Body with Title and Specs */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#e31e24] transition-colors font-['Lato'] mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-3 bg-gray-50 p-2.5 rounded border border-gray-100 text-[11px] text-gray-600">
                    <strong className="text-gray-800 block mb-0.5">Key Specification:</strong>
                    {item.specs}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-gray-100">
                <Link
                  to="/special-products"
                  className="text-xs font-bold text-[#e31e24] hover:text-[#b81419] flex items-center gap-1 uppercase tracking-wider"
                >
                  Learn More <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/contact"
                  className="text-xs bg-[#e31e24] hover:bg-[#b81419] text-white font-bold px-3.5 py-1.5 rounded transition uppercase tracking-wider shadow-xs"
                >
                  Inquire
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
