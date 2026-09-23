import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AppWrapper } from '../components/layout/AppWrapper'
import { PageMeta } from '../components/common/PageMeta'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function ContactPage() {
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: 'Stainless Steel (SS)',
    diameter: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const addEnquiry = useStore((state) => state.addEnquiry)

  useEffect(() => {
    const productParam = searchParams.get('product')
    const segmentParam = searchParams.get('segment')
    if (productParam || segmentParam) {
      setFormData((prev) => ({
        ...prev,
        category: segmentParam || prev.category,
        message: productParam ? `Inquiring for: ${productParam}. Please provide technical datasheet, pricing, and minimum order quantity.` : prev.message
      }))
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return

    addEnquiry({
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || 'Website Visitor',
      country: 'India',
      productCategory: formData.category,
      productSubCategory: formData.diameter ? `Diameter: ${formData.diameter}` : 'Contact Page Inquiry',
      message: formData.message,
      status: 'pending',
      createdAt: new Date().toISOString()
    })

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        category: 'Stainless Steel (SS)',
        diameter: '',
        message: ''
      })
    }, 4000)
  }

  return (
    <AppWrapper>
      <PageMeta
        title="Contact Us | Bansal Wire Industries Ltd."
        description="Contact Bansal Wire Industries Ltd. corporate office in Shastri Nagar New Delhi, phone 011-23651890-93, email info@bansal-group.com."
      />

      {/* Clean Header */}
      <div className="bg-white py-4 sm:py-5 px-4 text-center border-b border-gray-100 font-sans">
        <div className="max-w-3xl mx-auto">
          <span className="text-[#e31e24] font-bold text-[11px] sm:text-xs uppercase tracking-wider block mb-0.5">
            Direct Communication
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-['Lato'] tracking-tight bansal-heading-center">
            Contact Us
          </h1>
          <p className="text-gray-500 mt-1.5 text-xs sm:text-[13px] font-normal max-w-xl mx-auto leading-normal">
            Get in touch with our technical sales, export division, or customer care team.
          </p>
        </div>
      </div>

      <div className="bg-gray-50/50 py-6 sm:py-8 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* 1. FULL-WIDTH Direct Enquiry / RFQ Form (FIRST) */}
          <div className="w-full bg-white p-7 sm:p-10 rounded-2xl border border-gray-200 shadow-sm">
            <div className="border-b border-gray-100 pb-5 mb-8 text-center sm:text-left">
              <span className="text-[#e31e24] font-bold text-xs uppercase tracking-wider block mb-1">
                Fast-Track Communication
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-['Lato']">
                Submit Direct Enquiry / RFQ
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
                Fill in your details below to receive pricing, technical datasheets, or product samples.
              </p>
            </div>

            {submitted ? (
              <div className="py-14 text-center bg-green-50 rounded-2xl border border-green-200">
                <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-green-900 font-['Lato']">Enquiry Submitted Successfully!</h3>
                <p className="text-sm text-green-700 max-w-lg mx-auto mt-2 font-normal leading-relaxed">
                  Thank you for contacting Bansal Wire Industries Ltd. Our technical sales engineering team will review your specifications and get in touch within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 bg-[#e31e24] text-white text-xs font-bold px-7 py-3 rounded-xl hover:bg-[#b81419] transition uppercase tracking-wider shadow cursor-pointer"
                >
                  Submit Another Requirement
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Row 1: Name, Email, Phone */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Phone / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] transition"
                    />
                  </div>
                </div>

                {/* Row 2: Company, Product Category, Diameter/Grade */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AutoTech India Pvt Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Product Segment <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] transition cursor-pointer"
                    >
                      <option value="Stainless Steel (SS)">Stainless Steel (SS) Wires</option>
                      <option value="High Carbon Wires">High Carbon Steel Wires</option>
                      <option value="Mild Steel Wires">Mild Steel (Low Carbon) Wires</option>
                      <option value="Galvanized Wires">Galvanized Wires</option>
                      <option value="Profile & Shaped">Profile &amp; Shaped Wires</option>
                      <option value="Cable Armouring">Cable Armouring Wires &amp; Strips</option>
                      <option value="Aluminium Alloy">Aluminium Alloy Wires</option>
                      <option value="Special Products">Special Products (Wire Rope, Bead Wire, etc.)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Diameter / Grade
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1.20 mm, SS 304, 20 MT"
                      value={formData.diameter}
                      onChange={(e) => setFormData({ ...formData, diameter: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] transition"
                    />
                  </div>
                </div>

                {/* Row 3: Requirement Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Requirement / Diameter / Specifications
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Specify required diameter (mm), grade (e.g. 304, 316), tensile strength, monthly quantity, packaging requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e31e24]/30 focus:border-[#e31e24] transition resize-none"
                  />
                </div>

                {/* Row 4: Full-Width Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#e31e24] hover:bg-[#b81419] text-white font-bold py-4 px-6 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> Submit Requirement To Sales Team
                  </button>
                </div>

                <div className="pt-2 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#e31e24]" />
                  <span>ISO 9001:2015, ISO 14001:2015 &amp; IATF 16949:2016 Certified Manufacturer</span>
                </div>
              </form>
            )}
          </div>

          {/* 2. Contact Info Cards (BELOW the form) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e31e24] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-gray-400">
                  Corporate HQ
                </h3>
                <p className="text-xs text-gray-800 font-medium mt-0.5 leading-relaxed">
                  F-3, Main Road, Shastri Nagar, New Delhi – 110052
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e31e24] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-gray-400">
                  Direct Lines
                </h3>
                <p className="text-xs text-gray-800 font-medium mt-0.5">
                  <a href="tel:011-23651890" className="hover:text-[#e31e24]">011-23651890</a> / <a href="tel:011-23651891" className="hover:text-[#e31e24]">91</a> / <a href="tel:011-23651892" className="hover:text-[#e31e24]">92</a> / <a href="tel:011-23651893" className="hover:text-[#e31e24]">93</a>
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e31e24] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-gray-400">
                  Official Email
                </h3>
                <p className="text-xs text-gray-800 font-medium mt-0.5">
                  <a href="mailto:info@bansal-group.com" className="hover:text-[#e31e24]">info@bansal-group.com</a>
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#e31e24] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-gray-400">
                  Working Hours
                </h3>
                <p className="text-xs text-gray-800 font-medium mt-0.5">
                  Mon – Sat: 9:00 AM – 6:00 PM
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </AppWrapper>
  )
}
