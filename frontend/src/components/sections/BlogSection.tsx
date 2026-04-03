import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useBlogList } from '@/hooks/useContent'
import { mediaUrl } from '@/lib/utils'
import type { BlogList } from '@/types'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('uz-UZ', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

// Katta featured karta (birinchi)
function FeaturedCard({ blog }: { blog: BlogList }) {
  return (
    <Link to={`/blogs/${blog.slug}`} className="group flex flex-col lg:flex-row gap-0 overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-shadow hover:shadow-lg">
      {/* Image */}
      <div className="relative h-56 lg:h-auto lg:w-1/2 overflow-hidden">
        <img
          src={mediaUrl(blog.image)}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {blog.category && (
          <span className="absolute left-4 top-4 rounded-full bg-[#274c8f] px-3 py-1 text-xs font-semibold text-white">
            {blog.category.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-7">
        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {blog.tags.slice(0, 3).map(tag => (
              <span key={tag.uuid} className="rounded-full bg-[#274c8f]/8 px-3 py-1 text-xs font-medium text-[#274c8f]">
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-2xl font-bold leading-snug text-gray-900 line-clamp-2 group-hover:text-[#274c8f] transition-colors">
          {blog.title}
        </h3>

        {blog.excerpt && (
          <p className="mt-3 text-sm leading-relaxed text-gray-500 line-clamp-3">
            {blog.excerpt}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          {blog.author ? (
            <div className="flex items-center gap-3">
              <img
                src={mediaUrl(blog.author.image)}
                alt={blog.author.full_name}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-[#274c8f]/15"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">{blog.author.full_name}</p>
                <p className="text-xs text-gray-400">{blog.author.position}</p>
              </div>
            </div>
          ) : <div />}
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <CalendarIcon />
            {formatDate(blog.created_at)}
          </div>
        </div>
      </div>
    </Link>
  )
}

// Vertikal kichik kartalar (qolganlar)
function BlogCard({ blog, index }: { blog: BlogList; index: number }) {
  const accents = ['#274c8f', '#1a7a5e', '#8b4513', '#6b21a8']
  const accent = accents[index % accents.length]

  return (
    <Link to={`/blogs/${blog.slug}`} className="group flex flex-col overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
      {/* Accent top bar */}
      <div className="h-1 w-full shrink-0" style={{ backgroundColor: accent }} />

      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={mediaUrl(blog.image)}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {blog.category && (
          <span className="mb-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>
            {blog.category.name}
          </span>
        )}
        <h4 className="flex-1 text-sm font-bold leading-snug text-gray-900 line-clamp-2 group-hover:text-[#274c8f] transition-colors">
          {blog.title}
        </h4>

        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {blog.tags.slice(0, 2).map(tag => (
              <span key={tag.uuid} className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
          {blog.author ? (
            <>
              <img
                src={mediaUrl(blog.author.image)}
                alt={blog.author.full_name}
                className="h-6 w-6 rounded-full object-cover"
              />
              <span className="flex-1 text-xs font-medium text-gray-600 truncate">{blog.author.full_name}</span>
            </>
          ) : <div className="flex-1" />}
          <span className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
            <CalendarIcon />
            {formatDate(blog.created_at)}
          </span>
        </div>
      </div>
    </Link>
  )
}

// Skeletons
function SkeletonFeatured() {
  return (
    <div className="flex flex-col lg:flex-row overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="h-56 lg:h-48 lg:w-1/2 animate-pulse bg-gray-100" />
      <div className="flex-1 p-7 space-y-3">
        <div className="h-3 w-24 animate-pulse rounded-full bg-gray-100" />
        <div className="h-6 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
      <div className="h-1 bg-gray-100" />
      <div className="h-40 animate-pulse bg-gray-100" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-16 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-3/4 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  )
}

export function BlogSection() {
  const { t } = useTranslation()
  const { data, isLoading } = useBlogList({ pageSize: 4 })

  const blogs = data?.data ?? []
  const [featured, ...rest] = blogs

  if (!isLoading && blogs.length === 0) return null

  return (
    <section className="relative overflow-hidden py-20"
      style={{ background: 'linear-gradient(135deg, #0f2557 0%, #1a3a7c 40%, #0e4d6e 100%)' }}
    >
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />
      {/* Glow blobs */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#274c8f]/40 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#0e7490]/30 blur-3xl" />


      <div className="relative z-10 container mx-auto px-4">

        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white">
              {t('blog_section.label')}
            </span>
            <h2 className="text-3xl font-extrabold text-white md:text-4xl">
              {t('blog_section.title')}
            </h2>
            <p className="mt-2 text-base text-white/70">
              {t('blog_section.subtitle')}
            </p>
          </div>
          <Link
            to="/blogs"
            className="flex shrink-0 items-center gap-2 rounded-lg bg-[#274c8f] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#1e3a6e] shadow-sm"
          >
            {t('blog_section.see_all')}
            <ArrowIcon />
          </Link>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col gap-5">
            <SkeletonFeatured />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Featured row */}
            {featured && <FeaturedCard blog={featured} />}

            {/* Cards row */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.slice(0, 3).map((b, i) => (
                <BlogCard key={b.uuid} blog={b} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function CalendarIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}
