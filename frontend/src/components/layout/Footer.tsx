import { Link } from 'react-router-dom'
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Send,
} from 'lucide-react'

const footerLinks = {
  pages: [
    { to: '/', label: 'Bosh sahifa' },
    { to: '/about', label: 'Biz haqimizda' },
    { to: '/teachers', label: "O'qituvchilar" },
    { to: '/news', label: 'Yangiliklar' },
    { to: '/blog', label: 'Blog' },
    { to: '/gallery', label: 'Galereya' },
  ],
  contact: [
    { icon: Phone, text: '+998 99 123 45 67', href: 'tel:+998991234567' },
    { icon: Mail, text: 'info@elitaschool.uz', href: 'mailto:info@elitaschool.uz' },
    { icon: MapPin, text: "Toshkent sh., Chilonzor tumani", href: '#' },
  ],
  social: [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Send, href: '#', label: 'Telegram' },
  ],
}

export default function Footer() {
  return (
    <footer
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e2d4a 100%)' }}
      className="text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)' }}
              >
                <GraduationCap size={22} className="text-white" />
              </div>
              <div>
                <div className="font-black text-white text-xl leading-none">ELITA</div>
                <div className="text-xs font-medium tracking-widest" style={{ color: '#93c5fd' }}>SCHOOL</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
              Elita School — O'zbekistonning yetakchi ta'lim muassasalaridan biri. Sifatli ta'lim, tajribali o'qituvchilar va zamonaviy o'quv muhiti.
            </p>
            <div className="flex items-center gap-3">
              {footerLinks.social.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#93c5fd' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = '#1e40af'
                      ; (e.currentTarget as HTMLElement).style.color = '#ffffff'
                  }}
                  onMouseLeave={(e) => {
                    ; (e.currentTarget as HTMLElement).style.background = 'rgba(59, 130, 246, 0.15)'
                      ; (e.currentTarget as HTMLElement).style.color = '#93c5fd'
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Sahifalar</h3>
            <ul className="space-y-3">
              {footerLinks.pages.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors duration-200 hover:text-blue-400 flex items-center gap-2"
                    style={{ color: '#94a3b8' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: '#3b82f6', flexShrink: 0 }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Aloqa</h3>
            <ul className="space-y-4">
              {footerLinks.contact.map(({ icon: Icon, text, href }) => (
                <li key={text}>
                  <a
                    href={href}
                    className="flex items-start gap-3 text-sm transition-colors hover:text-blue-400"
                    style={{ color: '#94a3b8' }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(59, 130, 246, 0.15)' }}
                    >
                      <Icon size={14} style={{ color: '#60a5fa' }} />
                    </div>
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Yangiliklar</h3>
            <p className="text-sm mb-4" style={{ color: '#94a3b8' }}>
              Maktabimiz yangiliklari va tadbirlaridan xabardor bo'ling.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email manzilingiz"
                className="flex-1 px-3 py-2.5 rounded-lg text-sm outline-none border border-transparent focus:border-blue-500 transition-colors"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#e2e8f0' }}
              />
              <button
                className="px-3 py-2.5 rounded-lg font-semibold text-sm transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)', color: 'white' }}
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Divider + copyright */}
        <div
          className="mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}
        >
          <p>© {new Date().getFullYear()} Elita School. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <span style={{ color: '#ef4444' }}>❤</span>
            <span>in Uzbekistan</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
