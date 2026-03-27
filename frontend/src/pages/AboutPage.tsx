import { useEffect, useState } from 'react'
import { getAbout } from '@/api/school'
import type { About } from '@/types'
import ContactSection from '@/components/sections/ContactSection'
import { CheckCircle2, Target, Sparkles, ShieldCheck } from 'lucide-react'

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAbout().then(setAbout).finally(() => setLoading(false))
  }, [])

  const photos = about
    ? [about.photo1, about.photo2, about.photo3].filter(Boolean) as string[]
    : []

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="relative pt-40 pb-24 bg-ui-darker overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="section-label bg-white/5 text-blue-400 border-white/10 mb-6">Biz haqimizda</div>
            <h1 className="text-5xl sm:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-8">
              Ta'limda <span className="text-blue-500 text-gradient">mukammallik</span> sari yo'l
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              Elita School — bu shunchaki maktab emas, balki kelajak yetakchilarini shakllantiruvchi innovatsion ta'lim dargohidir.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* Left: Content */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-5xl font-black text-slate-950 mb-10 tracking-tighter">
                Bizning missiyamiz va <br />
                <span className="text-blue-600">maqsadlarimiz</span>
              </h2>
              
              <div 
                className="prose prose-lg max-w-none text-slate-600 font-medium leading-relaxed mb-12"
                dangerouslySetInnerHTML={{ __html: about?.content || '' }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 {[
                   { icon: Target, title: "Sifatli ta'lim", desc: "Xalqaro standartlar asosida darslar" },
                   { icon: ShieldCheck, title: "Xavfsiz muhit", desc: "Bolalar uchun to'liq himoyalangan hudud" },
                   { icon: Sparkles, title: "Zamonaviy metodlar", desc: "Interaktiv va qiziqarli o'qitish uslubi" },
                   { icon: CheckCircle2, title: "Natijaga yo'naltirilgan", desc: "Har bir o'quvchi bilan individual ishlash" },
                 ].map((item, idx) => (
                   <div key={idx} className="flex gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <div className="font-black text-slate-950 text-lg mb-1">{item.title}</div>
                        <div className="text-sm text-slate-500 font-medium">{item.desc}</div>
                      </div>
                   </div>
                 ))}
              </div>
            </div>

            {/* Right: Images collage */}
            <div className="lg:col-span-5 relative">
               <div className="sticky top-32 space-y-6">
                  {photos.length > 0 ? (
                    <>
                      <div className="rounded-[40px] overflow-hidden shadow-3xl shadow-blue-900/10 border-8 border-slate-50">
                        <img src={photos[0]} alt="School" className="w-full aspect-[4/5] object-cover" />
                      </div>
                      {photos.length > 1 && (
                        <div className="grid grid-cols-2 gap-6">
                           {photos.slice(1, 3).map((p, i) => (
                             <div key={i} className="rounded-[32px] overflow-hidden shadow-2xl border-4 border-slate-50">
                               <img src={p} alt="School" className="w-full aspect-square object-cover" />
                             </div>
                           ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full aspect-[4/5] rounded-[40px] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-12 text-center">
                       <div className="text-white">
                          <div className="text-6xl mb-6">🏫</div>
                          <div className="text-2xl font-black">Elita School bilan porloq kelajak sari</div>
                       </div>
                    </div>
                  )}
                  
                  {/* Floating Stat */}
                  <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[40px] shadow-3xl shadow-slate-200/50 border border-slate-100 animate-float">
                     <div className="text-5xl font-black text-blue-600 mb-1">15+</div>
                     <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Yillik tajriba</div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  )
}
