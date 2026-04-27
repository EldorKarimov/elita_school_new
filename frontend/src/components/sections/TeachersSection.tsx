import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTeachers } from '@/hooks/useSchool'
import { mediaUrl } from '@/lib/utils'
import type { TeacherDegree, Teacher } from '@/types'

const VISIBLE = 10
const GAP = 8 // px between cards

const DEGREE_LABELS: Record<TeacherDegree, string> = {
  bachelor: 'Bakalavr',
  master: 'Magistr',
  phd: 'PhD',
  doctor: 'Fan doktori',
  none: '',
}

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23e8eef7'/%3E%3Ccircle cx='200' cy='180' r='80' fill='%23274c8f' opacity='.18'/%3E%3Cellipse cx='200' cy='430' rx='130' ry='85' fill='%23274c8f' opacity='.12'/%3E%3C/svg%3E"

function imgSrc(path: string | null | undefined) {
  return path ? mediaUrl(path) : PLACEHOLDER
}

// --- Compact avatar card ---
function CarouselCard({
  teacher,
  isActive,
  onSelect,
}: {
  teacher: Teacher
  isActive: boolean
  onSelect: () => void
}) {
  return (
    <div
      className="group flex select-none flex-col items-center gap-1.5 py-2"
      onClick={onSelect}
      // drag-dan farqlash uchun pointer events qayta yoqiladi (parent dragging paytida off qiladi)
    >
      <div
        className={`relative overflow-hidden rounded-full border-2 transition-all duration-300 ${
          isActive
            ? 'h-20 w-20 border-[#274c8f] shadow-lg shadow-[#274c8f]/25 scale-110'
            : 'h-18 w-18 border-gray-200 grayscale group-hover:grayscale-0 group-hover:border-[#274c8f]/40 group-hover:scale-105'
        }`}
      >
        <img
          src={imgSrc(teacher.image)}
          alt={teacher.full_name}
          draggable={false}
          className="h-full w-full object-cover object-top"
          onError={e => {
            ;(e.currentTarget as HTMLImageElement).src = PLACEHOLDER
          }}
        />
        {isActive && (
          <div className="absolute inset-0 rounded-full ring-2 ring-[#274c8f] ring-offset-1" />
        )}
      </div>
      <span
        className={`line-clamp-1 w-full text-center text-[10px] font-semibold leading-tight transition-colors ${
          isActive ? 'text-[#274c8f]' : 'text-gray-400 group-hover:text-gray-700'
        }`}
      >
        {teacher.full_name.split(' ')[0]}
      </span>
      <div
        className={`h-1 w-1 rounded-full transition-all duration-200 ${
          isActive ? 'bg-[#274c8f]' : 'bg-transparent'
        }`}
      />
    </div>
  )
}

