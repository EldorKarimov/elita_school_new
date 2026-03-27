import { useState } from 'react'
import { Phone, User, Send, CheckCircle2, AlertCircle, MapPin, Mail, ChevronRight, Sparkles } from 'lucide-react'
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

  return (
    <section className="section-spacing bg-white relative overflow-hidden" id="contact">
      {/* Abstract Design Elements */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] -mr-64 opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-stretch">
          
          {/* Left info */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="section-label">Aloqa</div>
            <h2 className="text-4xl sm:text-6xl font-black text-slate-950 leading-[1.1] tracking-tighter mb-8">
              Savollaringiz <br />
              <span className="text-blue-600">bormi?</span>
            </h2>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed font-medium">
              Biz bilan bog'lanish juda oson. Formani to'ldiring yoki quyidagi manzillar orqali bizga murojaat qiling.
            </p>

            <div className="space-y-6">
              {[
                { icon: Phone, label: 'Qo\'ng\'iroq qiling', value: '+998 99 123 45 67', href: 'tel:+998991234567', color: 'bg-blue-600' },
                { icon: Mail, label: 'Email orqali yozing', value: 'info@elitaschool.uz', href: 'mailto:info@elitaschool.uz', color: 'bg-indigo-600' },
                { icon: MapPin, label: 'Manzilimiz', value: 'Toshkent sh., Chilonzor tumani', href: '#', color: 'bg-slate-900' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="group flex items-center gap-6 p-6 rounded-[32px] bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{item.label}</div>
                    <div className="font-black text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors">{item.value}</div>
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="relative h-full">
               {/* Decorative card shadow behind */}
               <div className="absolute inset-0 bg-blue-600/5 rounded-[60px] translate-x-4 translate-y-4 -z-10" />
               
               <div className="bg-white rounded-[60px] p-8 sm:p-12 border border-slate-100 shadow-3xl shadow-slate-200/50 h-full">
                {success ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 px-6 animate-reveal">
                    <div className="w-24 h-24 rounded-3xl bg-green-100 flex items-center justify-center text-green-600 mb-8 shadow-xl">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-950 mb-4 tracking-tighter">Xabaringiz yuborildi!</h3>
                    <p className="text-slate-500 font-medium mb-10 max-w-xs leading-relaxed">Tez orada bizning mutaxassislarimiz siz bilan bog'lanishadi.</p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="premium-button-primary px-12 py-5"
                    >
                      Boshqa xabar yuborish
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Ism familiyangiz</label>
                        <div className="relative group">
                           <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                           <input
                            type="text"
                            required
                            value={form.full_name}
                            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                            placeholder="Abdulloh Abdullayev"
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-14 py-5 text-slate-900 font-bold placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 sm:text-lg transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Telefon raqamingiz</label>
                        <div className="relative group">
                           <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                           <input
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="+998 9x xxx xx xx"
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-14 py-5 text-slate-900 font-bold placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 sm:text-lg transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mavzu</label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="Qabul haqida ma'lumot olish"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-7 py-5 text-slate-900 font-bold placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 sm:text-lg transition-all"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Xabaringiz</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Sizni nima qiziqtiradi?"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-7 py-5 text-slate-900 font-bold placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 sm:text-lg transition-all resize-none"
                      />
                    </div>

                    {error && (
                      <div className="flex items-center gap-3 p-5 rounded-2xl bg-red-50 text-red-600 border border-red-100 text-sm font-bold animate-reveal">
                        <AlertCircle size={20} />
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full premium-button-primary py-6 text-xl group"
                    >
                      {loading ? (
                        <span className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Xabarni yuborish
                        </>
                      )}
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                       <Sparkles size={14} />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em]">Bizga ishonchingiz uchun rahmat</span>
                    </div>
                  </form>
                )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
