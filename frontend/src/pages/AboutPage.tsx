import { useEffect, useState } from 'react'
import { getAbout } from '@/api/school'
import type { About } from '@/types'
import ContactSection from '@/components/sections/ContactSection'
import { CheckCircle2 } from 'lucide-react'

const highlights = [
  "Zamonaviy o'quv dasturlari",
  'Tajribali va malakali o\'qituvchilar',
  'Qulay va ilg\'or o\'quv muhiti',
  'Individual yondashuv',
  'Olimpiada va musobaqalarga tayyorlov',
  'Kuchli alumni jamoasi',
]

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAbout().then(setAbout).finally(() => setLoading(false))
  }, [])

  const photos = about
    ? [about.photo1, about.photo2, about.photo3].filter(Boolean) as string[]
    : []

  return (
    <div>
      {/* Page hero */}
      <div
        className="pt-32 pb-20 text-white"
        style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-5xl font-black mb-4">Biz haqimizda</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#93c5fd' }}>
            Elita School — ta'lim sohasidagi 15 yillik tajriba va minglab muvaffaqiyatli bitiruvchilar
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin" />
        </div>
      ) : (
        <section className="section-padding" style={{ background: '#f8fafc' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Photos */}
              <div className="space-y-4">
                {photos[0] && (
                  <img src={photos[0]} alt="Elita School" className="w-full h-80 object-cover rounded-2xl shadow-xl" />
                )}
                {photos.length > 1 && (
                  <div className="grid grid-cols-2 gap-4">
                    {photos.slice(1).map((p, i) => (
                      <img key={i} src={p} alt={`Elita School ${i + 2}`} className="w-full h-48 object-cover rounded-2xl shadow-lg" />
                    ))}
                  </div>
                )}
                {!photos.length && (
                  <div
                    className="w-full h-80 rounded-2xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)' }}
                  >
                    <span className="text-7xl">🏫</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <h2 className="text-3xl font-black mb-6" style={{ color: '#0f172a' }}>
                  Missiya va <span className="text-gradient">qadriyatlarimiz</span>
                </h2>
                {about?.content ? (
                  <div
                    className="prose max-w-none text-base leading-relaxed mb-8"
                    style={{ color: '#475569' }}
                    dangerouslySetInnerHTML={{ __html: about.content }}
                  />
                ) : (
                  <p className="text-base leading-relaxed mb-8" style={{ color: '#475569' }}>
                    Elita School 2009-yildan beri O'zbekiston yoshlarining zamonaviy ta'lim olishiga xizmat qilib kelmoqda.
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 size={18} style={{ color: '#3b82f6', flexShrink: 0 }} />
                      <span className="text-sm font-medium" style={{ color: '#334155' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <ContactSection />
    </div>
  )
}
