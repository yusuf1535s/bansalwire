import { Globe, Users, CheckCircle2, ShieldCheck, ArrowRight, Award, Target, Factory, Sparkles, Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export function AboutSection() {
  const successPillars = [
    {
      title: '3,000+ Precision SKUs',
      desc: 'Highest SKU count in India with sizes ranging from 0.04 mm to 15.65 mm.',
      icon: <Factory className="w-5 h-5 text-[#e31e24]" />
    },
    {
      title: '5,000+ Global Customers',
      desc: 'Deeply diversified client network spanning automotive, infra, and power sectors.',
      icon: <Users className="w-5 h-5 text-[#e31e24]" />
    },
    {
      title: 'De-Risked Growth Model',
      desc: 'No single customer accounts for >5% and no single sector exceeds 25% of sales.',
      icon: <ShieldCheck className="w-5 h-5 text-[#e31e24]" />
    },
    {
      title: 'Cost-Plus Pricing Model',
      desc: 'Insulated against commodity raw material volatility with stable operating margins.',
      icon: <Target className="w-5 h-5 text-[#e31e24]" />
    },
    {
      title: '3 Generations of Heritage',
      desc: 'Founded by visionary Promoters in the wire drawing and trading industry since 1938.',
      icon: <Award className="w-5 h-5 text-[#e31e24]" />
    },
    {
      title: '50+ Export Destinations',
      desc: 'Pan India reach and solidifying a dominant footprint in international steel wire exports.',
      icon: <Globe className="w-5 h-5 text-[#e31e24]" />
    }
  ]

  const certifications = [
    { title: 'ISO 9001:2015', sub: 'Quality Management' },
    { title: 'ISO 14001:2015', sub: 'Environmental Standard' },
    { title: 'IATF 16949:2016', sub: 'Automotive Quality' },
    { title: 'IS 6528:1995', sub: 'BIS Certified' }
  ]

  return (
    <section className="py-20 bg-slate-50/60 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header & Overview */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-[#e31e24] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Corporate Legacy Since 1985 (1938 Origins)
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight font-['Lato'] bansal-heading-center">
            About Bansal Wire
          </h2>
          <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            We are the largest stainless steel wire manufacturing company and the second largest steel wire manufacturer by volume in India with a production of <strong>72,176 MTPA</strong> and <strong>206,466 MTPA</strong>, representing <strong>20%</strong> and approximately <strong>4%</strong> market share, respectively.
          </p>
        </div>

        {/* Why Bansal Wire - Bento Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {successPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bento-card bento-card-red p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-['Lato'] mb-2 group-hover:text-[#e31e24] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Bar */}
        <div className="bento-card p-6 sm:p-8 bg-white mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[#e31e24] font-bold text-xs uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                Accreditations &amp; Quality Approvals
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-['Lato']">
                Global Quality &amp; Environmental Benchmarks
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {certifications.map((cert, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
                  <span className="block font-black text-xs text-[#e31e24] font-['Lato']">{cert.title}</span>
                  <span className="text-[10px] text-slate-500 font-medium">{cert.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Network & Leadership Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Our Network */}
          <div className="bento-card bento-card-red p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-[#e31e24] mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-['Lato'] bansal-heading">
                Our Global Network
              </h3>
              <p className="text-slate-600 mt-4 leading-relaxed text-sm font-normal">
                We are proudly serving the wire needs of our clients globally. Operating with 4 high-capacity manufacturing units in Ghaziabad and our upcoming mega facility in Dadri, our supply chain covers 50+ export destinations across 5 continents.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100">
              <Link
                to="/about/our-presence"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#e31e24] hover:text-[#b81419] uppercase tracking-wider"
              >
                Explore Plants &amp; Distribution <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Leadership */}
          <div className="bento-card bento-card-red p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-[#e31e24] mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-['Lato'] bansal-heading">
                Visionary Leadership
              </h3>
              <p className="text-slate-600 mt-4 leading-relaxed text-sm font-normal">
                Guided by experienced Promoters with three generations of steel industry acumen, supported by 5,000+ skilled personnel delivering consistent financial performance and operating profitability year-on-year.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100">
              <Link
                to="/about/leadership"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#e31e24] hover:text-[#b81419] uppercase tracking-wider"
              >
                Meet Executive Management <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
