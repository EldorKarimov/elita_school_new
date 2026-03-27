import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getNews, getNewsCategories } from '@/api/content'
import type { News, NewsCategory } from '@/types'
import { Calendar, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function NewsListPage() {
  const [news, setNews] = useState<News[]>([])
  const [categories, setCategories] = useState<NewsCategory[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const PAGE_SIZE = 9

  useEffect(() => {
    getNewsCategories().then(setCategories)
  }, [])

  useEffect(() => {
    setLoading(true)
    getNews(page, activeCategory || undefined)
      .then((data) => {
        setNews(data.results)
        setTotalCount(data.count)
      })
      .finally(() => setLoading(false))
  }, [page, activeCategory])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  const handleCategory = (slug: string) => {
    setActiveCategory(slug)
    setPage(1)
  }

  return (
    <div>
      <div
        className="pt-32 pb-12 text-white"
        style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-5xl font-black mb-4">Yangiliklar</h1>
          <p className="text-lg max-w-xl" style={{ color: '#93c5fd' }}>
            Maktabimiz va ta'lim dunyosidagi so'nggi yangiliklar
          </p>
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mt-8">
            <button
              onClick={() => handleCategory('')}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: !activeCategory ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                color: 'white',
              }}
            >
              Barchasi
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.slug)}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: activeCategory === cat.slug ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                  color: 'white',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section-padding" style={{ background: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-md">
                  <div className="skeleton h-52" />
                  <div className="p-5 space-y-3">
                    <div className="skeleton h-4 w-3/4" />
                    <div className="skeleton h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📰</div>
              <p className="text-lg font-semibold" style={{ color: '#64748b' }}>Yangiliklar topilmadi</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {news.map((item) => (
                  <Link
                    key={item.id}
                    to={`/news/${item.slug}`}
                    className="group block rounded-2xl overflow-hidden card-hover bg-white shadow-md"
                    style={{ border: '1px solid #e2e8f0' }}
                  >
                    <div className="relative h-52 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)' }}>
                      {item.main_image && (
                        <img
                          src={item.main_image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {item.category && (
                        <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-semibold text-white" style={{ background: 'rgba(59,130,246,0.85)' }}>
                          {item.category.name}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="flex items-center gap-1 text-xs" style={{ color: '#94a3b8' }}>
                          <Calendar size={11} /> {formatDate(item.publish_date)}
                        </span>
                        <span className="flex items-center gap-1 text-xs" style={{ color: '#94a3b8' }}>
                          <Eye size={11} /> {item.views_count}
                        </span>
                      </div>
                      <h3 className="font-bold text-base line-clamp-2 group-hover:text-blue-600 transition-colors" style={{ color: '#0f172a' }}>
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-40 transition-all hover:scale-105"
                    style={{ background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe' }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className="w-10 h-10 rounded-xl text-sm font-bold transition-all hover:scale-105"
                      style={{
                        background: page === i + 1 ? '#1e40af' : '#eff6ff',
                        color: page === i + 1 ? 'white' : '#1e40af',
                        border: '1px solid #bfdbfe',
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-40 transition-all hover:scale-105"
                    style={{ background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe' }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
