import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Hand, Globe2, MapPin } from 'lucide-react'

export const groupCompaniesList = [
  'Bansal High Carbons Private Limited',
  'Balaji Wires Private Limited',
  'Bansal Aradhya Steel Private Limited',
  'Paramhans Wires Private Limited',
  'Bansal Enterprises Inc',
  'Manglam Wires Private Limited',
  'Bansal Strips Private Limited',
  'Manishi Towers Private Limited',
  'Shyam Sunder Arun Kumar Private Limited'
]

export function GroupCompaniesSection() {
  return (
    <section className="py-16 bg-white dark:bg-[#0b0f19] border-t border-gray-200 dark:border-slate-800 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 bg-gray-50 dark:bg-[#111827] rounded-xl p-8 border border-gray-200 dark:border-slate-800 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-950/50 text-[#e31e24] dark:text-[#ff6b6e] rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <Globe2 className="w-3.5 h-3.5" />
                Global &amp; Domestic Presence
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white font-['Lato'] bansal-heading">
                Our Reach Across India &amp; 50+ Countries
              </h2>
              <p className="text-gray-700 dark:text-slate-300 mt-4 leading-relaxed text-sm font-normal">
                With four modern manufacturing facilities in Ghaziabad and our upcoming mega manufacturing plant in Dadri, Bansal Wire operates a seamless supply network spanning across major industrial corridors in India and exporting across North America, Europe, Middle East, and Asia-Pacific.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-3 bg-white dark:bg-slate-800/80 rounded-lg border border-gray-200 dark:border-slate-700">
                  <div className="text-2xl font-black text-[#e31e24] dark:text-[#ff6b6e] font-['Lato']">4+1</div>
                  <div className="text-xs font-semibold text-gray-700 dark:text-slate-200 mt-0.5">Manufacturing Units</div>
                  <div className="text-[11px] text-gray-500 dark:text-slate-400">Ghaziabad &amp; Dadri Mega Plant</div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800/80 rounded-lg border border-gray-200 dark:border-slate-700">
                  <div className="text-2xl font-black text-[#e31e24] dark:text-[#ff6b6e] font-['Lato']">50+</div>
                  <div className="text-xs font-semibold text-gray-700 dark:text-slate-200 mt-0.5">Export Destinations</div>
                  <div className="text-[11px] text-gray-500 dark:text-slate-400">Global footprint across continents</div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/about/our-presence"
                  className="inline-flex items-center gap-2 bg-[#e31e24] hover:bg-[#b81419] text-white font-bold px-6 py-2.5 rounded text-xs uppercase tracking-wider transition shadow"
                >
                  View Facility Map <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4 flex items-center justify-center min-h-[300px] shadow-xs">
              <img
                src="/images/bansal/map-1.png"
                alt="Bansal Wire Global Map"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/bansal/map-2-1.png'
                }}
                className="max-h-[280px] w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute bottom-3 right-3 bg-[#e31e24] text-white text-[10px] font-bold px-2.5 py-1 rounded shadow">
                50+ Export Markets
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-left mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-['Lato'] bansal-heading">
              Group Companies
            </h3>
            <p className="text-gray-600 dark:text-slate-300 mt-2 text-sm font-normal">
              Diversified manufacturing and commercial entities driving the Bansal legacy forward:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groupCompaniesList.map((company, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#111827] rounded-lg p-4 border border-gray-200 dark:border-slate-800 hover:border-[#e31e24] dark:hover:border-[#e31e24] hover:shadow-sm transition-all duration-200 flex items-center gap-3.5 group"
              >
                <div className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-950/40 group-hover:bg-[#e31e24] text-[#e31e24] dark:text-[#ff6b6e] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="font-bold text-gray-800 dark:text-slate-200 text-sm group-hover:text-[#e31e24] dark:group-hover:text-[#ff6b6e] transition-colors font-['Lato']">
                    {company}
                  </span>
                </div>
                <span className="text-gray-300 dark:text-slate-600 group-hover:text-[#e31e24] transition-colors font-bold text-lg">
                  ›
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}