import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react'
import { useStore } from '../../store/useStore'

export function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
      company: 'Website Visitor',
      country: 'India',
      productCategory: formData.category,
      productSubCategory: 'General Inquiry',
      message: formData.message || 'Footer Quick Enquiry submission',
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
        category: 'Stainless Steel (SS)',
        message: ''
      })
    }, 4000)
  }

  return (
    <footer style={{ backgroundColor: '#333334' }} className="text-white pt-12 pb-6 border-t border-neutral-700 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: About Us */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 relative pb-2 after:content-[''] after:block after:w-8 after:h-[2px] after:bg-[#f15822] after:absolute after:bottom-0 after:left-0 font-['Lato'] uppercase tracking-wider text-[15px]">
              About Us
            </h4>
            <p className="text-[13px] text-gray-300 leading-relaxed text-justify mt-3 font-normal">
              We at M/S Bansal Wire Industries Ltd. (BWIL) commenced commercial production with H.B.Wires in 1985. Ever since inception, we have been rapidly and consistently adding to our product line and meeting the needs of market. At present, we are one of the leading manufacturers &amp; exporters of steel wires in the country.
            </p>
            <div className="mt-4 pt-3 border-t border-neutral-600">
              <img
                src="/images/bansal/BANSAL-LOGO-2.png"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/logo.png'
                }}
                alt="Bansal Wire Industries"
                className="h-9 w-auto brightness-0 invert opacity-90"
              />
            </div>
          </div>

          {/* Col 2: Enquiry */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 relative pb-2 after:content-[''] after:block after:w-8 after:h-[2px] after:bg-[#f15822] after:absolute after:bottom-0 after:left-0 font-['Lato'] uppercase tracking-wider text-[15px]">
              Enquiry
            </h4>
            
            {submitted ? (
              <div className="bg-green-900/40 border border-green-500/50 p-4 rounded text-center my-2">
                <CheckCircle2 className="w-7 h-7 text-green-400 mx-auto mb-1" />
                <p className="text-xs text-green-200 font-medium">Thank you! Your enquiry has been received.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2 mt-3 text-xs">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white text-gray-900 px-3 py-1.5 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="E-mail *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white text-gray-900 px-3 py-1.5 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white text-gray-900 px-3 py-1.5 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
                  />
                </div>
                <div>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white text-gray-900 px-3 py-1.5 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
                  >
                    <option value="Stainless Steel (SS)">Stainless Steel (SS)</option>
                    <option value="High Carbon Wires">High Carbon Wires</option>
                    <option value="Mild Steel Galvanised">Mild Steel Galvanised</option>
                    <option value="Aluminium Alloy">Aluminium Alloy</option>
                    <option value="Special Products">Special Products</option>
                  </select>
                </div>
                <div>
                  <textarea
                    rows={2}
                    placeholder="Message / Requirement"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white text-gray-900 px-3 py-1.5 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#e31e24] resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#e31e24] hover:bg-[#b81419] text-white font-bold py-1.5 px-4 rounded text-xs uppercase tracking-wider transition duration-200 flex items-center justify-center gap-1.5 shadow"
                >
                  <Send className="w-3 h-3" />
                  Submit
                </button>
              </form>
            )}
          </div>

          {/* Col 3: Contact Us */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 relative pb-2 after:content-[''] after:block after:w-8 after:h-[2px] after:bg-[#f15822] after:absolute after:bottom-0 after:left-0 font-['Lato'] uppercase tracking-wider text-[15px]">
              Contact Us
            </h4>
            <div className="space-y-3.5 text-[13px] text-gray-300 mt-3 font-normal">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#f15822] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold mb-0.5">Address :</strong>
                  <span>F-3, Main Road, Shastri Nagar New Delhi – 110052</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#f15822] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold mb-0.5">Phone :</strong>
                  <a href="tel:011-23651890" className="hover:text-white transition">011-23651890-93</a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#f15822] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold mb-0.5">Email Id :</strong>
                  <a href="mailto:info@bansal-group.com" className="hover:text-white transition">info@bansal-group.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 relative pb-2 after:content-[''] after:block after:w-8 after:h-[2px] after:bg-[#f15822] after:absolute after:bottom-0 after:left-0 font-['Lato'] uppercase tracking-wider text-[15px]">
              Quick links
            </h4>
            <ul className="space-y-1.5 text-[13px] text-gray-300 mt-3 font-normal">
              {[
                { label: 'CSR', path: '/about/csr' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'Infrastructure & Plants', path: '/about/our-presence' },
                { label: 'Career', path: '/career' },
                { label: 'Media & Press Release', path: '/investor-relations' },
                { label: 'Investor Financials', path: '/investor-relations' },
                { label: 'Quality & Certificates', path: '/quality' },
                { label: 'Site Map', path: '/products' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="hover:text-[#f15822] transition-colors flex items-center gap-1.5 py-0.5"
                  >
                    <span className="text-[#f15822] font-bold">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-600 pt-5 mt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-400">
          <p className="font-normal text-center sm:text-left">
            © {new Date().getFullYear()} Bansal Wire Industries Ltd. All Rights Reserved.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-gray-500">ISO 9001:2015 | ISO 14001:2015 | IATF 16949:2016 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
