import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTeachers } from '@/hooks/useSchool'
import { mediaUrl } from '@/lib/utils'
import type { TeacherDegree, Teacher } from '@/types'

const VISIBLE = 10

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

// --- Compact carousel card ---
function CarouselCard({ teacher, isActive, onClick }: {
  teacher: Teacher
  isActive: boolean
  onClick: () => void
}) {
  const firstName = teacher.full_name.split(' ')[0]
  return (
    <button
      onClick={onClick}
      title={teacher.full_name}
      className="group flex w-16 shrink-0 flex-col items-center gap-1.5 rounded-xl py-2 transition-all duration-200 md:w-auto md:flex-1"
    >
      <div className={`relative h-12 w-12 overflow-hidden rounded-full border-2 transition-all duration-200 md:h-14 md:w-14 ${
        isActive
          ? 'border-[#274c8f] shadow-lg shadow-[#274c8f]/25 scale-110'
          : 'border-gray-200 grayscale group-hover:grayscale-0 group-hover:border-[#274c8f]/40 group-hover:scale-105'
      }`}>
        <img
          src={imgSrc(teacher.image)}
          alt={teacher.full_name}
          className="h-full w-full object-cover object-top"
          onError={e => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER }}
        />
        {isActive && (
          <div className="absolute inset-0 rounded-full ring-2 ring-[#274c8f] ring-offset-1" />
        )}
      </div>
      <span className={`line-clamp-1 w-full text-center text-[10px] font-semibold leading-tight transition-colors ${
        isActive ? 'text-[#274c8f]' : 'text-gray-400 group-hover:text-gray-700'
      }`}>
        {firstName}
      </span>
      <div className={`h-1 w-1 rounded-full transition-all duration-200 ${isActive ? 'bg-[#274c8f] scale-125' : 'bg-transparent'}`} />
    </button>
  )
}

// --- Detail panel for selected teacher ---
function DetailPanel({ teacher }: { teacher: Teacher }) {
  const degree = DEGREE_LABELS[teacher.degree]
  const aboutText = teacher.about
    ? teacher.about.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    : ''

  return (
    <div
      key={teacher.uuid}
      className="carousel-detail mt-8 flex flex-col gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#f0f4ff] to-[#e8f0fe] p-6 md:flex-row md:items-start md:gap-8 md:p-8"
    >
      {/* Photo */}
      <div className="relative mx-auto h-52 w-44 shrink-0 overflow-hidden rounded-xl shadow-md md:mx-0">
        <img
          src={imgSrc(teacher.image)}
          alt={teacher.full_name}
          className="h-full w-full object-cover object-top"
          onError={e => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER }}
        />
        {teacher.type === 'management' && (
          <span className="absolute left-2 top-2 rounded-full bg-[#274c8f] px-2 py-0.5 text-[10px] font-bold text-white">
            Rahbariyat
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#274c8f]/60">
          {teacher.position}
        </p>
        <h3 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
          {teacher.full_name}
        </h3>

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
            <span key={s.uuid} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm">
              📚 {s.name}
            </span>
          ))}
        </div>

        {aboutText && (
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
            {aboutText}
          </p>
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
        <div className="flex items-end gap-3 px-12">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="h-14 w-14 animate-pulse rounded-full bg-gray-100" />
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
  const [activeIdx, setActiveIdx] = useState(0)
  const [windowStart, setWindowStart] = useState(0)

  if (isLoading) return <Skeleton />
  if (!teachersData?.data?.length) return null

  const sorted = [...teachersData.data].sort((a, b) => {
    if (a.type === 'management' && b.type !== 'management') return -1
    if (b.type === 'management' && a.type !== 'management') return 1
    return a.order - b.order
  })

  const windowEnd = Math.min(windowStart + VISIBLE, sorted.length)
  const slice = sorted.slice(windowStart, windowEnd)
  const canPrev = windowStart > 0
  const canNext = windowEnd < sorted.length
  const current = sorted[activeIdx] ?? sorted[0]
  const totalPages = Math.ceil(sorted.length / VISIBLE)
  const currentPage = Math.floor(windowStart / VISIBLE)

  function goPrev() {
    const newStart = Math.max(0, windowStart - VISIBLE)
    setWindowStart(newStart)
    setActiveIdx(newStart)
  }

  function goNext() {
    setWindowStart(windowEnd)
    setActiveIdx(windowEnd)
  }

  return (
    <section className="bg-white py-20">
      <style>{`
        @keyframes carouselFade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .carousel-slide { animation: carouselFade 0.25s ease forwards; }
        @keyframes detailFade {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .carousel-detail { animation: detailFade 0.3s ease forwards; }
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
          {/* Prev */}
          <button
            onClick={goPrev}
            disabled={!canPrev}
            aria-label="Oldingi"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 text-gray-400 transition-all hover:border-[#274c8f] hover:text-[#274c8f] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeftIcon />
          </button>

          {/* Cards */}
          <div
            key={windowStart}
            className="carousel-slide flex flex-1 items-end gap-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-x-visible"
          >
            {slice.map(teacher => (
              <CarouselCard
                key={teacher.uuid}
                teacher={teacher}
                isActive={teacher.uuid === current.uuid}
                onClick={() => setActiveIdx(sorted.indexOf(teacher))}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={goNext}
            disabled={!canNext}
            aria-label="Keyingi"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 text-gray-400 transition-all hover:border-[#274c8f] hover:text-[#274c8f] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRightIcon />
          </button>
        </div>

        {/* Page dots */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const newStart = i * VISIBLE
                  setWindowStart(newStart)
                  setActiveIdx(newStart)
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentPage ? 'w-6 bg-[#274c8f]' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

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
