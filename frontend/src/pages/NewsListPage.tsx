import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getNews, getNewsCategories } from '@/api/content'
import type { News, NewsCategory } from '@/types'
import { Calendar, Eye, ChevronLeft, ChevronRight, Newspaper, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

function NewsCard({ news }: { news: News }) {
  return (
    <Link
      to={`/news/${news.slug}`}
      className="group block premium-card overflow-hidden bg-white"
    >
      <div className="relative h-64 overflow-hidden bg-slate-100">
        {news.main_image ? (
          <img
            src={news.main_image}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600/20 to-indigo-600/20 text-blue-500 opacity-30">
             <Newspaper size={48} />
          </div>
        )}
        
        {/* Category badge */}
        {news.category && (
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-blue-600 text-[10px] font-black text-white uppercase tracking-widest shadow-lg">
            {news.category.name}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-8">
        <div className="flex items-center gap-4 mb-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
           <span className="flex items-center gap-1.5">
             <Calendar size={12} className="text-blue-500" />
             {formatDate(news.publish_date)}
           </span>
           <span className="flex items-center gap-1.5">
             <Eye size={12} className="text-blue-500" />
             {news.views_count}
           </span>
        </div>

        <h3 className="font-black text-xl text-slate-950 line-clamp-2 group-hover:text-blue-600 transition-colors mb-6 leading-tight h-14">
          {news.title}
        </h3>

        <div className="flex items-center justify-between pt-6 border-t border-slate-50 text-slate-400 group-hover:text-blue-600 transition-colors">
           <span className="text-[10px] font-black uppercase tracking-[0.2em]">Batafsil ma'lumot</span>
           <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}

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
        setNews(data?.results || [])
        setTotalCount(data?.count || 0)
      })
      .finally(() => setLoading(false))
  }, [page, activeCategory])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  const handleCategory = (slug: string) => {
    setActiveCategory(slug)
    setPage(1)
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-ui-darker overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="section-label bg-white/5 text-blue-400 border-white/10 mb-8">Yangiliklar</div>
            <h1 className="text-5xl sm:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-8">
              Maktabimiz <span className="text-gradient">hayoti</span> va muhim voqealar
            </h1>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-3 mt-12">
              <button
                onClick={() => handleCategory('')}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  !activeCategory 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                Barchasi
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategory(cat.slug)}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat.slug 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-[40px] overflow-hidden bg-slate-50 h-[450px] animate-pulse" />
              ))}
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-32">
              <div className="text-6xl mb-8">📰</div>
              <h3 className="text-2xl font-black text-slate-950 mb-2">Yangiliklar topilmadi</h3>
              <p className="text-slate-500 font-medium">Bu ruknda hozircha hech qanday ma'lumot yo'q.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
                {news.map((item) => (
                  <NewsCard key={item.slug} news={item} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-slate-50 disabled:hover:text-slate-400 shadow-sm"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-14 h-14 rounded-2xl text-sm font-black transition-all ${
                        page === i + 1 
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20 scale-110' 
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-slate-50 disabled:hover:text-slate-400 shadow-sm"
                  >
                    <ChevronRight size={24} />
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
