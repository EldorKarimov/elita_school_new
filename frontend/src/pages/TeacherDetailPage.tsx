import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTeacherDetail } from '@/hooks/useSchool'
import { mediaUrl } from '@/lib/utils'
import type { LessonExample, Schedule } from '@/types'

// --- Helpers ---
function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return m[1]
  }
  return null
}

// --- YouTube lesson card ---
function LessonCard({ lesson }: { lesson: LessonExample }) {
  const { t } = useTranslation()
  const [playing, setPlaying] = useState(false)
  const videoId = getYouTubeId(lesson.youtube_link)
  const thumb = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Thumbnail / embed */}
      <div className="relative overflow-hidden" style={{ paddingBottom: '56.25%' }}>
        {playing && videoId ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {thumb ? (
              <img src={thumb} alt={lesson.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-900" />
            )}
            <div className="absolute inset-0 bg-black/30" />
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-transform hover:scale-110">
                <PlayIcon />
              </div>
            </button>
          </>
        )}
      </div>
      {/* Title */}
      <div className="p-4">
        <p className="text-sm font-bold leading-snug text-gray-800 line-clamp-2">{lesson.title}</p>
        {!playing && (
          <button
            onClick={() => setPlaying(true)}
            className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:underline"
          >
            <PlayIcon size="sm" /> {t('teacher_detail.watch')}
          </button>
        )}
      </div>
    </div>
  )
}

