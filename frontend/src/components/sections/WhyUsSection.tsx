import { useTranslation } from 'react-i18next'

const WHY_US_ICONS = [
  {
    key: 'teachers',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21 12.083 12.083 0 015.84 10.578L12 14z" />
      </svg>
    ),
  },
  {
    key: 'results',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    key: 'environment',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: 'groups',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    key: 'standards',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'safety',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
]

export function WhyUsSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-[#f4f6fb]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#274c8f]/8 px-4 py-1.5 text-sm font-semibold text-[#274c8f]">
            {t('whyus.label')}
          </span>
          <h2 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            {t('whyus.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-500 md:text-lg">
            {t('whyus.subtitle')}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US_ICONS.map((item) => (
            <div
              key={item.key}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#274c8f]/20 hover:shadow-lg"
            >
              {/* Top accent line */}
              <div className="absolute left-0 top-0 h-1 w-0 bg-[#274c8f] transition-all duration-300 group-hover:w-full" />

              {/* Icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#274c8f]/8 text-[#274c8f] transition-colors group-hover:bg-[#274c8f] group-hover:text-white">
                {item.icon}
              </div>

              {/* Text */}
              <h3 className="mb-3 text-lg font-bold text-gray-900">
                {t(`whyus.${item.key}_title`)}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {t(`whyus.${item.key}_desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex justify-center">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-[#274c8f] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#1a3465] hover:shadow-lg active:scale-95"
          >
            {t('whyus.contact_btn')}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
