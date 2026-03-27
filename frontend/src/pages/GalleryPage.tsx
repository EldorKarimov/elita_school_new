import { useEffect, useState } from 'react'
import { getGallery } from '@/api/content'
import type { GalleryCategory } from '@/types'
import { X, ZoomIn, Images } from 'lucide-react'

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.93)' }}
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white"
        style={{ background: 'rgba(255,255,255,0.1)' }}
        onClick={onClose}
      >
        <X size={20} />
      </button>
      <img
        src={src}
        alt="Gallery"
        className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryCategory[]>([])
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getGallery().then(setGallery).finally(() => setLoading(false))
  }, [])

  const currentCategory = activeCategory
    ? gallery.find((c) => c.id === activeCategory)
    : null

  const allImages = currentCategory
    ? currentCategory.images.map((img) => ({ ...img, categoryName: currentCategory.name }))
    : gallery.flatMap((cat) => cat.images.map((img) => ({ ...img, categoryName: cat.name })))

  return (
    <div>
      <div className="pt-32 pb-12 text-white" style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-5xl font-black mb-4 flex items-center gap-3">
            <Images size={40} />
            Galereya
          </h1>
          <p className="text-lg max-w-xl" style={{ color: '#93c5fd' }}>
            Maktabimiz hayotidan rasmlar va lahzalar
          </p>
          {/* Category filter */}
          {gallery.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8">
              <button
                onClick={() => setActiveCategory(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{ background: !activeCategory ? '#3b82f6' : 'rgba(255,255,255,0.1)', color: 'white' }}
              >
                Barchasi
              </button>
              {gallery.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: activeCategory === cat.id ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                    color: 'white',
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="section-padding" style={{ background: '#0f172a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="skeleton break-inside-avoid rounded-xl" style={{ height: i % 3 === 0 ? '280px' : '200px', background: '#1e293b' }} />
              ))}
            </div>
          ) : allImages.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🖼️</div>
              <p className="text-lg font-semibold" style={{ color: '#64748b' }}>Rasmlar topilmadi</p>
            </div>
          ) : (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
              {allImages.map((img, i) => (
                <div
                  key={img.id}
                  className="relative group break-inside-avoid rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => setLightbox(img.image)}
                >
                  <img
                    src={img.image}
                    alt={img.title || `Gallery ${i + 1}`}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ aspectRatio: i % 4 === 0 ? '3/4' : i % 3 === 0 ? '4/3' : '1/1' }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn size={28} className="text-white" />
                      {img.title && (
                        <span className="text-white text-xs font-medium px-3 text-center">{img.title}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  )
}