// --- Detail panel ---
function DetailPanel({ teacher }: { teacher: Teacher }) {
  const degree = DEGREE_LABELS[teacher.degree]
  const aboutText = teacher.about
    ? teacher.about
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    : ''

  return (
    <div
      key={teacher.uuid}
      className="detail-panel mt-8 flex flex-col gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#f0f4ff] to-[#e8f0fe] p-6 md:flex-row md:items-start md:gap-8 md:p-8"
    >
      <div className="relative mx-auto h-52 w-44 shrink-0 overflow-hidden rounded-xl shadow-md md:mx-0">
        <img
          src={imgSrc(teacher.image)}
          alt={teacher.full_name}
          className="h-full w-full object-cover object-top"
          onError={e => {
            ;(e.currentTarget as HTMLImageElement).src = PLACEHOLDER
          }}
        />
        {teacher.type === 'management' && (
          <span className="absolute left-2 top-2 rounded-full bg-[#274c8f] px-2 py-0.5 text-[10px] font-bold text-white">
            Rahbariyat
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#274c8f]/60">
          {teacher.position}
        </p>
        <h3 className="text-2xl font-extrabold text-gray-900 md:text-3xl">{teacher.full_name}</h3>

        <div className="mt-4 flex flex-wrap gap-2">
          {degree && (
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#274c8f] shadow-sm">
              🎓 {degree}
            </span>
          )}
          {teacher.experience && (
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm">
              ⏱ {teacher.experience}
            </span>
          )}
          {teacher.sciences.slice(0, 3).map(s => (
            <span
              key={s.uuid}
              className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm"
            >
              📚 {s.name}
            </span>
          ))}
        </div>

        {aboutText && (
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-gray-600">{aboutText}</p>
        )}

        <div className="mt-6">
          <Link
            to={`/teachers/${teacher.uuid}`}
            className="inline-flex items-center gap-2 rounded-lg bg-[#274c8f] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1a3465] hover:shadow-md active:scale-95"
          >
            Profilni ko'rish
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </div>
  )
}

// --- Skeleton ---
function Skeleton() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-10 flex flex-col items-center gap-3">
          <div className="h-4 w-40 animate-pulse rounded-full bg-gray-100" />
          <div className="h-9 w-80 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-56 animate-pulse rounded bg-gray-100" />
        </div>
        <div className="flex items-end gap-2 px-12">
          {Array.from({ length: VISIBLE }).map((_, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="h-12 w-12 animate-pulse rounded-full bg-gray-100" />
              <div className="h-2 w-10 animate-pulse rounded bg-gray-100" />
            </div>
          ))}
        </div>
        <div className="mt-8 h-52 animate-pulse rounded-2xl bg-gray-100" />
      </div>
    </section>
  )
}

