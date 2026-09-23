import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../store/useStore'

export function ContactSection() {
  const { addEnquiry } = useStore()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Stainless Steel (SS)',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) return

    addEnquiry({
      id: Date.now().toString(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      category: form.category,
      productCategory: form.category,
      message: form.message,
      status: 'new',
      createdAt: new Date().toISOString().split('T')[0]
    })
    setSubmitted(true)
    setForm({ name: '', email: '', phone: '', category: 'Stainless Steel (SS)', message: '' })
  }

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-[#0b0f19] border-t border-slate-200/80 dark:border-slate-800 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#e31e24] dark:text-[#ff4d52] font-bold text-xs uppercase tracking-widest block mb-1">
            Connect &amp; Collaborate
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Lato'] uppercase tracking-tight bansal-heading-center">
            Get In Touch With Us
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-3 text-sm sm:text-base font-normal leading-relaxed">
            Have questions about wire specifications, customized diameters, bulk export orders, or testing certifications? Our engineering and sales team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Contact Info Bento (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="bg-white dark:bg-[#111827] p-6 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Lato'] border-b border-slate-100 dark:border-slate-800 pb-3">
                Headquarters &amp; Direct Lines
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 text-[#e31e24] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                      Corporate Office
                    </h4>
                    <p className="text-slate-800 dark:text-slate-200 font-medium mt-0.5 leading-relaxed">
                      F-3, Main Road, Shastri Nagar, New Delhi – 110052, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 text-[#e31e24] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                      Telephone Lines
                    </h4>
                    <p className="text-slate-800 dark:text-slate-200 font-medium mt-0.5">
                      <a href="tel:011-23651890" className="hover:text-[#e31e24] dark:hover:text-[#ff4d52] transition">011-23651890</a> / 
                      <a href="tel:011-23651891" className="hover:text-[#e31e24] dark:hover:text-[#ff4d52] transition ml-1">91</a> / 
                      <a href="tel:011-23651892" className="hover:text-[#e31e24] dark:hover:text-[#ff4d52] transition ml-1">92</a> / 
                      <a href="tel:011-23651893" className="hover:text-[#e31e24] dark:hover:text-[#ff4d52] transition ml-1">93</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 text-[#e31e24] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                      Email Communication
                    </h4>
                    <p className="text-slate-800 dark:text-slate-200 font-medium mt-0.5">
                      <a href="mailto:info@bansal-group.com" className="hover:text-[#e31e24] dark:hover:text-[#ff4d52] transition">
                        info@bansal-group.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 text-[#e31e24] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                      Working Hours
                    </h4>
                    <p className="text-slate-800 dark:text-slate-200 font-medium mt-0.5">
                      Mon – Sat: 9:00 AM – 6:00 PM (IST)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Link Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl flex items-center justify-between shadow-xs border border-slate-700/50">
              <div>
                <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">Manufacturing Hubs</p>
                <h4 className="text-sm font-bold font-['Lato'] text-white mt-0.5">Explore 5 Operational Facilities</h4>
              </div>
              <Link
                to="/about/our-presence"
                className="inline-flex items-center gap-1.5 bg-[#e31e24] hover:bg-[#b81419] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow"
              >
                View Map <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Quick Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#111827] p-7 sm:p-8 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
                <span className="text-[#e31e24] dark:text-[#ff4d52] font-bold text-xs uppercase tracking-wider block">
                  Fast-Track Communication
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-['Lato'] mt-0.5">
                  Request a Technical Specification / Quote
                </h3>
              </div>

              {submitted ? (
                <div className="py-12 text-center bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800">
                  <CheckCircle2 className="w-14 h-14 text-green-600 dark:text-green-400 mx-auto mb-3" />
                  <h4 className="text-xl font-bold text-green-900 dark:text-green-200 font-['Lato']">Enquiry Received!</h4>
                  <p className="text-sm text-green-700 dark:text-green-300 max-w-md mx-auto mt-2 font-normal">
                    Thank you for contacting Bansal Wire Industries. Our technical sales team will review your specifications and get in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 bg-[#e31e24] text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-[#b81419] transition uppercase tracking-wider shadow cursor-pointer"
                  >
                    Submit Another Requirement
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#151d2f] border border-slate-200 dark:border-slate-750 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#1a243a] focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
                        Corporate Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="e.g. rahul@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#151d2f] border border-slate-200 dark:border-slate-750 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#1a243a] focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#151d2f] border border-slate-200 dark:border-slate-750 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#1a243a] focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
                        Product Segment <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#151d2f] border border-slate-200 dark:border-slate-750 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-[#1a243a] focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] transition"
                      >
                        <option value="Stainless Steel (SS)">Stainless Steel (SS) Wires</option>
                        <option value="High Carbon Wires">High Carbon Steel Wires</option>
                        <option value="Mild Steel Galvanised">Mild Steel / Galvanized Wires</option>
                        <option value="Shaped & Profile">Shaped &amp; Profile Wires</option>
                        <option value="Cable Armouring">Cable Armouring Wires &amp; Strips</option>
                        <option value="Aluminium Alloy">Aluminium Alloy Wires</option>
                        <option value="Special Products">Special / Customized Products</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
                      Required Diameter / Specification / Quantity
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify diameter (mm), grade (e.g. SS 304, HC 70), tensile strength or application..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#151d2f] border border-slate-200 dark:border-slate-750 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#1a243a] focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#e31e24] hover:bg-[#b81419] text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> Submit Requirement To Engineering Team
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
