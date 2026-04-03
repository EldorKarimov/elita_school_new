import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useNewsList, useNewsCategories } from '@/hooks/useContent'
import { mediaUrl } from '@/lib/utils'
import type { NewsList } from '@/types'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('uz-UZ', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

// --- Katta featured karta (birinchi sahifadagi birinchi yangilik) ---
function FeaturedNewsCard({ news }: { news: NewsList }) {
  return (
    <Link
      to={`/news/${news.slug}`}
      className="group relative flex h-[420px] flex-col overflow-hidden rounded-2xl"
    >
      <img
        src={mediaUrl(news.main_image)}
        alt={news.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      <div className="relative mt-auto p-6">
        {news.category && (
          <span className="mb-3 inline-block rounded-full bg-[#274c8f] px-3 py-1 text-xs font-bold text-white">
            {news.category.name}
          </span>
        )}
        <h2 className="mb-3 text-2xl font-extrabold leading-snug text-white line-clamp-2 group-hover:text-white/90 md:text-3xl">
          {news.title}
        </h2>
        <div className="flex items-center gap-3 text-xs text-white/60">
          <CalendarIcon />
          <span>{formatDate(news.publish_date)}</span>
          <span>·</span>
          <EyeIcon />
          <span>{news.views_count} marta o'qildi</span>
        </div>
      </div>
    </Link>
  )
}

// --- Oddiy karta ---
function NewsCard({ news }: { news: NewsList }) {
  return (
    <Link
      to={`/news/${news.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="relative overflow-hidden" style={{ paddingBottom: '56.25%' }}>
        <img
          src={mediaUrl(news.main_image)}
          alt={news.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {news.category && (
          <span className="absolute left-3 top-3 rounded-full bg-[#274c8f] px-2.5 py-1 text-[10px] font-bold text-white shadow">
            {news.category.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="flex-1 text-sm font-bold leading-snug text-gray-900 line-clamp-2 group-hover:text-[#274c8f] transition-colors">
          {news.title}
        </h3>
        <div className="mt-3 flex items-center gap-3 border-t border-gray-100 pt-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <CalendarIcon />
            {formatDate(news.publish_date)}
          </span>
          <span className="ml-auto flex items-center gap-1">
            <EyeIcon />
            {news.views_count}
          </span>
        </div>
      </div>
    </Link>
  )
}

// --- Skeleton ---
function SkeletonFeatured() {
  return <div className="h-[420px] animate-pulse rounded-2xl bg-gray-200" />
}
function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="animate-pulse bg-gray-200" style={{ paddingBottom: '56.25%' }} />
      <div className="p-4 space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  )
}

// --- Main ---
export default function NewsPage() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined)
  const [page, setPage] = useState(1)

  const { data: categories } = useNewsCategories()
  const { data, isLoading } = useNewsList({
    category: activeCategory,
    page,
    pageSize: 12,
  })

  const news = data?.data ?? []
  const pagination = data?.pagination
  const [featured, ...rest] = page === 1 && !activeCategory ? news : [undefined, ...news]

  function handleCategory(slug: string | undefined) {
    setActiveCategory(slug)
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-[#f8faff]">

      {/* Hero */}
      <div className="bg-[#274c8f] pb-14 pt-12">
        <div className="container mx-auto px-4 text-center">
          <span className="mb-3 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white/80">
            {t('news_page.label')}
          </span>
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">{t('news_page.title')}</h1>
          <p className="mt-2 text-base text-white/60">
            {t('news_page.subtitle')}
          </p>
        </div>
      </div>

      {/* Wave */}
      <div className="-mt-1 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="block h-10 w-full" fill="#f8faff">
          <path d="M0,0 C480,40 960,0 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-10">

        {/* Category filter */}
        {categories && categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => handleCategory(undefined)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                !activeCategory
                  ? 'bg-[#274c8f] text-white shadow-md shadow-[#274c8f]/25'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#274c8f]/30 hover:text-[#274c8f]'
              }`}
            >
              {t('news_page.all')}
            </button>
            {categories.map(cat => (
              <button
                key={cat.uuid}
                onClick={() => handleCategory(cat.slug)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  activeCategory === cat.slug
                    ? 'bg-[#274c8f] text-white shadow-md shadow-[#274c8f]/25'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#274c8f]/30 hover:text-[#274c8f]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <>
            {page === 1 && !activeCategory && <div className="mb-6"><SkeletonFeatured /></div>}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </>
        ) : news.length === 0 ? (
          <div className="py-24 text-center text-gray-400">
            <p className="text-lg font-semibold">{t('news_page.empty')}</p>
            <p className="mt-1 text-sm">{t('news_page.empty_sub')}</p>
          </div>
        ) : (
          <>
            {/* Featured — faqat birinchi sahifada, filter yo'q paytda */}
            {featured && (
              <div className="mb-6">
                <FeaturedNewsCard news={featured} />
              </div>
            )}

            {/* Grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rest.map(n => n && <NewsCard key={n.uuid} news={n} />)}
            </div>

            {/* Pagination */}
            {pagination && pagination.pageCount > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-[#274c8f] hover:text-[#274c8f] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeftIcon />
                </button>

                {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                      p === page
                        ? 'bg-[#274c8f] text-white shadow-md shadow-[#274c8f]/25'
                        : 'border border-gray-200 bg-white text-gray-500 hover:border-[#274c8f] hover:text-[#274c8f]'
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  disabled={page === pagination.pageCount}
                  onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-[#274c8f] hover:text-[#274c8f] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRightIcon />
                </button>
              </div>
            )}

            {/* Total count */}
            {pagination && (
              <p className="mt-4 text-center text-xs text-gray-400">
                {t('news_page.total')} {pagination.totalCount} {t('news_page.news_count')}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// --- Icons ---
function CalendarIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
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
function ChevronLeftIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}
function ChevronRightIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}
