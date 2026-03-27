import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Eye } from 'lucide-react'
import type { News } from '@/types'
import { formatDate } from '@/lib/utils'

function NewsCard({ news, featured = false }: { news: News; featured?: boolean }) {
  return (
    <Link
      to={`/news/${news.slug}`}
      className={`group block rounded-2xl overflow-hidden card-hover bg-white shadow-md ${featured ? 'md:col-span-2' : ''}`}
      style={{ border: '1px solid #e2e8f0' }}
    >
      <div
        className={`relative overflow-hidden ${featured ? 'h-64' : 'h-48'}`}
        style={{ background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)' }}
      >
        {news.main_image && (
          <img
            src={news.main_image}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {news.category && (
          <span
            className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full text-white"
            style={{ background: 'rgba(59,130,246,0.85)' }}
          >
            {news.category.name}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-4 mb-3">
          <span className="flex items-center gap-1 text-xs" style={{ color: '#94a3b8' }}>
            <Calendar size={12} />
            {formatDate(news.publish_date)}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: '#94a3b8' }}>
            <Eye size={12} />
            {news.views_count}
          </span>
        </div>
        <h3
          className={`font-bold line-clamp-2 group-hover:text-blue-600 transition-colors ${featured ? 'text-xl' : 'text-base'}`}
          style={{ color: '#0f172a' }}
        >
          {news.title}
        </h3>
      </div>
    </Link>
  )
}

export default function NewsSection({ news }: { news: News[] }) {
  if (!news.length) return null

  const [featured, ...rest] = news

  return (
    <section className="section-padding" style={{ background: '#f8fafc' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <span className="section-badge mb-3">So'nggi yangiliklar</span>
            <h2 className="text-4xl font-black" style={{ color: '#0f172a' }}>
              <span className="text-gradient">Yangiliklar</span> va voqealar
            </h2>
          </div>
          <Link
            to="/news"
            className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-blue-600 flex-shrink-0"
            style={{ color: '#3b82f6' }}
          >
            Barchasi
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NewsCard news={featured} featured />
          <div className="flex flex-col gap-6">
            {rest.slice(0, 2).map((n) => (
              <NewsCard key={n.id} news={n} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
