import { useState } from 'react'
import { MessageCircle, X, Send, RefreshCw } from 'lucide-react'

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-border-light w-80 mb-4 overflow-hidden">
          <div className="bg-black text-white p-4 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-sm">Bansal Wire</h4>
              <p className="text-xs text-white/60">Trusted Strength Since 1938</p>
            </div>
            <button onClick={() => setOpen(false)}>
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 space-y-3 bg-bg-light h-64 overflow-auto">
            <div className="bg-white rounded-lg p-3 shadow-sm text-sm text-text-primary">
              <img src="/images/logo-small.png" alt="Bansal" className="w-10 h-10 rounded mb-2" />
              <p>"Hello! Welcome to Bansal Wire Industries Ltd."</p>
              <p className="mt-1">How can I assist you today?</p>
            </div>
            <div className="text-sm text-text-secondary">Are you looking for information on:</div>
            <div className="flex flex-wrap gap-2">
              {['Our Products', 'Careers', 'Other Query'].map((opt) => (
                <button key={opt} className="bg-white border border-border-light px-3 py-1.5 rounded text-xs hover:border-accent hover:text-accent transition">
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="p-3 border-t border-border-light">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-border-light text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button className="bg-accent text-white p-2 rounded-lg hover:bg-accent-light transition">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-accent rounded-full shadow-lg flex items-center justify-center text-white hover:bg-accent-light transition"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  )
}
