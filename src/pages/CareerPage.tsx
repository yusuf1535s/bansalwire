import { useState } from 'react'
import { AppWrapper } from '../components/layout/AppWrapper'
import { PageMeta } from '../components/common/PageMeta'
import { Briefcase, Heart, Award, Users, BookOpen, Send, CheckCircle2, ChevronRight } from 'lucide-react'

export default function CareerPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [applied, setApplied] = useState(false)
  const [candidateName, setCandidateName] = useState('')
  const [candidateEmail, setCandidateEmail] = useState('')
  const [candidatePhone, setCandidatePhone] = useState('')

  const cultureValues = [
    {
      title: 'Continuous Learning',
      desc: 'Skill development programs, modern technical training, and leadership seminars.',
      icon: '/images/bansal/Continuous-Learning-100x100.png'
    },
    {
      title: 'Collaborative Culture',
      desc: 'Cross-functional teamwork fostering innovation, safety, and mutual respect.',
      icon: '/images/bansal/Collaborative-Culture-100x100.png'
    },
    {
      title: 'Work-Life Balance',
      desc: 'Employee welfare schemes, medical benefits, and family celebration events.',
      icon: '/images/bansal/Work-Life-Balance-100x100.png'
    }
  ]

  const openings = [
    {
      id: 'prod-eng',
      title: 'Senior Production Engineer (Wire Drawing)',
      dept: 'Manufacturing & Operations',
      location: 'Ghaziabad / Dadri Plant',
      experience: '4-8 Years',
      type: 'Full-time'
    },
    {
      id: 'qa-spec',
      title: 'Quality Assurance & Metallurgical Specialist',
      dept: 'Quality & Testing Lab',
      location: 'Dadri Mega Plant',
      experience: '3-6 Years',
      type: 'Full-time'
    },
    {
      id: 'export-sales',
      title: 'International Sales Manager (Exports)',
      dept: 'Global Business Development',
      location: 'Corporate Office, Delhi',
      experience: '5-10 Years',
      type: 'Full-time'
    },
    {
      id: 'maint-tech',
      title: 'Electrical & PLC Automation Engineer',
      dept: 'Plant Maintenance',
      location: 'Ghaziabad Facility',
      experience: '3-5 Years',
      type: 'Full-time'
    }
  ]

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault()
    setApplied(true)
    setTimeout(() => {
      setApplied(false)
      setSelectedJob(null)
      setCandidateName('')
      setCandidateEmail('')
      setCandidatePhone('')
    }, 3000)
  }

  return (
    <AppWrapper>
      <PageMeta
        title="Careers & Life at BWI | Bansal Wire Industries Ltd."
        description="Explore career opportunities, workplace culture, and life at Bansal Wire Industries Ltd."
      />
      
      {/* Banner */}
      <div className="bg-white py-4 sm:py-5 px-4 text-center border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#e31e24] font-bold text-[11px] sm:text-xs uppercase tracking-wider block mb-0.5">
            Work With Us
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-['Lato'] tracking-tight bansal-heading-center">
            Life at Bansal Wire &amp; Careers
          </h1>
          <p className="text-gray-500 mt-1.5 text-xs sm:text-[13px] max-w-xl mx-auto font-normal leading-normal">
            Shape the future of global wire engineering with India's market leader.
          </p>
        </div>
      </div>

      {/* Core Values & Workplace Culture */}
      <section className="py-6 sm:py-8 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-[#e31e24] font-bold text-[11px] sm:text-xs uppercase tracking-wider block mb-0.5">Our Work Culture</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-['Lato'] tracking-tight bansal-heading-center">
              Why Build Your Career With BWI?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {cultureValues.map((val, i) => (
              <div key={i} className="bansal-card bg-[#fcfcfc] p-8 rounded-xl border border-gray-200 text-center">
                <div className="w-20 h-20 mx-auto mb-4 p-2 rounded-full bg-white shadow-xs flex items-center justify-center">
                  <img
                    src={val.icon}
                    alt={val.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/bansal/1-1.png'
                    }}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-['Lato'] mb-2">{val.title}</h3>
                <p className="text-xs text-gray-600 font-normal leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>

          {/* Life at BWI Gallery */}
          <div className="mb-16">
            <div className="text-left mb-6">
              <h3 className="text-2xl font-bold text-gray-900 font-['Lato'] bansal-heading">
                Life at BWI Photo Gallery
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { img: '/images/bansal/DSC_4109-1-scaled.jpg', caption: 'State-of-the-art Manufacturing Floor' },
                { img: '/images/bansal/DSC_4125-1.jpg', caption: 'Precision Wire Testing & Metallurgy Lab' },
                { img: '/images/bansal/JI2A3095-website-photo-1-scaled.jpg', caption: 'Team Collaboration & Leadership' },
                { img: '/images/bansal/WhatsApp-Image-2025-09-18-at-14.26.42.jpeg', caption: 'Employee Celebrations & Milestone Events' },
                { img: '/images/bansal/WhatsApp-Image-2025-09-18-at-14.28.36.jpeg', caption: 'Continuous Technical Training Programs' },
                { img: '/images/bansal/WhatsApp-Image-2025-09-18-at-15.39.31.jpeg', caption: 'Dadri Plant Construction & Engineering' }
              ].map((item, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden group shadow-xs bg-white border border-gray-200 flex flex-col">
                  <div className="h-52 overflow-hidden bg-slate-50 flex items-center justify-center p-2">
                    <img
                      src={item.img}
                      alt={item.caption}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/bansal/Wires-320x320.jpg'
                      }}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 bg-white border-t border-gray-100">
                    <span className="text-gray-800 text-xs font-semibold block">{item.caption}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Job Openings */}
          <div className="bg-[#f7f7f7] p-8 rounded-xl border border-gray-200">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 font-['Lato'] bansal-heading">
                Current Openings
              </h3>
              <p className="text-xs text-gray-600 mt-2 font-normal">
                Explore available roles across manufacturing, engineering, quality assurance, and global sales.
              </p>
            </div>

            <div className="space-y-4">
              {openings.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-5 rounded-lg border border-gray-200 hover:border-[#e31e24] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition"
                >
                  <div>
                    <h4 className="font-bold text-gray-900 text-base font-['Lato']">{job.title}</h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1.5 font-normal">
                      <span className="font-semibold text-[#e31e24]">{job.dept}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>Exp: {job.experience}</span>
                      <span>•</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-semibold">{job.type}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedJob(job.title)}
                    className="bg-[#e31e24] hover:bg-[#b81419] text-white font-bold px-5 py-2 rounded text-xs uppercase tracking-wider transition self-start md:self-auto shrink-0 shadow"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
            <div className="bg-[#1c1c1c] text-white p-4 border-b-2 border-[#e31e24] flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm font-['Lato'] text-white">Apply for Position</h4>
                <p className="text-xs text-gray-300 font-normal">{selectedJob}</p>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="p-6">
              {applied ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                  <h4 className="text-lg font-bold text-gray-900">Application Submitted!</h4>
                  <p className="text-xs text-gray-600">Our HR team will review your profile and reach out.</p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={candidatePhone}
                      onChange={(e) => setCandidatePhone(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
                    />
                  </div>
                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedJob(null)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#e31e24] hover:bg-[#b81419] text-white font-bold rounded uppercase tracking-wider shadow"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </AppWrapper>
  )
}
