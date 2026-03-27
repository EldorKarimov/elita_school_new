import { useEffect, useState } from 'react'
import { getTeachers } from '@/api/school'
import type { Teacher } from '@/types'
import { Link } from 'react-router-dom'
import { GraduationCap, Star, ArrowRight, ShieldCheck, Award } from 'lucide-react'

const degreeLabels: Record<string, string> = {
  bachelor: 'Bakalavr',
  master: 'Magistr',
  phd: 'Fan nomzodi (PhD)',
  doctor: 'Fan doktori (DSc)',
  none: '',
}

type FilterType = 'all' | 'management' | 'teacher'

function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <Link
      to={`/teachers/${teacher.uuid}`}
      className="group block premium-card overflow-hidden bg-white"
    >
      <div className="relative h-80 overflow-hidden bg-slate-100">
        {teacher.image ? (
          <img
            src={teacher.image}
            alt={teacher.full_name}
            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600/20 to-indigo-600/20">
            <GraduationCap size={64} className="text-blue-500 opacity-40 group-hover:scale-110 transition-transform duration-700" />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
           <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black text-white uppercase tracking-widest shadow-lg ${teacher.type === 'management' ? 'bg-indigo-600' : 'bg-blue-600'}`}>
              {teacher.type === 'management' ? 'Rahbariyat' : "O'qituvchi"}
           </div>
           {teacher.degree !== 'none' && (
              <div className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md shadow-lg border border-white/20 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                {degreeLabels[teacher.degree]}
              </div>
           )}
        </div>

        {parseInt(teacher.experience) >= 10 && (
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg animate-pulse">
             <Award size={20} />
          </div>
        )}
      </div>

      <div className="p-8">
        <div className="mb-6">
           <h3 className="font-black text-2xl text-slate-950 group-hover:text-blue-600 transition-colors mb-2 leading-tight">{teacher.full_name}</h3>
           {teacher.position && (
             <div className="flex items-center gap-2 text-blue-600">
                <ShieldCheck size={16} />
                <span className="text-xs font-black uppercase tracking-widest">{teacher.position}</span>
             </div>
           )}
        </div>

        {teacher.sciences.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {teacher.sciences.map((s) => (
              <span
                key={s.id}
                className="text-[10px] px-3 py-1.5 rounded-xl font-black bg-slate-50 text-slate-600 uppercase tracking-tighter border border-slate-100"
              >
                {s.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
          <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl">
            <Star size={16} className="fill-orange-400 text-orange-400" />
            <span className="text-sm font-black text-slate-700">{teacher.experience} yil tajriba</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 group-hover:text-blue-600 transition-colors">
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Profil</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}

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
    { key: 'all', label: 'Barcha jamoa' },
    { key: 'management', label: 'Rahbariyat' },
    { key: 'teacher', label: "O'qituvchilar" },
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-ui-darker overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_var(--color-brand-600)_0%,_transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="section-label bg-white/5 text-blue-400 border-white/10 mx-auto mb-8">Mutaxassislarimiz</div>
          <h1 className="text-5xl sm:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-8">
            Bizning <span className="text-gradient">professional</span> jamoa
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-12">
            Elita School-ning har bir a'zosi o'z sohasining ustasi va bolalar kelajagi uchun qayg'uruvchi fidoyilardir.
          </p>

          {/* Premium Tabs */}
          <div className="inline-flex p-2 rounded-[28px] bg-white/5 border border-white/10 backdrop-blur-xl">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-8 py-4 rounded-[22px] text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                  filter === tab.key 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-[40px] overflow-hidden bg-slate-50 h-[500px] animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {filtered.map((teacher) => (
                    <TeacherCard key={teacher.id} teacher={teacher} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                   <div className="text-6xl mb-6">🔍</div>
                   <h3 className="text-2xl font-black text-slate-950 mb-2">Hech nima topilmadi</h3>
                   <p className="text-slate-500 font-medium">Boshqa filterlardan foydalanib ko'ring.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
