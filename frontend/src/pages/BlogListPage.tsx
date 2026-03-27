import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBlogs, getBlogTags } from '@/api/content'
import type { Blog, Tag } from '@/types'
import { User, ChevronLeft, ChevronRight, Bookmark, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      key={blog.slug}
      to={`/blog/${blog.slug}`}
      className="group block h-full premium-card overflow-hidden bg-white"
    >
      <div className="relative h-64 overflow-hidden bg-slate-100">
        {blog.image ? (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-blue-500 opacity-30">
             <Bookmark size={48} />
          </div>
        )}
        
        {/* Tags */}
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          {blog.tags.slice(0, 2).map((tag) => (
            <span
              key={tag.id}
              className="text-[10px] px-2.5 py-1 rounded-lg font-black bg-white/90 backdrop-blur-md text-slate-900 uppercase tracking-tighter shadow-sm"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-8">
        <div className="flex items-center gap-3 mb-6">
           <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
             <User size={16} />
           </div>
           <div className="leading-none">
              <div className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{blog.author}</div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">{formatDate(blog.created_at)}</div>
           </div>
        </div>

        <h3 className="font-black text-xl text-slate-950 line-clamp-2 group-hover:text-blue-600 transition-colors mb-6 leading-tight h-14">
          {blog.title}
        </h3>

        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
           <div className="flex items-center gap-1.5 text-blue-600 font-black text-[10px] uppercase tracking-widest">
             Maqolani o'qish
           </div>
           <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
             <ArrowRight size={18} />
           </div>
        </div>
      </div>
    </Link>
  )
}

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
        setBlogs(data?.results || [])
        setTotalCount(data?.count || 0)
      })
      .finally(() => setLoading(false))
  }, [page, activeTag])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-ui-darker overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_var(--color-brand-600)_0%,_transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="section-label bg-white/5 text-blue-400 border-white/10 mb-8">Maqolalar</div>
            <h1 className="text-5xl sm:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-8">
              Ta'lim va <span className="text-gradient">rivojlanish</span> blogi
            </h1>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-3 mt-12">
              <button
                onClick={() => { setActiveTag(''); setPage(1) }}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  !activeTag 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                Barchasi
              </button>
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => { setActiveTag(tag.slug); setPage(1) }}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    activeTag === tag.slug 
                    ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20' 
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  #{tag.name}
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
          ) : (blogs?.length || 0) === 0 ? (
            <div className="text-center py-32">
              <div className="text-6xl mb-8">📝</div>
              <h3 className="text-2xl font-black text-slate-950 mb-2">Maqolalar topilmadi</h3>
              <p className="text-slate-500 font-medium">Hozircha bu ruknda maqola mavjud emas.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {blogs.map((blog) => (
                  <BlogCard key={blog.slug} blog={blog} />
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
