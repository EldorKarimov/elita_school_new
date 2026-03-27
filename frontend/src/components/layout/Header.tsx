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
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled 
          ? 'py-3 bg-slate-900/95 backdrop-blur-md shadow-2xl border-b border-white/5' 
          : 'py-5 bg-slate-900/40 backdrop-blur-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40 group-hover:scale-110 transition-all duration-300 ring-4 ring-blue-500/10">
              <GraduationCap size={24} className="text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-black text-white text-xl tracking-tighter">
                ELITA<span className="text-blue-500">.</span>
              </div>
              <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">SCHOOL</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-white/[0.03] rounded-2xl border border-white/[0.05] backdrop-blur-md">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) =>
                  cn(
                    'px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 relative group overflow-hidden',
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  )
                }
              >
                <span className="relative z-10">{link.label}</span>
                {!scrolled && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-blue-500 rounded-full transition-all group-hover:w-1/2" />
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+998991234567"
              className="flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-orange-600/30 hover:-translate-y-0.5"
            >
              <Phone size={16} fill="currentColor" />
              <span>Bog'lanish</span>
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 active:scale-90"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        'lg:hidden fixed inset-0 top-[72px] z-40 transition-all duration-500 ease-in-out',
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}>
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
        <div className={cn(
          'relative bg-slate-900 border-b border-white/10 px-4 py-8 shadow-2xl transition-transform duration-500',
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        )}>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link, idx) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: `${idx * 50}ms` }}
                className={({ isActive }) =>
                  cn(
                    'px-6 py-4 rounded-2xl text-lg font-bold transition-all block',
                    isActive
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-8 pt-8 border-t border-white/5">
            <a
              href="tel:+998991234567"
              className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-orange-500 text-white font-black text-lg shadow-xl shadow-orange-600/20"
            >
              <Phone size={20} fill="currentColor" />
              Bog'lanish
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
