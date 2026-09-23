import { useState } from 'react'
import { AppWrapper } from '../components/layout/AppWrapper'
import { PageMeta } from '../components/common/PageMeta'
import { FileText, TrendingUp, PieChart, BarChart3, Download, ShieldCheck, ChevronRight, ExternalLink } from 'lucide-react'

export default function InvestorRelationsPage() {
  const [activeTab, setActiveTab] = useState('financials')

  const disclosures = [
    {
      category: 'financials',
      title: 'Audited Financial Statements for FY 2023-24',
      date: 'May 2024',
      fileSize: '2.4 MB'
    },
    {
      category: 'financials',
      title: 'Unaudited Quarterly Financial Results Q3 FY24',
      date: 'Jan 2024',
      fileSize: '1.8 MB'
    },
    {
      category: 'annual-report',
      title: 'Annual Report 2023-2024: Engineering Sustainable Growth',
      date: 'July 2024',
      fileSize: '8.6 MB'
    },
    {
      category: 'shareholding',
      title: 'Shareholding Pattern for Quarter ended Dec 31, 2024',
      date: 'Jan 2025',
      fileSize: '450 KB'
    },
    {
      category: 'sebi',
      title: 'Disclosure under Regulation 46 of SEBI (LODR) Regulations, 2015',
      date: 'Ongoing',
      fileSize: '1.1 MB'
    },
    {
      category: 'policies',
      title: 'Policy on Materiality of Related Party Transactions & Dealing',
      date: 'Updated 2024',
      fileSize: '620 KB'
    },
    {
      category: 'policies',
      title: 'Whistle Blower Policy & Vigil Mechanism',
      date: 'Approved 2024',
      fileSize: '510 KB'
    },
    {
      category: 'csr',
      title: 'CSR Annual Action Plan & Allocation 2024-25',
      date: 'April 2024',
      fileSize: '890 KB'
    }
  ]

  const filteredDocs =
    activeTab === 'all'
      ? disclosures
      : disclosures.filter((d) => d.category === activeTab || activeTab === 'all')

  return (
    <AppWrapper>
      <PageMeta
        title="Investor Relations | Financials, SEBI Disclosures, Reports | Bansal Wire"
        description="Investor Relations, Financial Results, Shareholding Pattern, SEBI LODR Regulation 46 Disclosures, Annual Reports, and Policies of Bansal Wire Industries Ltd."
      />

      {/* Banner */}
      <div className="bg-neutral-900 text-white py-14 px-4 text-center border-b-4 border-[#e31e24]">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-['Lato'] uppercase tracking-wide">
          Investor Relations &amp; Governance
        </h1>
        <p className="text-gray-300 mt-2 text-sm max-w-2xl mx-auto font-normal">
          Committed to utmost corporate governance, stakeholder transparency, and sustainable financial growth.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 font-sans">
        
        {/* Key Operational Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#fcfcfc] p-6 rounded-xl border border-gray-200 text-center shadow-xs">
            <span className="text-xs font-bold text-gray-500 uppercase">Stainless Steel Production</span>
            <div className="text-3xl font-black text-[#e31e24] font-['Lato'] mt-1">72,176 MTPA</div>
            <p className="text-xs text-gray-600 mt-1">20% Market Share in India</p>
          </div>

          <div className="bg-[#fcfcfc] p-6 rounded-xl border border-gray-200 text-center shadow-xs">
            <span className="text-xs font-bold text-gray-500 uppercase">Total Steel Wire Volume</span>
            <div className="text-3xl font-black text-gray-900 font-['Lato'] mt-1">206,466 MTPA</div>
            <p className="text-xs text-gray-600 mt-1">#2 Steel Wire Maker in India</p>
          </div>

          <div className="bg-[#fcfcfc] p-6 rounded-xl border border-gray-200 text-center shadow-xs">
            <span className="text-xs font-bold text-gray-500 uppercase">Customer De-risking</span>
            <div className="text-3xl font-black text-[#e31e24] font-['Lato'] mt-1">&lt; 5% Sales</div>
            <p className="text-xs text-gray-600 mt-1">No single customer concentration</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-8">
          {[
            { id: 'all', label: 'All Disclosures' },
            { id: 'financials', label: 'Financial Results' },
            { id: 'annual-report', label: 'Annual Reports' },
            { id: 'shareholding', label: 'Shareholding Pattern' },
            { id: 'sebi', label: 'SEBI LODR Reg 46' },
            { id: 'policies', label: 'Corporate Policies' },
            { id: 'csr', label: 'CSR Action Plan' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition uppercase tracking-wider ${
                activeTab === tab.id
                  ? 'bg-[#e31e24] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Document Listings */}
        <div className="space-y-3">
          {filteredDocs.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white p-4 sm:p-5 rounded-lg border border-gray-200 hover:border-[#e31e24] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-[#e31e24] flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base font-['Lato']">{doc.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span>Filed: {doc.date}</span>
                    <span>•</span>
                    <span>Size: {doc.fileSize}</span>
                    <span>•</span>
                    <span className="text-green-600 font-semibold">PDF Document</span>
                  </div>
                </div>
              </div>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  alert(`Downloading ${doc.title}...`)
                }}
                className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-[#e31e24] hover:text-white text-gray-800 text-xs font-bold px-4 py-2 rounded transition self-end sm:self-auto shrink-0 uppercase tracking-wider"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </a>
            </div>
          ))}
        </div>

        {/* Compliance Contact */}
        <div className="mt-14 bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <strong className="text-gray-900 block font-semibold text-sm mb-0.5">Investor Grievance &amp; Compliance Officer:</strong>
            <p className="text-gray-600">Company Secretary &amp; Compliance Officer | Bansal Wire Industries Ltd.</p>
            <p className="text-gray-600 mt-0.5">Email: <a href="mailto:investorrelations@bansalwire.com" className="text-[#e31e24]">investorrelations@bansalwire.com</a> | Tel: 011-23651890</p>
          </div>
          <a
            href="mailto:investorrelations@bansalwire.com"
            className="bg-[#e31e24] text-white px-5 py-2.5 rounded font-bold uppercase tracking-wider hover:bg-[#b81419] transition shrink-0"
          >
            Contact Investor Desk
          </a>
        </div>

      </div>
    </AppWrapper>
  )
}
