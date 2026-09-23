import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '../../store/useStore'
import { categories } from '../../data/static'

export function ContactSection() {
  const { addEnquiry } = useStore()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', category: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addEnquiry({
      id: Date.now().toString(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      category: form.category,
      message: form.message,
      status: 'new',
      createdAt: new Date().toISOString().split('T')[0],
    })
    setSubmitted(true)
    setForm({ name: '', email: '', phone: '', category: '', message: '' })
  }

  if (submitted) {
    return (
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text-primary">Thank You!</h2>
          <p className="text-text-secondary mt-2">Your enquiry has been submitted successfully. We will get back to you shortly.</p>
          <button onClick={() => setSubmitted(false)} className="mt-6 bg-black text-white px-6 py-2 rounded-lg hover:bg-black/80 transition">
            Submit Another Enquiry
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-16 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Get in Touch</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2">Contact Us</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {[
              { icon: MapPin, title: 'Address', detail: 'F-3, Main Road, Shastri Nagar, New Delhi - 110052' },
              { icon: Phone, title: 'Phone', detail: '011-46666750-59' },
              { icon: Mail, title: 'Email', detail: 'info@bansalwire.com' },
              { icon: Clock, title: 'Working Hours', detail: 'Mon - Sat: 9:00 AM - 6:00 PM' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                    <Icon className="w-5 h-5 text-text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{item.title}</h4>
                    <p className="text-sm text-text-secondary">{item.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-border-light space-y-4">
            <h3 className="font-semibold text-text-primary">Quick Enquiry</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border-light focus:outline-none focus:ring-2 focus:ring-accent/30 text-sm" />
              <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border-light focus:outline-none focus:ring-2 focus:ring-accent/30 text-sm" />
              <input type="tel" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border-light focus:outline-none focus:ring-2 focus:ring-accent/30 text-sm" />
              <select required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border-light focus:outline-none focus:ring-2 focus:ring-accent/30 text-sm">
                <option value="">Select Category</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <textarea required placeholder="Message" rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border-light focus:outline-none focus:ring-2 focus:ring-accent/30 text-sm resize-none" />
            <button type="submit" className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-black/80 transition flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
