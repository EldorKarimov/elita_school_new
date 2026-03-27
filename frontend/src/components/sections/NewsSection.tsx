import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Eye, Share2 } from 'lucide-react'
import type { News } from '@/types'
import { formatDate } from '@/lib/utils'

function NewsCard({ news, featured = false }: { news: News; featured?: boolean }) {
  return (
    <Link
      to={`/news/${news.slug}`}
      className={`group block premium-card overflow-hidden ${featured ? 'md:col-span-2' : ''}`}
    >
      <div
        className={`relative overflow-hidden ${featured ? 'h-80' : 'h-56'} bg-slate-100`}
      >
        {news.main_image ? (
          <img
            src={news.main_image}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600/20 to-indigo-600/20">
             <Calendar size={featured ? 64 : 48} className="text-blue-500 opacity-30" />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Category badge */}
        {news.category && (
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-blue-600 text-[10px] font-black text-white uppercase tracking-widest shadow-lg">
            {news.category.name}
          </div>
        )}

        <div className="absolute bottom-6 left-6 right-6">
           <div className="flex items-center gap-4 mb-3 text-white/70 text-[10px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5 group-hover:text-white transition-colors">
                <Calendar size={12} className="text-blue-400" />
                {formatDate(news.publish_date)}
              </span>
              <span className="flex items-center gap-1.5 group-hover:text-white transition-colors">
                <Eye size={12} className="text-blue-400" />
                {news.views_count}
              </span>
           </div>
           {featured && (
             <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight line-clamp-2 group-hover:text-blue-200 transition-colors">
               {news.title}
             </h3>
           )}
        </div>
      </div>
      
      {!featured && (
        <div className="p-6 bg-white">
          <h3 className="font-black text-lg text-slate-950 line-clamp-2 group-hover:text-blue-600 transition-colors mb-4 leading-snug">
            {news.title}
          </h3>
          <div className="flex items-center justify-between text-slate-400 group-hover:text-blue-600 transition-colors">
             <span className="text-[10px] font-black uppercase tracking-widest">Batafsil</span>
             <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      )}
    </Link>
  )
}

export default function NewsSection({ news }: { news: News[] }) {
  if (!news.length) return null

  const [featured, ...rest] = news

  return (
    <section className="section-spacing bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="section-label">Yangiliklar</div>
            <h2 className="text-4xl sm:text-6xl font-black text-slate-950 leading-[1.1] tracking-tighter">
              Maktabimiz <br />
              <span className="text-blue-600">so'nggi xabarlari</span>
            </h2>
          </div>
          <Link
            to="/news"
            className="premium-button-primary px-10 group"
          >
            Barcha yangiliklar
            <Share2 size={18} className="group-hover:rotate-12 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NewsCard news={featured} featured />
          <div className="grid grid-cols-1 gap-8">
            {rest.slice(0, 2).map((n) => (
              <NewsCard key={n.id} news={n} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