// --- Main section ---
export function TeachersSection() {
  const { t } = useTranslation()
  const { data: teachersData, isLoading } = useTeachers({ pageSize: 15 })

  // carousel viewport: which index is the leftmost visible card
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeIdx, setActiveIdx] = useState(0)

  // card width measured from DOM
  const trackContainerRef = useRef<HTMLDivElement>(null)
  const [cardW, setCardW] = useState(0)

  // drag state via ref (no stale closures) + state only for re-renders
  const drag = useRef({ active: false, startX: 0, delta: 0, wasDrag: false })
  const [dragDelta, setDragDelta] = useState(0)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const el = trackContainerRef.current
    if (!el) return
    function measure() {
      setCardW((el!.clientWidth - GAP * (VISIBLE - 1)) / VISIBLE)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [isLoading]) // re-measure once teachers load (component mounts into DOM)

  if (isLoading) return <Skeleton />
  if (!teachersData?.data?.length) return null

  const sorted = [...teachersData.data].sort((a, b) => {
    if (a.type === 'management' && b.type !== 'management') return -1
    if (b.type === 'management' && a.type !== 'management') return 1
    return a.order - b.order
  })

  const maxIndex = Math.max(0, sorted.length - VISIBLE)
  const cardTotal = cardW + GAP // width of one card slot (card + gap)
  const current = sorted[activeIdx] ?? sorted[0]

  // --- Navigation ---
  function goTo(idx: number) {
    setCurrentIndex(Math.max(0, Math.min(idx, maxIndex)))
  }

  function selectCard(globalIdx: number) {
    if (drag.current.wasDrag) return // suppress click fired after drag
    setActiveIdx(globalIdx)
    // scroll viewport if selected card is outside visible window
    if (globalIdx < currentIndex) goTo(globalIdx)
    else if (globalIdx >= currentIndex + VISIBLE) goTo(globalIdx - VISIBLE + 1)
  }

  // --- Drag handlers ---
  function onDragStart(clientX: number) {
    drag.current = { active: true, startX: clientX, delta: 0, wasDrag: false }
    setDragging(true)
    setDragDelta(0)
  }

  function onDragMove(clientX: number) {
    if (!drag.current.active) return
    const delta = clientX - drag.current.startX
    drag.current.delta = delta
    setDragDelta(delta)
  }

  function onDragEnd() {
    if (!drag.current.active) return
    const { delta } = drag.current
    const threshold = Math.max(40, cardTotal / 3)
    drag.current.active = false
    drag.current.wasDrag = Math.abs(delta) > 6
    setDragging(false)
    setDragDelta(0)
    if (delta < -threshold) goTo(currentIndex + 1)
    else if (delta > threshold) goTo(currentIndex - 1)
    // clear wasDrag flag after click event fires
    setTimeout(() => { drag.current.wasDrag = false }, 50)
  }

  // clamp translate so it never overscrolls
  const rawTranslate = -(currentIndex * cardTotal) + dragDelta
  const minTranslate = -(maxIndex * cardTotal)
  const translateX = dragging
    ? Math.max(minTranslate, Math.min(0, rawTranslate))
    : -(currentIndex * cardTotal)

  const canPrev = currentIndex > 0
  const canNext = currentIndex < maxIndex

  // card flex-basis: pixel after measure, css-calc fallback before
  const cardFlex = cardW > 0
    ? `0 0 ${cardW}px`
    : `0 0 calc(${100 / VISIBLE}% - ${(GAP * (VISIBLE - 1)) / VISIBLE}px)`

  return (
    <section className="bg-white py-20">
      <style>{`
        .detail-panel { animation: dpFade 0.3s ease forwards; }
        @keyframes dpFade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="container mx-auto max-w-6xl px-4">

        {/* Header */}
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#274c8f]/8 px-4 py-1.5 text-sm font-semibold text-[#274c8f]">
            {t('teachers_section.label')}
          </span>
          <h2 className="mb-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
            {t('teachers_section.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-500">
            {t('teachers_section.subtitle')}
          </p>
        </div>

        {/* Carousel row */}
        <div className="flex items-center gap-2">

          {/* ← Prev */}
          <button
            onClick={() => goTo(currentIndex - 1)}
            disabled={!canPrev}
            aria-label="Oldingi"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 text-gray-400 transition-all hover:border-[#274c8f] hover:text-[#274c8f] disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ChevronLeftIcon />
          </button>

          {/* Track container — overflow clip */}
          <div className="flex-1 overflow-hidden" ref={trackContainerRef}>
            <div
              className="flex"
              style={{
                gap: `${GAP}px`,
                transform: `translateX(${translateX}px)`,
                transition: dragging ? 'none' : 'transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                willChange: 'transform',
                cursor: dragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                pointerEvents: 'auto',
              }}
              onMouseDown={e => { e.preventDefault(); onDragStart(e.clientX) }}
              onMouseMove={e => onDragMove(e.clientX)}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
              onTouchStart={e => onDragStart(e.touches[0].clientX)}
              onTouchMove={e => onDragMove(e.touches[0].clientX)}
              onTouchEnd={onDragEnd}
            >
              {sorted.map((teacher, i) => (
                <div key={teacher.uuid} style={{ flex: cardFlex }}>
                  <CarouselCard
                    teacher={teacher}
                    isActive={teacher.uuid === current.uuid}
                    onSelect={() => selectCard(i)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* → Next */}
          <button
            onClick={() => goTo(currentIndex + 1)}
            disabled={!canNext}
            aria-label="Keyingi"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 text-gray-400 transition-all hover:border-[#274c8f] hover:text-[#274c8f] disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ChevronRightIcon />
          </button>
        </div>

        {/* Detail panel */}
        <DetailPanel teacher={current} />

        {/* All teachers link */}
        <div className="mt-8 text-center">
          <Link
            to="/teachers"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#274c8f]/20 bg-white px-6 py-2.5 text-sm font-semibold text-[#274c8f] transition-all hover:border-[#274c8f] hover:bg-[#274c8f] hover:text-white"
          >
            {t('teachers_section.all_btn')}
            <ArrowIcon />
          </Link>
        </div>

      </div>
    </section>
  )
}

// --- Icons ---
function ChevronLeftIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}
function ChevronRightIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}
function ArrowIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}
