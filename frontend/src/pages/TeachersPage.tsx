import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTeachers } from '@/hooks/useSchool'
import { mediaUrl } from '@/lib/utils'
import type { Teacher } from '@/types'

const STEP = 10


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

// --- Direktor karta (ManagementCard ga o'xshash, lekin ajralib turadi) ---
function DirectorGridCard({ teacher }: { teacher: Teacher }) {
  return (
    <Link
      to={`/teachers/${teacher.uuid}`}
      className="group flex flex-col overflow-hidden rounded-2xl border-2 border-[#274c8f]/30 bg-white shadow-md shadow-[#274c8f]/10 transition-all hover:border-[#274c8f]/60 hover:shadow-lg hover:shadow-[#274c8f]/20 hover:-translate-y-0.5"
    >
      {/* Photo */}
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: '100%' }}>
        <img
          src={mediaUrl(teacher.image)}
          alt={teacher.full_name}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {/* Direktor badge — chap yuqori burchak */}
        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-[#274c8f] px-2.5 py-1 text-[10px] font-bold text-white shadow">
          <CrownIcon /> Direktor
        </span>
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
          Direktor
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
  const [page, setPage] = useState(1)
  const [accTeachers, setAccTeachers] = useState<Teacher[]>([])

  const { data: managementData, isLoading: mgLoading } = useTeachers({ type: 'management', pageSize: 100 })
  const { data: teachersData, isLoading: tchLoading, isFetching: tchFetching } = useTeachers({ type: 'teacher', page, pageSize: STEP })

  const management = managementData?.data ?? []
  const total = teachersData?.pagination?.totalCount ?? 0
  const hasMore = accTeachers.length < total

  useEffect(() => {
    if (!teachersData?.data?.length) return
    const isFirst = (teachersData.pagination?.page ?? 1) === 1
    setAccTeachers(prev => isFirst ? teachersData.data : [...prev, ...teachersData.data])
  }, [teachersData]) // eslint-disable-line react-hooks/exhaustive-deps

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
          {/* {!mgLoading && !tchLoading && (
            <div className="mt-8 inline-flex divide-x divide-white/20 overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
              <div className="px-8 py-4">
                <p className="text-2xl font-extrabold text-white">{managementData?.pagination?.totalCount ?? 0}</p>
                <p className="text-xs text-white/60">{t('teachers_page.stat_management')}</p>
              </div>
              <div className="px-8 py-4">
                <p className="text-2xl font-extrabold text-white">{total}</p>
                <p className="text-xs text-white/60">{t('teachers_page.stat_teachers')}</p>
              </div>
              <div className="px-8 py-4">
                <p className="text-2xl font-extrabold text-white">{(managementData?.pagination?.totalCount ?? 0) + total}</p>
                <p className="text-xs text-white/60">{t('teachers_page.stat_total')}</p>
              </div>
            </div>
          )} */}
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
                {managementData?.pagination?.totalCount ?? 0} {t('teachers_page.person')}
              </span>
            )}
          </div>

          {mgLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="col-span-1 sm:col-span-2">
                <SkeletonManagement />
              </div>
              {[1, 2].map(i => <SkeletonManagement key={i} />)}
            </div>
          ) : management.length === 0 ? (
            <p className="text-gray-400">Ma'lumot yo'q</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {management[0] && <DirectorGridCard teacher={management[0]} />}
              {management.slice(1).map(member => (
                <ManagementCard key={member.uuid} teacher={member} />
              ))}
            </div>
          )}
        </div>

        {/* ---- O'QITUVCHILAR ---- */}
        <div>
          <div className="mb-8 flex items-center gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">{t('teachers_page.teachers_title')}</h2>
              <p className="mt-1 text-sm text-gray-500">
                {tchLoading ? '...' : `${accTeachers.length} ${t('teachers_page.showing')}`}
              </p>
            </div>
            <div className="ml-auto h-px flex-1 bg-gray-200" />
            {!tchLoading && (
              <span className="shrink-0 rounded-full bg-[#274c8f] px-3 py-1 text-sm font-bold text-white">
                {total} {t('teachers_page.person')}
              </span>
            )}
          </div>

          <style>{`
            @keyframes tcEnter {
              from { opacity: 0; transform: translateY(14px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .tc-card { animation: tcEnter 0.4s ease forwards; }
          `}</style>

          {tchLoading && accTeachers.length === 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: STEP }).map((_, i) => <SkeletonTeacher key={i} />)}
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {accTeachers.map((teacher, i) => (
                  <div
                    key={teacher.uuid}
                    className="tc-card"
                    style={{ animationDelay: `${(i % STEP) * 40}ms` }}
                  >
                    <TeacherCard teacher={teacher} />
                  </div>
                ))}
              </div>

              {/* Ko'proq yuklanayotganda spinner */}
              {tchFetching && accTeachers.length > 0 && (
                <div className="mt-10 flex flex-col items-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#274c8f]/20 border-t-[#274c8f]" />
                  <p className="text-xs text-gray-400">Yuklanmoqda...</p>
                </div>
              )}

              {/* Ko'proq ko'rish tugmasi */}
              {hasMore && !tchFetching && (
                <div className="mt-10 flex flex-col items-center gap-4">
                  {/* Progress */}
                  <div className="flex items-center gap-3">
                    <div className="w-40 overflow-hidden rounded-full bg-gray-200 h-1.5">
                      <div
                        className="h-full rounded-full bg-[#274c8f] transition-all duration-700"
                        style={{ width: `${(accTeachers.length / total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 tabular-nums">
                      {accTeachers.length} / {total}
                    </span>
                  </div>

                  <button
                    onClick={() => setPage(p => p + 1)}
                    className="group relative overflow-hidden rounded-xl bg-[#274c8f] px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#274c8f]/25 transition-all hover:shadow-lg hover:shadow-[#274c8f]/35 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
                  >
                    <span className="relative flex items-center gap-2.5">
                      <MoreIcon />
                      Yana ko'rish
                      <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">
                        {total - accTeachers.length} ta
                      </span>
                    </span>
                  </button>
                </div>
              )}

              {/* Hammasi ko'rsatildi */}
              {!hasMore && total > STEP && (
                <div className="mt-10 flex flex-col items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckIcon />
                  </div>
                  <p className="text-sm font-medium text-gray-500">
                    Barcha <span className="font-bold text-[#274c8f]">{total}</span> ta xodim ko'rsatildi
                  </p>
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
function CrownIcon() {
  return (
    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
      <path d="M2 19h20v2H2v-2zm2-2l3-8 5 4 5-6 3 10H4z" />
    </svg>
  )
}
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
