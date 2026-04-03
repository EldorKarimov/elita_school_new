import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useNewsList } from '@/hooks/useContent'
import { mediaUrl } from '@/lib/utils'
import type { NewsList } from '@/types'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('uz-UZ', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

// Birinchi karta — katta (featured)
function FeaturedCard({ news }: { news: NewsList }) {
  return (
    <Link
      to={`/news/${news.slug}`}
      className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl"
    >
      {/* Image */}
      <img
        src={mediaUrl(news.main_image)}
        alt={news.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative mt-auto p-6">
        {news.category && (
          <span className="mb-3 inline-block rounded-full bg-[#274c8f] px-3 py-1 text-xs font-semibold text-white">
            {news.category.name}
          </span>
        )}
        <h3 className="mb-2 text-xl font-bold leading-snug text-white line-clamp-2 group-hover:text-white/90">
          {news.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-white/60">
          <CalendarIcon />
          <span>{formatDate(news.publish_date)}</span>
          <span>·</span>
          <EyeIcon />
          <span>{news.views_count}</span>
        </div>
      </div>
    </Link>
  )
}

// Kichik kartalar
function SmallCard({ news }: { news: NewsList }) {
  return (
    <Link
      to={`/news/${news.slug}`}
      className="group flex gap-4 rounded-xl bg-white/5 p-3 transition-colors hover:bg-white/10"
    >
      {/* Thumbnail */}
      <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg">
        <img
          src={mediaUrl(news.main_image)}
          alt={news.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Text */}
      <div className="flex min-w-0 flex-col justify-center gap-1.5">
        {news.category && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#7fa8d4]">
            {news.category.name}
          </span>
        )}
        <p className="text-sm font-semibold leading-snug text-white/90 line-clamp-2 group-hover:text-white">
          {news.title}
        </p>
        <span className="flex items-center gap-1.5 text-xs text-white/40">
          <CalendarIcon />
          {formatDate(news.publish_date)}
        </span>
      </div>
    </Link>
  )
}

function SkeletonFeatured() {
  return <div className="min-h-[420px] animate-pulse rounded-2xl bg-white/5" />
}
function SkeletonSmall() {
  return (
    <div className="flex gap-4 rounded-xl bg-white/5 p-3">
      <div className="h-20 w-24 shrink-0 animate-pulse rounded-lg bg-white/10" />
      <div className="flex flex-1 flex-col gap-2 py-1">
        <div className="h-3 w-16 animate-pulse rounded bg-white/10" />
        <div className="h-4 w-full animate-pulse rounded bg-white/10" />
        <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
      </div>
    </div>
  )
}

export function NewsSection() {
  const { t } = useTranslation()
  const { data, isLoading } = useNewsList({ pageSize: 4 })

  const news = data?.data ?? []
  const [featured, ...rest] = news

  return (
    <section className="py-20" style={{ background: 'linear-gradient(160deg, #1a3a7c 0%, #0f2557 50%, #0e4d6e 100%)' }}>
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/70">
              {t('news_section.label')}
            </span>
            <h2 className="text-3xl font-extrabold text-white md:text-4xl">
              {t('news_section.title')}
            </h2>
          </div>
          <Link
            to="/news"
            className="flex shrink-0 items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/80 transition-all hover:border-white/40 hover:text-white"
          >
            {t('news_section.see_all')}
            <ArrowIcon />
          </Link>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid gap-5 lg:grid-cols-2">
            <SkeletonFeatured />
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map(i => <SkeletonSmall key={i} />)}
            </div>
          </div>
        ) : news.length === 0 ? null : (
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Featured */}
            {featured && <FeaturedCard news={featured} />}

            {/* Small cards */}
            <div className="flex flex-col gap-4">
              {rest.slice(0, 3).map(n => (
                <SmallCard key={n.uuid} news={n} />
              ))}

              {/* View all — mobile */}
              <Link
                to="/news"
                className="mt-1 flex items-center justify-center gap-2 rounded-xl border border-white/15 py-3 text-sm font-semibold text-white/60 transition hover:border-white/30 hover:text-white/90 lg:hidden"
              >
                {t('news_section.see_all')} <ArrowIcon />
              </Link>
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
function EyeIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
