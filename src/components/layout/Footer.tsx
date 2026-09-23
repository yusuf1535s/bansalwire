import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ArrowRight, ShieldCheck } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#181a1d] text-white border-t-2 border-[#e31e24] font-sans">
      
      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Col 1: Corporate Profile & Certifications (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block">
              <img
                src="/images/bansal/BANSAL-LOGO-2.png"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/logo.png'
                }}
                alt="Bansal Wire Industries Ltd."
                className="h-10 w-auto brightness-0 invert opacity-95"
              />
            </Link>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal pr-4">
              Bansal Wire Industries Ltd. (BWIL) is India's leading manufacturer and exporter of stainless steel, high carbon, and specialized engineered wires. Powering automotive, infrastructure, power transmission, and global engineering industries with over 3,000 SKUs since 1938.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-xs text-gray-300">
                <ShieldCheck className="w-4 h-4 text-[#e31e24] shrink-0" />
                <span>ISO 9001:2015 | ISO 14001:2015 | IATF 16949:2016</span>
              </div>
            </div>
          </div>

          {/* Col 2: Product Lines (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white !text-white font-['Lato'] border-b border-white/10 pb-3 mb-4">
              Engineered Products
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300 font-normal">
              <li>
                <Link to="/products" className="hover:text-[#e31e24] transition-colors flex items-center gap-1.5 py-0.5">
                  <span className="text-[#e31e24] text-xs font-bold">›</span> Stainless Steel Wires
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#e31e24] transition-colors flex items-center gap-1.5 py-0.5">
                  <span className="text-[#e31e24] text-xs font-bold">›</span> High Carbon Steel Wires
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#e31e24] transition-colors flex items-center gap-1.5 py-0.5">
                  <span className="text-[#e31e24] text-xs font-bold">›</span> Mild Steel &amp; Galvanized Wires
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#e31e24] transition-colors flex items-center gap-1.5 py-0.5">
                  <span className="text-[#e31e24] text-xs font-bold">›</span> Profile &amp; Shaped Wires
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#e31e24] transition-colors flex items-center gap-1.5 py-0.5">
                  <span className="text-[#e31e24] text-xs font-bold">›</span> Cable Armouring Strips &amp; Wires
                </Link>
              </li>
              <li>
                <Link to="/special-products" className="hover:text-[#e31e24] transition-colors flex items-center gap-1.5 py-0.5">
                  <span className="text-[#e31e24] text-xs font-bold">›</span> Special Products Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Governance (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white !text-white font-['Lato'] border-b border-white/10 pb-3 mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300 font-normal">
              <li>
                <Link to="/about" className="hover:text-[#e31e24] transition-colors flex items-center gap-1.5 py-0.5">
                  <span className="text-[#e31e24] text-xs font-bold">›</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/about/vision-mission" className="hover:text-[#e31e24] transition-colors flex items-center gap-1.5 py-0.5">
                  <span className="text-[#e31e24] text-xs font-bold">›</span> Vision &amp; Mission
                </Link>
              </li>
              <li>
                <Link to="/about/our-journey" className="hover:text-[#e31e24] transition-colors flex items-center gap-1.5 py-0.5">
                  <span className="text-[#e31e24] text-xs font-bold">›</span> Our Journey (1938)
                </Link>
              </li>
              <li>
                <Link to="/about/our-presence" className="hover:text-[#e31e24] transition-colors flex items-center gap-1.5 py-0.5">
                  <span className="text-[#e31e24] text-xs font-bold">›</span> Global Presence
                </Link>
              </li>
              <li>
                <Link to="/quality" className="hover:text-[#e31e24] transition-colors flex items-center gap-1.5 py-0.5">
                  <span className="text-[#e31e24] text-xs font-bold">›</span> Quality &amp; Lab
                </Link>
              </li>
              <li>
                <Link to="/investor-relations" className="hover:text-[#e31e24] transition-colors flex items-center gap-1.5 py-0.5">
                  <span className="text-[#e31e24] text-xs font-bold">›</span> Investor Relations
                </Link>
              </li>
              <li>
                <Link to="/career" className="hover:text-[#e31e24] transition-colors flex items-center gap-1.5 py-0.5">
                  <span className="text-[#e31e24] text-xs font-bold">›</span> Careers at BWI
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Office & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white !text-white font-['Lato'] border-b border-white/10 pb-3 mb-4">
              Corporate Office
            </h4>

            <div className="space-y-3.5 text-xs sm:text-sm text-gray-300 font-normal">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e31e24] shrink-0 mt-0.5" />
                <span>F-3, Main Road, Shastri Nagar, New Delhi – 110052, India</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#e31e24] shrink-0 mt-0.5" />
                <div>
                  <a href="tel:011-23651890" className="hover:text-white transition">011-23651890-93</a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#e31e24] shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:info@bansal-group.com" className="hover:text-white transition">
                    info@bansal-group.com
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#e31e24] hover:bg-[#b81419] text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition duration-200 shadow"
              >
                Contact &amp; Request Quote <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#121316] py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Bansal Wire Industries Ltd. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-gray-400">
            <span className="text-gray-500 font-mono">BSE: 544203</span>
            <span className="text-gray-700">•</span>
            <span className="text-gray-500 font-mono">NSE: BANSALWIRE</span>
            <span className="text-gray-700">•</span>
            <Link to="/about/csr" className="hover:text-white transition">CSR Policy</Link>
            <span className="text-gray-700">•</span>
            <Link to="/contact" className="hover:text-white transition">Site Contact</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}
