import { useState } from 'react'
import { Phone, MessageSquare, User, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { postContact } from '@/api/school'
import type { ContactForm } from '@/types'

export default function ContactSection() {
  const [form, setForm] = useState<ContactForm>({
    full_name: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await postContact(form)
      setSuccess(true)
      setForm({ full_name: '', phone: '', subject: '', message: '' })
    } catch {
      setError("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1.5px solid #e2e8f0',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    color: '#0f172a',
    background: '#f8fafc',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  const inputFocusStyle = {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 3px rgba(59,130,246,0.1)',
    background: 'white',
  }

  return (
    <section
      className="section-padding"
      id="contact"
      style={{ background: '#f8fafc' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left info */}
          <div>
            <span className="section-badge mb-4">Bizga yozing</span>
            <h2 className="text-4xl font-black mb-5" style={{ color: '#0f172a' }}>
              Bog'lanish uchun
              <br />
              <span className="text-gradient">kontakt formasi</span>
            </h2>
            <p className="text-base mb-8 leading-relaxed" style={{ color: '#64748b' }}>
              Savollaringiz bormi? Maktabimiz haqida to'liqroq ma'lumot olishni xohlaysizmi?
              Formani to'ldirib yuboring, biz siz bilan tez orada bog'lanamiz.
            </p>

            <div className="space-y-4">
              {[
                { icon: Phone, label: 'Telefon', value: '+998 99 123 45 67', href: 'tel:+998991234567' },
                { icon: MessageSquare, label: 'Telegram', value: '@elitaschool_uz', href: '#' },
                { icon: Phone, label: 'WhatsApp', value: '+998 90 000 00 00', href: '#' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.02]"
                  style={{ background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)' }}
                  >
                    <Icon size={18} style={{ color: '#3b82f6' }} />
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: '#94a3b8' }}>{label}</div>
                    <div className="font-semibold text-sm" style={{ color: '#0f172a' }}>{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div
            className="rounded-3xl p-8 shadow-xl"
            style={{ background: 'white', border: '1px solid #e2e8f0' }}
          >
            {success ? (
              <div className="flex flex-col items-center text-center py-8 gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: '#dcfce7' }}
                >
                  <CheckCircle2 size={32} style={{ color: '#16a34a' }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#0f172a' }}>
                  Xabaringiz yuborildi!
                </h3>
                <p style={{ color: '#64748b' }}>
                  Tez orada siz bilan bog'lanamiz.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)' }}
                >
                  Yana yuborish
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>
                    <User size={14} className="inline mr-1.5" style={{ color: '#3b82f6' }} />
                    Ism familiya *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    placeholder="Abdullayev Abdulloh"
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, { borderColor: '#e2e8f0', boxShadow: 'none', background: '#f8fafc' })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>
                    <Phone size={14} className="inline mr-1.5" style={{ color: '#3b82f6' }} />
                    Telefon raqami *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+998 90 000 00 00"
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, { borderColor: '#e2e8f0', boxShadow: 'none', background: '#f8fafc' })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>
                    Mavzu
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Qabul haqida ma'lumot"
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, { borderColor: '#e2e8f0', boxShadow: 'none', background: '#f8fafc' })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>
                    <MessageSquare size={14} className="inline mr-1.5" style={{ color: '#3b82f6' }} />
                    Xabar *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Xabaringizni yozing..."
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, { borderColor: '#e2e8f0', boxShadow: 'none', background: '#f8fafc' })}
                  />
                </div>

                {error && (
                  <div
                    className="flex items-center gap-2 p-3 rounded-xl text-sm"
                    style={{ background: '#fff1f2', color: '#be123c', border: '1px solid #fecdd3' }}
                  >
                    <AlertCircle size={15} />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
                    boxShadow: '0 10px 30px rgba(59,130,246,0.3)',
                  }}
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={16} />
                      Yuborish
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
