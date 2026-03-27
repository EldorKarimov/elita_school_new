import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBlogs, getBlogTags } from '@/api/content'
import type { Blog, Tag } from '@/types'
import { User, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [activeTag, setActiveTag] = useState<string>('')
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const PAGE_SIZE = 9

  useEffect(() => {
    getBlogTags().then(setTags)
  }, [])

  useEffect(() => {
    setLoading(true)
    getBlogs(page, activeTag || undefined)
      .then((data) => {
        setBlogs(data.results)
        setTotalCount(data.count)
      })
      .finally(() => setLoading(false))
  }, [page, activeTag])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div>
      <div className="pt-32 pb-12 text-white" style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-5xl font-black mb-4">Blog</h1>
          <p className="text-lg max-w-xl" style={{ color: '#93c5fd' }}>
            Ta'lim, fan va hayot haqida foydali maqolalar
          </p>
          <div className="flex flex-wrap gap-2 mt-8">
            <button
              onClick={() => { setActiveTag(''); setPage(1) }}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ background: !activeTag ? '#3b82f6' : 'rgba(255,255,255,0.1)', color: 'white' }}
            >
              Barchasi
            </button>
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => { setActiveTag(tag.slug); setPage(1) }}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: activeTag === tag.slug ? '#f59e0b' : 'rgba(255,255,255,0.1)',
                  color: 'white',
                }}
              >
                #{tag.name}
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
                  <div className="skeleton h-48" />
                  <div className="p-5 space-y-3">
                    <div className="skeleton h-4 w-3/4" />
                    <div className="skeleton h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-lg font-semibold" style={{ color: '#64748b' }}>Maqolalar topilmadi</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {blogs.map((blog) => (
                  <Link
                    key={blog.id}
                    to={`/blog/${blog.slug}`}
                    className="group block rounded-2xl overflow-hidden card-hover bg-white shadow-md"
                    style={{ border: '1px solid #e2e8f0' }}
                  >
                    <div className="relative h-48 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)' }}>
                      {blog.image && (
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex gap-1.5">
                        {blog.tags.slice(0, 2).map((t) => (
                          <span key={t.id} className="text-xs px-2.5 py-0.5 rounded-full font-medium text-white" style={{ background: 'rgba(245,158,11,0.85)' }}>
                            #{t.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#eff6ff' }}>
                          <User size={11} style={{ color: '#3b82f6' }} />
                        </div>
                        <span className="text-xs font-medium" style={{ color: '#64748b' }}>{blog.author}</span>
                        <span className="text-xs" style={{ color: '#94a3b8' }}>•</span>
                        <span className="text-xs" style={{ color: '#94a3b8' }}>{formatDate(blog.created_at)}</span>
                      </div>
                      <h3 className="font-bold text-base line-clamp-2 group-hover:text-blue-600 transition-colors" style={{ color: '#0f172a' }}>
                        {blog.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>

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
