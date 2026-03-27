import { useEffect, useRef, useState } from 'react'
import type { Statistic } from '@/types'
import { TrendingUp } from 'lucide-react'

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])

  return count
}

function StatCard({ stat, index, started }: { stat: Statistic; index: number; started: boolean }) {
  const count = useCountUp(stat.value, 2000, started)

  return (
    <div
      className="relative rounded-2xl p-7 text-white overflow-hidden card-hover"
      style={{
        background: 'linear-gradient(135deg, #1e293b, #0f172a)',
        border: '1px solid rgba(59,130,246,0.15)',
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl"
        style={{ background: 'rgba(59,130,246,0.08)', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-20 h-20 rounded-full blur-xl"
        style={{ background: 'rgba(245,158,11,0.05)', transform: 'translate(-30%, 30%)' }}
      />

      <div className="relative z-10">
        <div
          className="inline-flex p-2.5 rounded-xl mb-4"
          style={{ background: 'rgba(59,130,246,0.15)' }}
        >
          <TrendingUp size={20} style={{ color: '#60a5fa' }} />
        </div>

        <div
          className="text-5xl font-black mb-2"
          style={{
            background: 'linear-gradient(to right, #ffffff, #93c5fd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {count.toLocaleString()}+
        </div>

        <div className="text-sm font-medium" style={{ color: '#94a3b8' }}>
          {stat.label}
        </div>

        {/* Progress bar */}
        <div
          className="mt-4 h-1 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.1)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
              width: started ? '100%' : '0%',
              transitionDelay: `${index * 0.2 + 0.5}s`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default function StatsSection({ statistics }: { statistics: Statistic[] }) {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  if (!statistics.length) return null

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{ background: 'linear-gradient(180deg, #0f172a 0%, #111827 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section title */}
        <div className="section-title-wrapper">
          <span className="section-badge" style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.25)' }}>
            Raqamlarda
          </span>
          <h2 className="text-4xl font-black text-white text-center">
            Bizning natijalarimiz
          </h2>
          <p className="text-center mt-3 max-w-md" style={{ color: '#64748b' }}>
            Yillar davomida to'plangan tajriba va erishilgan yutuqlar
          </p>
        </div>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          style={{ gridTemplateColumns: statistics.length === 3 ? 'repeat(3, 1fr)' : undefined }}
        >
          {statistics.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} started={started} />
          ))}
        </div>
      </div>
    </section>
  )
}
