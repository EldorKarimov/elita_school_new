import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useBlogDetail } from '@/hooks/useContent'
import { useNewsList } from '@/hooks/useContent'
import { mediaUrl } from '@/lib/utils'
import type { NewsList, BlogList } from '@/types'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('uz-UZ', { day: '2-digit', month: 'long', year: 'numeric' })
}

const STORY_DURATION = 4000

// --- Story carousel (so'nggi yangiliklar) ---
function StoryCarousel({ items }: { items: NewsList[] }) {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const startRef = useRef<number>(0)
  const rafRef = useRef<number>(0)

  const next = useCallback(() => {
    setActive(prev => (prev + 1) % items.length)
    setProgress(0)
    startRef.current = performance.now()
  }, [items.length])

  const goTo = useCallback((idx: number) => {
    setActive(idx)
    setProgress(0)
    startRef.current = performance.now()
  }, [])

  useEffect(() => {
    if (items.length === 0) return
    startRef.current = performance.now()
    setProgress(0)
    function tick(now: number) {
      const pct = Math.min(((now - startRef.current) / STORY_DURATION) * 100, 100)
      setProgress(pct)
      if (pct < 100) rafRef.current = requestAnimationFrame(tick)
      else next()
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, items.length, next])

  if (items.length === 0) return null
  const news = items[active]

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0f1f45]" style={{ aspectRatio: '9/13' }}>
      <img key={news.uuid} src={mediaUrl(news.main_image)} alt={news.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

      {/* Progress bars */}
      <div className="absolute left-0 right-0 top-0 flex gap-1 px-2.5 pt-2.5">
        {items.map((_, i) => (
          <div key={i} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
            <div className="absolute left-0 top-0 h-full rounded-full bg-white"
              style={{ width: i < active ? '100%' : i === active ? `${progress}%` : '0%' }}
            />
          </div>
        ))}
      </div>

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

      <button className="absolute left-0 top-0 h-full w-1/2" onClick={() => goTo((active - 1 + items.length) % items.length)} />
      <button className="absolute right-0 top-0 h-full w-1/2" onClick={() => goTo((active + 1) % items.length)} />

      <div className="absolute bottom-2 right-3 flex gap-1">
        {items.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all ${i === active ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`} />
        ))}
      </div>
    </div>
  )
}

// --- Latest blog mini card (sidebar) ---
function LatestBlogCard({ blog }: { blog: BlogList }) {
  return (
    <Link
      to={`/blogs/${blog.slug}`}
      className="group flex gap-3 rounded-xl p-2.5 transition-all hover:bg-gray-50"
    >
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
        <img src={mediaUrl(blog.image)} alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        {blog.category && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#274c8f]/60">
            {blog.category.name}
          </span>
        )}
        <p className="text-xs font-bold leading-snug text-gray-800 line-clamp-2 group-hover:text-[#274c8f] transition-colors">
          {blog.title}
        </p>
        <p className="text-[10px] text-gray-400">{formatDate(blog.created_at)}</p>
      </div>
    </Link>
  )
}

// --- Main ---
export default function BlogDetailPage() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data, isLoading, isError } = useBlogDetail(slug!)
  const { data: latestNewsData, isLoading: newsLoading } = useNewsList({ pageSize: 3 })

  const blog = data?.blog
  const latestBlogs = data?.latest_blogs ?? []
  const allTags = data?.all_tags ?? []
  const recentNews = latestNewsData?.data ?? []

  if (isError) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg font-bold text-gray-800">{t('blog_detail.not_found')}</p>
        <button onClick={() => navigate('/blogs')} className="rounded-xl bg-[#274c8f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1e3a6e]">
          {t('blog_detail.back_btn')}
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8faff]">

      {/* Hero image */}
      {isLoading ? (
        <div className="h-72 animate-pulse bg-gray-300 md:h-96" />
      ) : blog ? (
        <div className="relative h-72 overflow-hidden md:h-[420px]">
          <img src={mediaUrl(blog.image)} alt={blog.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

          {/* Hero content */}
          <div className="absolute inset-x-0 bottom-0 container mx-auto px-4 pb-8">
            {/* Breadcrumb */}
            <div className="mb-3 flex items-center gap-2 text-xs text-white/50">
              <Link to="/" className="hover:text-white/80 transition-colors">{t('common.home')}</Link>
              <span>/</span>
              <Link to="/blogs" className="hover:text-white/80 transition-colors">{t('nav.blog')}</Link>
              <span>/</span>
              <span className="text-white/80 line-clamp-1 max-w-xs">{blog.title}</span>
            </div>
            {blog.category && (
              <span className="mb-3 inline-block rounded-full bg-[#274c8f] px-3 py-1 text-xs font-bold text-white">
                {blog.category.name}
              </span>
            )}
            <h1 className="text-2xl font-extrabold leading-snug text-white md:text-4xl max-w-3xl">
              {blog.title}
            </h1>
            {/* Meta */}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {blog.author && (
                <div className="flex items-center gap-2.5">
                  <img src={mediaUrl(blog.author.image)} alt={blog.author.full_name}
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-white/30"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{blog.author.full_name}</p>
                    <p className="text-xs text-white/50">{blog.author.position}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-xs text-white/60">
                <CalendarIcon />
                {formatDate(blog.created_at)}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">

          {/* ---- MAIN CONTENT ---- */}
          <div>
            {isLoading ? (
              <div className="space-y-4 rounded-2xl bg-white p-8 shadow-sm">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className={`h-4 animate-pulse rounded bg-gray-100 ${i % 3 === 0 ? 'w-2/3' : 'w-full'}`} />
                ))}
              </div>
            ) : blog ? (
              <>
                {/* Tags */}
                {blog.tags.length > 0 && (
                  <div className="mb-5 flex flex-wrap gap-2">
                    {blog.tags.map(tag => (
                      <span key={tag.uuid}
                        className="rounded-full bg-[#274c8f]/8 px-3 py-1 text-xs font-semibold text-[#274c8f]"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Article body */}
                <article
                  className="ck-content rounded-2xl bg-white px-6 py-8 shadow-sm md:px-10"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Author card */}
                {blog.author && (
                  <div className="mt-6 flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <img src={mediaUrl(blog.author.image)} alt={blog.author.full_name}
                      className="h-16 w-16 rounded-full object-cover ring-2 ring-[#274c8f]/15 shrink-0"
                    />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#274c8f]/60 mb-0.5">{t('blog_detail.author_label')}</p>
                      <p className="font-bold text-gray-900">{blog.author.full_name}</p>
                      <p className="text-sm text-gray-500">{blog.author.position}</p>
                    </div>
                  </div>
                )}

                {/* Back link */}
                <div className="mt-6">
                  <Link
                    to="/blogs"
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 shadow-sm transition hover:border-[#274c8f]/30 hover:text-[#274c8f]"
                  >
                    <BackIcon /> {t('blog_detail.back_btn')}
                  </Link>
                </div>
              </>
            ) : null}
          </div>

          {/* ---- SIDEBAR ---- */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">

            {/* So'nggi yangiliklar — story */}
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

            {/* So'nggi bloglar */}
            {(isLoading || latestBlogs.length > 0) && (
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3.5 w-1 rounded-full bg-[#274c8f]" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('blog_detail.latest_blogs')}</h3>
                  </div>
                  <Link to="/blogs" className="flex items-center gap-1 text-xs font-semibold text-[#274c8f] hover:underline">
                    {t('blog_detail.all_blogs')} <ArrowIcon />
                  </Link>
                </div>

                {isLoading ? (
                  <div className="space-y-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex gap-3 p-2">
                        <div className="h-16 w-16 shrink-0 animate-pulse rounded-xl bg-gray-100" />
                        <div className="flex-1 space-y-2 py-1">
                          <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
                          <div className="h-3 w-3/4 animate-pulse rounded bg-gray-100" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col divide-y divide-gray-50">
                    {latestBlogs.map(b => (
                      <LatestBlogCard key={b.uuid} blog={b} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Teglar */}
            {allTags.length > 0 && (
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-3.5 w-1 rounded-full bg-[#274c8f]" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('blog_detail.tags')}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <Link
                      key={tag.uuid}
                      to={`/blogs?tag=${tag.slug}`}
                      className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-[#274c8f]/10 hover:text-[#274c8f]"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </aside>
        </div>
      </div>
    </div>
  )
}

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
function BackIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
    </svg>
  )
}
