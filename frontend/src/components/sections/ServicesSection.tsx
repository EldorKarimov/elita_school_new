import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import oquvchi from '@/assets/oquvchi.png'

interface Service {
  id: number
  titleKey: string
  descKey: string
  icon: React.ReactNode
}

const leftServices: Service[] = [
  { id: 1, titleKey: 'nutrition_title', descKey: 'nutrition_desc', icon: <FoodIcon /> },
  { id: 2, titleKey: 'languages_title', descKey: 'languages_desc', icon: <LanguageIcon /> },
  { id: 3, titleKey: 'transport_title', descKey: 'transport_desc', icon: <BusIcon /> },
]

const rightServices: Service[] = [
  { id: 4, titleKey: 'daily_title', descKey: 'daily_desc', icon: <DayIcon /> },
  { id: 5, titleKey: 'individual_title', descKey: 'individual_desc', icon: <IndividualIcon /> },
  { id: 6, titleKey: 'vocational_title', descKey: 'vocational_desc', icon: <CareerIcon /> },
]

function ServiceItem({
  service,
  align,
  index,
}: {
  service: Service
  align: 'left' | 'right'
  index: number
}) {
  const { t } = useTranslation()
  const [hovered, setHovered] = useState(false)
  const title = t(`services_section.${service.titleKey}`)
  const desc = t(`services_section.${service.descKey}`)

  return (
    <div
      className={`flex items-center gap-5 ${align === 'right' ? 'flex-row-reverse' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Text */}
      <div className={`flex-1 ${align === 'right' ? 'text-right' : 'text-left'}`}>
        <p className="text-base font-bold text-gray-800 leading-tight">{title}</p>
        <p className="mt-1 text-sm text-gray-400 leading-relaxed line-clamp-2 hidden sm:block">
          {desc.split('.')[0]}.
        </p>
      </div>

      {/* Icon button + popup wrapper */}
      <div
        className="relative shrink-0"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Glow ring on hover */}
        <div
          className={`absolute inset-0 rounded-full bg-[#274c8f]/20 transition-all duration-300 ${
            hovered ? 'scale-150 opacity-100' : 'scale-100 opacity-0'
          }`}
        />

        {/* Circle icon */}
        <button
          className={`relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full shadow-md transition-all duration-300 ${
            hovered
              ? 'bg-[#274c8f] text-white shadow-[#274c8f]/30 shadow-lg scale-110'
              : 'bg-white text-[#274c8f] border-2 border-[#274c8f]/20'
          }`}
        >
          {service.icon}
        </button>

        {/* Popup */}
        <div
          className={`absolute z-30 w-64 rounded-2xl bg-white p-4 shadow-2xl border border-gray-100 transition-all duration-300 ease-out ${
            align === 'right' ? 'right-full mr-4' : 'left-full ml-4'
          } bottom-0 ${
            hovered
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-5 pointer-events-none'
          }`}
        >
          {/* Arrow */}
          <div
            className={`absolute top-5 h-3 w-3 rotate-45 bg-white border-gray-100 ${
              align === 'right'
                ? '-right-1.5 border-r border-t'
                : '-left-1.5 border-l border-b'
            }`}
          />
          {/* Popup header */}
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#274c8f] text-white">
              {service.icon}
            </div>
            <h4 className="text-sm font-bold text-gray-900 leading-tight">{title}</h4>
          </div>
          {/* Divider */}
          <div className="mb-3 h-px bg-gradient-to-r from-[#274c8f]/20 to-transparent" />
          <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
        </div>
      </div>
    </div>
  )
}

export function ServicesSection() {
  const { t } = useTranslation()
  return (
    <section className="relative overflow-hidden bg-[#f8faff] py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#274c8f]/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#274c8f]/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#274c8f]/3 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">

        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#274c8f]/8 px-4 py-1.5 text-sm font-semibold text-[#274c8f]">
            {t('services_section.label')}
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
            {t('services_section.subtitle_badge')}
          </h2>
          <p className="mt-3 max-w-lg mx-auto text-base text-gray-500">
            {t('services_section.subtitle')}
          </p>
        </div>

        {/* Main layout */}
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_360px_1fr] items-center gap-8 lg:gap-14">

          {/* Left services */}
          <div className="flex flex-col gap-12">
            {leftServices.map((service, i) => (
              <ServiceItem key={service.id} service={service} align="left" index={i} />
            ))}
          </div>

          {/* Center image */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Outer decorative ring */}
            <div className="absolute h-[420px] w-[420px] rounded-full border-2 border-dashed border-[#274c8f]/15 animate-[spin_30s_linear_infinite]" />
            {/* Inner ring */}
            <div className="absolute h-[340px] w-[340px] rounded-full border border-[#274c8f]/10" />

            {/* Floating dots */}
            <div className="absolute top-6 right-10 h-3.5 w-3.5 rounded-full bg-[#274c8f]/40 animate-bounce" style={{ animationDuration: '2s' }} />
            <div className="absolute bottom-10 left-8 h-5 w-5 rounded-full bg-[#274c8f]/25 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
            <div className="absolute top-1/3 -left-3 h-2.5 w-2.5 rounded-full bg-[#274c8f]/50" />
            <div className="absolute top-2/3 -right-3 h-2.5 w-2.5 rounded-full bg-[#274c8f]/50" />

            {/* Image container */}
            <div className="relative z-10 w-72 overflow-hidden rounded-[2.5rem] shadow-2xl ring-4 ring-[#274c8f]/10 ring-offset-4 ring-offset-[#f8faff]">
              {/* Top gradient overlay */}
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#274c8f]/20 to-transparent z-10" />
              {/* Bottom gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#274c8f]/30 to-transparent z-10" />
              <img
                src={oquvchi}
                alt="O'quvchi"
                className="w-full object-cover object-top"
                style={{ minHeight: '460px' }}
              />
              {/* School badge */}
              <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#274c8f] px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                Elita Akademik Maktabi
              </div>
            </div>
          </div>

          {/* Right services */}
          <div className="flex flex-col gap-12">
            {rightServices.map((service, i) => (
              <ServiceItem key={service.id} service={service} align="right" index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Icons ---
function FoodIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  )
}

function LanguageIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
  )
}

function BusIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 6v6m0 0v2m0-2h8m0 0v-2m0 2v2M3 6h18l-1 10H4L3 6zm4 14a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
    </svg>
  )
}

function DayIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function IndividualIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}

function CareerIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}
