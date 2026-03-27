import { Link } from 'react-router-dom'
import { ArrowRight, Star, GraduationCap, ShieldCheck, Award } from 'lucide-react'
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
      className="group block premium-card overflow-hidden"
    >
      {/* Image area */}
      <div className="relative h-72 overflow-hidden bg-slate-100">
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
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Degree badge */}
        {teacher.degree !== 'none' && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md shadow-lg border border-white/20 text-[10px] font-black text-blue-600 uppercase tracking-widest">
            {degreeLabels[teacher.degree]}
          </div>
        )}

        {/* Floating Award for high experience */}
        {parseInt(teacher.experience) >= 10 && (
          <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg animate-pulse scale-90">
             <Award size={20} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="mb-4">
           <h3 className="font-black text-xl text-slate-950 group-hover:text-blue-600 transition-colors mb-1">{teacher.full_name}</h3>
           {teacher.position && (
             <div className="flex items-center gap-2 text-blue-600">
                <ShieldCheck size={14} />
                <span className="text-xs font-bold uppercase tracking-widest">{teacher.position}</span>
             </div>
           )}
        </div>

        {/* Sciences */}
        {teacher.sciences.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {teacher.sciences.slice(0, 3).map((s) => (
              <span
                key={s.id}
                className="text-[10px] px-2.5 py-1 rounded-lg font-black bg-blue-50 text-blue-600 uppercase tracking-tighter"
              >
                {s.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full">
            <Star size={14} className="fill-orange-400 text-orange-400" />
            <span className="text-xs font-black text-slate-600">{teacher.experience} yil</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-blue-600 transition-colors">
            <span className="text-[10px] font-black uppercase tracking-widest">Profil</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function TeachersSection({ teachers }: { teachers: Teacher[] }) {
  if (!teachers.length) return null

  return (
    <section className="section-spacing bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-blue-50 blur-[100px] rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-50 blur-[100px] rounded-full -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="section-label">Bizning jamoa</div>
            <h2 className="text-4xl sm:text-6xl font-black text-slate-950 leading-[1.1] tracking-tighter">
              Tajribali va <br />
              <span className="text-blue-600">malakali o'qituvchilar</span>
            </h2>
          </div>
          <Link
            to="/teachers"
            className="hidden md:flex premium-button-primary px-10"
          >
            Barchasi
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {teachers.slice(0, 3).map((t) => (
            <TeacherCard key={t.id} teacher={t} />
          ))}
        </div>

        <div className="flex md:hidden justify-center mt-10">
          <Link
            to="/teachers"
            className="premium-button-primary w-full py-5"
          >
            Barcha o'qituvchilar
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
