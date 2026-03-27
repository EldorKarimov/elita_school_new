import { useState } from 'react'
import type { GalleryCategory } from '@/types'
import { X, ZoomIn, Grid } from 'lucide-react'

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl animate-fade-in"
      onClick={onClose}
    >
      <button
        className="absolute top-8 right-8 w-14 h-14 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/20 transition-all border border-white/10 active:scale-95 z-[110]"
        onClick={onClose}
      >
        <X size={24} />
      </button>
      <div className="relative max-w-7xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
         <img
          src={src}
          alt="Gallery"
          className="max-w-full max-h-[85vh] object-contain rounded-3xl shadow-[0_0_100px_rgba(37,99,235,0.2)] animate-reveal"
        />
      </div>
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
    <section className="section-spacing bg-ui-darker relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-600/10 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-900/10 blur-[150px] rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
            <div className="section-label bg-white/5 text-blue-400 border-white/5">Galereya</div>
            <h2 className="text-4xl sm:text-7xl font-black text-white leading-[1] tracking-tighter mb-6">
              Maktab hayoti <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">lahzalarda</span>
            </h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              Bizning jonli muhitimiz, zamonaviy darslarimiz va unutilmas tadbirlarimizdan parchalar.
            </p>
          </div>
          <button className="premium-button-primary px-10 gap-3">
             <Grid size={20} />
             To'liq galereya
          </button>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
          {allImages.map((img, i) => (
            <div
              key={img.id}
              className="relative group break-inside-avoid rounded-[32px] overflow-hidden cursor-pointer border border-white/5 bg-slate-900 shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:border-blue-500/30"
              onClick={() => setLightbox(img.image)}
            >
              <img
                src={img.image}
                alt={img.title || `Gallery ${i + 1}`}
                className="w-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                style={{ aspectRatio: i % 3 === 0 ? '1/1.4' : i % 2 === 0 ? '1/1' : '4/5' }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                   <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-4 shadow-xl">
                      <ZoomIn size={24} />
                   </div>
                   <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-1">{img.categoryName}</div>
                   <div className="text-white font-black text-lg line-clamp-1">{img.title || "Maktab tadbiri"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  )
}
