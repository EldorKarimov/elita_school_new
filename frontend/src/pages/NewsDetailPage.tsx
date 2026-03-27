import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getNewsDetail } from '@/api/content'
import type { NewsDetail, News } from '@/types'
import { Calendar, Eye, ArrowLeft, ArrowRight, Share2, Bookmark, Newspaper } from 'lucide-react'
import { formatDate } from '@/lib/utils'

function LatestNewsCard({ news }: { news: News }) {
  return (
    <Link
      to={`/news/${news.slug}`}
      className="group flex gap-4 p-4 rounded-2xl transition-all hover:bg-blue-50/50 border border-transparent hover:border-blue-100"
    >
      <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
        {news.main_image ? (
          <img src={news.main_image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-blue-500 opacity-20">
             <Newspaper size={24} />
          </div>
        )}
      </div>
      <div>
        <h4 className="text-sm font-black line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug mb-2" style={{ color: '#0f172a' }}>
          {news.title}
        </h4>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
           <Calendar size={12} className="text-blue-400" />
           {formatDate(news.publish_date)}
        </div>
      </div>
    </Link>
  )
}

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [news, setNews] = useState<NewsDetail | null>(null)
  const [latestNews, setLatestNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      setLoading(true)
      getNewsDetail(slug).then((data) => {
        setNews(data.news)
        setLatestNews(data.latest_news)
      }).finally(() => setLoading(false))
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
        <div className="text-8xl mb-8">📰</div>
        <h2 className="text-3xl font-black text-slate-950 mb-4 tracking-tighter">Yangilik topilmadi</h2>
        <p className="text-slate-500 font-medium mb-10 max-w-xs">Bu xabar o'chirilgan yoki manzili xato.</p>
        <Link to="/news" className="premium-button-primary px-10">
          Yangiliklarga qaytish
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Article Hero */}
      <section className="relative pt-40 pb-32 bg-ui-darker overflow-hidden">
        {/* Blurred Background Image */}
        {news.main_image && (
          <div className="absolute inset-0 opacity-20 blur-[100px] scale-110">
             <img src={news.main_image} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Link to="/news" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group font-black uppercase tracking-widest text-[10px]">
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
             Barcha yangiliklar
          </Link>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-6 mb-8">
               {news.category && (
                 <div className="px-4 py-2 rounded-xl bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/20">
                   {news.category.name}
                 </div>
               )}
               <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">
                  <Calendar size={14} className="text-blue-500" />
                  {formatDate(news.publish_date)}
               </div>
               <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">
                  <Eye size={14} className="text-blue-500" />
                  {news.views_count} ko'rilgan
               </div>
            </div>

            <h1 className="text-4xl sm:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-10 animate-reveal">
              {news.title}
            </h1>
            
            <div className="flex gap-4">
               <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                  <Share2 size={16} />
                  Ulashish
               </button>
               <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                  <Bookmark size={16} />
                  Saqlash
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="relative -mt-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main content */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[40px] p-8 sm:p-14 border border-slate-100 shadow-3xl shadow-slate-200/50">
                 {news.main_image && (
                   <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl border-4 border-slate-50">
                      <img src={news.main_image} alt={news.title} className="w-full h-auto object-cover" />
                   </div>
                 )}

                <div
                  className="prose prose-lg max-w-none text-slate-600 font-medium leading-[1.8] article-content"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />

                {/* Additional Gallery */}
                {news.additional_images.length > 0 && (
                  <div className="mt-16 pt-16 border-t border-slate-50">
                    <h3 className="text-2xl font-black text-slate-950 mb-8 tracking-tight">Voqeadan lavhalar</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {news.additional_images.map((img) => (
                        <div key={img.id} className="group relative aspect-square rounded-[32px] overflow-hidden bg-slate-100 border-4 border-slate-50 shadow-xl">
                          <img src={img.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar: latest news */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 shadow-2xl shadow-slate-200/30">
                <h3 className="text-xl font-black text-slate-950 mb-8 flex items-center gap-3">
                   <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                   So'nggi yangiliklar
                </h3>
                <div className="space-y-4">
                  {latestNews.map((n) => <LatestNewsCard key={n.id} news={n} />)}
                </div>
                
                <Link to="/news" className="mt-10 w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
                   Barcha yangiliklar
                   <ArrowRight size={16} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
