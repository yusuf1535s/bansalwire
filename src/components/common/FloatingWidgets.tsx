import { useState, useRef, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { X, Send, RotateCcw, Sparkles, MessageCircle, Bot, User, ArrowRight } from 'lucide-react'
import { queryAIAssistant } from '../../services/aiAssistant'

interface ChatMessage {
  sender: 'bot' | 'user'
  text: string
  time?: string
}

export function FloatingWidgets() {
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: 'Hello! Welcome to Bansal Wire Industries Ltd. I am your AI Technical Assistant. Ask me anything about our 3,000+ wire specifications, steel grades (SS, High Carbon, GI), tolerances, or export procedures!'
    }
  ])
  const [inputMsg, setInputMsg] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // Only display the floating AI assistant on Home and Products pages to keep formal pages 100% clean
  const shouldShow = location.pathname === '/' || location.pathname.startsWith('/products')

  useEffect(() => {
    if (chatOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages, isTyping, chatOpen])

  if (!shouldShow) return null

  const handleSendChat = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault()
    const textToSend = (customQuery || inputMsg).trim()
    if (!textToSend || isTyping) return

    const userMessage: ChatMessage = { sender: 'user', text: textToSend }
    setChatMessages((prev) => [...prev, userMessage])
    setInputMsg('')
    setIsTyping(true)

    try {
      const responseText = await queryAIAssistant(textToSend, chatMessages)
      
      // Simulate realistic intelligent typing effect
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { sender: 'bot', text: responseText }
        ])
        setIsTyping(false)
      }, 400)
    } catch {
      setIsTyping(false)
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Thank you for your question. For detailed industrial quotes and specifications, please call 011-23651890 or visit our Contact page.'
        }
      ])
    }
  }

  const resetChat = () => {
    setChatMessages([
      {
        sender: 'bot',
        text: 'Conversation reset. How can I assist you with Bansal Wire technical specifications today?'
      }
    ])
  }

  // Quick Suggestion Prompts
  const quickPrompts = [
    'Stainless Steel Grades',
    'Wire Diameters & Sizes',
    'Cable Armouring Wires',
    'Mill Test Certificates',
    'Request Price Quotation'
  ]

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      
      {/* Refined Single Floating Trigger Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="flex items-center gap-2.5 bg-[#e31e24] hover:bg-[#b81419] text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-200 border-2 border-white cursor-pointer group"
          aria-label="Open AI Assistant"
        >
          <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
          <span className="font-bold text-xs tracking-wide font-['Lato']">Ask AI Assistant</span>
        </button>
      )}

      {/* Modern AI Assistant Window */}
      {chatOpen && (
        <div className="w-92 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[520px] animate-in fade-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="bg-[#181a1d] text-white p-3.5 flex items-center justify-between border-b-2 border-[#e31e24]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#e31e24] flex items-center justify-center font-bold text-xs text-white shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-white font-['Lato'] leading-tight">
                    Bansal Wire AI
                  </h4>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Online" />
                </div>
                <span className="text-[10px] text-gray-400 block font-normal">
                  Intelligent Engineering Consultant
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="text-gray-400 hover:text-white p-1 rounded transition cursor-pointer"
                title="Reset Conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setChatOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded transition cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links Bar (WhatsApp & Contact) */}
          <div className="bg-slate-100 px-3.5 py-1.5 border-b border-slate-200 flex items-center justify-between text-[11px]">
            <span className="text-slate-600 font-medium">Need immediate sales team?</span>
            <div className="flex items-center gap-2">
              <a
                href="https://api.whatsapp.com/send?phone=911123651890&text=Hello%20Bansal%20Wire%20Industries,%20I%20have%20an%20enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#25D366] hover:bg-[#20ba5a] text-white px-2 py-0.5 rounded shadow-xs transition"
              >
                <MessageCircle className="w-2.5 h-2.5" /> WhatsApp
              </a>
              <Link
                to="/contact"
                onClick={() => setChatOpen(false)}
                className="text-[10px] font-bold text-[#e31e24] hover:underline"
              >
                RFQ Page
              </Link>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 bg-slate-50/70 text-xs">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#e31e24] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                
                <div
                  className={`max-w-[82%] p-3 rounded-2xl leading-relaxed whitespace-pre-line text-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#e31e24] text-white rounded-br-none shadow-xs font-medium'
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-slate-500 text-xs">
                <div className="w-6 h-6 rounded-full bg-[#e31e24] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white px-3.5 py-2.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#e31e24] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#e31e24] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#e31e24] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendChat(undefined, prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-red-50 hover:text-[#e31e24] hover:border-red-200 border border-transparent text-slate-700 transition cursor-pointer text-[10.5px] font-medium"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendChat} className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask steel grades, diameters, quotes, ASTM specs..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#e31e24]"
            />
            <button
              type="submit"
              disabled={!inputMsg.trim() || isTyping}
              className="bg-[#e31e24] hover:bg-[#b81419] disabled:opacity-40 text-white p-2.5 rounded-xl transition cursor-pointer shrink-0 shadow-xs"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  )
}
