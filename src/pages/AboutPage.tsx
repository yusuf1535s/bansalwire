import { useParams, Link } from 'react-router-dom'
import { AppWrapper } from '../components/layout/AppWrapper'
import { PageMeta } from '../components/common/PageMeta'
import { AboutSection } from '../components/home/AboutSection'
import { GroupCompaniesSection } from '../components/home/GroupCompaniesSection'
import { Award, Target, Compass, Heart, History, Users, Building, ShieldCheck, MapPin, CheckCircle2, Factory, Handshake, Scale, Network, GraduationCap, Briefcase } from 'lucide-react'

export default function AboutPage() {
  const { slug } = useParams<{ slug?: string }>()

  const renderContent = () => {
    switch (slug) {
      case 'vision-mission':
        return (
          <div className="max-w-5xl mx-auto py-6 sm:py-8 px-4 space-y-8">
            <div className="text-center">
              <span className="text-[#e31e24] font-bold text-[11px] sm:text-xs uppercase tracking-wider block mb-0.5">Our Corporate Philosophy</span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white font-['Lato'] tracking-tight bansal-heading-center">
                Vision &amp; Mission
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bansal-card bg-white dark:bg-[#111827] p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-slate-800">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-950/50 text-[#e31e24] dark:text-[#ff6b6e] rounded-lg flex items-center justify-center mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-['Lato'] bansal-heading">Our Vision</h3>
                <p className="text-gray-600 dark:text-slate-300 mt-3 leading-relaxed text-xs sm:text-sm font-normal">
                  To be the most preferred and technologically advanced steel wire solutions provider globally, setting benchmarks in quality, sustainability, customer trust, and operational excellence across every industrial segment we serve.
                </p>
              </div>

              <div className="bansal-card bg-white dark:bg-[#111827] p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-slate-800">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-950/50 text-[#e31e24] dark:text-[#ff6b6e] rounded-lg flex items-center justify-center mb-3">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-['Lato'] bansal-heading">Our Mission</h3>
                <p className="text-gray-600 dark:text-slate-300 mt-3 leading-relaxed text-xs sm:text-sm font-normal">
                  Consistently deliver superior value to customers through tailored engineering, over 3,000 precision SKUs, rigorous quality assurance, sustainable manufacturing, and fostering long-term relationships backed by generations of trust.
                </p>
              </div>
            </div>
          </div>
        )

      case 'our-journey':
        return (
          <div className="max-w-5xl mx-auto py-6 sm:py-8 px-4 space-y-6">
            <div className="text-center">
              <span className="text-[#e31e24] font-bold text-[11px] sm:text-xs uppercase tracking-wider block mb-0.5">Milestones &amp; Heritage</span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white font-['Lato'] tracking-tight bansal-heading-center">
                Our Journey (Since 1938)
              </h1>
            </div>

            <div className="relative border-l-2 border-[#e31e24] ml-4 md:ml-8 pl-6 space-y-6">
              {[
                {
                  year: '1938',
                  title: 'Inception of Trading Heritage',
                  desc: 'Founded as a wire trading house in Delhi by Shri Shyam Sunder Gupta, laying the groundwork of integrity and quality.'
                },
                {
                  year: '1985',
                  title: 'Incorporation & Commercial Production',
                  desc: 'Bansal Wire Industries Ltd. incorporated and commenced commercial production of H.B. Wires and high-grade wire products.'
                },
                {
                  year: '1998 - 2010',
                  title: 'Expansion into Stainless Steel & High Carbon Wires',
                  desc: 'Diversified rapidly into stainless steel wires, galvanized wires, shaped wires, and cable armouring.'
                },
                {
                  year: '2015 - 2020',
                  title: 'Export Reach Across 50+ Countries',
                  desc: 'Achieved pan-India leadership as the #1 Stainless Steel Wire Manufacturer in India and global recognition.'
                },
                {
                  year: 'Present & Beyond',
                  title: 'Asia’s Mega Facility in Dadri',
                  desc: 'Constructing the single largest steel wire manufacturing complex in Dadri, scaling overall capacity.'
                }
              ].map((step, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#e31e24] border-2 border-white dark:border-slate-900 ring-2 ring-red-200 dark:ring-red-900/50" />
                  <span className="text-xs font-black text-[#e31e24] tracking-wider uppercase">{step.year}</span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white font-['Lato'] mt-0.5">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 mt-0.5 font-normal leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 'our-presence':
        return (
          <div className="max-w-6xl mx-auto py-6 sm:py-8 px-4 space-y-6">
            <div className="text-center">
              <span className="text-[#e31e24] font-bold text-[11px] sm:text-xs uppercase tracking-wider block mb-0.5">Global &amp; Domestic Reach</span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white font-['Lato'] tracking-tight bansal-heading-center">
                Our Presence
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center bg-gray-50 dark:bg-[#111827] p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-['Lato'] bansal-heading">
                  Manufacturing Hubs &amp; Export Reach
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 mt-3 leading-relaxed font-normal">
                  Bansal Wire operates state-of-the-art manufacturing plants located strategically in the National Capital Region (NCR) and Uttar Pradesh, serving customers nationwide and across over 50 export destinations.
                </p>
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#e31e24] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 dark:text-white text-xs sm:text-sm font-semibold">Corporate Office:</strong>
                      <p className="text-xs text-gray-500 dark:text-slate-400">F-3, Main Road, Shastri Nagar, New Delhi – 110052</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-[#e31e24] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 dark:text-white text-xs sm:text-sm font-semibold">Manufacturing Units:</strong>
                      <p className="text-xs text-gray-500 dark:text-slate-400">4 Operational Units in Ghaziabad, UP &amp; Mega Single Location Unit at Dadri, UP</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/80 p-4 rounded-xl border border-gray-200 dark:border-slate-700 shadow-xs flex items-center justify-center">
                <img
                  src="/images/bansal/map-1.png"
                  alt="Presence Map"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/bansal/map-2-1.png'
                  }}
                  className="max-h-72 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        )

      case 'csr':
        return (
          <div className="max-w-6xl mx-auto py-6 sm:py-8 px-4 space-y-8">
            <div className="text-center">
              <span className="text-[#e31e24] font-bold text-[11px] sm:text-xs uppercase tracking-wider block mb-0.5">Giving Back to Society</span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white font-['Lato'] tracking-tight bansal-heading-center">
                Corporate Social Responsibility (CSR)
              </h1>
              <p className="text-gray-500 dark:text-slate-300 max-w-2xl mx-auto mt-1.5 text-xs sm:text-[13px] font-normal leading-normal">
                Committed to holistic community development, education, healthcare, and upliftment across India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: 'Maharaja Agrasen Hospital',
                  desc: 'Supporting state-of-the-art medical care, specialized surgical equipment, and subsidized healthcare for underprivileged communities.',
                  image: '/images/bansal/Maharaja-Agrasen-Hospital-2.jpg'
                },
                {
                  title: 'Akal Vidyalaya Initiatives',
                  desc: 'Empowering children with quality primary education, literacy programs, and infrastructure support in remote villages.',
                  image: '/images/bansal/Akal-Vidyalaya-1.jpg'
                },
                {
                  title: 'Samalkha Educational Institutions',
                  desc: 'Funding higher education institutes, vocational training centers, and engineering scholarships.',
                  image: '/images/bansal/Samalkha-Group-Of-Educational-Institutions-2.jpg'
                },
                {
                  title: 'Samuhik Vivah Samiti',
                  desc: 'Organizing and supporting mass weddings and welfare drives for economically weaker sections of society.',
                  image: '/images/bansal/Samuhik-Vivah-Samiti-2.jpg'
                },
                {
                  title: 'Gurukul Education Support',
                  desc: 'Preserving traditional value-based learning, moral education, and healthy living environments for youth in Delhi NCR.',
                  image: '/images/bansal/Gurukul-in-Delhi-2.jpg'
                }
              ].map((csr, i) => (
                <div key={i} className="bansal-card bg-white dark:bg-[#111827] rounded-xl overflow-hidden border border-gray-200 dark:border-slate-800 group">
                  <div className="h-44 overflow-hidden bg-gray-100 dark:bg-slate-800">
                    <img
                      src={csr.image}
                      alt={csr.title}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/bansal/DSC_4109-1-scaled.jpg'
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white font-['Lato'] text-sm mb-1 group-hover:text-[#e31e24] dark:group-hover:text-[#ff6b6e] transition-colors">
                      {csr.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-slate-300 font-normal leading-relaxed">
                      {csr.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <>
            <div className="bg-white dark:bg-[#0b0f19] py-4 sm:py-5 px-4 text-center border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
              <div className="max-w-4xl mx-auto">
                <span className="text-[#e31e24] font-bold text-[11px] sm:text-xs uppercase tracking-wider block mb-0.5">
                  Legacy of Excellence
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white font-['Lato'] tracking-tight bansal-heading-center">
                  About Bansal Wire Industries
                </h1>
                <p className="text-gray-500 dark:text-slate-300 mt-1.5 text-xs sm:text-[13px] max-w-xl mx-auto font-normal leading-normal">
                  India's leading manufacturer and exporter of stainless steel, high carbon, and specialized engineered wires since 1938.
                </p>
              </div>
            </div>
            <AboutSection />
            <GroupCompaniesSection />
            <MajorSectorsSection />
          </>
        )
    }
  }

  return (
    <AppWrapper>
      <PageMeta
        title="About Us | Bansal Wire Industries Ltd."
        description="Learn about Bansal Wire Industries, our history since 1938, Vision & Mission, leadership, global presence, and CSR initiatives."
      />
      {renderContent()}
    </AppWrapper>
  )
}

const sectors = [
  { icon: Building, title: 'Automotive', desc: 'Wire for vehicle manufacturing' },
  { icon: Network, title: 'General Engineering', desc: 'Engineering wire products' },
  { icon: ShieldCheck, title: 'Infrastructure', desc: 'Construction and infrastructure' },
  { icon: Scale, title: 'Hardware', desc: 'Hardware and fasteners' },
  { icon: Handshake, title: 'Consumer Durables', desc: 'Daily use products' },
  { icon: Users, title: 'Power & Transmission', desc: 'Electrical transmission' },
  { icon: GraduationCap, title: 'Agriculture', desc: 'Agricultural applications' },
  { icon: Briefcase, title: 'Auto Replacement', desc: 'Replacement parts' },
]

function MajorSectorsSection() {
  return (
    <div className="bg-white dark:bg-[#0b0f19] py-12 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#e31e24] font-bold text-xs uppercase tracking-wider block mb-1">Our Industries</span>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white font-['Lato'] bansal-heading-center">
            Major Sectors
          </h2>
          <p className="text-gray-500 dark:text-slate-300 mt-2 text-sm max-w-2xl mx-auto">
            We are working in all possible verticals of commercial industries and are currently serving the wire needs of significant industries.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sectors.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.title} className="bg-gray-50 dark:bg-[#111827] rounded-xl p-5 border border-gray-200 dark:border-slate-800 hover:shadow-md hover:border-[#e31e24]/40 dark:hover:border-[#e31e24]/60 transition text-center">
                <Icon className="w-8 h-8 text-[#e31e24] dark:text-[#ff6b6e] mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{s.title}</h4>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{s.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
