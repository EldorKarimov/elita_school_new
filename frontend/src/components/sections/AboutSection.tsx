import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import type { About } from '@/types'

const highlights = [
  'Zamonaviy o'quv dasturlari',
  'Tajribali va malakali o'qituvchilar',
  'Qulay va ilg'or o'quv muhiti',
  'Individual yondashuv',
  'Olimpiada va musobaqalarga tayyorlov',
  'Kuchli alumni jamoasi',
]

export default function AboutSection({ about }: { about: About | null }) {
  const photos = about
    ? [about.photo1, about.photo2, about.photo3].filter(Boolean) as string[]
    : []

  return (
    <section className="section-padding" style={{ background: '#f8fafc' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: photos collage */}
          <div className="relative">
            {photos.length > 0 ? (
              <div className="relative">
                <img
                  src={photos[0]}
                  alt="Elita School"
                  className="w-full h-[420px] object-cover rounded-3xl shadow-2xl"
                />
                {photos[1] && (
                  <img
                    src={photos[1]}
                    alt="Elita School"
                    className="absolute -bottom-8 -right-8 w-52 h-52 object-cover rounded-2xl shadow-2xl border-4 border-white"
                  />
                )}
                {photos[2] && (
                  <img
                    src={photos[2]}
                    alt="Elita School"
                    className="absolute -top-6 -left-6 w-36 h-36 object-cover rounded-2xl shadow-xl border-4 border-white"
                  />
                )}
                {/* Experience badge */}
                <div
                  className="absolute top-8 right-8 rounded-2xl p-4 text-white text-center shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}
                >
                  <div className="text-3xl font-black leading-none">15+</div>
                  <div className="text-xs font-medium mt-1 opacity-80">Yil tajriba</div>
                </div>
              </div>
            ) : (
              /* Fallback illustration */
              <div
                className="w-full h-[420px] rounded-3xl flex items-center justify-center relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)' }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                  }}
                />
                <div className="text-center text-white">
                  <div className="text-8xl mb-4">🏫</div>
                  <div className="font-bold text-xl">Elita School</div>
                </div>
                <div
                  className="absolute top-4 right-4 rounded-2xl p-4 text-center shadow-xl"
                  style={{ background: 'rgba(245,158,11,0.9)' }}
                >
                  <div className="text-3xl font-black text-white leading-none">15+</div>
                  <div className="text-xs font-medium text-white/80 mt-1">Yil tajriba</div>
                </div>
              </div>
            )}
          </div>

          {/* Right: content */}
          <div>
            <div className="section-badge mb-4">
              <span>Biz haqimizda</span>
            </div>
            <h2 className="text-4xl font-black mb-5" style={{ color: '#0f172a' }}>
              Sifatli ta'lim —{' '}
              <span className="text-gradient">bizning missiyamiz</span>
            </h2>
            {about ? (
              <div
                className="prose prose-blue max-w-none mb-8 text-base leading-relaxed"
                style={{ color: '#475569' }}
                dangerouslySetInnerHTML={{ __html: about.content }}
              />
            ) : (
              <p className="text-base leading-relaxed mb-8" style={{ color: '#475569' }}>
                Elita School 2009-yildan beri O'zbekiston yoshlarining zamonaviy ta'lim olishiga xizmat qilib kelmoqda. Biz har bir o'quvchining individualligini hurmat qilgan holda ularga eng yaxshi bilimni berishga intilamiz.
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 size={18} style={{ color: '#3b82f6', flexShrink: 0 }} />
                  <span className="text-sm font-medium" style={{ color: '#334155' }}>{item}</span>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)', boxShadow: '0 10px 30px rgba(59,130,246,0.3)' }}
            >
              Batafsil o'qish
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
