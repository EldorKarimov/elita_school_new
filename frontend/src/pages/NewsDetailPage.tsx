import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getNewsDetail } from '@/api/content'
import type { NewsDetail, News } from '@/types'
import { Calendar, Eye, ArrowLeft, Tag } from 'lucide-react'
import { formatDate } from '@/lib/utils'

function LatestNewsCard({ news }: { news: News }) {
  return (
    <Link
      to={`/news/${news.slug}`}
      className="flex gap-3 p-3 rounded-xl transition-all hover:bg-blue-50 group"
    >
      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden" style={{ background: '#1e3a8a' }}>
        {news.main_image && (
          <img src={news.main_image} alt={news.title} className="w-full h-full object-cover" />
        )}
      </div>
      <div>
        <p className="text-sm font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors" style={{ color: '#0f172a' }}>
          {news.title}
        </p>
        <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>{formatDate(news.publish_date)}</p>
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
      getNewsDetail(slug).then((data) => {
        setNews(data.news)
        setLatestNews(data.latest_news)
      }).finally(() => setLoading(false))
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin" />
      </div>
    )
  }

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
        <div className="text-6xl">📰</div>
        <h2 className="text-xl font-bold">Yangilik topilmadi</h2>
        <Link to="/news" className="px-5 py-2.5 rounded-xl font-semibold text-white" style={{ background: '#1e40af' }}>
          Orqaga
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Cover image */}
      <div
        className="pt-24 h-80 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)' }}
      >
        {news.main_image && (
          <img src={news.main_image} alt={news.title} className="w-full h-full object-cover opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f8fafc]" />
      </div>

      {/* Article */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-8 shadow-md" style={{ border: '1px solid #e2e8f0' }}>
              {/* Breadcrumb */}
              <Link
                to="/news"
                className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 hover:text-blue-600 transition-colors"
                style={{ color: '#64748b' }}
              >
                <ArrowLeft size={15} /> Yangiliklar
              </Link>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                {news.category && (
                  <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ background: '#3b82f6' }}>
                    <Tag size={11} /> {news.category.name}
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-xs" style={{ color: '#94a3b8' }}>
                  <Calendar size={13} /> {formatDate(news.publish_date)}
                </span>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: '#94a3b8' }}>
                  <Eye size={13} /> {news.views_count} marta ko'rilgan
                </span>
              </div>

              <h1 className="text-3xl font-black mb-6" style={{ color: '#0f172a' }}>{news.title}</h1>

              <div
                className="prose max-w-none text-base leading-relaxed"
                style={{ color: '#334155' }}
                dangerouslySetInnerHTML={{ __html: news.content }}
              />

              {/* Additional images */}
              {news.additional_images.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-bold mb-4" style={{ color: '#0f172a' }}>Qo'shimcha rasmlar</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {news.additional_images.map((img) => (
                      <img key={img.id} src={img.image} alt="" className="w-full h-36 object-cover rounded-xl" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: latest news */}
          <div>
            <div className="rounded-2xl bg-white p-6 shadow-md sticky top-24" style={{ border: '1px solid #e2e8f0' }}>
              <h3 className="font-black text-lg mb-4" style={{ color: '#0f172a' }}>So'nggi yangiliklar</h3>
              <div className="space-y-1">
                {latestNews.map((n) => <LatestNewsCard key={n.id} news={n} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
