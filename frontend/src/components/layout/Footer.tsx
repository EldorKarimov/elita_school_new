import { Link } from 'react-router-dom'
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Globe,
} from 'lucide-react'

const Facebook = Globe;
const Instagram = MessageCircle;
const Telegram = Send;

const footerLinks = {
  pages: [
    { name: 'Bosh sahifa', href: '/' },
    { name: 'Biz haqimizda', href: '/about' },
    { name: 'O\'qituvchilar', href: '/teachers' },
    { name: 'Galereya', href: '/gallery' },
  ],
  news: [
    { name: 'Yangiliklar', href: '/news' },
    { name: 'Blog', href: '/blog' },
    { name: 'Tadbirlar', href: '/news' },
    { name: 'Qabul 2024', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-ui-darker text-slate-400 overflow-hidden relative border-t border-white/5">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Section */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 max-w-sm">
            <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20 group-hover:scale-110 transition-transform">
                <GraduationCap size={28} />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">ELITA <span className="text-blue-500">SCHOOL</span></span>
            </Link>
            <p className="text-slate-400 font-medium leading-relaxed mb-10">
              Bizning maktabimizda har bir o'quvchining individual qobiliyatlarini rivojlantirish va ularni kelajak yetakchilariga aylantirish asosiy maqsadimizdir.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Telegram, href: '#' }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 hover:-translate-y-1 transition-all duration-300"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Cols */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-10">Sahifalar</h4>
            <ul className="space-y-4">
              {footerLinks.pages.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm font-bold hover:text-blue-500 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-10">Ma'lumotlar</h4>
            <ul className="space-y-4">
              {footerLinks.news.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm font-bold hover:text-blue-500 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-10">Aloqa</h4>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-500 flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Manzil</div>
                  <div className="text-sm font-medium leading-relaxed">Toshkent sh., Yunusobod tumani, 10-mavze</div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-500 flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Telefon</div>
                  <a href="tel:+998711234567" className="text-sm font-medium hover:text-blue-500 transition-colors">+998 71 123 45 67</a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-500 flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Email</div>
                  <a href="mailto:info@elitaschool.uz" className="text-sm font-medium hover:text-blue-500 transition-colors">info@elitaschool.uz</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="py-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-sm font-bold">
            © 2024 Elita School. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex gap-8">
            <Link to="#" className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Maxfiylik siyosati</Link>
            <Link to="#" className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Foydalanish shartlari</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
