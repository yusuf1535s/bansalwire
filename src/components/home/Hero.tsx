import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Award, Globe, ShieldCheck, Factory, Layers, Users, CheckCircle2 } from 'lucide-react'

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
    <div className="w-full bg-white dark:bg-[#0b0f19] font-sans transition-colors duration-300">
      
      {/* 1. CLEAN TOP HEADING SECTION (NO BADGE AT TOP) */}
      <div className="pt-8 pb-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Main Heading directly at Top */}
        <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-slate-900 dark:text-white leading-tight font-['Lato'] tracking-tight uppercase">
          Stainless Steel Wire Suppliers &amp; Exporters in India
        </h1>

        {/* Top Subtitle */}
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal">
          Precision engineered steel wire solutions catering to automotive, engineering, infrastructure, power transmission, and agriculture industries globally.
        </p>
      </div>

      {/* 2. FULL-WIDTH HERO IMAGE CAROUSEL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative h-[360px] sm:h-[440px] md:h-[480px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-slate-900">
          
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
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                {...(index === 0 ? { fetchPriority: "high" as const } : {})}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/bansal/Wires-320x320.jpg'
                }}
                className="w-full h-full object-cover object-center"
              />

              {/* Bottom Gradient Overlay with Slide Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <span className="text-[11px] font-bold text-red-400 uppercase tracking-widest block mb-1">
                  {slide.badge}
                </span>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold font-['Lato'] tracking-tight max-w-2xl drop-shadow-md">
                  {slide.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl line-clamp-2 drop-shadow font-normal">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}

          {/* Left / Right Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-[#e31e24] dark:hover:bg-[#e31e24] text-slate-800 dark:text-slate-100 hover:text-white shadow-xl backdrop-blur-md transition-all duration-200 border border-slate-200/50 dark:border-slate-700/50 cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-[#e31e24] dark:hover:bg-[#e31e24] text-slate-800 dark:text-slate-100 hover:text-white shadow-xl backdrop-blur-md transition-all duration-200 border border-slate-200/50 dark:border-slate-700/50 cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Floating Slide Indicator Dots */}
          <div className="absolute bottom-5 right-6 z-30 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentSlide ? 'w-6 bg-[#e31e24]' : 'w-2 bg-white/50 hover:bg-white'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* 3. CORPORATE PROFILE, TRUST BADGE & CONVERSION ACTIONS (MONOCHROME B&W) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-[#111827] dark:via-[#131d31] dark:to-[#0f172a] border border-slate-200/90 dark:border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-lg shadow-slate-200/40 dark:shadow-none transition-all duration-300">
          
          {/* Subtle Ambient Accent Glow */}
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-slate-400/5 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-slate-400/5 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 pb-5 border-b border-slate-200/80 dark:border-slate-800">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white font-['Lato'] tracking-tight">
              Bansal Wire Industries Ltd. (BWIL)
            </h2>
          </div>

          {/* Description Narrative */}
          <div className="relative z-10 py-5">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal max-w-5xl">
              Operating with an annual manufacturing volume of <strong className="text-slate-900 dark:text-white font-bold">72,176 MTPA</strong> of Stainless Steel Wires (<strong className="text-slate-900 dark:text-white font-bold">20% market share</strong>) and <strong className="text-slate-900 dark:text-white font-bold">206,466 MTPA</strong> total steel wire volume in India. We manufacture over <strong className="text-slate-900 dark:text-white font-bold">3,000 SKUs (0.04 mm to 15.65 mm)</strong> catering to automotive, general engineering, power transmission, agriculture, and construction sectors across <strong className="text-slate-900 dark:text-white font-bold">50+ export countries</strong>.
            </p>

            {/* Quick Metrics Text (No background divs) */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white" />
                72,176 MTPA SS Wires
              </span>
              <span className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white" />
                206,466 MTPA Total Volume
              </span>
              <span className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white" />
                3,000+ SKUs (0.04 - 15.65 mm)
              </span>
              <span className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white" />
                50+ Global Export Destinations
              </span>
            </div>
          </div>

          {/* 3 Core Differentiator Pillars (Seamless within single div, no nested box cards) */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 border-t border-slate-200/80 dark:border-slate-800">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-slate-900 dark:text-white shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-['Lato'] tracking-tight">
                  Cost-Plus Model (Price Immunity)
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Transparent conversion margin structure insulating client contracts from commodity raw material volatility.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-slate-900 dark:text-white shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-['Lato'] tracking-tight">
                  ISO 9001:2015 &amp; IATF 16949
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Multi-tier QA laboratory testing verifying tensile uniformity, coating, fatigue resistance, and chemical composition.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Users className="w-4 h-4 text-slate-900 dark:text-white shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-['Lato'] tracking-tight">
                  Zero Concentration (&lt;5% per Client)
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Deeply diversified network spanning 5,000+ active enterprise clients across automotive, infrastructure, and energy.
                </p>
              </div>
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
    <section className="bg-white dark:bg-[#0b0f19] py-6 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50/80 dark:bg-[#151d2e] hover:bg-white dark:hover:bg-[#1c273e] transition border border-slate-200/80 dark:border-slate-800 hover:border-[#e31e24]/40 dark:hover:border-[#e31e24]/60 hover:shadow-md group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">BWI</span>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-['Lato'] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase mt-0.5 tracking-wider">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
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
