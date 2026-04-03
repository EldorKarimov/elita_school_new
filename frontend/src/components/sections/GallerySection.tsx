import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGalleryCategories, useGalleryImages } from '@/hooks/useContent'
import { mediaUrl } from '@/lib/utils'
import type { GalleryImage } from '@/types'

// --- Lightbox ---
function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryImage
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
        onClick={e => { e.stopPropagation(); onPrev() }}
      >
        <ChevronLeftIcon />
      </button>

      <div
        className="relative max-h-[85vh] max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={mediaUrl(item.image)}
          alt={item.title}
          className="max-h-[85vh] max-w-full object-contain"
        />
        {(item.title || item.category_name) && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4">
            {item.category_name && (
              <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-white/50">
                {item.category_name}
              </span>
            )}
            {item.title && (
              <p className="text-sm font-semibold text-white">{item.title}</p>
            )}
          </div>
        )}
      </div>

      <button
        className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
        onClick={e => { e.stopPropagation(); onNext() }}
      >
        <ChevronRightIcon />
      </button>

      <button
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
        onClick={onClose}
      >
        <CloseIcon />
      </button>
    </div>
  )
}

// --- Gallery grid (masonry) ---
function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
        {images.map((item, i) => (
          <div
            key={item.uuid}
            className="group mb-4 break-inside-avoid cursor-zoom-in overflow-hidden rounded-xl"
            onClick={() => setLightbox(i)}
          >
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={mediaUrl(item.image)}
                alt={item.title}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#274c8f]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
                  <ZoomIcon />
                </div>
                {item.title && (
                  <p className="line-clamp-2 px-3 text-center text-xs font-semibold text-white/90">
                    {item.title}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <Lightbox
          item={images[lightbox]}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox(i => i !== null ? (i - 1 + images.length) % images.length : null)}
          onNext={() => setLightbox(i => i !== null ? (i + 1) % images.length : null)}
        />
      )}
    </>
  )
}

// --- Skeleton ---
function SkeletonGrid() {
  const heights = ['h-40', 'h-56', 'h-36', 'h-48', 'h-52', 'h-40', 'h-44', 'h-36']
  return (
    <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
      {heights.map((h, i) => (
        <div key={i} className={`mb-4 break-inside-avoid ${h} animate-pulse rounded-xl bg-gray-200`} />
      ))}
    </div>
  )
}

// --- Main ---
export function GallerySection() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined)
  const [page, setPage] = useState(1)

  const { data: categories, isLoading: catsLoading } = useGalleryCategories()
  const { data, isLoading: imgsLoading } = useGalleryImages({
    category: activeCategory,
    page,
    pageSize: 8,
  })

  const images = data?.data ?? []
  const pagination = data?.pagination

  function handleCategory(uuid: string | undefined) {
    setActiveCategory(uuid)
    setPage(1)
  }

  if (!imgsLoading && !catsLoading && images.length === 0 && !activeCategory) return null

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-block rounded-full bg-[#274c8f]/8 px-4 py-1.5 text-sm font-semibold text-[#274c8f]">
              {t('gallery_section.label')}
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
              {t('gallery_section.title')}
            </h2>
            <p className="mt-2 text-base text-gray-500">
              {t('gallery_section.subtitle')}
            </p>
          </div>

          {pagination && (
            <div className="shrink-0 text-right">
              <span className="text-3xl font-extrabold text-[#274c8f]">{pagination.totalCount}</span>
              <p className="text-sm text-gray-400">{t('gallery_section.photos_count')}</p>
            </div>
          )}
        </div>

        {/* Category filter */}
        {!catsLoading && categories && categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => handleCategory(undefined)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                !activeCategory
                  ? 'bg-[#274c8f] text-white shadow-md shadow-[#274c8f]/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t('gallery_section.all')}
            </button>
            {categories.map(cat => (
              <button
                key={cat.uuid}
                onClick={() => handleCategory(cat.uuid)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  activeCategory === cat.uuid
                    ? 'bg-[#274c8f] text-white shadow-md shadow-[#274c8f]/25'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
                <span className={`ml-1.5 text-xs ${activeCategory === cat.uuid ? 'text-white/70' : 'text-gray-400'}`}>
                  ({cat.images_count})
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {imgsLoading ? (
          <SkeletonGrid />
        ) : images.length === 0 ? (
          <div className="py-16 text-center text-gray-400">{t('gallery_section.empty')}</div>
        ) : (
          <GalleryGrid key={`${activeCategory}-${page}`} images={images} />
        )}

        {/* Pagination */}
        {pagination && pagination.pageCount > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-[#274c8f] hover:text-[#274c8f] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon />
            </button>

            {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                  p === page
                    ? 'bg-[#274c8f] text-white shadow-md shadow-[#274c8f]/25'
                    : 'border border-gray-200 text-gray-500 hover:border-[#274c8f] hover:text-[#274c8f]'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              disabled={page === pagination.pageCount}
              onClick={() => setPage(p => p + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-[#274c8f] hover:text-[#274c8f] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

// --- Icons ---
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
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
function ZoomIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
    </svg>
  )
}
