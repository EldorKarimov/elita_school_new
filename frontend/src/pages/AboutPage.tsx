import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAbout, useStatistics, useTeachers } from '@/hooks/useSchool'
import { mediaUrl } from '@/lib/utils'

// --- Animated counter ---
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start || target === 0) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

function StatCard({ label, value }: { label: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const count = useCountUp(value, 1800, visible)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 rounded-2xl bg-white/10 px-6 py-8 text-center backdrop-blur-sm border border-white/10">
      <span className="text-4xl font-extrabold text-white md:text-5xl">{count.toLocaleString()}+</span>
      <span className="text-sm font-medium text-white/70 leading-tight max-w-[120px]">{label}</span>
    </div>
  )
}

// --- Book page data type ---
type BookPageData = {
  label: string
  title: string
  body: string
  accent: string
}

// --- Single page face ---
function BookPage({ data, align }: { data: BookPageData; align: 'left' | 'right' }) {
  return (
    <div className={`flex flex-col justify-center h-full p-8 ${align === 'right' ? 'border-l-4' : 'border-r-4'}`}
      style={{ borderColor: data.accent + '22' }}>
      <span className="text-[10px] font-bold uppercase tracking-widest mb-4"
        style={{ color: data.accent }}>
        {data.label}
      </span>
      <h3 className="text-xl font-extrabold text-gray-900 mb-4 leading-snug">{data.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{data.body}</p>
      <div className="mt-6 w-10 h-0.5 rounded-full" style={{ backgroundColor: data.accent + '40' }} />
    </div>
  )
}

// --- Book hero ---
function BookHero() {
  const { t } = useTranslation()
  // 'closed' → 'opening' (muqova ochiladi) → 'open' (to'liq ochiq)
  const [phase, setPhase] = useState<'closed' | 'opening' | 'open'>('closed')
  const [bookTiltY, setBookTiltY] = useState(-28)
  const [bookTiltX, setBookTiltX] = useState(6)
  const [coverAngle, setCoverAngle] = useState(0)
  const [flipped, setFlipped] = useState(0)

  function handleOpen() {
    if (phase !== 'closed') return
    setPhase('opening')
    // 1-qadam: kitob to'g'rilanadi (0–450ms)
    setBookTiltY(0)
    setBookTiltX(0)
    // 2-qadam: muqova ochiladi (450–1350ms)
    setTimeout(() => setCoverAngle(-158), 450)
    // 3-qadam: ochiq ko'rinishga o'tish (1400ms)
    setTimeout(() => setPhase('open'), 1400)
  }

  const LEAVES: { front: BookPageData; back: BookPageData }[] = [
    {
      front: {
        label: t('about_page.label', { defaultValue: 'Maktab haqida' }),
        title: t('about_page.hero_title', { defaultValue: 'Elita Akademik Maktabi' }),
        body: t('about_page.hero_subtitle', { defaultValue: "Ilm va tarbiyaning mukammal uyg'unligi. Zamonaviy ta'lim muhiti va tajribali o'qituvchilar jamoasi." }),
        accent: '#274c8f',
      },
      back: {
        label: t('about_page.history_label', { defaultValue: 'Tariximiz' }),
        title: t('about_page.history_title', { defaultValue: "Bizning yo'limiz" }),
        body: "Maktabimiz O'zbekistonda zamonaviy ta'limning peshqadami sifatida tanilgan. Yillar davomida yuzlab o'quvchilarni hayotga tayyorladik.",
        accent: '#1a5276',
      },
    },
    {
      front: {
        label: t('about_page.values_label', { defaultValue: 'Qadriyatlar' }),
        title: t('about_page.values_title', { defaultValue: 'Bizning tamoyillarimiz' }),
        body: t('about_page.values_subtitle', { defaultValue: "Sifat, innovatsiya, mas'uliyat va hamkorlik — o'quvchilarimiz kelajagi uchun asosiy qadriyatlarimiz." }),
        accent: '#1a7a5e',
      },
      back: {
        label: t('about_page.management_label', { defaultValue: 'Rahbariyat' }),
        title: t('about_page.management_title', { defaultValue: 'Tajribali jamoamiz' }),
        body: t('about_page.management_subtitle', { defaultValue: "Har bir rahbarimiz o'z sohasida yillik tajribaga ega mutaxassis. Birgalikda yaxshiroq ta'lim quramiz." }),
        accent: '#7c3aed',
      },
    },
  ]

  const total = LEAVES.length
  const canNext = flipped < total
  const canPrev = flipped > 0

  return (
    <div
      className="relative overflow-hidden py-16 md:py-20"
      style={{ background: 'linear-gradient(135deg, #0f2557 0%, #1a3a7c 50%, #0e4d6e 100%)' }}
    >
      {/* Bg pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#274c8f]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#0e7490]/30 blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">

        {/* Breadcrumb */}
        <div className="mb-10 flex items-center justify-center gap-2 text-xs text-white/40">
          <Link to="/" className="hover:text-white/70 transition-colors">{t('common.home')}</Link>
          <span>/</span>
          <span className="text-white/70">{t('about_page.label')}</span>
        </div>

        {/* ── DESKTOP: 3D Book ── */}
        <div className="hidden md:flex flex-col items-center">

          {phase !== 'open' ? (
            /* Closed + Opening animatsiya */
            <div className="flex flex-col items-center">
              <div style={{ perspective: '1200px' }}>
                <div
                  onClick={handleOpen}
                  className={phase === 'closed' ? 'cursor-pointer select-none' : ''}
                  style={{
                    width: 220, height: 300,
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${bookTiltY}deg) rotateX(${bookTiltX}deg)`,
                    transition: 'transform 0.45s ease',
                    filter: phase === 'closed'
                      ? 'drop-shadow(8px 12px 30px rgba(0,0,0,0.55))'
                      : 'drop-shadow(4px 8px 20px rgba(0,0,0,0.4))',
                  }}
                >
                  {/* Orqa muqova */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: '#0d1f45',
                    borderRadius: '2px 6px 6px 2px',
                    transform: 'translateZ(-2px)',
                  }} />

                  {/* Muqova ostidagi sahifa (ochilayotganda ko'rinadi) */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: '#f8f9ff',
                    borderRadius: '0 6px 6px 0',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    padding: 24, textAlign: 'center',
                  }}>
                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#274c8f88', marginBottom: 8 }}>
                      {LEAVES[0].front.label}
                    </p>
                    <p style={{ fontSize: 15, fontWeight: 800, color: '#1a2e5a', lineHeight: 1.3 }}>
                      {LEAVES[0].front.title}
                    </p>
                  </div>

                  {/* Ustun (spine) */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: 28, height: '100%',
                    background: 'linear-gradient(to right, #060e28, #0f2050)',
                    transformOrigin: 'right center',
                    transform: 'rotateY(-90deg)',
                  }} />

                  {/* Sahifalar qirrasi */}
                  <div style={{
                    position: 'absolute', top: 6, right: 0,
                    width: 18, height: 'calc(100% - 12px)',
                    background: 'repeating-linear-gradient(to bottom, #f0f0f0 0px, #f0f0f0 3px, #d8d8d8 3px, #d8d8d8 4px)',
                    transformOrigin: 'left center',
                    transform: 'rotateY(90deg)',
                  }} />

                  {/* MUQOVA — chapga aylanib ochiladi */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    transformOrigin: 'left center',
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${coverAngle}deg)`,
                    transition: coverAngle !== 0
                      ? 'transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1.000)'
                      : 'none',
                  }}>
                    {/* Muqova old tomoni */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(145deg, #1e3d7e 0%, #274c8f 60%, #3a5fa5 100%)',
                      borderRadius: '2px 6px 6px 2px',
                      borderLeft: '10px solid #0f2050',
                      backfaceVisibility: 'hidden',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      padding: '24px', textAlign: 'center',
                      overflow: 'hidden',
                    }}>
                      <div style={{ position: 'absolute', inset: 10, border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4 }} />
                      <div style={{ position: 'absolute', inset: 14, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }} />
                      <span style={{ fontSize: 52, marginBottom: 16 }}>📚</span>
                      <p style={{ color: '#fff', fontWeight: 800, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.3 }}>
                        Elita Akademik Maktabi
                      </p>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, marginTop: 10 }}>
                        {t('about_page.label')}
                      </p>
                    </div>

                    {/* Muqova ichki tomoni (ochilganda ko'rinadi) */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to right, #ede8d8, #f5f0e4)',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      borderRadius: '6px 2px 2px 6px',
                    }} />
                  </div>
                </div>

                {/* Soya */}
                <div className="mx-auto mt-3 h-3 w-36 rounded-full bg-black/40 blur-md" />
              </div>

              {/* Hint */}
              <div className="mt-8 flex flex-col items-center gap-2 transition-opacity duration-300"
                style={{ opacity: phase === 'closed' ? 1 : 0 }}>
                <div className="animate-bounce text-white/40">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                  </svg>
                </div>
                <p className="text-sm text-white/50">Maktab haqida bilish uchun kitobni bosing</p>
              </div>
            </div>

          ) : (
            /* Opened book */
            <div className="flex flex-col items-center">
              <div style={{ perspective: '2000px' }}>
                <div style={{ position: 'relative', width: 700, height: 430 }}>

                  {/* Left cover / already-read pages */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: 350, height: 430,
                    background: '#f7f9ff',
                    borderRadius: '10px 0 0 10px',
                    boxShadow: '-6px 6px 30px rgba(0,0,0,0.25)',
                    overflow: 'hidden',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {flipped === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <span className="text-6xl mb-4">📚</span>
                        <p className="font-extrabold text-[#274c8f] text-lg">Elita Akademik Maktabi</p>
                        <p className="text-gray-400 text-xs mt-2">{t('about_page.label')}</p>
                        <div className="mt-5 w-10 h-0.5 bg-[#274c8f]/20 rounded-full" />
                        <p className="mt-4 text-xs text-gray-300 italic">O'ngdagi sahifani o'qing →</p>
                      </div>
                    ) : (
                      <BookPage data={LEAVES[flipped - 1].back} align="left" />
                    )}
                    <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] text-gray-200">
                      {flipped * 2}
                    </div>
                  </div>

                  {/* Right base page */}
                  <div style={{
                    position: 'absolute', top: 0, right: 0,
                    width: 350, height: 430,
                    background: '#f7f9ff',
                    borderRadius: '0 10px 10px 0',
                    boxShadow: '6px 6px 30px rgba(0,0,0,0.25)',
                    overflow: 'hidden',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {flipped < total ? (
                      <BookPage data={LEAVES[flipped].front} align="right" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <span className="text-5xl mb-4">✅</span>
                        <p className="font-bold text-[#274c8f] text-base">Hammasi o'qildi!</p>
                        <p className="text-gray-400 text-sm mt-2 max-w-[220px]">Quyida to'liq ma'lumot va rasmlar mavjud</p>
                        <button
                          onClick={() => document.getElementById('about-content')?.scrollIntoView({ behavior: 'smooth' })}
                          className="mt-5 rounded-xl bg-[#274c8f] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1a3465] transition-colors"
                        >
                          Davom etish ↓
                        </button>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] text-gray-200">
                      {flipped * 2 + 1}
                    </div>
                  </div>

                  {/* Page leaves (flip animation) */}
                  {LEAVES.map((leaf, i) => (
                    <div
                      key={i}
                      style={{
                        position: 'absolute', top: 0, right: 0,
                        width: 350, height: 430,
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'left center',
                        transform: i < flipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                        transition: 'transform 0.75s cubic-bezier(0.645, 0.045, 0.355, 1)',
                        zIndex: i < flipped ? i + 1 : total - i + 10,
                        cursor: i === flipped ? 'pointer' : 'default',
                      }}
                      onClick={() => i === flipped && canNext && setFlipped(f => f + 1)}
                    >
                      {/* Front face */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: '#f7f9ff',
                        backfaceVisibility: 'hidden',
                        borderRadius: '0 10px 10px 0',
                        overflow: 'hidden',
                        boxShadow: i === flipped ? '4px 0 20px rgba(0,0,0,0.12)' : 'none',
                      }}>
                        <BookPage data={leaf.front} align="right" />
                        {i === flipped && (
                          <div className="absolute bottom-4 right-4 flex items-center gap-1 text-[10px] text-gray-300">
                            <span>keyingisi</span>
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] text-gray-200">
                          {i * 2 + 1}
                        </div>
                      </div>

                      {/* Back face */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: '#f0f4ff',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        borderRadius: '10px 0 0 10px',
                        overflow: 'hidden',
                      }}>
                        <BookPage data={leaf.back} align="left" />
                        <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] text-gray-200">
                          {i * 2 + 2}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Spine shadow */}
                  <div style={{
                    position: 'absolute', top: 0,
                    left: '50%', transform: 'translateX(-50%)',
                    width: 16, height: '100%',
                    background: 'linear-gradient(to right, rgba(0,0,0,0.12), transparent, rgba(0,0,0,0.12))',
                    pointerEvents: 'none',
                  }} />
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-7 flex items-center gap-5">
                <button
                  onClick={() => canPrev && setFlipped(f => f - 1)}
                  disabled={!canPrev}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition-all hover:bg-white/20 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex items-center gap-2">
                  {LEAVES.map((_, i) => (
                    <div key={i}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i < flipped ? 16 : 6,
                        height: 6,
                        background: i < flipped ? '#fff' : 'rgba(255,255,255,0.25)',
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={() => canNext && setFlipped(f => f + 1)}
                  disabled={!canNext}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition-all hover:bg-white/20 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── MOBILE: simple header ── */}
        <div className="md:hidden text-center">
          <span className="mb-3 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white/80">
            {t('about_page.label')}
          </span>
          <h1 className="text-3xl font-extrabold text-white">{t('about_page.hero_title')}</h1>
          <p className="mt-3 text-base text-white/60 max-w-sm mx-auto">{t('about_page.hero_subtitle')}</p>
        </div>
      </div>
    </div>
  )
}

// --- Values icons ---
const VALUE_ICONS = [
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25" />
  </svg>,
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>,
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>,
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>,
]

export default function AboutPage() {
  const { t } = useTranslation()
  const { data: about, isLoading: aboutLoading } = useAbout()
  const { data: stats = [], isLoading: statsLoading } = useStatistics()
  const { data: management = [], isLoading: mgmtLoading } = useTeachers('management')
  const VALUES = [1, 2, 3, 4].map((n, i) => ({
    icon: VALUE_ICONS[i],
    title: t(`about_page.value${n}_title`),
    desc: t(`about_page.value${n}_desc`),
  }))

  return (
    <div className="min-h-screen bg-[#f8faff]">

      {/* Book hero */}
      <BookHero />

      {/* Wave */}
      <div className="-mt-1 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="block h-10 w-full" fill="#f8faff">
          <path d="M0,0 C480,40 960,0 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>

      {/* About content + photos */}
      <section id="about-content" className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <span className="mb-3 inline-block rounded-full bg-[#274c8f]/10 px-4 py-1.5 text-sm font-semibold text-[#274c8f]">
              {t('about_page.history_label')}
            </span>
            <h2 className="mb-5 text-2xl font-extrabold text-gray-900 md:text-3xl leading-snug">
              {t('about_page.history_title')}
            </h2>
            {aboutLoading ? (
              <div className="space-y-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`h-4 animate-pulse rounded bg-gray-200 ${i === 4 ? 'w-2/3' : 'w-full'}`} />
                ))}
              </div>
            ) : about?.content ? (
              <div className="ck-content" dangerouslySetInnerHTML={{ __html: about.content }} />
            ) : (
              <p className="text-gray-500 text-sm">{t('about_page.no_content')}</p>
            )}
          </div>

          {aboutLoading ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 h-52 animate-pulse rounded-2xl bg-gray-200" />
              <div className="h-36 animate-pulse rounded-2xl bg-gray-200" />
              <div className="h-36 animate-pulse rounded-2xl bg-gray-200" />
            </div>
          ) : about ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 overflow-hidden rounded-2xl shadow-md">
                <img src={mediaUrl(about.photo1)} alt="Maktab haqida" className="h-56 w-full object-cover" />
              </div>
              {about.photo2 && (
                <div className="overflow-hidden rounded-2xl shadow-sm">
                  <img src={mediaUrl(about.photo2)} alt="Maktab haqida 2" className="h-36 w-full object-cover" />
                </div>
              )}
              {about.photo3 && (
                <div className="overflow-hidden rounded-2xl shadow-sm">
                  <img src={mediaUrl(about.photo3)} alt="Maktab haqida 3" className="h-36 w-full object-cover" />
                </div>
              )}
            </div>
          ) : null}
        </div>
      </section>

      {/* Statistics */}
      {(statsLoading || stats.length > 0) && (
        <section className="bg-[#274c8f] py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-extrabold text-white md:text-3xl">{t('about_page.stats_title')}</h2>
              <p className="mt-2 text-sm text-white/50">{t('about_page.stats_subtitle')}</p>
            </div>
            {statsLoading ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[1,2,3,4].map(i => <div key={i} className="h-32 animate-pulse rounded-2xl bg-white/10" />)}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {stats.map(s => <StatCard key={s.uuid} label={s.label} value={s.value} />)}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Values */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#274c8f]/10 px-4 py-1.5 text-sm font-semibold text-[#274c8f]">
            {t('about_page.values_label')}
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">{t('about_page.values_title')}</h2>
          <p className="mt-2 text-sm text-gray-500">{t('about_page.values_subtitle')}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <div key={i} className="group flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#274c8f]/8 text-[#274c8f] group-hover:bg-[#274c8f] group-hover:text-white transition-all">
                {v.icon}
              </div>
              <div>
                <h3 className="mb-2 text-base font-bold text-gray-900">{v.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Management */}
      {(mgmtLoading || management.length > 0) && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <span className="mb-3 inline-block rounded-full bg-[#274c8f]/10 px-4 py-1.5 text-sm font-semibold text-[#274c8f]">
                {t('about_page.management_label')}
              </span>
              <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">{t('about_page.management_title')}</h2>
              <p className="mt-2 text-sm text-gray-500">{t('about_page.management_subtitle')}</p>
            </div>

            {mgmtLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                    <div className="animate-pulse bg-gray-200" style={{ paddingBottom: '100%' }} />
                    <div className="p-4 space-y-2">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                      <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {management.map(person => (
                  <Link key={person.uuid} to={`/teachers/${person.uuid}`}
                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                    <div className="relative overflow-hidden" style={{ paddingBottom: '100%' }}>
                      <img src={mediaUrl(person.image)} alt={person.full_name}
                        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#274c8f]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4">
                      <p className="font-bold text-gray-900 text-sm leading-snug group-hover:text-[#274c8f] transition-colors">{person.full_name}</p>
                      {person.position && <p className="mt-0.5 text-xs text-gray-500">{person.position}</p>}
                      {person.experience && (
                        <span className="mt-2 inline-block rounded-full bg-[#274c8f]/8 px-2.5 py-0.5 text-[10px] font-semibold text-[#274c8f]">
                          {person.experience}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-8 text-center">
              <Link to="/teachers"
                className="inline-flex items-center gap-2 rounded-xl bg-[#274c8f] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1e3a6e]">
                {t('about_page.all_teachers_btn')}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#274c8f] py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -left-20 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">{t('about_page.cta_title')}</h2>
          <p className="mt-3 text-sm text-white/60 max-w-md mx-auto">{t('about_page.cta_subtitle')}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact"
              className="rounded-xl bg-white px-7 py-3 text-sm font-bold text-[#274c8f] shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
              {t('about_page.cta_contact')}
            </Link>
            <Link to="/teachers"
              className="rounded-xl border border-white/30 px-7 py-3 text-sm font-bold text-white transition-all hover:bg-white/10">
              {t('about_page.cta_teachers')}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
