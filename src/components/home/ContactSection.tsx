import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react'
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

  const whatsappMessage = `Hello Bansal Wire Industries, I would like to enquire about ${form.category}.${form.name ? ` Name: ${form.name}.` : ''}${form.phone ? ` Phone: ${form.phone}.` : ''}${form.message ? ` Details: ${form.message}` : ''}`
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`

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

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          
          {/* 1. Corporate Office */}
          <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div className="flex items-start gap-3.5">
              <div className="text-[#e31e24] shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                  Corporate Office
                </h4>
                <p className="text-slate-800 dark:text-slate-200 font-medium text-xs sm:text-sm mt-1 leading-relaxed">
                  F-3, Main Road, Shastri Nagar, New Delhi – 110052, India
                </p>
              </div>
            </div>
          </div>

          {/* 2. Direct Telephone Lines */}
          <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div className="flex items-start gap-3.5">
              <div className="text-[#e31e24] shrink-0 mt-0.5">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                  Telephone &amp; WhatsApp
                </h4>
                <p className="text-slate-800 dark:text-slate-200 font-medium text-xs sm:text-sm mt-1 leading-relaxed">
                  <a href="tel:011-23651890" className="hover:text-[#e31e24] dark:hover:text-[#ff4d52] transition">011-23651890</a> / 
                  <a href="tel:011-23651891" className="hover:text-[#e31e24] dark:hover:text-[#ff4d52] transition ml-1">91</a> / 
                  <a href="tel:011-23651892" className="hover:text-[#e31e24] dark:hover:text-[#ff4d52] transition ml-1">92</a>
                </p>
                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-[#e31e24]" />
                  <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
                </div>
                <a
                  href="https://api.whatsapp.com/send?text=Hello%20Bansal%20Wire%20Industries,%20I%20have%20an%20enquiry%20regarding%20steel%20wires"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2.5 text-xs font-bold text-[#25D366] hover:text-[#20ba5a] transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* 3. Email Communication */}
          <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div className="flex items-start gap-3.5">
              <div className="text-[#e31e24] shrink-0 mt-0.5">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                  Email Communication
                </h4>
                <p className="text-slate-800 dark:text-slate-200 font-medium text-xs sm:text-sm mt-1">
                  <a href="mailto:info@bansal-group.com" className="hover:text-[#e31e24] dark:hover:text-[#ff4d52] transition">
                    info@bansal-group.com
                  </a>
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                  Direct inquiries &amp; RFQ response within 24h
                </p>
              </div>
            </div>
          </div>

          {/* 4. Manufacturing Hubs */}
          <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Manufacturing Hubs</p>
              <h4 className="text-sm font-bold font-['Lato'] text-slate-900 dark:text-white mt-0.5">Explore 5 Operational Facilities</h4>
            </div>
            <div className="mt-4">
              <Link
                to="/about/our-presence"
                className="inline-flex items-center gap-1.5 bg-[#e31e24] hover:bg-[#b81419] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-xs w-full justify-center"
              >
                View Map <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Full-Width Fast-Track Communication Enquiry Form */}
        <div className="w-full bg-white dark:bg-[#111827] p-6 sm:p-10 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-md">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-5 mb-8">
            <span className="text-[#e31e24] dark:text-[#ff4d52] font-bold text-xs uppercase tracking-wider block">
              Fast-Track Communication
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Lato'] mt-1">
              Request a Technical Specification / Quote
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Fill out the form below to receive customized wire pricing, sample coils, and technical data sheets.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center bg-green-50 dark:bg-green-950/30 rounded-2xl border border-green-200 dark:border-green-800">
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
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* 4 Inputs Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#151d2f] border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#1a243a] focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5">
                    Corporate Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="e.g. rahul@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#151d2f] border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#1a243a] focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#151d2f] border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#1a243a] focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5">
                    Product Segment <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#151d2f] border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-[#1a243a] focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] transition cursor-pointer"
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

              {/* Message Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5">
                  Required Diameter / Specification / Quantity
                </label>
                <textarea
                  rows={4}
                  placeholder="Specify diameter (mm), grade (e.g. SS 304, HC 70), tensile strength or application..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#151d2f] border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#1a243a] focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] transition resize-none"
                />
              </div>

              {/* Submit & WhatsApp Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3.5 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat / Enquire on WhatsApp</span>
                </a>
                
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#e31e24] hover:bg-[#b81419] text-white font-bold py-3.5 px-8 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Requirement To Engineering Team</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
