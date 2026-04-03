import { useEffect, useRef, useState } from 'react'
import { useStatistics } from '@/hooks/useSchool'

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start || target === 0) return
    const startTime = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration, start])

  return count
}

function StatCard({ label, value }: { label: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const count = useCountUp(value, 2200, visible)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const formatted = count >= 1000
    ? count.toLocaleString('uz-UZ')
    : count.toString()

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center rounded-2xl border border-[#274c8f]/10 bg-white px-8 py-10 shadow-sm transition-shadow hover:shadow-md"
    >
      <span className="mb-2 text-5xl font-extrabold tabular-nums text-[#274c8f] md:text-6xl">
        {formatted}
        <span className="text-3xl text-[#274c8f]/60">+</span>
      </span>
      <span className="text-center text-sm font-medium uppercase tracking-widest text-gray-500 md:text-base">
        {label}
      </span>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white px-8 py-10 shadow-sm">
      <div className="mb-3 h-14 w-32 animate-pulse rounded-lg bg-gray-100" />
      <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
    </div>
  )
}

export function StatisticsSection() {
  const { data, isLoading } = useStatistics()

  return (
    <section className="bg-gradient-to-b from-white to-[#f4f6fb] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : data?.map((stat) => (
                <StatCard key={stat.uuid} label={stat.label} value={stat.value} />
              ))}
        </div>
      </div>
    </section>
  )
}
