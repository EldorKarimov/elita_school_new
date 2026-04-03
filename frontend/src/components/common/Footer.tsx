import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSiteSettings } from '@/hooks/useSchool'
import { mediaUrl } from '@/lib/utils'
import logo from '@/assets/logo.svg'

const SOCIALS = [
  {
    label: 'Telegram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
]

export function Footer() {
  const { t } = useTranslation()
  const { data: settings } = useSiteSettings()
  const year = new Date().getFullYear()

  const logoSrc = settings?.logo ? mediaUrl(settings.logo) : logo

  const socials = [
    settings?.telegram   && { label: 'Telegram',   href: settings.telegram,   icon: SOCIALS.find(s => s.label === 'Telegram')?.icon },
    settings?.youtube    && { label: 'YouTube',     href: settings.youtube,    icon: SOCIALS.find(s => s.label === 'YouTube')?.icon },
    settings?.instagram  && { label: 'Instagram',  href: settings.instagram,  icon: SOCIALS.find(s => s.label === 'Instagram')?.icon },
    settings?.facebook   && { label: 'Facebook',   href: settings.facebook,   icon: SOCIALS.find(s => s.label === 'Facebook')?.icon },
  ].filter(Boolean) as typeof SOCIALS

  const QUICK_LINKS = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/teachers', label: t('nav.teachers') },
    { to: '/news', label: t('nav.news') },
    { to: '/blogs', label: t('nav.blog') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/contact', label: t('nav.contact') },
  ]

  const SERVICES = [
    t('services_section.nutrition_title'),
    t('services_section.languages_title'),
    t('services_section.transport_title'),
    t('services_section.daily_title'),
    t('services_section.individual_title'),
    t('services_section.vocational_title'),
  ]

  return (
    <footer className="bg-[#274c8f]">
      {/* Top wave */}
      <div className="overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="block h-10 w-full" fill="#274c8f">
          <path d="M0,20 C480,40 960,0 1440,20 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 pb-8 pt-4">

        {/* Main grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-3">
              <img src={logoSrc} alt={settings?.name ?? 'Elita'} className="h-14 w-14 object-contain" />
              <div>
                <p className="text-base font-extrabold uppercase leading-tight tracking-wide text-white">
                  {settings?.name ?? 'Elita Akademik Maktabi'}
                </p>
                <p className="text-xs italic text-white/60">{settings?.slogan ?? t('footer.slogan')}</p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-white/55">
              {t('footer.description')}
            </p>

            {/* Socials */}
            {socials.length > 0 && (
              <div className="flex items-center gap-2">
                {socials.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all hover:bg-white hover:text-[#274c8f]"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Col 2 — Quick links */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-widest text-white/40">
              {t('footer.pages_title')}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <span className="h-1 w-3 rounded-full bg-white/30" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-widest text-white/40">
              {t('footer.services_title')}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map(service => (
                <li
                  key={service}
                  className="flex items-center gap-2 text-sm text-white/70"
                >
                  <span className="h-1 w-3 rounded-full bg-white/30" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-widest text-white/40">
              {t('footer.contact_title')}
            </h4>
            <ul className="flex flex-col gap-4">
              {settings?.address && (
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/60">
                    <LocationIcon />
                  </div>
                  <span className="text-sm leading-snug text-white/70">{settings.address}</span>
                </li>
              )}

              {settings?.main_phone && (
                <li className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/60">
                    <PhoneIcon />
                  </div>
                  <a
                    href={`tel:${settings.main_phone.replace(/\s/g, '')}`}
                    className="text-sm font-semibold text-white/80 transition-colors hover:text-white"
                  >
                    {settings.main_phone}
                  </a>
                </li>
              )}

              {settings?.other_phone && (
                <li className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/60">
                    <PhoneIcon />
                  </div>
                  <a
                    href={`tel:${settings.other_phone.replace(/\s/g, '')}`}
                    className="text-sm font-semibold text-white/80 transition-colors hover:text-white"
                  >
                    {settings.other_phone}
                  </a>
                </li>
              )}

              {settings?.email && (
                <li className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/60">
                    <MailIcon />
                  </div>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {settings.email}
                  </a>
                </li>
              )}

              {settings?.reception && (
                <li className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/60">
                    <ClockIcon />
                  </div>
                  <span className="text-sm text-white/70">{settings.reception}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
          <p>{t('footer.copyright')}</p>
          <p>
            {t('footer.developed_by').split('Elita IT')[0]}
            <span className="text-white/60 font-medium">Elita IT</span>
            {t('footer.developed_by').split('Elita IT')[1]}
          </p>
        </div>
      </div>
    </footer>
  )
}

function LocationIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
    </svg>
  )
}
