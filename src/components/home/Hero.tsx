import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Award, Globe, ShieldCheck, Factory, Layers, Users, ArrowRight, CheckCircle2 } from 'lucide-react'

const heroSlides = [
  {
    id: 'slide-1',
    image: '/images/bansal/architecture-bay-boat-326410-1.jpg',
    title: 'Stainless Steel Wire Manufacturing & Processing',
    subtitle: 'India’s largest stainless steel wire manufacturer with 72,176 MTPA production (20% market share)',
    badge: 'Flagship Facility'
  },
  {
    id: 'slide-2',
    image: '/images/bansal/black-and-white-cogs-gears-159298.jpg',
    title: 'Precision Engineered Industrial Steel Wires',
    subtitle: 'Over 3,000 SKUs manufactured with diameters from 0.04 mm to 15.65 mm',
    badge: '3,000+ Precision SKUs'
  },
  {
    id: 'slide-3',
    image: '/images/bansal/WE-WIRE-THE-WORLD-LIFE-AT-BWIL.png',
    title: 'Dadri Mega Manufacturing Complex',
    subtitle: 'Constructing Asia’s largest single-location steel wire plant bolstering total capacity',
    badge: '206,466+ MTPA Volume'
  },
  {
    id: 'slide-4',
    image: '/images/bansal/EXPORT-3-1.png',
    title: 'Global Export Footprint Across 50+ Countries',
    subtitle: 'Supplying over 5,000 enterprise clients across North America, Europe, Middle East, and Asia',
    badge: '50+ Export Destinations'
  }
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)

  return (
    <div className="w-full bg-white font-sans">
      
      {/* 1. CLEAN TOP HEADING SECTION (NO BADGE AT TOP) */}
      <div className="pt-8 pb-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Main Heading directly at Top */}
        <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-slate-900 leading-tight font-['Lato'] tracking-tight uppercase">
          Stainless Steel Wire Suppliers &amp; Exporters in India
        </h1>

        {/* Top Subtitle */}
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl mx-auto font-normal">
          Precision engineered steel wire solutions catering to automotive, engineering, infrastructure, power transmission, and agriculture industries globally.
        </p>
      </div>

      {/* 2. FULL-WIDTH HERO IMAGE CAROUSEL (100% SHARP & CLEAN) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-950 group">
          
          {/* Main Full Image Viewport */}
          <div className="relative h-[320px] sm:h-[440px] md:h-[500px] lg:h-[540px] w-full overflow-hidden">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/bansal/Wires-320x320.jpg'
                  }}
                  className="w-full h-full object-cover transition-transform duration-7000 scale-100 group-hover:scale-102"
                />

                {/* Subtle bottom edge gradient to frame image smoothly */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                
                {/* Floating Image Label at Bottom Corner */}
                <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
                  <div className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/20 shadow-lg">
                    <span className="text-[10px] font-bold text-[#e31e24] uppercase tracking-wider block">{slide.badge}</span>
                    <span className="text-sm sm:text-base font-bold font-['Lato'] drop-shadow">{slide.title}</span>
                  </div>

                  <div className="hidden sm:block text-right bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white/90 text-xs">
                    Slide {index + 1} of {heroSlides.length}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Left / Right Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 hover:bg-[#e31e24] text-slate-800 hover:text-white shadow-xl backdrop-blur-md transition-all duration-200 border border-slate-200"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 hover:bg-[#e31e24] text-slate-800 hover:text-white shadow-xl backdrop-blur-md transition-all duration-200 border border-slate-200"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 transition-all duration-300 rounded-full ${
                  idx === currentSlide ? 'w-8 bg-[#e31e24]' : 'w-2.5 bg-white/60 hover:bg-white'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM DESCRIPTION, TRUST BADGE & CONVERSION ACTIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Description & Trust Badge */}
            <div className="lg:col-span-8 space-y-3">
              
              {/* Trust Badge placed here at the bottom */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
                <Award className="w-3.5 h-3.5 text-[#e31e24]" />
                <span>Trusted Strength Since 1938</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 font-medium">India’s #1 Stainless Steel Wire Manufacturer</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="w-2 h-2 rounded-full bg-[#e31e24]"></span>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-['Lato']">
                  Bansal Wire Industries Ltd. (BWIL)
                </span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                Operating with a production capacity of <strong>72,176 MTPA</strong> of Stainless Steel Wires and <strong>206,466 MTPA</strong> total steel wire volume in India. We manufacture over <strong>3,000 SKUs</strong> (0.04 mm to 15.65 mm) for automotive, general engineering, power transmission, agriculture, and construction sectors across 50+ export countries.
              </p>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e31e24]" />
                  Cost-Plus Model (Price Immunity)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e31e24]" />
                  ISO 9001:2015 &amp; IATF 16949
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e31e24]" />
                  Zero Concentration (&lt;5% per client)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                to="/contact"
                className="bg-[#e31e24] hover:bg-[#b81419] text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm uppercase tracking-wider text-center shadow-md hover:shadow-red-600/30 transition flex items-center justify-center gap-2"
              >
                <span>Request Instant Quotation / RFQ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products"
                className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold py-3 px-6 rounded-xl text-xs sm:text-sm uppercase tracking-wider text-center shadow-xs transition"
              >
                Browse 3,000+ SKUs Catalog
              </Link>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export function StatCards() {
  const stats = [
    {
      icon: <Layers className="w-5 h-5 text-[#e31e24]" />,
      value: '3,000+',
      label: 'Manufactured SKUs',
      subtext: '0.04 mm to 15.65 mm'
    },
    {
      icon: <Users className="w-5 h-5 text-[#e31e24]" />,
      value: '5,000+',
      label: 'Enterprise Clients',
      subtext: 'Diversified Global Base'
    },
    {
      icon: <Globe className="w-5 h-5 text-[#e31e24]" />,
      value: '50+',
      label: 'Export Countries',
      subtext: 'Global Footprint'
    },
    {
      icon: <Factory className="w-5 h-5 text-[#e31e24]" />,
      value: '206,466',
      label: 'MTPA Production',
      subtext: 'Steel Wire Volume'
    },
    {
      icon: <Award className="w-5 h-5 text-[#e31e24]" />,
      value: '20%',
      label: 'Market Share',
      subtext: 'India’s #1 SS Wire Maker'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#e31e24]" />,
      value: '38+',
      label: 'Years Heritage',
      subtext: 'Incorporated 1985'
    }
  ]

  return (
    <section className="bg-white py-6 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50/80 hover:bg-white transition border border-slate-200/80 hover:border-[#e31e24]/40 hover:shadow-md group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-red-100/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-400">BWI</span>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 font-['Lato'] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-700 uppercase mt-0.5 tracking-wider">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-normal">
                  {stat.subtext}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
