import type { Statistic } from '@/types'
import { Users, GraduationCap, Award, BookOpen, Star, TrendingUp } from 'lucide-react'

const icons: Record<string, any> = {
  students: Users,
  teachers: BookOpen,
  graduates: GraduationCap,
  experience: Award,
  rating: Star,
  default: TrendingUp,
}

const colors = [
  'bg-blue-500',
  'bg-indigo-500',
  'bg-violet-500',
  'bg-orange-500',
  'bg-emerald-500',
]

export default function StatsSection({ statistics }: { statistics: Statistic[] }) {
  if (!statistics.length) return null

  return (
    <section className="relative py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {statistics.map((item, idx) => {
            const Icon = icons.default
            const color = colors[idx % colors.length]
            
            return (
              <div 
                key={item.id}
                className="group relative p-8 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
                
                <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white shadow-xl mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon size={28} />
                </div>
                
                <div className="space-y-1">
                  <div className="text-4xl font-black text-slate-900 tracking-tighter">
                    {item.value}
                    <span className="text-blue-600 ml-1">+</span>
                  </div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    {item.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
