import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useNewsDetail, useNewsCategories, useNewsList } from '@/hooks/useContent'
import { mediaUrl } from '@/lib/utils'
import type { NewsList } from '@/types'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('uz-UZ', { day: '2-digit', month: 'long', year: 'numeric' })
}

const STORY_DURATION = 4000

// --- Story carousel (sidebar) ---
function StoryCarousel({ items, excludeSlug }: { items: NewsList[]; excludeSlug: string }) {
  const filtered = items.filter(n => n.slug !== excludeSlug)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const startRef = useRef<number>(0)
  const rafRef = useRef<number>(0)

  const next = useCallback(() => {
    setActive(prev => (prev + 1) % filtered.length)
    setProgress(0)
    startRef.current = performance.now()
  }, [filtered.length])

  const goTo = useCallback((idx: number) => {
    setActive(idx)
    setProgress(0)
    startRef.current = performance.now()
  }, [])

  useEffect(() => {
    if (filtered.length === 0) return
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
  }, [active, filtered.length, next])

  if (filtered.length === 0) return null
  const news = filtered[active] ?? filtered[0]

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0f1f45]" style={{ aspectRatio: '9/13' }}>
      <img key={news.uuid} src={mediaUrl(news.main_image)} alt={news.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

      <div className="absolute left-0 right-0 top-0 flex gap-1 px-2.5 pt-2.5">
        {filtered.map((_, i) => (
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

      <button className="absolute left-0 top-0 h-full w-1/2"
        onClick={() => goTo((active - 1 + filtered.length) % filtered.length)} />
      <button className="absolute right-0 top-0 h-full w-1/2"
        onClick={() => goTo((active + 1) % filtered.length)} />

      <div className="absolute bottom-2 right-3 flex gap-1">
        {filtered.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all ${i === active ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`} />
        ))}
      </div>
    </div>
  )
}

// --- Image carousel (main content) ---
function ImageCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  function go(idx: number) {
    if (animating || idx === current) return
    setAnimating(true)
    setCurrent(idx)
    setTimeout(() => setAnimating(false), 400)
  }

  if (images.length === 0) return null

  if (images.length === 1) {
    return (
      <div className="overflow-hidden rounded-2xl">
        <img src={images[0]} alt="" className="h-full w-full object-cover" />
      </div>
    )
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gray-900" style={{ aspectRatio: '16/9' }}>
      {/* Slides */}
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-400"
          style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? 'auto' : 'none' }}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {/* Prev / Next */}
      <button
        onClick={() => go((current - 1 + images.length) % images.length)}
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:bg-black/60"
      >
        <ChevronLeftIcon />
      </button>
      <button
        onClick={() => go((current + 1) % images.length)}
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:bg-black/60"
      >
        <ChevronRightIcon />
      </button>

      {/* Counter badge */}
      <div className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        {current + 1} / {images.length}
      </div>

      {/* Dot strip */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-1.5 bg-gradient-to-t from-black/50 to-transparent pb-4 pt-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`rounded-full transition-all ${i === current ? 'h-2 w-6 bg-white' : 'h-2 w-2 bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>

      {/* Thumbnail strip below */}
    </div>
  )
}

// --- Thumbnail strip ---
function ThumbnailStrip({ images, current, onSelect }: { images: string[]; current: number; onSelect: (i: number) => void }) {
  if (images.length <= 1) return null
  return (
    <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
      {images.map((src, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
            i === current ? 'border-[#274c8f] opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
          }`}
        >
          <img src={src} alt="" className="h-full w-full object-cover" />
        </button>
      ))}
    </div>
  )
}

// --- Combined image viewer ---
function NewsImageViewer({ mainImage, additionalImages }: { mainImage: string; additionalImages: { uuid: string; image: string }[] }) {
  const allImages = [mediaUrl(mainImage), ...additionalImages.map(i => mediaUrl(i.image))]
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  function go(idx: number) {
    if (animating || idx === current) return
    setAnimating(true)
    setCurrent(idx)
    setTimeout(() => setAnimating(false), 350)
  }

  return (
    <div>
      {/* Main carousel */}
      <div className="group relative overflow-hidden rounded-2xl bg-gray-900" style={{ aspectRatio: '16/9' }}>
        {allImages.map((src, i) => (
          <img key={i} src={src} alt=""
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-350"
            style={{ opacity: i === current ? 1 : 0 }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}

        {allImages.length > 1 && (
          <>
            <button onClick={() => go((current - 1 + allImages.length) % allImages.length)}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:bg-black/60"
            >
              <ChevronLeftIcon />
            </button>
            <button onClick={() => go((current + 1) % allImages.length)}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:bg-black/60"
            >
              <ChevronRightIcon />
            </button>
            <div className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {current + 1} / {allImages.length}
            </div>
            <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1.5 bg-gradient-to-t from-black/50 to-transparent pb-4 pt-10">
              {allImages.map((_, i) => (
                <button key={i} onClick={() => go(i)}
                  className={`rounded-full transition-all ${i === current ? 'h-2 w-6 bg-white' : 'h-2 w-2 bg-white/50 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {allImages.map((src, i) => (
            <button key={i} onClick={() => go(i)}
              className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                i === current ? 'border-[#274c8f]' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// --- Main ---
export default function NewsDetailPage() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const { data, isLoading, isError } = useNewsDetail(slug!)
  const { data: categories = [] } = useNewsCategories()
  const { data: latestData, isLoading: latestLoading } = useNewsList({ pageSize: 4 })

  const news = data?.news
  const latestNews = latestData?.data ?? []

  if (isError) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg font-bold text-gray-800">{t('news_detail.not_found')}</p>
        <button onClick={() => navigate('/news')}
          className="rounded-xl bg-[#274c8f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1e3a6e]"
        >
          {t('news_detail.back_btn')}
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8faff]">

      {/* Hero bar */}
      <div className="bg-[#274c8f] pb-8 pt-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Link to="/" className="hover:text-white/70 transition-colors">{t('common.home')}</Link>
            <span>/</span>
            <Link to="/news" className="hover:text-white/70 transition-colors">{t('nav.news')}</Link>
            {news && (
              <>
                <span>/</span>
                <span className="text-white/70 line-clamp-1 max-w-xs">{news.title}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="-mt-1 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="block h-10 w-full" fill="#f8faff">
          <path d="M0,0 C480,40 960,0 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">

          {/* ---- MAIN ---- */}
          <div>
            {isLoading ? (
              <div className="space-y-5">
                <div className="aspect-video animate-pulse rounded-2xl bg-gray-200" />
                <div className="space-y-3 rounded-2xl bg-white p-8 shadow-sm">
                  <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
                  <div className="h-8 w-3/4 animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            ) : news ? (
              <>
                {/* Image carousel */}
                <NewsImageViewer
                  mainImage={news.main_image}
                  additionalImages={news.additional_images}
                />

                {/* Article card */}
                <div className="mt-5 rounded-2xl bg-white p-6 shadow-sm md:p-8">
                  {/* Category + meta */}
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    {news.category && (
                      <Link
                        to={`/news?category=${news.category.slug}`}
                        className="rounded-full bg-[#274c8f] px-3 py-1 text-xs font-bold text-white hover:bg-[#1e3a6e] transition-colors"
                      >
                        {news.category.name}
                      </Link>
                    )}
                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                      <CalendarIcon /> {formatDate(news.publish_date)}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                      <EyeIcon /> {news.views_count} {t('news_detail.times_read')}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="mb-6 text-2xl font-extrabold leading-snug text-gray-900 md:text-3xl">
                    {news.title}
                  </h1>

                  {/* Divider */}
                  <div className="mb-6 h-px bg-gradient-to-r from-[#274c8f]/20 via-[#274c8f]/10 to-transparent" />

                  {/* Content */}
                  <div
                    className="ck-content"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                  />
                </div>

                {/* Back */}
                <div className="mt-5 flex items-center justify-between">
                  <Link
                    to="/news"
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 shadow-sm transition hover:border-[#274c8f]/30 hover:text-[#274c8f]"
                  >
                    <BackIcon /> {t('news_detail.back_btn')}
                  </Link>
                  {news.additional_images.length > 0 && (
                    <span className="text-xs text-gray-400">
                      {news.additional_images.length + 1} {t('news_detail.info_images')}
                    </span>
                  )}
                </div>
              </>
            ) : null}
          </div>

          {/* ---- SIDEBAR ---- */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">

            {/* So'nggi yangiliklar story */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3.5 w-1 rounded-full bg-[#274c8f]" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('news_detail.latest_news')}</h3>
                </div>
                <Link to="/news" className="flex items-center gap-1 text-xs font-semibold text-[#274c8f] hover:underline">
                  {t('news_detail.all_news')} <ArrowIcon />
                </Link>
              </div>
              {latestLoading
                ? <div className="animate-pulse rounded-2xl bg-gray-200" style={{ aspectRatio: '9/13' }} />
                : <StoryCarousel items={latestNews} excludeSlug={slug!} />
              }
            </div>

            {/* Kategoriyalar */}
            {categories.length > 0 && (
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-3.5 w-1 rounded-full bg-[#274c8f]" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('news_detail.categories')}</h3>
                </div>
                <div className="flex flex-col gap-0.5">
                  <Link
                    to="/news"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-[#274c8f]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-300 shrink-0" />
                    {t('news_detail.all_news')}
                  </Link>
                  {categories.map(cat => (
                    <Link
                      key={cat.uuid}
                      to={`/news?category=${cat.slug}`}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                        news?.category?.slug === cat.slug
                          ? 'bg-[#274c8f] text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-[#274c8f]'
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${news?.category?.slug === cat.slug ? 'bg-white' : 'bg-gray-300'}`} />
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Ko'rishlar + sana (info card) */}
            {news && (
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-3.5 w-1 rounded-full bg-[#274c8f]" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('news_detail.info_title')}</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#274c8f]/8 text-[#274c8f] shrink-0">
                      <CalendarIcon />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t('news_detail.info_date')}</p>
                      <p className="text-sm font-semibold text-gray-700">{formatDate(news.publish_date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#274c8f]/8 text-[#274c8f] shrink-0">
                      <EyeIcon />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t('news_detail.info_views')}</p>
                      <p className="text-sm font-semibold text-gray-700">{news.views_count} {t('news_detail.times_read')}</p>
                    </div>
                  </div>
                  {news.additional_images.length > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#274c8f]/8 text-[#274c8f] shrink-0">
                        <PhotoIcon />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t('news_detail.info_images')}</p>
                        <p className="text-sm font-semibold text-gray-700">{news.additional_images.length + 1}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </aside>
        </div>
      </div>
    </div>
  )
}

// --- Icons ---
function ChevronLeftIcon() {
  return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
}
function ChevronRightIcon() {
  return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
}
function CalendarIcon() {
  return <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
}
function EyeIcon() {
  return <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
}
function ArrowIcon() {
  return <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
}
function BackIcon() {
  return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
}
function PhotoIcon() {
  return <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
}
