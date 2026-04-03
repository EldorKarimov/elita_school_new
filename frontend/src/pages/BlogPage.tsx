import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useBlogList, useBlogCategories, useBlogTags } from '@/hooks/useContent'
import { useNewsList } from '@/hooks/useContent'
import { mediaUrl } from '@/lib/utils'
import type { BlogList, NewsList } from '@/types'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('uz-UZ', { day: '2-digit', month: 'long', year: 'numeric' })
}

const STORY_DURATION = 4000 // ms per story

// --- Story carousel ---
function StoryCarousel({ items }: { items: NewsList[] }) {
  const [active, setActive]     = useState(0)
  const [progress, setProgress] = useState(0)
  const startRef                = useRef<number>(0)
  const rafRef                  = useRef<number>(0)

  const goTo = useCallback((idx: number) => {
    setActive(idx)
    setProgress(0)
    startRef.current = performance.now()
  }, [])

  const next = useCallback(() => {
    setActive(prev => {
      const n = (prev + 1) % items.length
      setProgress(0)
      startRef.current = performance.now()
      return n
    })
  }, [items.length])

  // Animate progress bar with requestAnimationFrame
  useEffect(() => {
    if (items.length === 0) return
    startRef.current = performance.now()
    setProgress(0)

    function tick(now: number) {
      const elapsed = now - startRef.current
      const pct = Math.min((elapsed / STORY_DURATION) * 100, 100)
      setProgress(pct)
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        next()
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, items.length, next])

  if (items.length === 0) return null

  const news = items[active]

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0f1f45]" style={{ aspectRatio: '9/13' }}>
      {/* Background image */}
      <img
        key={news.uuid}
        src={mediaUrl(news.main_image)}
        alt={news.title}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

      {/* Progress bars */}
      <div className="absolute left-0 right-0 top-0 flex gap-1 px-2.5 pt-2.5">
        {items.map((_, i) => (
          <div key={i} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-white transition-none"
              style={{
                width: i < active ? '100%' : i === active ? `${progress}%` : '0%',
              }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {news.category && (
          <span className="mb-2 inline-block rounded-full bg-[#274c8f] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
            {news.category.name}
          </span>
        )}
        <Link to={`/news/${news.slug}`}>
          <p className="text-sm font-bold leading-snug text-white line-clamp-3 hover:underline underline-offset-2">
            {news.title}
          </p>
        </Link>
        <p className="mt-1.5 text-[10px] text-white/50">{formatDate(news.publish_date)}</p>
      </div>

      {/* Tap zones for prev/next */}
      <button
        className="absolute left-0 top-0 h-full w-1/2"
        onClick={() => goTo((active - 1 + items.length) % items.length)}
        aria-label="Oldingi"
      />
      <button
        className="absolute right-0 top-0 h-full w-1/2"
        onClick={() => goTo((active + 1) % items.length)}
        aria-label="Keyingi"
      />

      {/* Dot indicators */}
      <div className="absolute bottom-2 right-3 flex gap-1">
        {items.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-all ${i === active ? 'bg-white w-4' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  )
}

// --- Feed item ---
function FeedItem({ blog, index }: { blog: BlogList; index: number }) {
  const { t } = useTranslation()
  const isFeatured = index === 0

  if (isFeatured) {
    return (
      <Link
        to={`/blogs/${blog.slug}`}
        className="group relative mb-4 flex flex-col overflow-hidden rounded-3xl border border-[#274c8f]/10 bg-white shadow-sm transition-all hover:shadow-xl"
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative h-56 w-full shrink-0 overflow-hidden md:h-72 md:w-80">
            <img
              src={mediaUrl(blog.image)}
              alt={blog.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute left-4 top-4 rounded-full bg-[#274c8f] px-3 py-1 text-xs font-bold text-white shadow">
              {t('blog_section.featured_badge')}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
            <div>
              {blog.category && (
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#274c8f]">
                  {blog.category.name}
                </span>
              )}
              <h2 className="text-xl font-extrabold leading-snug text-gray-900 group-hover:text-[#274c8f] transition-colors md:text-2xl">
                {blog.title}
              </h2>
              {blog.excerpt && (
                <p className="mt-3 text-sm leading-relaxed text-gray-500 line-clamp-3">{blog.excerpt}</p>
              )}
              {blog.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {blog.tags.slice(0, 3).map(t => (
                    <span key={t.uuid} className="rounded-full bg-[#274c8f]/8 px-2.5 py-0.5 text-[11px] font-semibold text-[#274c8f]">
                      #{t.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
              {blog.author ? (
                <div className="flex items-center gap-2.5">
                  <img src={mediaUrl(blog.author.image)} alt={blog.author.full_name} className="h-9 w-9 rounded-full object-cover ring-2 ring-[#274c8f]/15" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{blog.author.full_name}</p>
                    <p className="text-xs text-gray-400">{blog.author.position}</p>
                  </div>
                </div>
              ) : <div />}
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <CalendarIcon />{formatDate(blog.created_at)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={`/blogs/${blog.slug}`}
      className="group flex items-start gap-4 border-b border-gray-100 py-4 last:border-0 -mx-4 px-4 rounded-xl transition-all hover:bg-white/80"
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#274c8f]/8 text-sm font-extrabold text-[#274c8f]">
        {String(index).padStart(2, '0')}
      </span>
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        {blog.category && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#274c8f]/60">{blog.category.name}</span>
        )}
        <h3 className="text-sm font-bold leading-snug text-gray-900 line-clamp-2 group-hover:text-[#274c8f] transition-colors">
          {blog.title}
        </h3>
        {blog.excerpt && (
          <p className="text-xs leading-relaxed text-gray-400 line-clamp-1">{blog.excerpt}</p>
        )}
        <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
          {blog.author && <span className="font-medium text-gray-500 truncate">{blog.author.full_name}</span>}
          {blog.author && <span>·</span>}
          <span className="flex items-center gap-1 shrink-0"><CalendarIcon />{formatDate(blog.created_at)}</span>
        </div>
      </div>
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
        <img
          src={mediaUrl(blog.image)}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
    </Link>
  )
}

// --- Skeletons ---
function SkeletonFeatured() {
  return (
    <div className="mb-4 flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white md:flex-row">
      <div className="h-56 w-full animate-pulse bg-gray-100 md:h-72 md:w-80 shrink-0" />
      <div className="flex-1 p-8 space-y-3">
        <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
        <div className="h-7 w-3/4 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  )
}
function SkeletonItem() {
  return (
    <div className="flex items-start gap-4 border-b border-gray-100 py-4">
      <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-gray-100" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-3/4 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
      </div>
      <div className="h-20 w-20 shrink-0 animate-pulse rounded-xl bg-gray-100" />
    </div>
  )
}

// --- Main ---
export default function BlogPage() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined)
  const [activeTag, setActiveTag]           = useState<string | undefined>(undefined)
  const [page, setPage]                     = useState(1)

  const { data: categories = [] }  = useBlogCategories()
  const { data: tags = [] }         = useBlogTags()
  const { data, isLoading }         = useBlogList({ category: activeCategory, tag: activeTag, page, pageSize: 10 })
  const { data: latestNews, isLoading: newsLoading } = useNewsList({ pageSize: 3 })

  const blogs      = data?.data ?? []
  const pagination = data?.pagination
  const recentNews = latestNews?.data ?? []

  function handleCategory(slug: string | undefined) {
    setActiveCategory(slug); setActiveTag(undefined); setPage(1)
  }
  function handleTag(slug: string) {
    setActiveTag(prev => prev === slug ? undefined : slug)
    setActiveCategory(undefined); setPage(1)
  }
  function goToPage(p: number) {
    setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#f8faff]">

      {/* Hero banner */}
      <div className="bg-[#274c8f] pb-14 pt-12">
        <div className="container mx-auto px-4 text-center">
          <span className="mb-3 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white/80">
            {t('blog_page.label')}
          </span>
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">{t('blog_page.title')}</h1>
          <p className="mt-2 text-base text-white/60">
            {t('blog_page.subtitle')}
          </p>
        </div>
      </div>

      {/* Wave */}
      <div className="-mt-1 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="block h-10 w-full" fill="#f8faff">
          <path d="M0,0 C480,40 960,0 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

          {/* ---- SIDEBAR ---- */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">

            {/* So'nggi yangiliklar — Story carousel */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3.5 w-1 rounded-full bg-[#274c8f]" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('blog_detail.latest_news')}</h3>
                </div>
                <Link to="/news" className="flex items-center gap-1 text-xs font-semibold text-[#274c8f] hover:underline">
                  {t('blog_detail.all_news')} <ArrowIcon />
                </Link>
              </div>
              {newsLoading
                ? <div className="animate-pulse rounded-2xl bg-gray-200" style={{ aspectRatio: '9/13' }} />
                : <StoryCarousel items={recentNews} />
              }
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-3.5 w-1 rounded-full bg-[#274c8f]" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('blog_page.categories')}</h3>
                </div>
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => handleCategory(undefined)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-all ${
                      !activeCategory && !activeTag
                        ? 'bg-[#274c8f] text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#274c8f]'
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60 shrink-0" />
                    {t('common.all')}
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.uuid}
                      onClick={() => handleCategory(cat.slug)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-all ${
                        activeCategory === cat.slug
                          ? 'bg-[#274c8f] text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-[#274c8f]'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60 shrink-0" />
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-3.5 w-1 rounded-full bg-[#274c8f]" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('blog_page.tags')}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag.uuid}
                      onClick={() => handleTag(tag.slug)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                        activeTag === tag.slug
                          ? 'bg-[#274c8f] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-[#274c8f]/10 hover:text-[#274c8f]'
                      }`}
                    >
                      #{tag.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* ---- FEED ---- */}
          <div>
            {(activeCategory || activeTag) && (
              <div className="mb-5 flex items-center gap-2">
                <span className="text-xs text-gray-400">{t('common.filter')}</span>
                <button
                  onClick={() => { setActiveCategory(undefined); setActiveTag(undefined); setPage(1) }}
                  className="flex items-center gap-1.5 rounded-full bg-[#274c8f] px-3 py-1 text-xs font-semibold text-white hover:bg-[#1e3a6e]"
                >
                  {activeCategory
                    ? categories.find(c => c.slug === activeCategory)?.name
                    : `#${tags.find(t => t.slug === activeTag)?.name}`}
                  <CloseIcon />
                </button>
              </div>
            )}

            {isLoading ? (
              <>
                <SkeletonFeatured />
                {Array.from({ length: 5 }).map((_, i) => <SkeletonItem key={i} />)}
              </>
            ) : blogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#274c8f]/8 text-[#274c8f]">
                  <SearchIcon />
                </div>
                <p className="text-lg font-bold text-gray-800">{t('blog_page.empty')}</p>
                <p className="mt-1 text-sm text-gray-400">{t('blog_page.empty_sub')}</p>
                <button
                  onClick={() => { setActiveCategory(undefined); setActiveTag(undefined) }}
                  className="mt-4 rounded-xl border border-[#274c8f]/25 px-5 py-2.5 text-sm font-semibold text-[#274c8f] hover:bg-[#274c8f] hover:text-white transition-all"
                >
                  {t('common.clear')}
                </button>
              </div>
            ) : (
              <>
                {blogs.map((blog, i) => (
                  <FeedItem key={blog.uuid} blog={blog} index={i} />
                ))}

                {pagination && pagination.pageCount > 1 && (
                  <div className="mt-8 flex flex-col items-center gap-3 border-t border-gray-100 pt-8">
                    <div className="flex items-center gap-2">
                      <button
                        disabled={page === 1}
                        onClick={() => goToPage(page - 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-[#274c8f] hover:text-[#274c8f] disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronLeftIcon />
                      </button>
                      {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map(p => (
                        <button
                          key={p}
                          onClick={() => goToPage(p)}
                          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                            p === page
                              ? 'bg-[#274c8f] text-white shadow-md shadow-[#274c8f]/25'
                              : 'border border-gray-200 bg-white text-gray-500 hover:border-[#274c8f] hover:text-[#274c8f] shadow-sm'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                      <button
                        disabled={page === pagination.pageCount}
                        onClick={() => goToPage(page + 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-[#274c8f] hover:text-[#274c8f] disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronRightIcon />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400">
                      {(page - 1) * 10 + 1}–{Math.min(page * 10, pagination.totalCount)} / {pagination.totalCount} ta
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
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
function ArrowIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
function CloseIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}
