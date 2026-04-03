import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTeachers } from '@/hooks/useSchool'
import { mediaUrl } from '@/lib/utils'
import type { TeacherDegree } from '@/types'

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

function Skeleton() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-10 flex flex-col items-center gap-3">
          <div className="h-4 w-40 animate-pulse rounded-full bg-gray-100" />
          <div className="h-9 w-80 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="flex gap-10">
          <div className="h-[480px] w-[42%] animate-pulse rounded-2xl bg-gray-100" />
          <div className="flex flex-1 flex-col gap-4 pt-4">
            <div className="flex gap-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-14 w-14 animate-pulse rounded-full bg-gray-100" />
              ))}
            </div>
            <div className="mt-4 h-7 w-48 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
            <div className="mt-2 space-y-2">
              {[1, 2, 3].map(i => <div key={i} className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TeachersSection() {
  const { t } = useTranslation()
  const { data: teachers, isLoading } = useTeachers()
  const [activeUuid, setActiveUuid] = useState<string | null>(null)

  if (isLoading) return <Skeleton />
  if (!teachers || teachers.length === 0) return null

  const sorted = [...teachers].sort((a, b) => {
    if (a.type === 'management' && b.type !== 'management') return -1
    if (b.type === 'management' && a.type !== 'management') return 1
    return a.order - b.order
  })

  const current = sorted.find(t => t.uuid === (activeUuid ?? sorted[0].uuid)) ?? sorted[0]
  const degree = DEGREE_LABELS[current.degree]

  // HTML taglarini tozalash
  const aboutText = current.about
    ? current.about.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    : ''

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-5xl px-4">

        {/* Header */}
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#274c8f]/8 px-4 py-1.5 text-sm font-semibold text-[#274c8f]">
            {t('teachers_section.label')}
          </span>
          <h2 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            {t('teachers_section.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-500 md:text-lg">
            {t('teachers_section.subtitle')}
          </p>
        </div>

        {/* Main layout */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">

          {/* LEFT — rasm */}
          <div className="relative mx-auto w-full max-w-sm shrink-0 md:w-[42%]">
            {/* Dekorativ frame */}
            <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border-2 border-[#274c8f]/15" />
            <div className="relative overflow-hidden rounded-2xl bg-[#eef2fa] shadow-md">
              <img
                key={current.uuid}
                src={imgSrc(current.image)}
                alt={current.full_name}
                className="h-[440px] w-full object-cover object-top transition-opacity duration-300 md:h-[480px]"
                onError={e => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER }}
              />
              {current.type === 'management' && (
                <span className="absolute left-4 top-4 rounded-full bg-[#274c8f] px-3 py-1 text-xs font-bold text-white shadow">
                  {t('teachers_section.director_badge')}
                </span>
              )}
            </div>
          </div>

          {/* RIGHT — info */}
          <div className="flex flex-1 flex-col">

            {/* Thumbnails */}
            <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {sorted.map(t => {
                const isActive = t.uuid === current.uuid
                return (
                  <button
                    key={t.uuid}
                    onClick={() => setActiveUuid(t.uuid)}
                    title={t.full_name}
                    className="shrink-0 transition-transform hover:scale-105"
                  >
                    <div
                      className={`h-16 w-16 overflow-hidden rounded-full border-[3px] transition-all duration-200 ${
                        isActive
                          ? 'border-[#274c8f] shadow-md shadow-[#274c8f]/20'
                          : 'border-gray-200 grayscale hover:grayscale-0 hover:border-[#274c8f]/40'
                      }`}
                    >
                      <img
                        src={imgSrc(t.image)}
                        alt={t.full_name}
                        className="h-full w-full object-cover object-top"
                        onError={e => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER }}
                      />
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Name & position */}
            <h3 className="mb-1 text-2xl font-extrabold uppercase tracking-wide text-gray-900">
              {current.full_name}
            </h3>
            <p className="mb-5 text-sm italic text-gray-400">{current.position}</p>

            {/* Detail rows */}
            <ul className="mb-5 space-y-2.5">
              {degree && (
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#274c8f]/8 text-[#274c8f]">
                    <GradIcon />
                  </span>
                  <span><b className="text-gray-800">{t('teachers_section.degree_label')}</b> {degree}</span>
                </li>
              )}
              {current.experience && (
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#274c8f]/8 text-[#274c8f]">
                    <ClockIcon />
                  </span>
                  <span><b className="text-gray-800">{t('teachers_section.experience_label')}</b> {current.experience}</span>
                </li>
              )}
              {current.sciences.length > 0 && (
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#274c8f]/8 text-[#274c8f]">
                    <BookIcon />
                  </span>
                  <span><b className="text-gray-800">{t('teachers_section.sciences_label')}</b> {current.sciences.map(s => s.name).join(', ')}</span>
                </li>
              )}
            </ul>

            {/* About */}
            {aboutText && (
              <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-500">
                {aboutText}
              </p>
            )}

            {/* Bottom row */}
            <div className="mt-auto flex items-center justify-between">
              {/* Social placeholder icons */}
              <div className="flex items-center gap-2">
                {[LinkIcon, ChatIcon, ShareIcon].map((Icon, i) => (
                  <button
                    key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition hover:border-[#274c8f] hover:text-[#274c8f]"
                  >
                    <Icon />
                  </button>
                ))}
              </div>

              {/* CTA */}
              <Link
                to={`/teachers/${current.uuid}`}
                className="inline-flex items-center gap-2 rounded-lg bg-[#274c8f] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1a3465] hover:shadow-md active:scale-95"
              >
                {t('teachers_section.profile_btn')}
                <ArrowIcon />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

// --- Icons ---
function GradIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
    </svg>
  )
}
function BookIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
    </svg>
  )
}
function LinkIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  )
}
function ChatIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}
function ShareIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
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
