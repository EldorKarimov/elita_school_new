import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, GraduationCap, Users, Award, BookOpen, Sparkles } from 'lucide-react'

const floatingStats = [
  { icon: Users, value: '2000+', label: "O'quvchilar" },
  { icon: Award, value: '15+', label: 'Yil tajriba' },
  { icon: BookOpen, value: '50+', label: "O'qituvchilar" },
  { icon: GraduationCap, value: '98%', label: 'Qabul darajasi' },
]

export default function HeroSection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-[105vh] flex items-center overflow-hidden hero-gradient">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-indigo-900/30 blur-[100px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Content Column */}
          <div className={`lg:col-span-7 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            {/* Achievement Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-8 animate-reveal">
              <Sparkles size={14} className="text-blue-400" />
              <span className="text-[10px] sm:text-xs font-black text-blue-300 uppercase tracking-[0.2em]">O'zbekistondagi eng yaxshi xususiy maktab</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-[84px] font-black text-white mb-8 leading-[0.95] tracking-tighter">
              Kelajakni <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-200 text-glow">
                birga quramiz
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-12 max-w-xl font-medium">
              Elita School — bu shunchaki maktab emas, bu dunyo darajasidagi bilimlarni o'zida mujassam etgan o'sish maydoni.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-5 mb-16">
              <Link to="/about" className="premium-button-primary group px-10 py-5 text-lg">
                O'qishni boshlash
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="flex items-center gap-3 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-all duration-300 backdrop-blur-sm group">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Play size={16} fill="currentColor" className="ml-0.5" />
                </div>
                Maktab bo'ylab sayohat
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-10">
              {floatingStats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="space-y-1">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Icon size={16} />
                    <span className="text-xl font-black text-white">{value}</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Column */}
          <div className={`lg:col-span-5 hidden lg:block transition-all duration-1000 delay-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative">
              {/* Outer Decorative Rings */}
              <div className="absolute inset-0 border-[40px] border-blue-500/5 rounded-[60px] -m-10 animate-pulse" />
              
              {/* Main Visual Container */}
              <div className="relative rounded-[50px] overflow-hidden border border-white/10 bg-slate-900 shadow-2xl shadow-blue-900/50 group">
                {/* School Visual Content */}
                <div className="p-10 h-full flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none" />
                  
                  {/* Floating Graduation Cap */}
                  <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl mb-12 animate-float">
                    <GraduationCap size={64} className="text-white drop-shadow-lg" />
                    <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full translate-y-12 opacity-50" />
                  </div>

                  <h3 className="text-2xl font-black text-center text-white mb-4 relative z-10">Akademik mukammallik</h3>
                  <p className="text-center text-slate-400 text-sm max-w-[240px] relative z-10">Xalqaro standartlar va zamonaviy texnologiyalar asosida ta'lim.</p>
                  
                  {/* Floating Elements Around */}
                  <div className="absolute top-20 left-10 w-12 h-12 bg-orange-500/20 rounded-xl border border-orange-500/30 flex items-center justify-center text-orange-400 -rotate-12 animate-float" style={{ animationDelay: '1s' }}>
                    <Award size={24} />
                  </div>
                  <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-500/20 rounded-2xl border border-blue-500/30 flex items-center justify-center text-blue-400 rotate-12 animate-float" style={{ animationDelay: '2s' }}>
                    <BookOpen size={32} />
                  </div>
                </div>
              </div>

              {/* Decorative Card */}
              <div className="absolute -bottom-6 -left-10 glass-panel p-6 rounded-3xl shadow-xl shadow-black/20 border border-white/20 animate-reveal" style={{ animationDelay: '0.8s' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Users size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-950 leading-none">2k+</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Bitiruvchilar</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-6 h-10 rounded-full border-2 border-slate-700 flex justify-center p-1.5">
            <div className="w-1 h-2 bg-blue-500 rounded-full animate-bounce" />
          </div>
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Davom ettirish</span>
        </div>
      </div>
    </section>
  )
}
