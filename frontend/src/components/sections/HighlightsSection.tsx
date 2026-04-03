import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHighlights } from '@/hooks/useContent'
import type { SchoolHighlight } from '@/types'

// --- Video modal ---
function VideoModal({ videoId, title, onClose }: { videoId: string; title: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-full max-w-3xl" onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -right-2 -top-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Embed */}
        <div className="overflow-hidden rounded-2xl shadow-2xl" style={{ aspectRatio: '9/16', maxHeight: '80vh', margin: '0 auto', maxWidth: '400px' }}>
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <p className="mt-3 text-center text-sm font-semibold text-white/80">{title}</p>
      </div>
    </div>
  )
}

// --- Single card ---
function HighlightCard({ item, onClick }: { item: SchoolHighlight; onClick: () => void }) {
  const thumb = item.youtube_id
    ? `https://img.youtube.com/vi/${item.youtube_id}/hqdefault.jpg`
    : null

  return (
    <div
      className="group relative shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
      style={{ width: '200px', aspectRatio: '9/16' }}
      onClick={onClick}
    >
      {/* Thumbnail */}
      {thumb ? (
        <img
          src={thumb}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-800" />
      )}

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600/90 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
          <svg className="h-6 w-6 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* YouTube Shorts badge */}
      <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">
        <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 9.333l5.333 2.667L10 14.667V9.333zM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12z" />
        </svg>
        Shorts
      </div>

      {/* Title */}
      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="text-xs font-bold leading-snug text-white line-clamp-2">{item.title}</p>
      </div>
    </div>
  )
}

// --- Skeleton ---
function SkeletonCard() {
  return (
    <div
      className="shrink-0 animate-pulse rounded-2xl bg-gray-200"
      style={{ width: '200px', aspectRatio: '9/16' }}
    />
  )
}

// --- Main section ---
export function HighlightsSection() {
  const { t } = useTranslation()
  const { data: highlights = [], isLoading } = useHighlights()
  const [activeVideo, setActiveVideo] = useState<SchoolHighlight | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  function scroll(dir: 'left' | 'right') {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'right' ? 440 : -440, behavior: 'smooth' })
  }

  if (!isLoading && highlights.length === 0) return null

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="mb-2 inline-block rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-red-600">
              {t('highlights_section.label')}
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
              {t('highlights_section.title')}
            </h2>
            <p className="mt-1.5 text-sm text-gray-500">
              {t('highlights_section.subtitle')}
            </p>
          </div>

          {/* Nav arrows */}
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => scroll('left')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-[#274c8f] hover:text-[#274c8f]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-[#274c8f] hover:text-[#274c8f]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : highlights.map(item => (
                <HighlightCard
                  key={item.uuid}
                  item={item}
                  onClick={() => item.youtube_id && setActiveVideo(item)}
                />
              ))
          }
        </div>

        {/* Count */}
        {!isLoading && highlights.length > 0 && (
          <p className="mt-4 text-xs text-gray-400 text-right">{highlights.length} {t('highlights_section.videos_count')}</p>
        )}
      </div>

      {/* Modal */}
      {activeVideo?.youtube_id && (
        <VideoModal
          videoId={activeVideo.youtube_id}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  )
}
