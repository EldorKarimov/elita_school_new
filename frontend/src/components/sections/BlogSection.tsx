import { Link } from 'react-router-dom'
import { ArrowRight, User, Bookmark } from 'lucide-react'
import type { Blog } from '@/types'
import { formatDate } from '@/lib/utils'

export default function BlogSection({ blogs }: { blogs: Blog[] }) {
  if (!blogs || blogs.length === 0) return null

  return (
    <section className="section-spacing bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="section-label bg-blue-600/10 text-blue-600 border-blue-600/10 mb-6">Blog & Maqolalar</div>
            <h2 className="text-4xl sm:text-6xl font-black text-slate-950 leading-[1.1] tracking-tighter">
              Bilim ulashish — <br />
              <span className="text-blue-600">taraqqiyot</span> kalitidir
            </h2>
          </div>
          <Link 
            to="/blog" 
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 font-black text-[10px] uppercase tracking-widest hover:border-blue-600 transition-all shadow-xl shadow-slate-200/50"
          >
            Barcha maqolalar
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              to={`/blog/${blog.slug}`}
              className="group block premium-card overflow-hidden bg-white"
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
                     O'qish
                   </div>
                   <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                     <ArrowRight size={18} />
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
