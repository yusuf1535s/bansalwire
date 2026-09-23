import { AppWrapper } from '../components/layout/AppWrapper'
import { PageMeta } from '../components/common/PageMeta'
import { Award, ShieldCheck, CheckCircle2, Factory, Microscope, Zap, FileCheck, Layers } from 'lucide-react'

export default function QualityPage() {
  const certifications = [
    {
      code: 'ISO 9001:2015',
      title: 'Quality Management System',
      authority: 'TÜV NORD / International Standards',
      desc: 'Standardized rigorous manufacturing protocols ensuring zero defect batch production and continuous process improvements.'
    },
    {
      code: 'IATF 16949:2016',
      title: 'Automotive Quality Management',
      authority: 'International Automotive Task Force',
      desc: 'Precision metallurgy and defect prevention standard complying with global Tier-1 automotive manufacturing benchmarks.'
    },
    {
      code: 'ISO 14001:2015',
      title: 'Environmental Management System',
      authority: 'Global Environmental Certification',
      desc: 'Eco-conscious manufacturing, zero liquid discharge effluent treatment, waste reduction and energy recovery.'
    },
    {
      code: 'IS 6528:1995 / IS 278',
      title: 'Bureau of Indian Standards (BIS)',
      authority: 'National Quality Standards of India',
      desc: 'Full compliance for stainless steel wires, galvanized core wires, cable armouring, and security barbed wires.'
    }
  ]

  const testingEquipments = [
    'Computerized Universal Tensile Testing Machines (UTM)',
    'Torsion & Reverse Bending Testers',
    'Spectrochemical Analyzers (OES) for Chemical Composition',
    'Coating Mass & Zinc Thickness Testing Apparatus (Preece Test)',
    'Micro-Vickers & Rockwell Hardness Testers',
    'Salt Spray Corrosion Test Chambers (ASTM B117)',
    'Stereo Optical Metallurgical Microscopes',
    'Digital Non-contact Laser Diameter Gauging'
  ]

  return (
    <AppWrapper>
      <PageMeta
        title="Quality, Certifications & System Approvals | Bansal Wire"
        description="ISO 9001:2015, ISO 14001:2015, and IATF 16949:2016 certified manufacturing facilities and in-house testing laboratory."
      />
      
      {/* Banner */}
      <div className="bg-neutral-900 text-white py-14 px-4 text-center border-b-4 border-[#e31e24]">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-['Lato'] uppercase tracking-wide">
          Quality &amp; System Approvals
        </h1>
        <p className="text-gray-300 mt-2 text-sm max-w-2xl mx-auto font-normal">
          Uncompromising precision engineering and testing across every millimetre of wire produced.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans space-y-16">
        
        {/* Quality Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-[#e31e24] font-bold text-xs uppercase tracking-widest">Quality Assurance</span>
            <h2 className="text-3xl font-extrabold text-gray-900 font-['Lato'] mt-1 bansal-heading">
              Precision Standards in Every Batch
            </h2>
            <p className="text-sm text-gray-700 mt-4 leading-relaxed font-normal">
              At Bansal Wire Industries, our quality philosophy is deeply rooted in 38+ years of technical excellence. With over 3,000 SKUs, every single coil undergoes multi-stage metallurgical inspections from raw wire rod selection to in-process cold drawing, patenting, annealing, and final packaging.
            </p>
            <p className="text-sm text-gray-700 mt-3 leading-relaxed font-normal">
              Our in-house laboratories are equipped with the latest computerized testing instruments to verify tensile strength, yield, elongation, chemical composition, coating uniformity, and fatigue endurance.
            </p>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <img
              src="/images/bansal/DSC_4125-1.jpg"
              alt="Testing Laboratory"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/bansal/black-and-white-cogs-gears-159298.jpg'
              }}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <span className="text-white font-bold text-sm font-['Lato']">In-House Metallurgical Quality Control Lab</span>
            </div>
          </div>
        </div>

        {/* Certifications Grid */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-['Lato'] bansal-heading-center">
              Certified Management Systems
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, i) => (
              <div key={i} className="bansal-card bg-white p-6 rounded-xl border border-gray-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-50 text-[#e31e24] flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#e31e24] uppercase tracking-wider">{cert.code}</span>
                  <h4 className="text-lg font-bold text-gray-900 font-['Lato']">{cert.title}</h4>
                  <p className="text-xs text-gray-500 font-semibold mb-2">{cert.authority}</p>
                  <p className="text-xs text-gray-600 font-normal leading-relaxed">{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testing Apparatus */}
        <div className="bg-[#f7f7f7] p-8 rounded-xl border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 font-['Lato'] mb-4 bansal-heading">
            Advanced Laboratory Testing Capabilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {testingEquipments.map((eq, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#e31e24] shrink-0 mt-0.5" />
                <span className="text-xs text-gray-800 font-medium leading-relaxed">{eq}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppWrapper>
  )
}
