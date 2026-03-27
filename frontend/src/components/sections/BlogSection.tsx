import { Link } from 'react-router-dom'
import { ArrowRight, User } from 'lucide-react'
import type { Blog } from '@/types'
import { formatDate } from '@/lib/utils'

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      to={`/blog/${blog.slug}`}
      className="group block rounded-2xl overflow-hidden card-hover bg-white shadow-md"
      style={{ border: '1px solid #e2e8f0' }}
    >
      <div className="relative h-48 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)' }}>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Tags */}
        <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
          {blog.tags.slice(0, 2).map((tag) => (
            <span
              key={tag.id}
              className="text-xs px-2.5 py-0.5 rounded-full font-medium text-white"
              style={{ background: 'rgba(245,158,11,0.85)' }}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: '#eff6ff' }}
          >
            <User size={11} style={{ color: '#3b82f6' }} />
          </div>
          <span className="text-xs font-medium" style={{ color: '#64748b' }}>{blog.author}</span>
          <span className="text-xs" style={{ color: '#cbd5e1' }}>•</span>
          <span className="text-xs" style={{ color: '#94a3b8' }}>{formatDate(blog.created_at)}</span>
        </div>
        <h3
          className="font-bold text-base line-clamp-2 group-hover:text-blue-600 transition-colors"
          style={{ color: '#0f172a' }}
        >
          {blog.title}
        </h3>
      </div>
    </Link>
  )
}

export default function BlogSection({ blogs }: { blogs: Blog[] }) {
  if (!blogs.length) return null

  return (
    <section className="section-padding" style={{ background: 'white' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <span className="section-badge mb-3">Foydali maqolalar</span>
            <h2 className="text-4xl font-black" style={{ color: '#0f172a' }}>
              <span className="text-gradient">Blog</span> va maqolalar
            </h2>
          </div>
          <Link
            to="/blog"
            className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-blue-600 flex-shrink-0"
            style={{ color: '#3b82f6' }}
          >
            Barchasi
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((b) => (
            <BlogCard key={b.id} blog={b} />
          ))}
        </div>
      </div>
    </section>
  )
}
