import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, GraduationCap, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { to: '/', label: 'Bosh sahifa', exact: true },
  { to: '/about', label: 'Biz haqimizda' },
  { to: '/teachers', label: "O'qituvchilar" },
  { to: '/news', label: 'Yangiliklar' },
  { to: '/blog', label: 'Blog' },
  { to: '/gallery', label: 'Galereya' },
  { to: '/contact', label: 'Aloqa' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled ? 'glass-dark shadow-2xl' : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <GraduationCap size={22} className="text-white" />
            </div>
            <div>
              <div className="font-black text-white text-lg leading-none">ELITA</div>
              <div className="text-xs font-medium text-blue-300 leading-none tracking-widest">SCHOOL</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Phone CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+998991234567"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-amber-500/30 hover:shadow-amber-400/40 hover:scale-105"
            >
              <Phone size={15} />
              <span>Bog'lanish</span>
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden glass-dark border-t border-white/10 px-4 py-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <a
            href="tel:+998991234567"
            className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-amber-500 text-white font-semibold text-sm"
          >
            <Phone size={16} />
            Bog'lanish
          </a>
        </div>
      )}
    </header>
  )
}
