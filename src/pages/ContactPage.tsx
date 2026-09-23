import { useState } from 'react'
import { AppWrapper } from '../components/layout/AppWrapper'
import { PageMeta } from '../components/common/PageMeta'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Building, Globe } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'India',
    category: 'Stainless Steel (SS)',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const addEnquiry = useStore((state) => state.addEnquiry)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return

    addEnquiry({
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: 'Direct Web Inquiry',
      country: formData.country,
      productCategory: formData.category,
      productSubCategory: 'Contact Page Inquiry',
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
        country: 'India',
        category: 'Stainless Steel (SS)',
        message: ''
      })
    }, 3500)
  }

  return (
    <AppWrapper>
      <PageMeta
        title="Contact Us | Bansal Wire Industries Ltd."
        description="Contact Bansal Wire Industries Ltd. corporate office in Shastri Nagar New Delhi, phone 011-23651890-93, email info@bansal-group.com."
      />
      
      {/* Banner */}
      <div className="bg-neutral-900 text-white py-14 px-4 text-center border-b-4 border-[#e31e24]">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-['Lato'] uppercase tracking-wide">
          Contact Us
        </h1>
        <p className="text-gray-300 mt-2 text-sm max-w-2xl mx-auto font-normal">
          Get in touch with our technical sales, export division, or customer care team.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[#e31e24] font-bold text-xs uppercase tracking-widest">Connect With Us</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-['Lato'] mt-1 bansal-heading">
                Corporate &amp; Plant Offices
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-start gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-red-100 text-[#e31e24] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-gray-900 block font-semibold mb-0.5">Corporate Headquarters:</strong>
                  <p className="text-gray-600 font-normal">
                    F-3, Main Road, Shastri Nagar, New Delhi – 110052, India
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-start gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-red-100 text-[#e31e24] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-gray-900 block font-semibold mb-0.5">Telephone Numbers:</strong>
                  <p className="text-gray-600 font-normal">
                    <a href="tel:011-23651890" className="hover:text-[#e31e24]">011-23651890</a> / <a href="tel:011-23651891" className="hover:text-[#e31e24]">91</a> / <a href="tel:011-23651892" className="hover:text-[#e31e24]">92</a> / <a href="tel:011-23651893" className="hover:text-[#e31e24]">93</a>
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-start gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-red-100 text-[#e31e24] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-gray-900 block font-semibold mb-0.5">Official Email Addresses:</strong>
                  <p className="text-gray-600 font-normal">
                    General: <a href="mailto:info@bansal-group.com" className="text-[#e31e24]">info@bansal-group.com</a><br />
                    Exports: <a href="mailto:exports@bansalwire.com" className="text-[#e31e24]">exports@bansalwire.com</a>
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-start gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-red-100 text-[#e31e24] flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-gray-900 block font-semibold mb-0.5">Manufacturing Plants:</strong>
                  <p className="text-gray-600 font-normal">
                    Units I - IV: Ghaziabad, UP<br />
                    Mega Unit: Dadri, Uttar Pradesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact / RFQ Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 font-['Lato'] mb-2 bansal-heading">
              Submit Direct Requirement / RFQ
            </h3>
            <p className="text-xs text-gray-600 mb-6 font-normal">
              Fill out the form below to receive detailed technical specifications, test certificates, or quotation.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Enquiry Received Successfully!</h4>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Thank you for contacting Bansal Wire Industries. Our technical sales engineer will get back to you within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 px-3.5 py-2.5 rounded focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 px-3.5 py-2.5 rounded focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 Mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 px-3.5 py-2.5 rounded focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Country</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 px-3.5 py-2.5 rounded focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
                    >
                      <option value="India">India</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="UAE">United Arab Emirates</option>
                      <option value="Germany">Germany</option>
                      <option value="Other">Other Country</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Product Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 px-3.5 py-2.5 rounded focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
                  >
                    <option value="Stainless Steel (SS)">Stainless Steel (SS) Wires</option>
                    <option value="High Carbon Wires">High Carbon Steel Wires</option>
                    <option value="Mild Steel Wires">Mild Steel (Low Carbon) Wires</option>
                    <option value="Galvanized Wires">Galvanized Wires</option>
                    <option value="Cable Armouring">Cable Armouring Wires &amp; Strips</option>
                    <option value="Aluminium Alloy">Aluminium Alloy Wires</option>
                    <option value="Wire Rope">Wire Rope</option>
                    <option value="Tyre Bead">Tyre Bead Wire</option>
                    <option value="Wire Mesh">Aluminium Alloy Wire Mesh</option>
                    <option value="SS Scrubbers">Stainless Steel Scrubbers</option>
                    <option value="Building Material">Building Material (Anchor Bolts / Ties)</option>
                    <option value="Barbed Wire">Barbed Wire</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Requirement Details</label>
                  <textarea
                    rows={4}
                    placeholder="Enter wire size/diameter (mm), tensile grade, delivery location, or monthly tonnage..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 px-3.5 py-2.5 rounded focus:outline-none focus:ring-1 focus:ring-[#e31e24] resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#e31e24] hover:bg-[#b81419] text-white font-bold py-3 px-6 rounded text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Request For Quotation
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </AppWrapper>
  )
}
