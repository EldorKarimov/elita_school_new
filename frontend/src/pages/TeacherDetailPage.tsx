import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTeacherDetail } from '@/api/school'
import type { TeacherDetail } from '@/types'
import { GraduationCap, Phone, Play, Clock } from 'lucide-react'
import { getYoutubeEmbedUrl } from '@/lib/utils'

const weekdayLabels: Record<string, string> = {
  mon: 'Dushanba', tue: 'Seshanba', wed: 'Chorshanba',
  thu: 'Payshanba', fri: 'Juma', sat: 'Shanba', sun: 'Yakshanba',
}

export default function TeacherDetailPage() {
  const { uuid } = useParams<{ uuid: string }>()
  const [teacher, setTeacher] = useState<TeacherDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (uuid) getTeacherDetail(uuid).then(setTeacher).finally(() => setLoading(false))
  }, [uuid])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin" />
      </div>
    )
  }

  if (!teacher) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 gap-4">
        <div className="text-6xl">😕</div>
        <h2 className="text-xl font-bold">O'qituvchi topilmadi</h2>
        <Link to="/teachers" className="px-5 py-2.5 rounded-xl font-semibold text-white" style={{ background: '#1e40af' }}>
          Orqaga
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <div
        className="pt-24 pb-0 text-white"
        style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-8 items-start pb-0 pt-8">
            {/* Photo */}
            <div
              className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden flex-shrink-0 shadow-2xl"
              style={{ border: '3px solid rgba(255,255,255,0.2)' }}
            >
              {teacher.image ? (
                <img src={teacher.image} alt={teacher.full_name} className="w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.3)' }}>
                  <GraduationCap size={60} className="text-white/50" />
                </div>
              )}
            </div>
            {/* Info */}
            <div className="flex-1 pb-10 pt-2">
              <h1 className="text-4xl font-black mb-2">{teacher.full_name}</h1>
              {teacher.position && <p className="text-lg mb-1" style={{ color: '#93c5fd' }}>{teacher.position}</p>}
              <p className="text-sm mb-4" style={{ color: '#64748b' }}>Tajriba: {teacher.experience}</p>
              {teacher.sciences.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {teacher.sciences.map((s) => (
                    <span key={s.id} className="text-sm px-3 py-1 rounded-full font-medium text-white" style={{ background: 'rgba(59,130,246,0.4)' }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              )}
              {teacher.phone && (
                <a
                  href={`tel:${teacher.phone}`}
                  className="inline-flex items-center gap-2 text-sm font-medium"
                  style={{ color: '#93c5fd' }}
                >
                  <Phone size={15} /> {teacher.phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="section-padding" style={{ background: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Bio */}
            <div className="lg:col-span-2">
              {teacher.about && (
                <div className="rounded-2xl bg-white p-8 shadow-md mb-8" style={{ border: '1px solid #e2e8f0' }}>
                  <h2 className="text-xl font-black mb-5" style={{ color: '#0f172a' }}>O'qituvchi haqida</h2>
                  <div
                    className="prose max-w-none text-sm leading-relaxed"
                    style={{ color: '#475569' }}
                    dangerouslySetInnerHTML={{ __html: teacher.about }}
                  />
                </div>
              )}

              {/* Lessons */}
              {teacher.lessons.length > 0 && (
                <div className="rounded-2xl bg-white p-8 shadow-md" style={{ border: '1px solid #e2e8f0' }}>
                  <h2 className="text-xl font-black mb-5" style={{ color: '#0f172a' }}>Dars namunalari</h2>
                  <div className="space-y-3">
                    {teacher.lessons.map((lesson) => (
                      <a
                        key={lesson.id}
                        href={lesson.youtube_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.01] group"
                        style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
                        >
                          <Play size={16} className="text-white ml-0.5" />
                        </div>
                        <span className="text-sm font-medium group-hover:text-blue-600 transition-colors" style={{ color: '#334155' }}>
                          {lesson.title}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Schedule sidebar */}
            {teacher.schedules.length > 0 && (
              <div>
                <div className="rounded-2xl bg-white p-6 shadow-md sticky top-24" style={{ border: '1px solid #e2e8f0' }}>
                  <h2 className="text-lg font-black mb-5 flex items-center gap-2" style={{ color: '#0f172a' }}>
                    <Clock size={18} style={{ color: '#3b82f6' }} />
                    Dars jadvali
                  </h2>
                  <div className="space-y-3">
                    {teacher.schedules.map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center justify-between p-3 rounded-xl"
                        style={{ background: '#eff6ff', border: '1px solid #dbeafe' }}
                      >
                        <span className="text-sm font-semibold" style={{ color: '#1e40af' }}>
                          {weekdayLabels[s.weekday]}
                        </span>
                        <span className="text-xs font-medium" style={{ color: '#3b82f6' }}>
                          {s.start_time.slice(0, 5)} – {s.end_time.slice(0, 5)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
