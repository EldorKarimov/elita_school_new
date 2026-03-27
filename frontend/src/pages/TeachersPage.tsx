import { useEffect, useState } from 'react'
import { getTeachers } from '@/api/school'
import type { Teacher } from '@/types'
import { Link } from 'react-router-dom'
import { GraduationCap, Star, ArrowRight } from 'lucide-react'

const degreeLabels: Record<string, string> = {
  bachelor: 'Bakalavr',
  master: 'Magistr',
  phd: 'Fan nomzodi (PhD)',
  doctor: 'Fan doktori (DSc)',
  none: '',
}

type FilterType = 'all' | 'management' | 'teacher'

export default function TeachersPage() {
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([])
  const [filter, setFilter] = useState<FilterType>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTeachers().then(setAllTeachers).finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'all'
    ? allTeachers
    : allTeachers.filter((t) => t.type === filter)

  const tabs: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'Barchasi' },
    { key: 'management', label: 'Rahbariyat' },
    { key: 'teacher', label: "O'qituvchilar" },
  ]

  return (
    <div>
      <div
        className="pt-32 pb-16 text-white"
        style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-5xl font-black mb-4">Jamoamiz</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#93c5fd' }}>
            Tajribali mutaxassislar va fidoyi o'qituvchilarimiz bilan tanishing
          </p>
          {/* Filter tabs */}
          <div className="flex justify-center gap-2 mt-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: filter === tab.key ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                  color: 'white',
                  boxShadow: filter === tab.key ? '0 4px 15px rgba(59,130,246,0.4)' : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section-padding" style={{ background: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-md">
                  <div className="skeleton h-60" />
                  <div className="p-5 space-y-3">
                    <div className="skeleton h-5 w-3/4" />
                    <div className="skeleton h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((teacher) => (
                <Link
                  key={teacher.id}
                  to={`/teachers/${teacher.uuid}`}
                  className="group block rounded-2xl overflow-hidden card-hover bg-white shadow-md"
                  style={{ border: '1px solid #e2e8f0' }}
                >
                  <div className="relative h-64 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)' }}>
                    {teacher.image ? (
                      <img
                        src={teacher.image}
                        alt={teacher.full_name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <GraduationCap size={60} className="text-blue-300 opacity-60" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {teacher.degree !== 'none' && (
                      <div
                        className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ background: 'rgba(245,158,11,0.9)' }}
                      >
                        {degreeLabels[teacher.degree]}
                      </div>
                    )}
                    <div
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ background: teacher.type === 'management' ? 'rgba(139,92,246,0.85)' : 'rgba(59,130,246,0.85)' }}
                    >
                      {teacher.type === 'management' ? 'Rahbariyat' : "O'qituvchi"}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-1" style={{ color: '#0f172a' }}>{teacher.full_name}</h3>
                    {teacher.position && (
                      <p className="text-sm mb-3" style={{ color: '#3b82f6' }}>{teacher.position}</p>
                    )}
                    {teacher.sciences.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {teacher.sciences.slice(0, 3).map((s) => (
                          <span key={s.id} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: '#eff6ff', color: '#1d4ed8' }}>
                            {s.name}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star size={13} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-medium" style={{ color: '#64748b' }}>{teacher.experience}</span>
                      </div>
                      <span className="text-xs font-medium group-hover:text-blue-600 flex items-center gap-1 transition-colors" style={{ color: '#94a3b8' }}>
                        Ko'proq <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
