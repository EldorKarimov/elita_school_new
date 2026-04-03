import { useState, useRef, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const MAKTAB_ITEMS = [
  { to: '/news', labelKey: 'nav.news' },
  { to: '/blogs', labelKey: 'nav.blog' },
  { to: '/teachers', labelKey: 'nav.teachers' },
  { to: '/gallery', labelKey: 'nav.gallery' },
] as const

const linkBase =
  'relative px-4 py-5 text-sm font-medium text-white/90 transition-colors hover:text-white hover:bg-white/10 flex items-center gap-1'
const linkActive = 'text-white bg-white/15'

export function Navbar() {
  const { t } = useTranslation()
  const [maktabOpen, setMaktabOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMaktabOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-[#274c8f] shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">

        {/* Desktop nav */}
        <div className="hidden items-center md:flex">
          <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>
            {t('nav.home')}
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>
            {t('nav.about')}
          </NavLink>

          {/* Maktab dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setMaktabOpen((v) => !v)}
              className={`${linkBase} ${maktabOpen ? linkActive : ''}`}
              aria-expanded={maktabOpen}
            >
              {t('nav.maktab')}
              <ChevronIcon open={maktabOpen} />
            </button>

            {maktabOpen && (
              <div className="absolute left-0 top-full z-50 min-w-[200px] overflow-hidden rounded-b-lg border border-white/10 bg-white shadow-xl">
                {MAKTAB_ITEMS.map(({ to, labelKey }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMaktabOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#274c8f] transition-colors hover:bg-[#274c8f]/8 hover:text-[#1a3465]"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#274c8f]/60" />
                    {t(labelKey)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/services" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>
            {t('nav.services')}
          </NavLink>

          <NavLink to="/contact" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>
            {t('nav.contact')}
          </NavLink>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center md:hidden">
          <button
            className="p-2 text-white"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#1a3465] md:hidden">
          {[
            { to: '/', labelKey: 'nav.home', end: true },
            { to: '/about', labelKey: 'nav.about', end: false },
          ].map(({ to, labelKey, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 text-sm font-medium ${isActive ? 'bg-white/15 text-white' : 'text-white/90 hover:bg-white/10'}`
              }
            >
              {t(labelKey)}
            </NavLink>
          ))}

          <div className="border-t border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/50">
            {t('nav.maktab')}
          </div>
          {MAKTAB_ITEMS.map(({ to, labelKey }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-3 text-sm font-medium ${isActive ? 'bg-white/15 text-white' : 'text-white/90 hover:bg-white/10'}`
              }
            >
              {t(labelKey)}
            </NavLink>
          ))}

          {[
            { to: '/services', labelKey: 'nav.services' },
            { to: '/contact', labelKey: 'nav.contact' },
          ].map(({ to, labelKey }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block border-t border-white/10 px-4 py-3 text-sm font-medium ${isActive ? 'bg-white/15 text-white' : 'text-white/90 hover:bg-white/10'}`
              }
            >
              {t(labelKey)}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}

// ---- Icons ----
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      {open
        ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      }
    </svg>
  )
}
