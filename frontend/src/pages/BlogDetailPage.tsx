import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogDetail } from '@/api/content'
import type { BlogDetail, Blog, Tag } from '@/types'
import { User, ArrowLeft } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [blog, setBlog] = useState<BlogDetail | null>(null)
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([])
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      getBlogDetail(slug).then((data) => {
        setBlog(data.blog)
        setLatestBlogs(data.latest_blogs)
        setAllTags(data.all_tags)
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

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
        <div className="text-6xl">📝</div>
        <h2 className="text-xl font-bold">Maqola topilmadi</h2>
        <Link to="/blog" className="px-5 py-2.5 rounded-xl font-semibold text-white" style={{ background: '#1e40af' }}>
          Orqaga
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Cover */}
      <div className="pt-24 h-72 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)' }}>
        {blog.image && (
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover opacity-40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f8fafc]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Content */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-8 shadow-md" style={{ border: '1px solid #e2e8f0' }}>
              <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 hover:text-blue-600 transition-colors" style={{ color: '#64748b' }}>
                <ArrowLeft size={15} /> Blog
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((t) => (
                  <span key={t.id} className="text-xs px-3 py-1 rounded-full font-semibold text-white" style={{ background: '#f59e0b' }}>
                    #{t.name}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl font-black mb-5" style={{ color: '#0f172a' }}>{blog.title}</h1>

              {/* Author & date */}
              <div className="flex items-center gap-3 mb-6 pb-6" style={{ borderBottom: '1px solid #e2e8f0' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#eff6ff' }}>
                  <User size={14} style={{ color: '#3b82f6' }} />
                </div>
                <span className="text-sm font-semibold" style={{ color: '#334155' }}>{blog.author}</span>
                <span style={{ color: '#cbd5e1' }}>•</span>
                <span className="text-sm" style={{ color: '#94a3b8' }}>{formatDate(blog.created_at)}</span>
              </div>

              <div
                className="prose max-w-none text-base leading-relaxed"
                style={{ color: '#334155' }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Latest blogs */}
            <div className="rounded-2xl bg-white p-6 shadow-md" style={{ border: '1px solid #e2e8f0' }}>
              <h3 className="font-black text-lg mb-4" style={{ color: '#0f172a' }}>So'nggi maqolalar</h3>
              <div className="space-y-1">
                {latestBlogs.map((b) => (
                  <Link
                    key={b.id}
                    to={`/blog/${b.slug}`}
                    className="flex gap-3 p-3 rounded-xl transition-all hover:bg-amber-50 group"
                  >
                    <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden" style={{ background: '#1e3a8a' }}>
                      {b.image && <img src={b.image} alt={b.title} className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold line-clamp-2 group-hover:text-amber-600 transition-colors" style={{ color: '#0f172a' }}>
                        {b.title}
                      </p>
                      <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>{b.author}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* All tags */}
            {allTags.length > 0 && (
              <div className="rounded-2xl bg-white p-6 shadow-md" style={{ border: '1px solid #e2e8f0' }}>
                <h3 className="font-black text-lg mb-4" style={{ color: '#0f172a' }}>Teglar</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((t) => (
                    <Link
                      key={t.id}
                      to={`/blog?tag=${t.slug}`}
                      className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all hover:scale-105"
                      style={{ background: '#f1f5f9', color: '#475569' }}
                    >
                      #{t.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
