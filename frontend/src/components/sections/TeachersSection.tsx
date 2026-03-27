import { Link } from 'react-router-dom'
import { ArrowRight, Star, GraduationCap } from 'lucide-react'
import type { Teacher } from '@/types'

const degreeLabels: Record<string, string> = {
  bachelor: 'Bakalavr',
  master: 'Magistr',
  phd: 'Fan nomzodi (PhD)',
  doctor: 'Fan doktori (DSc)',
  none: '',
}

function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <Link
      to={`/teachers/${teacher.uuid}`}
      className="group block rounded-2xl overflow-hidden card-hover bg-white shadow-md"
      style={{ border: '1px solid #e2e8f0' }}
    >
      {/* Image area */}
      <div className="relative h-60 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)' }}>
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

        {/* Degree badge */}
        {teacher.degree !== 'none' && (
          <div
            className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ background: 'rgba(245,158,11,0.9)' }}
          >
            {degreeLabels[teacher.degree]}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-bold text-base mb-1" style={{ color: '#0f172a' }}>{teacher.full_name}</h3>
        {teacher.position && (
          <p className="text-sm mb-3" style={{ color: '#3b82f6' }}>{teacher.position}</p>
        )}

        {/* Sciences */}
        {teacher.sciences.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {teacher.sciences.slice(0, 3).map((s) => (
              <span
                key={s.id}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: '#eff6ff', color: '#1d4ed8' }}
              >
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
          <span
            className="text-xs font-medium group-hover:text-blue-600 flex items-center gap-1 transition-colors"
            style={{ color: '#94a3b8' }}
          >
            Ko'proq <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function TeachersSection({ teachers }: { teachers: Teacher[] }) {
  if (!teachers.length) return null

  return (
    <section className="section-padding" style={{ background: 'white' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="section-title-wrapper">
          <span className="section-badge">Jamoamiz</span>
          <h2 className="text-4xl font-black" style={{ color: '#0f172a' }}>
            Tajribali <span className="text-gradient">O'qituvchilarimiz</span>
          </h2>
          <p className="mt-3 text-base max-w-lg text-center" style={{ color: '#64748b' }}>
            Har bir o'qituvchimiz o'z sohasining mutaxassisi va o'quvchilarning yaxshi natija ko'rishiga sadoqatli
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((t) => (
            <TeacherCard key={t.id} teacher={t} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            to="/teachers"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)' }}
          >
            Barcha o'qituvchilar
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
