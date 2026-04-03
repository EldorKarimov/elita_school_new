import { useCallback, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useGalleryCategories, useGalleryImages } from '@/hooks/useContent'
import { mediaUrl } from '@/lib/utils'
import type { GalleryImage } from '@/types'

const ACCENTS = [
  { bg: '#e8f0fe', text: '#274c8f', border: '#c7d9fc', dot: '#274c8f' },
  { bg: '#d1fae5', text: '#065f46', border: '#a7f3d0', dot: '#10b981' },
  { bg: '#ede9fe', text: '#4c1d95', border: '#ddd6fe', dot: '#7c3aed' },
  { bg: '#fef3c7', text: '#78350f', border: '#fde68a', dot: '#f59e0b' },
  { bg: '#fce7f3', text: '#831843', border: '#fbcfe8', dot: '#ec4899' },
  { bg: '#cffafe', text: '#164e63', border: '#a5f3fc', dot: '#06b6d4' },
]

// --- Lightbox ---
function Lightbox({ images, index, onClose }: {
  images: GalleryImage[]
  index: number
  onClose: () => void
}) {
  const [current, setCurrent] = useState(index)
  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, onClose])

  const item = images[current]

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm" onClick={onClose}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4" onClick={e => e.stopPropagation()}>
        <div>
          {item.category_name && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{item.category_name}</span>
          )}
          <p className="text-sm font-semibold text-white/80">{item.title}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/30">{current + 1} / {images.length}</span>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
            <CloseIcon />
          </button>
        </div>
      </div>
      {/* Image */}
      <div className="relative flex flex-1 items-center justify-center px-14 pb-4" onClick={e => e.stopPropagation()}>
        <img key={item.uuid} src={mediaUrl(item.image)} alt={item.title}
          className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
          style={{ animation: 'lbFadeIn .18s ease' }}
        />
        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20">
          <ChevronLeftIcon />
        </button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20">
          <ChevronRightIcon />
        </button>
      </div>
      {/* Thumbnail strip */}
      <div className="flex items-center justify-center gap-1.5 overflow-x-auto px-6 pb-5" onClick={e => e.stopPropagation()}>
        {images.map((img, i) => (
          <button key={img.uuid} onClick={() => setCurrent(i)}
            className={`h-11 w-11 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${i === current ? 'border-white scale-110' : 'border-transparent opacity-40 hover:opacity-70'}`}
          >
            <img src={mediaUrl(img.image)} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

// --- Masonry ---
function MasonryGrid({ images }: { images: GalleryImage[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <>
      <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
        {images.map((item, i) => (
          <div key={item.uuid} onClick={() => setLightbox(i)}
            className="group mb-3 break-inside-avoid cursor-zoom-in overflow-hidden rounded-2xl shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img src={mediaUrl(item.image)} alt={item.title}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="flex-1 text-xs font-semibold text-white line-clamp-2 leading-snug">{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {lightbox !== null && (
        <Lightbox images={images} index={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  )
}

function SkeletonMasonry() {
  const heights = ['h-44', 'h-60', 'h-48', 'h-52', 'h-36', 'h-56', 'h-40', 'h-64', 'h-48', 'h-44', 'h-52', 'h-36']
  return (
    <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
      {heights.map((h, i) => (
        <div key={i} className={`mb-3 break-inside-avoid ${h} animate-pulse rounded-2xl bg-gray-200`} />
      ))}
    </div>
  )
}

export default function GalleryPage() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined)
  const [page, setPage] = useState(1)
  const gridRef = useRef<HTMLDivElement>(null)

  const { data: categories = [], isLoading: catsLoading } = useGalleryCategories()
  const { data, isLoading: imgsLoading } = useGalleryImages({ category: activeCategory, page, pageSize: 16 })

  const images = data?.data ?? []
  const pagination = data?.pagination
  const activeCat = categories.find(c => c.uuid === activeCategory)

  function handleCategory(uuid: string | undefined) {
    setActiveCategory(uuid)
    setPage(1)
    setTimeout(() => gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  function goToPage(p: number) {
    setPage(p)
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb]">

      {/* Hero */}
      <div className="relative overflow-hidden bg-[#274c8f] pb-16 pt-12">
        <div className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)' }}
        />
        {/* Decorative squares */}
        <div className="pointer-events-none absolute right-10 top-6 grid grid-cols-4 gap-2 opacity-10">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="h-6 w-6 rounded bg-white" />
          ))}
        </div>
        <div className="container relative mx-auto px-4">
          <div className="flex flex-col items-start md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs text-white/40">
                <Link to="/" className="hover:text-white/70 transition-colors">{t('common.home')}</Link>
                <span>/</span>
                <span className="text-white/70">{t('gallery_page.title')}</span>
              </div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/80">
                <CameraIcon /> {t('gallery_page.label')}
              </span>
              <h1 className="text-3xl font-extrabold text-white md:text-5xl">{t('gallery_page.title')}</h1>
              <p className="mt-2 text-sm text-white/60">{t('gallery_page.subtitle')}</p>
            </div>
            {pagination && (
              <div className="rounded-2xl bg-white/10 px-6 py-4 text-center backdrop-blur-sm">
                <p className="text-3xl font-extrabold text-white">{pagination.totalCount}</p>
                <p className="text-xs text-white/50">{t('gallery_page.photos_count')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="-mt-1 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="block h-10 w-full" fill="#f4f6fb">
          <path d="M0,0 C480,40 960,0 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-8">

        {/* Category cards */}
        {!catsLoading && categories.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {/* All */}
              <button
                onClick={() => handleCategory(undefined)}
                className={`group flex items-center gap-2.5 rounded-2xl border-2 px-5 py-3 text-sm font-bold transition-all ${
                  !activeCategory
                    ? 'border-[#274c8f] bg-[#274c8f] text-white shadow-md shadow-[#274c8f]/20'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-[#274c8f]/40 hover:text-[#274c8f]'
                }`}
              >
                <span className={`flex h-2 w-2 rounded-full ${!activeCategory ? 'bg-white' : 'bg-gray-300'}`} />
                {t('gallery_page.all')}
                {pagination && !activeCategory && (
                  <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">{pagination.totalCount}</span>
                )}
              </button>

              {categories.map((cat, idx) => {
                const accent = ACCENTS[idx % ACCENTS.length]
                const isActive = activeCategory === cat.uuid
                return (
                  <button
                    key={cat.uuid}
                    onClick={() => handleCategory(cat.uuid)}
                    className="group flex items-center gap-2.5 rounded-2xl border-2 px-5 py-3 text-sm font-bold transition-all"
                    style={{
                      borderColor: isActive ? accent.dot : '#e5e7eb',
                      background: isActive ? accent.bg : '#ffffff',
                      color: isActive ? accent.text : '#4b5563',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.borderColor = accent.dot
                        ;(e.currentTarget as HTMLElement).style.color = accent.text
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb'
                        ;(e.currentTarget as HTMLElement).style.color = '#4b5563'
                      }
                    }}
                  >
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ background: accent.dot }} />
                    {cat.name}
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-semibold"
                      style={{ background: isActive ? `${accent.dot}20` : '#f3f4f6', color: isActive ? accent.text : '#9ca3af' }}
                    >
                      {cat.images_count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Active category label */}
        {activeCat && (
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 rounded-full bg-[#274c8f]" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">{activeCat.name}</h2>
                <p className="text-xs text-gray-400">{activeCat.images_count} {t('gallery_page.photos_count')}</p>
              </div>
            </div>
            <button
              onClick={() => handleCategory(undefined)}
              className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-500 transition hover:border-gray-300 hover:text-gray-700 shadow-sm"
            >
              <CloseSmIcon /> {t('gallery_page.clear_filter')}
            </button>
          </div>
        )}

        {/* Grid */}
        <div ref={gridRef}>
          {imgsLoading ? (
            <SkeletonMasonry />
          ) : images.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#274c8f]/8 text-[#274c8f]">
                <CameraIcon />
              </div>
              <p className="text-base font-semibold text-gray-700">{t('gallery_page.empty')}</p>
              <p className="mt-1 text-sm text-gray-400">{t('gallery_page.empty_sub')}</p>
            </div>
          ) : (
            <MasonryGrid key={`${activeCategory}-${page}`} images={images} />
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.pageCount > 1 && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => goToPage(page - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-[#274c8f] hover:text-[#274c8f] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon />
              </button>
              {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => goToPage(p)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                    p === page
                      ? 'bg-[#274c8f] text-white shadow-md shadow-[#274c8f]/25'
                      : 'border border-gray-200 bg-white text-gray-500 shadow-sm hover:border-[#274c8f] hover:text-[#274c8f]'
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
              {(page - 1) * 16 + 1}–{Math.min(page * 16, pagination.totalCount)} / {pagination.totalCount} ta
            </p>
          </div>
        )}
      </div>

      <style>{`@keyframes lbFadeIn { from { opacity:0; transform:scale(.97) } to { opacity:1; transform:scale(1) } }`}</style>
    </div>
  )
}

function ChevronLeftIcon() {
  return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
}
function ChevronRightIcon() {
  return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
}
function CloseIcon() {
  return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
}
function CloseSmIcon() {
  return <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
}
function CameraIcon() {
  return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
}
