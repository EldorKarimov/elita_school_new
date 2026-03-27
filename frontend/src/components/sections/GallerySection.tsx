import { useState } from 'react'
import type { GalleryCategory } from '@/types'
import { X, ZoomIn } from 'lucide-react'

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
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

export default function GallerySection({ gallery }: { gallery: GalleryCategory[] }) {
  const [lightbox, setLightbox] = useState<string | null>(null)

  // Flatten images, show first 8
  const allImages = gallery.flatMap((cat) =>
    cat.images.map((img) => ({ ...img, categoryName: cat.name })),
  ).slice(0, 8)

  if (!allImages.length) return null

  return (
    <section
      className="section-padding"
      style={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e2d4a 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="section-title-wrapper">
          <span
            className="section-badge"
            style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.25)' }}
          >
            Galereya
          </span>
          <h2 className="text-4xl font-black text-white">
            Hayotimizdan <span style={{ color: '#60a5fa' }}>lahzalar</span>
          </h2>
          <p className="text-center mt-3 max-w-md" style={{ color: '#64748b' }}>
            Maktabimiz hayoti, tadbirlar va o'quv jarayonlari
          </p>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {allImages.map((img, i) => (
            <div
              key={img.id}
              className="relative group break-inside-avoid rounded-xl overflow-hidden cursor-pointer"
              style={{ background: '#1e293b' }}
              onClick={() => setLightbox(img.image)}
            >
              <img
                src={img.image}
                alt={img.title || `Gallery ${i + 1}`}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ aspectRatio: i % 3 === 0 ? '1/1.3' : i % 2 === 0 ? '1/1' : '4/3' }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <ZoomIn
                  size={28}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0"
                />
              </div>
              {/* Category label */}
              <div
                className="absolute bottom-0 inset-x-0 px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}
              >
                <span className="text-xs text-white font-medium">{img.categoryName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  )
}
