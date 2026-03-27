import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogDetail } from '@/api/content'
import type { BlogDetail, Blog, Tag } from '@/types'
import { User, ArrowLeft, Bookmark, Share2, Calendar, Tag as TagIcon, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

function LatestBlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      to={`/blog/${blog.slug}`}
      className="group flex gap-4 p-4 rounded-2xl transition-all hover:bg-orange-50/50 border border-transparent hover:border-orange-100"
    >
      <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
        {blog.image ? (
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-orange-500 opacity-20">
             <Bookmark size={24} />
          </div>
        )}
      </div>
      <div>
        <h4 className="text-sm font-black line-clamp-2 group-hover:text-orange-600 transition-colors leading-snug mb-2" style={{ color: '#0f172a' }}>
          {blog.title}
        </h4>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
           <User size={12} className="text-orange-400" />
           {blog.author}
        </div>
      </div>
    </Link>
  )
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [blog, setBlog] = useState<BlogDetail | null>(null)
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([])
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      setLoading(true)
      getBlogDetail(slug).then((data) => {
        setBlog(data.blog)
        setLatestBlogs(data.latest_blogs)
        setAllTags(data.all_tags)
      }).finally(() => setLoading(false))
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-orange-500/10 border-t-orange-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
        <div className="text-8xl mb-8">📝</div>
        <h2 className="text-3xl font-black text-slate-950 mb-4 tracking-tighter">Maqola topilmadi</h2>
        <p className="text-slate-500 font-medium mb-10 max-w-xs">Ushbu maqola o'chirilgan yoki manzili xato.</p>
        <Link to="/blog" className="premium-button-primary px-10 border-orange-500 bg-orange-600 hover:bg-orange-700">
          Blogga qaytish
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Article Hero */}
      <section className="relative pt-40 pb-32 bg-slate-950 overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600/5 blur-[120px] rounded-full translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-600/5 blur-[120px] rounded-full -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group font-black uppercase tracking-widest text-[10px]">
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
             Blog sahifasiga qaytish
          </Link>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-6 mb-8">
               <div className="flex gap-2">
                 {blog.tags.map((t) => (
                    <div key={t.slug} className="px-3 py-1.5 rounded-xl bg-orange-500 text-white font-black text-[9px] uppercase tracking-widest shadow-xl shadow-orange-500/20">
                      #{t.name}
                    </div>
                 ))}
               </div>
               <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">
                  <Calendar size={14} className="text-orange-400" />
                  {formatDate(blog.created_at)}
               </div>
            </div>

            <h1 className="text-4xl sm:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-10 animate-reveal">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4 p-2 pl-2 pr-6 rounded-full bg-white/5 border border-white/10 w-fit">
               <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg overflow-hidden">
                  <User size={24} />
               </div>
               <div>
                  <div className="text-[10px] font-black text-white uppercase tracking-widest">{blog.author}</div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Muallif</div>
               </div>
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
                 {blog.image && (
                   <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl border-4 border-slate-50">
                      <img src={blog.image} alt={blog.title} className="w-full h-auto object-cover" />
                   </div>
                 )}

                <div
                  className="prose prose-lg max-w-none text-slate-600 font-medium leading-[1.8] article-content"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                
                <div className="mt-16 pt-10 border-t border-slate-50 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ulashish:</span>
                      <div className="flex gap-2">
                         {[Share2, Bookmark].map((Icon, i) => (
                           <button key={i} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center">
                              <Icon size={18} />
                           </button>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
              {/* Latest */}
              <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 shadow-2xl shadow-slate-200/30">
                <h3 className="text-xl font-black text-slate-950 mb-8 flex items-center gap-3">
                   <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
                   So'nggi maqolalar
                </h3>
                <div className="space-y-4">
                  {latestBlogs.map((b) => <LatestBlogCard key={b.slug} blog={b} />)}
                </div>
                
                <Link to="/blog" className="mt-10 w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-orange-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20">
                   Barcha maqolalar
                   <ArrowRight size={16} />
                </Link>
              </div>

              {/* Tags Cloud */}
              {allTags.length > 0 && (
                <div className="p-8 rounded-[40px] bg-white border border-slate-100 shadow-2xl shadow-slate-200/30">
                  <h3 className="text-xl font-black text-slate-950 mb-8 flex items-center gap-3">
                    <TagIcon size={20} className="text-orange-500" />
                    Teglar
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((t) => (
                      <Link
                        key={t.slug}
                        to={`/blog?tag=${t.slug}`}
                        className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-tighter hover:bg-orange-50 hover:text-orange-600 hover:border-orange-100 transition-all"
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
      </section>
    </div>
  )
}
