import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Target, Sparkles, ShieldCheck } from 'lucide-react'
import type { About } from '@/types'

export default function AboutSection({ about }: { about: About | null }) {
  if (!about) return null

  const highlights = [
    { icon: Target, text: "Xalqaro o'quv dasturlari", color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: ShieldCheck, text: "Xavfsiz va zamonaviy o'quv muhiti", color: 'text-green-600', bg: 'bg-green-100' },
    { icon: Sparkles, text: "Individual yondashuv", color: 'text-orange-600', bg: 'bg-orange-100' },
  ]

  return (
    <section className="section-spacing bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* Visual Column */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative z-10 rounded-[60px] overflow-hidden shadow-3xl shadow-blue-900/10 border-8 border-slate-50 min-h-[500px] bg-slate-100">
              {about.photo1 ? (
                <img
                  src={about.photo1}
                  alt="About Elita"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Rasm mavjud emas</span>
                </div>
              )}
            </div>
            
            {/* Absolute Badges */}
            <div className="absolute -top-10 -right-10 glass-panel p-8 rounded-[40px] shadow-2xl animate-float">
               <div className="text-5xl font-black text-blue-600 mb-1">15+</div>
               <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Yillik mukammallik</div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-slate-900 p-6 rounded-[30px] border border-white/10 shadow-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <div className="text-white font-black text-lg">Sifat kafolati</div>
                <div className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">Davlat litsenziyasi</div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="section-label">Biz haqimizda</div>
            <h2 className="text-4xl sm:text-6xl font-black text-slate-950 mb-8 leading-[1.1] tracking-tighter">
              Bilim va tajribaning <br />
              <span className="text-blue-600">oltin markazi</span>
            </h2>
            
            <div 
              className="text-lg text-slate-600 mb-10 leading-relaxed font-medium prose max-w-none"
              dangerouslySetInnerHTML={{ __html: about.content }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon size={20} />
                  </div>
                  <span className="text-slate-900 font-bold text-sm tracking-tight">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link
                to="/about"
                className="premium-button-primary px-8 py-4 text-base w-full sm:w-auto"
              >
                Batafsil ma'lumot
                <ArrowRight size={18} />
              </Link>
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden ring-4 ring-slate-50">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white tracking-tighter">
                  1k+
                </div>
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ishonchli ta'lim</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
