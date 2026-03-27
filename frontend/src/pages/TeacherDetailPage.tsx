import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTeacherDetail } from '@/api/school'
import type { TeacherDetail } from '@/types'
import { GraduationCap, Phone, Play, Clock, ShieldCheck, Award, ArrowLeft, Star } from 'lucide-react'

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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!teacher) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
        <div className="text-8xl mb-8">😕</div>
        <h2 className="text-3xl font-black text-slate-950 mb-4 tracking-tighter">O'qituvchi topilmadi</h2>
        <p className="text-slate-500 font-medium mb-10 max-w-xs">Siz qidirayotgan o'qituvchi o'chirilgan yoki manzili o'zgargan bo'lishi mumkin.</p>
        <Link to="/teachers" className="premium-button-primary px-10">
          Ro'yxatga qaytish
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <section className="relative pt-40 pb-20 bg-ui-darker overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px] rounded-full translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Link to="/teachers" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group font-black uppercase tracking-widest text-[10px]">
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
             Ortga qaytish
          </Link>

          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
            {/* Photo */}
            <div className="relative group flex-shrink-0">
               <div className="absolute inset-0 bg-blue-600/20 blur-[30px] rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-[40px] overflow-hidden border-8 border-white/5 bg-slate-900 shadow-3xl">
                {teacher.image ? (
                  <img src={teacher.image} alt={teacher.full_name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <GraduationCap size={80} className="text-white/20" />
                  </div>
                )}
               </div>
               
               {parseInt(teacher.experience) >= 10 && (
                 <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-[22px] bg-orange-500 flex items-center justify-center text-white shadow-2xl animate-float">
                    <Award size={32} />
                 </div>
               )}
            </div>

            {/* Info */}
            <div className="flex-1 pt-4">
              <div className="section-label bg-white/5 text-blue-400 border-white/10 mb-6 mx-auto md:mx-0">O'qituvchi profili</div>
              <h1 className="text-4xl sm:text-6xl font-black text-white leading-[1.1] tracking-tighter mb-6">{teacher.full_name}</h1>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
                 <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-slate-300 border border-white/5">
                    <ShieldCheck size={16} className="text-blue-500" />
                    <span className="text-xs font-black uppercase tracking-widest">{teacher.position || "O'qituvchi"}</span>
                 </div>
                 <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-slate-300 border border-white/5">
                    <Star size={16} className="text-orange-400 fill-orange-400" />
                    <span className="text-xs font-black uppercase tracking-widest">{teacher.experience} yil tajriba</span>
                 </div>
                 {teacher.phone && (
                    <a href={`tel:${teacher.phone}`} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-slate-300 border border-white/5 hover:bg-blue-600 hover:text-white transition-all">
                       <Phone size={16} />
                       <span className="text-xs font-black uppercase tracking-widest">{teacher.phone}</span>
                    </a>
                 )}
              </div>

              {teacher.sciences.length > 0 && (
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {teacher.sciences.map((s) => (
                    <span key={s.id} className="text-[10px] px-4 py-2 rounded-xl font-black text-white bg-blue-600/20 border border-blue-500/20 uppercase tracking-tighter">
                      {s.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Bio & Lessons */}
            <div className="lg:col-span-8 space-y-12">
              {teacher.about && (
                <div className="p-10 rounded-[40px] bg-white border border-slate-100 shadow-3xl shadow-slate-200/50">
                  <h2 className="text-2xl font-black text-slate-950 mb-8 flex items-center gap-3">
                     <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                     O'qituvchi haqida
                  </h2>
                  <div
                    className="prose prose-lg max-w-none text-slate-600 font-medium leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: teacher.about }}
                  />
                </div>
              )}

              {/* Lessons Gallery */}
              {teacher.lessons.length > 0 && (
                <div className="p-10 rounded-[40px] bg-slate-900 text-white shadow-3xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-20 blur-[60px] rounded-full" />
                  
                  <h2 className="text-2xl font-black mb-10 flex items-center gap-3 relative z-10">
                     <div className="w-1.5 h-8 bg-blue-50 rounded-full" />
                     Dars namunalari (Video)
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                    {teacher.lessons.map((lesson) => (
                      <div key={lesson.id} className="group">
                         <a
                          href={lesson.youtube_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block relative aspect-video rounded-3xl overflow-hidden bg-slate-800 mb-4 border border-white/5"
                        >
                          {/* Placeholder/Thumbnail logic could go here, for now using styled div */}
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-800 transition-colors group-hover:bg-slate-700">
                             <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 transition-transform">
                                <Play size={28} className="ml-1" fill="currentColor" />
                             </div>
                          </div>
                          
                          {/* Youtube Title Overlay */}
                          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                             <div className="flex items-center gap-2 text-[10px] font-black uppercase text-white/70">
                                <span>Ma'ruza videosi</span>
                             </div>
                          </div>
                        </a>
                        <h4 className="font-black text-lg text-white group-hover:text-blue-400 transition-colors">{lesson.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar: Schedule */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="p-8 rounded-[40px] bg-blue-50 border border-blue-100 shadow-2xl shadow-blue-900/5">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                      <Clock size={24} />
                   </div>
                   <div>
                      <h2 className="text-xl font-black text-slate-950 tracking-tight">Dars jadvali</h2>
                      <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">Haftalik reja</div>
                   </div>
                </div>

                {teacher.schedules.length > 0 ? (
                  <div className="space-y-4">
                    {teacher.schedules.map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center justify-between p-5 rounded-2xl bg-white border border-blue-100/50 hover:bg-blue-600 hover:border-blue-600 group transition-all duration-300"
                      >
                        <span className="font-black text-slate-900 group-hover:text-white transition-colors">
                          {weekdayLabels[s.weekday]}
                        </span>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs group-hover:bg-white/20 group-hover:text-white transition-colors">
                          {s.start_time.slice(0, 5)} – {s.end_time.slice(0, 5)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                     <p className="text-slate-500 font-medium italic">Hozircha jadval kiritilmagan.</p>
                  </div>
                )}
                
                <div className="mt-8 pt-8 border-t border-blue-100 flex items-center justify-center gap-2 text-blue-400">
                   <ShieldCheck size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Rasmiy dars soatlari</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
