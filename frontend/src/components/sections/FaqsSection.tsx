import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFaqs } from '@/hooks/useContent'
import type { FAQ } from '@/types'

function FaqItem({ faq, index, isOpen, onToggle }: {
  faq: FAQ
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? 'border-[#274c8f]/30 bg-white shadow-md shadow-[#274c8f]/8'
          : 'border-gray-100 bg-white hover:border-[#274c8f]/20 hover:shadow-sm'
      }`}
    >
      <button
        className="flex w-full items-center gap-4 px-6 py-5 text-left"
        onClick={onToggle}
      >
        {/* Number badge */}
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
            isOpen
              ? 'bg-[#274c8f] text-white'
              : 'bg-[#274c8f]/8 text-[#274c8f]'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Question */}
        <span className={`flex-1 text-base font-semibold leading-snug transition-colors ${
          isOpen ? 'text-[#274c8f]' : 'text-gray-800'
        }`}>
          {faq.question}
        </span>

        {/* Icon */}
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isOpen ? 'bg-[#274c8f] text-white rotate-45' : 'bg-gray-100 text-gray-400'
          }`}
        >
          <PlusIcon />
        </span>
      </button>

      {/* Answer */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-100 px-6 py-5 pl-[4.5rem]">
            <p className="text-sm leading-relaxed text-gray-500">{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SkeletonItem() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white px-6 py-5">
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-gray-100" />
        <div className="h-5 flex-1 animate-pulse rounded-lg bg-gray-100" />
        <div className="h-7 w-7 shrink-0 animate-pulse rounded-full bg-gray-100" />
      </div>
    </div>
  )
}

export function FaqsSection() {
  const { t } = useTranslation()
  const { data: faqs, isLoading } = useFaqs()
  const [openId, setOpenId] = useState<string | null>(null)

  function toggle(uuid: string) {
    setOpenId(prev => prev === uuid ? null : uuid)
  }

  if (!isLoading && (!faqs || faqs.length === 0)) return null

  const half = Math.ceil((faqs?.length ?? 0) / 2)
  const leftCol = faqs?.slice(0, half) ?? []
  const rightCol = faqs?.slice(half) ?? []

  return (
    <section className="bg-[#f4f6fb] py-20">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 inline-block rounded-full bg-[#274c8f]/8 px-4 py-1.5 text-sm font-semibold text-[#274c8f]">
            {t('faqs_section.label')}
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
            {t('faqs_section.title')}
          </h2>
          <p className="mt-3 max-w-xl text-base text-gray-500">
            {t('faqs_section.subtitle')}
          </p>
        </div>

        {/* FAQ grid — 2 ustun desktop, 1 ustun mobile */}
        {isLoading ? (
          <div className="grid gap-3 lg:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonItem key={i} />)}
          </div>
        ) : (
          <div className="grid gap-3 lg:grid-cols-2 lg:items-start">
            {/* Left */}
            <div className="flex flex-col gap-3">
              {leftCol.map((faq, i) => (
                <FaqItem
                  key={faq.uuid}
                  faq={faq}
                  index={i}
                  isOpen={openId === faq.uuid}
                  onToggle={() => toggle(faq.uuid)}
                />
              ))}
            </div>
            {/* Right */}
            <div className="flex flex-col gap-3">
              {rightCol.map((faq, i) => (
                <FaqItem
                  key={faq.uuid}
                  faq={faq}
                  index={half + i}
                  isOpen={openId === faq.uuid}
                  onToggle={() => toggle(faq.uuid)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function PlusIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
    </svg>
  )
}