// --- Lessons carousel ---
function LessonsCarousel({ lessons }: { lessons: LessonExample[] }) {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(0)
  const VISIBLE = 2

  if (lessons.length === 0) return null

  const canPrev = current > 0
  const canNext = current + VISIBLE < lessons.length
  const visible = lessons.slice(current, current + VISIBLE)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="h-4 w-1 rounded-full bg-[#274c8f]" />
          <h2 className="text-base font-bold text-gray-900">{t('teacher_detail.lessons_title')}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{current + 1}–{Math.min(current + VISIBLE, lessons.length)} / {lessons.length}</span>
          <button
            disabled={!canPrev}
            onClick={() => setCurrent(c => c - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-[#274c8f] hover:text-[#274c8f] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon />
          </button>
          <button
            disabled={!canNext}
            onClick={() => setCurrent(c => c + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-[#274c8f] hover:text-[#274c8f] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {visible.map(lesson => (
          <LessonCard key={lesson.uuid} lesson={lesson} />
        ))}
      </div>

      {/* Dot indicators */}
      {lessons.length > VISIBLE && (
        <div className="mt-4 flex justify-center gap-1.5">
          {Array.from({ length: lessons.length - VISIBLE + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all ${i === current ? 'w-5 h-2 bg-[#274c8f]' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// --- Schedule table ---
function ScheduleTable({ schedules }: { schedules: Schedule[] }) {
  const { t } = useTranslation()

  if (schedules.length === 0) return null

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span className="h-4 w-1 rounded-full bg-[#274c8f]" />
        <h2 className="text-base font-bold text-gray-900">{t('teacher_detail.schedule_title')}</h2>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#274c8f]/5 border-b border-gray-100">
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">{t('teacher_detail.schedule_day')}</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">{t('teacher_detail.schedule_start')}</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">{t('teacher_detail.schedule_end')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {schedules.map(s => (
              <tr key={s.uuid} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-gray-800">
                  {t(`teacher_detail.weekday_${s.weekday}`, { defaultValue: s.weekday })}
                </td>
                <td className="px-4 py-3 text-gray-600">{s.start_time?.slice(0, 5)}</td>
                <td className="px-4 py-3 text-gray-600">{s.end_time?.slice(0, 5)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// --- Main ---
export default function TeacherDetailPage() {
  const { t } = useTranslation()
  const { uuid } = useParams<{ uuid: string }>()
  const navigate = useNavigate()
  const { data: teacher, isLoading, isError } = useTeacherDetail(uuid!)

  if (isError) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg font-bold text-gray-800">{t('teacher_detail.not_found')}</p>
        <button onClick={() => navigate('/teachers')}
          className="rounded-xl bg-[#274c8f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1e3a6e]"
        >
          {t('teacher_detail.back_btn')}
        </button>
      </div>
    )
  }

  const degreeLabel = teacher?.degree
    ? t(`teacher_detail.degree_${teacher.degree}`, { defaultValue: '' })
    : ''

  return (
    <div className="min-h-screen bg-[#f8faff]">

      {/* Hero bar */}
      <div className="bg-[#274c8f] pb-8 pt-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Link to="/" className="hover:text-white/70 transition-colors">{t('common.home')}</Link>
            <span>/</span>
            <Link to="/teachers" className="hover:text-white/70 transition-colors">{t('nav.teachers')}</Link>
            {teacher && (
              <>
                <span>/</span>
                <span className="text-white/70">{teacher.full_name}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="-mt-1 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="block h-10 w-full" fill="#f8faff">
          <path d="M0,0 C480,40 960,0 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
            {/* Left skeleton */}
            <div className="space-y-4">
              <div className="aspect-[3/4] animate-pulse rounded-3xl bg-gray-200" />
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
            </div>
            {/* Right skeleton */}
            <div className="space-y-4 pt-2">
              {[1,2,3,4,5].map(i => (
                <div key={i} className={`h-4 animate-pulse rounded bg-gray-200 ${i % 3 === 0 ? 'w-2/3' : 'w-full'}`} />
              ))}
            </div>
          </div>
        ) : teacher ? (
          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">

            {/* ---- LEFT: Photo + info card ---- */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              {/* Photo */}
              <div className="relative overflow-hidden rounded-3xl shadow-lg" style={{ aspectRatio: '3/4' }}>
                <img
                  src={mediaUrl(teacher.image)}
                  alt={teacher.full_name}
                  className="h-full w-full object-cover object-top"
                />
                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 pt-16">
                  {degreeLabel && (
                    <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                      {degreeLabel}
                    </span>
                  )}
                </div>
              </div>

              {/* Info card */}
              <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
                <div>
                  <h1 className="text-xl font-extrabold text-gray-900">{teacher.full_name}</h1>
                  {teacher.position && (
                    <p className="mt-1 text-sm text-[#274c8f] font-semibold">{teacher.position}</p>
                  )}
                </div>

                {/* Sciences */}
                {teacher.sciences.length > 0 && (
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">{t('teacher_detail.sciences')}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {teacher.sciences.map(s => (
                        <span key={s.uuid}
                          className="rounded-full bg-[#274c8f]/8 px-3 py-1 text-xs font-semibold text-[#274c8f]"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-3">
                  {teacher.experience && (
                    <div className="rounded-xl bg-[#274c8f]/5 px-3 py-3 text-center">
                      <p className="text-lg font-extrabold text-[#274c8f]">{teacher.experience}</p>
                      <p className="text-[10px] font-semibold text-gray-500">{t('teacher_detail.experience')}</p>
                    </div>
                  )}
                  {teacher.lessons.length > 0 && (
                    <div className="rounded-xl bg-[#274c8f]/5 px-3 py-3 text-center">
                      <p className="text-lg font-extrabold text-[#274c8f]">{teacher.lessons.length}</p>
                      <p className="text-[10px] font-semibold text-gray-500">{t('teacher_detail.lessons_count')}</p>
                    </div>
                  )}
                </div>

                {/* Phone */}
                {teacher.phone && (
                  <a
                    href={`tel:${teacher.phone}`}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#274c8f]/30 hover:text-[#274c8f]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#274c8f]/8 text-[#274c8f] shrink-0">
                      <PhoneIcon />
                    </div>
                    {teacher.phone}
                  </a>
                )}

                {/* Back */}
                <Link
                  to="/teachers"
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-[#274c8f]/30 hover:text-[#274c8f]"
                >
                  <BackIcon /> {t('teacher_detail.back_to_list')}
                </Link>
              </div>
            </div>

            {/* ---- RIGHT: Content ---- */}
            <div className="flex flex-col gap-8">

              {/* About */}
              {teacher.about && (
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
                  <div className="mb-5 flex items-center gap-2">
                    <span className="h-4 w-1 rounded-full bg-[#274c8f]" />
                    <h2 className="text-base font-bold text-gray-900">{t('teacher_detail.about_title')}</h2>
                  </div>
                  <div
                    className="ck-content"
                    dangerouslySetInnerHTML={{ __html: teacher.about }}
                  />
                </div>
              )}

              {/* Lesson carousel */}
              {teacher.lessons.length > 0 && (
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <LessonsCarousel lessons={teacher.lessons} />
                </div>
              )}

              {/* Schedule */}
              {teacher.schedules.length > 0 && (
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <ScheduleTable schedules={teacher.schedules} />
                </div>
              )}

            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

// --- Icons ---
function ChevronLeftIcon() {
  return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
}
function ChevronRightIcon() {
  return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
}
function BackIcon() {
  return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
}
function PhoneIcon() {
  return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
}
function PlayIcon({ size = 'md' }: { size?: 'sm' | 'md' }) {
  return <svg className={size === 'sm' ? 'h-3 w-3' : 'h-6 w-6'} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
}
