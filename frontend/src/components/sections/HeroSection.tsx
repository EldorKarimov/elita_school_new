import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, GraduationCap, Users, Award, BookOpen, ChevronDown } from 'lucide-react'

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
    <section
      className="relative min-h-screen flex items-center overflow-hidden hero-noise"
      style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 30%, #1a2744 60%, #1e3a8a 100%)' }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glowing orbs */}
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #1d4ed8, transparent)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #f59e0b, transparent)', transform: 'translate(-50%, -50%)' }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, #60a5fa 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Animated floating shapes */}
        <div
          className="animate-float absolute top-20 right-16 w-16 h-16 rounded-2xl border border-blue-400/20"
          style={{ background: 'rgba(59, 130, 246, 0.06)', animationDelay: '0s' }}
        />
        <div
          className="animate-float absolute top-40 right-48 w-10 h-10 rounded-xl border border-blue-300/15"
          style={{ background: 'rgba(96, 165, 250, 0.04)', animationDelay: '1s' }}
        />
        <div
          className="animate-float absolute bottom-32 left-20 w-20 h-20 rounded-3xl border border-amber-400/15"
          style={{ background: 'rgba(245, 158, 11, 0.04)', animationDelay: '2s' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div
            className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold uppercase tracking-wider"
              style={{
                background: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid rgba(96, 165, 250, 0.3)',
                color: '#93c5fd',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              O'zbekistondagi yetakchi maktab
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05]">
              Kelajakni
              <br />
              <span
                style={{
                  background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                birga quramiz
              </span>
            </h1>

            <p className="text-lg leading-relaxed mb-8 max-w-lg" style={{ color: '#93c5fd' }}>
              Elita School — zamonaviy ta'lim, tajribali mutaxassislar va ilg'or o'quv dasturlari orqali har bir o'quvchining salohiyatini ochib beradi.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/about"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-blue-500/30"
                style={{ background: 'linear-gradient(135deg, #1e40af, #2563eb)' }}
              >
                Batafsil
                <ArrowRight size={18} />
              </Link>
              <button
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  <Play size={14} className="ml-0.5" />
                </div>
                Video ko'rish
              </button>
            </div>

            {/* Mini stats row */}
            <div className="flex flex-wrap gap-6">
              {floatingStats.slice(0, 3).map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(59,130,246,0.2)' }}
                  >
                    <Icon size={14} style={{ color: '#60a5fa' }} />
                  </div>
                  <div>
                    <div className="font-black text-white text-sm leading-none">{value}</div>
                    <div className="text-xs" style={{ color: '#64748b' }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: decorative card */}
          <div
            className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <div className="relative">
              {/* Main card */}
              <div
                className="rounded-3xl p-1"
                style={{ background: 'linear-gradient(135deg, rgba(96,165,250,0.3), rgba(167,139,250,0.1))' }}
              >
                <div
                  className="rounded-3xl p-8"
                  style={{ background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(20px)' }}
                >
                  {/* School illustration */}
                  <div
                    className="w-full h-56 rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative"
                    style={{ background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)' }}
                  >
                    {/* Decorative elements */}
                    <div
                      className="absolute top-4 left-4 w-16 h-16 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.08)' }}
                    />
                    <div
                      className="absolute bottom-4 right-4 w-10 h-10 rounded-full"
                      style={{ background: 'rgba(245,158,11,0.2)' }}
                    />
                    <GraduationCap size={80} className="text-blue-300 opacity-60" />
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                      }}
                    />
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {floatingStats.map(({ icon: Icon, value, label }) => (
                      <div
                        key={label}
                        className="rounded-xl p-4 flex flex-col items-center text-center"
                        style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(96,165,250,0.15)' }}
                      >
                        <Icon size={20} style={{ color: '#60a5fa' }} className="mb-2" />
                        <div className="font-black text-white text-xl leading-none">{value}</div>
                        <div className="text-xs mt-1" style={{ color: '#94a3b8' }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -top-4 -right-4 rounded-2xl p-3 shadow-xl animate-float"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                  animationDelay: '0.5s',
                }}
              >
                <Award size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs font-medium" style={{ color: '#64748b' }}>Pastga aylantiring</span>
          <ChevronDown size={20} style={{ color: '#475569' }} />
        </div>
      </div>
    </section>
  )
}
