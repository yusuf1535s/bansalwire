import { useState } from 'react'
import { X, Send, MessageCircle, MessageSquare, RotateCcw, Check, Sparkles } from 'lucide-react'
import { useStore } from '../../store/useStore'

export function FloatingWidgets() {
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: 'Hello! Welcome to Bansal Wire Industries Ltd. How can we assist you with our wire and cable solutions today?'
    }
  ])
  const [inputMsg, setInputMsg] = useState('')
  const [formCategory, setFormCategory] = useState('Stainless Steel (SS)')
  const [formCountry, setFormCountry] = useState('India')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [requirement, setRequirement] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const addEnquiry = useStore((state) => state.addEnquiry)

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return

    addEnquiry({
      id: Date.now().toString(),
      name,
      email,
      phone,
      company: 'Direct Lead',
      country: formCountry,
      productCategory: formCategory,
      productSubCategory: 'Quick Modal Enquiry',
      message: requirement,
      status: 'pending',
      createdAt: new Date().toISOString()
    })

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setEnquiryOpen(false)
      setName('')
      setEmail('')
      setPhone('')
      setRequirement('')
    }, 2500)
  }

  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!inputMsg.trim()) return

    const userText = inputMsg.trim()
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }])
    setInputMsg('')

    // Auto reply logic
    setTimeout(() => {
      let reply = "Thank you for reaching out! A Bansal Wire product specialist will assist you with detailed specifications. You can also call us directly at 011-23651890 or submit a Quick Enquiry."
      const lower = userText.toLowerCase()
      if (lower.includes('stainless') || lower.includes('ss')) {
        reply = "Bansal Wire is India's largest SS wire manufacturer, offering sizes from 0.04mm to 15.65mm across grades 200, 300, 400 series for spring, weaving, cold heading, and welding."
      } else if (lower.includes('price') || lower.includes('quote') || lower.includes('cost')) {
        reply = "We operate on a transparent 'Cost Plus model' with competitive pricing based on current raw material benchmarks. Please click 'Quick Enquiry' to receive an instant customized quotation."
      } else if (lower.includes('contact') || lower.includes('address') || lower.includes('location')) {
        reply = "Our corporate office is at F-3, Main Road, Shastri Nagar, New Delhi - 110052. Plants are located in Ghaziabad and our upcoming mega facility in Dadri."
      } else if (lower.includes('galvanized') || lower.includes('gi')) {
        reply = "We produce High Zinc and Standard Galvanized Wires for cable armouring, stay wires, ACSR core, fences, and poultry farming with superior corrosion resistance."
      }

      setChatMessages((prev) => [...prev, { sender: 'bot', text: reply }])
    }, 600)
  }

  const resetChat = () => {
    setChatMessages([
      {
        sender: 'bot',
        text: 'Welcome back! How can we assist you with Bansal Wire products?'
      }
    ])
  }

  return (
    <>
      {/* Floating Quick Enquiry Right Tab */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={() => setEnquiryOpen(true)}
          className="bg-[#e31e24] hover:bg-[#b81419] text-white p-1 rounded-l-lg shadow-2xl transition-all duration-300 hover:pr-2 flex flex-col items-center gap-1 cursor-pointer border-y border-l border-white/20 group"
          title="Quick Enquiry"
        >
          <img
            src="/images/bansal/quick-enquiry.gif"
            alt="Quick Enquiry"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
            className="w-8 h-auto object-contain rounded"
          />
          <span className="text-[11px] font-bold tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 py-2 text-white drop-shadow">
            Quick Enquiry
          </span>
        </button>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <a
          href="https://api.whatsapp.com/send?phone=919810000000&text=Hello%20Bansal%20Wire%20Industries,%20I%20have%20an%20enquiry"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-2xl hover:scale-110 transition-transform duration-200 border-2 border-white"
          title="Chat on WhatsApp"
        >
          <img
            src="/images/bansal/whatsup.png"
            alt="WhatsApp"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
            className="w-9 h-9 object-contain"
          />
          <MessageCircle className="w-8 h-8 text-white hidden only:block" />
        </a>
      </div>

      {/* Floating Chatbot / Assistant Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="flex items-center gap-2.5 bg-[#e31e24] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#b81419] hover:scale-105 transition-all duration-200 border-2 border-white font-['Lato'] font-bold text-sm"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Ask Bansal Assistant</span>
          </button>
        ) : null}
      </div>

      {/* Chatbot Window */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-90 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden flex flex-col h-[480px] animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#1c1c1c] text-white p-3.5 flex items-center justify-between border-b-2 border-[#e31e24]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#e31e24] flex items-center justify-center font-bold text-xs text-white">
                BW
              </div>
              <div>
                <h6 className="font-bold text-sm leading-tight text-white font-['Lato']">
                  Bansal Wire Assistant
                </h6>
                <span className="text-[10px] text-gray-300 block font-normal">
                  Trusted Strength Since 1938
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={resetChat}
                className="text-gray-400 hover:text-white p-1"
                title="Reset Conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setChatOpen(false)}
                className="text-gray-400 hover:text-white p-1"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-gray-50 text-xs">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[82%] p-2.5 rounded-lg leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#e31e24] text-white rounded-br-none'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none font-normal'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick FAQ chips */}
          <div className="px-3 py-1.5 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto text-[11px]">
            <button
              onClick={() => {
                setInputMsg('Stainless Steel wires range')
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-0.5 rounded whitespace-nowrap"
            >
              SS Wires
            </button>
            <button
              onClick={() => {
                setInputMsg('Request price quotation')
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-0.5 rounded whitespace-nowrap"
            >
              Get Quote
            </button>
            <button
              onClick={() => {
                setInputMsg('Manufacturing locations')
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-0.5 rounded whitespace-nowrap"
            >
              Plants
            </button>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendChat}
            className="p-2.5 bg-white border-t border-gray-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about wire types, specs, orders..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 bg-gray-100 text-gray-900 px-3 py-1.5 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
            />
            <button
              type="submit"
              className="bg-[#e31e24] hover:bg-[#b81419] text-white p-2 rounded-md transition"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Quick Enquiry Modal */}
      {enquiryOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
            {/* Modal Header */}
            <div className="bg-[#1c1c1c] text-white px-6 py-4 flex items-center justify-between border-b-2 border-[#e31e24]">
              <div>
                <h3 className="text-lg font-bold text-white font-['Lato'] uppercase tracking-wider">
                  Quick Product Enquiry
                </h3>
                <p className="text-xs text-gray-300 font-normal">
                  Connect with Bansal Wire technical sales team
                </p>
              </div>
              <button
                onClick={() => setEnquiryOpen(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Enquiry Received!</h4>
                  <p className="text-sm text-gray-600 max-w-sm mx-auto">
                    Thank you for your interest. A Bansal Wire representative will contact you shortly with catalog and technical specifications.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="email@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">
                        Phone / Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        value={formCountry}
                        onChange={(e) => setFormCountry(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
                      >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Germany">Germany</option>
                        <option value="Other">Other Country</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Product Category *
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
                    >
                      <option value="Stainless Steel (SS)">Stainless Steel (SS) Wires</option>
                      <option value="High Carbon Wires">High Carbon Steel Wires</option>
                      <option value="Mild Steel Wires">Mild Steel (Low Carbon) Wires</option>
                      <option value="Galvanized Wires">Galvanized Wires</option>
                      <option value="Cable Armouring">Cable Armouring Wires &amp; Strips</option>
                      <option value="Aluminium Alloy">Aluminium Alloy Wires</option>
                      <option value="Special Products">Special Products (Wire Rope, Tyre Bead, Mesh)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Specifications / Quantity / Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify wire diameter, grade, packaging, or custom requirements..."
                      value={requirement}
                      onChange={(e) => setRequirement(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#e31e24] resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEnquiryOpen(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded font-semibold transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#e31e24] hover:bg-[#b81419] text-white font-bold rounded uppercase tracking-wider shadow transition"
                    >
                      Submit Enquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
