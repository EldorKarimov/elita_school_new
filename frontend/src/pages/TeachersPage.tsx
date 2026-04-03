import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTeachers } from '@/hooks/useSchool'
import { mediaUrl } from '@/lib/utils'
import type { Teacher } from '@/types'

const STEP = 6

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

const DEGREE_LABELS: Record<string, string> = {
  bachelor: 'Bakalavr',
  master: 'Magistr',
  phd: 'PhD',
  doctor: 'Fan doktori',
  none: '',
}

const DEGREE_COLORS: Record<string, string> = {
  bachelor: 'bg-blue-50 text-blue-600',
  master: 'bg-purple-50 text-purple-600',
  phd: 'bg-amber-50 text-amber-600',
  doctor: 'bg-red-50 text-red-600',
  none: '',
}

// --- Direktor karta (katta, alohida) ---
function DirectorCard({ teacher }: { teacher: Teacher }) {
  return (
    <Link
      to={`/teachers/${teacher.uuid}`}
      className="group relative mb-6 flex flex-col overflow-hidden rounded-3xl bg-[#274c8f] shadow-xl shadow-[#274c8f]/20 transition-all hover:shadow-2xl hover:shadow-[#274c8f]/30 hover:-translate-y-1 sm:flex-row sm:min-h-[280px]"
    >
      {/* Left — photo */}
      <div className="relative h-64 w-full shrink-0 overflow-hidden sm:h-auto sm:w-64">
        <img
          src={mediaUrl(teacher.image)}
          alt={teacher.full_name}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#274c8f]/60 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-[#274c8f]/40" />
      </div>

      {/* Right — content */}
      <div className="relative flex flex-1 flex-col justify-between p-7 sm:p-8">
        {/* Decorative circle */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/5" />

        <div className="relative">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
              ★ Director
            </span>
            {teacher.degree !== 'none' && (
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/80">
                {DEGREE_LABELS[teacher.degree]}
              </span>
            )}
          </div>

          <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
            {teacher.full_name}
          </h3>
          <p className="mt-1 text-base font-medium italic text-white/70">{teacher.position}</p>

          {teacher.about && (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/60">
              {stripHtml(teacher.about)}
            </p>
          )}
        </div>

        <div className="relative mt-6 flex flex-wrap items-center gap-3 border-t border-white/15 pt-5">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-white">
              <ClockIcon />
            </div>
            {teacher.experience}
          </div>

          {teacher.sciences.slice(0, 3).map(s => (
            <span key={s.uuid} className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/80">
              {s.name}
            </span>
          ))}

          <span className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-white/60 transition-all group-hover:text-white group-hover:gap-2">
            Batafsil <ArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  )
}

// --- Qolgan rahbarlar (kichik, yonma-yon) ---
function ManagementCard({ teacher }: { teacher: Teacher }) {
  return (
    <Link
      to={`/teachers/${teacher.uuid}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md hover:border-[#274c8f]/20 hover:-translate-y-0.5"
    >
      {/* Photo — 3:4 nisbat (600x800 uchun to'g'ri) */}
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: '100%' }}>
        <img
          src={mediaUrl(teacher.image)}
          alt={teacher.full_name}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {teacher.degree !== 'none' && (
          <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold shadow-sm ${DEGREE_COLORS[teacher.degree]}`}>
            {DEGREE_LABELS[teacher.degree]}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <span className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-[#274c8f]">
          Rahbariyat
        </span>
        <h3 className="font-bold text-gray-900 leading-snug group-hover:text-[#274c8f] transition-colors line-clamp-1">
          {teacher.full_name}
        </h3>
        <p className="mt-0.5 text-xs italic text-gray-500 line-clamp-1">{teacher.position}</p>

        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <ClockIcon />
            {teacher.experience}
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-[#274c8f] opacity-0 transition-opacity group-hover:opacity-100">
            Ko'rish <ArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  )
}

// --- Teacher karta (vertikal) ---
function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <Link
      to={`/teachers/${teacher.uuid}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
    >
      {/* Photo — square crop */}
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: '100%' }}>
        <img
          src={mediaUrl(teacher.image)}
          alt={teacher.full_name}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {/* Degree badge top-right */}
        {teacher.degree !== 'none' && (
          <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold shadow-sm ${DEGREE_COLORS[teacher.degree]}`}>
            {DEGREE_LABELS[teacher.degree]}
          </span>
        )}
        {/* Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Sciences overlay */}
        {teacher.sciences.length > 0 && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
            {teacher.sciences.slice(0, 2).map(s => (
              <span key={s.uuid} className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                {s.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold text-gray-900 leading-snug group-hover:text-[#274c8f] transition-colors line-clamp-1">
          {teacher.full_name}
        </h3>
        <p className="mt-0.5 text-xs italic text-gray-500 line-clamp-1">{teacher.position}</p>

        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <ClockIcon />
            {teacher.experience}
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-[#274c8f] opacity-0 transition-opacity group-hover:opacity-100">
            Ko'rish <ArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  )
}

// --- Skeletons ---
function SkeletonManagement() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white sm:flex-row">
      <div className="h-56 w-full shrink-0 animate-pulse bg-gray-100 sm:h-auto sm:w-48" />
      <div className="flex-1 p-6 space-y-3">
        <div className="h-5 w-32 animate-pulse rounded-full bg-gray-100" />
        <div className="h-6 w-48 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  )
}

function SkeletonTeacher() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="h-60 animate-pulse bg-gray-100" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  )
}

// --- Main page ---
export default function TeachersPage() {
  const { t } = useTranslation()
  const [visibleCount, setVisibleCount] = useState(STEP)

  const { data: management, isLoading: mgLoading } = useTeachers('management')
  const { data: teachers, isLoading: tchLoading } = useTeachers('teacher')

  const visibleTeachers = teachers?.slice(0, visibleCount) ?? []
  const total = teachers?.length ?? 0
  const hasMore = visibleCount < total

  return (
    <div className="min-h-screen bg-[#f8faff]">

      {/* Page hero */}
      <div className="bg-[#274c8f] pb-16 pt-12">
        <div className="container mx-auto px-4 text-center">
          <span className="mb-3 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white/80">
            {t('teachers_page.label')}
          </span>
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">
            {t('teachers_page.title')}
          </h1>
          <p className="mt-3 text-base text-white/60">
            {t('teachers_page.subtitle')}
          </p>

          {/* Stats */}
          {!mgLoading && !tchLoading && (
            <div className="mt-8 inline-flex divide-x divide-white/20 overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
              <div className="px-8 py-4">
                <p className="text-2xl font-extrabold text-white">{management?.length ?? 0}</p>
                <p className="text-xs text-white/60">{t('teachers_page.stat_management')}</p>
              </div>
              <div className="px-8 py-4">
                <p className="text-2xl font-extrabold text-white">{total}</p>
                <p className="text-xs text-white/60">{t('teachers_page.stat_teachers')}</p>
              </div>
              <div className="px-8 py-4">
                <p className="text-2xl font-extrabold text-white">{(management?.length ?? 0) + total}</p>
                <p className="text-xs text-white/60">{t('teachers_page.stat_total')}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Wave */}
      <div className="-mt-1 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="block h-10 w-full" fill="#f8faff">
          <path d="M0,0 C480,40 960,0 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12">

        {/* ---- RAHBARIYAT ---- */}
        <div className="mb-14">
          <div className="mb-8 flex items-center gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">{t('teachers_page.management_title')}</h2>
              <p className="mt-1 text-sm text-gray-500">{t('teachers_page.management_subtitle')}</p>
            </div>
            <div className="ml-auto h-px flex-1 bg-gray-200" />
            {!mgLoading && (
              <span className="shrink-0 rounded-full bg-[#274c8f] px-3 py-1 text-sm font-bold text-white">
                {management?.length ?? 0} {t('teachers_page.person')}
              </span>
            )}
          </div>

          {mgLoading ? (
            <div className="flex flex-col gap-4">
              <SkeletonManagement />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map(i => <SkeletonManagement key={i} />)}
              </div>
            </div>
          ) : management?.length === 0 ? (
            <p className="text-gray-400">Ma'lumot yo'q</p>
          ) : (
            <>
              {/* Birinchi — Direktor (alohida katta karta) */}
              {management?.[0] && <DirectorCard teacher={management[0]} />}

              {/* Qolganlar — yonma-yon grid */}
              {management && management.length > 1 && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {management.slice(1).map(t => (
                    <ManagementCard key={t.uuid} teacher={t} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* ---- O'QITUVCHILAR ---- */}
        <div>
          <div className="mb-8 flex items-center gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">{t('teachers_page.teachers_title')}</h2>
              <p className="mt-1 text-sm text-gray-500">
                {tchLoading ? '...' : `${Math.min(visibleCount, total)} ${t('teachers_page.showing')}`}
              </p>
            </div>
            <div className="ml-auto h-px flex-1 bg-gray-200" />
            {!tchLoading && (
              <span className="shrink-0 rounded-full bg-[#274c8f] px-3 py-1 text-sm font-bold text-white">
                {total} {t('teachers_page.person')}
              </span>
            )}
          </div>

          {tchLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: STEP }).map((_, i) => <SkeletonTeacher key={i} />)}
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {visibleTeachers.map(t => <TeacherCard key={t.uuid} teacher={t} />)}
              </div>

              {/* Load more */}
              {hasMore && (
                <div className="mt-10 flex flex-col items-center gap-3">
                  {/* Progress bar */}
                  <div className="w-48 overflow-hidden rounded-full bg-gray-200 h-1.5">
                    <div
                      className="h-full rounded-full bg-[#274c8f] transition-all duration-500"
                      style={{ width: `${(visibleCount / total) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400">
                    {visibleCount} / {total}
                  </p>
                  <button
                    onClick={() => setVisibleCount(v => v + STEP)}
                    className="mt-2 flex items-center gap-2 rounded-xl border-2 border-[#274c8f]/20 bg-white px-8 py-3 text-sm font-semibold text-[#274c8f] transition-all hover:border-[#274c8f] hover:bg-[#274c8f] hover:text-white hover:shadow-lg hover:shadow-[#274c8f]/20"
                  >
                    <MoreIcon />
                    {t('teachers_page.load_more')} ({total - visibleCount} {t('teachers_page.remaining')})
                  </button>
                </div>
              )}

              {/* All loaded */}
              {!hasMore && total > STEP && (
                <div className="mt-10 flex flex-col items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckIcon />
                  </div>
                  <p className="text-sm text-gray-400">{total} {t('teachers_page.all_shown')}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// --- Icons ---
function ClockIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
    </svg>
  )
}
function ArrowIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}
function MoreIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}
