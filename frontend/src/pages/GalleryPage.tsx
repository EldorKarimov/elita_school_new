import { useEffect, useState } from 'react'
import { getGallery } from '@/api/content'
import type { GalleryCategory } from '@/types'
import { X, ZoomIn } from 'lucide-react'

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-3xl animate-fade-in"
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
          className="max-w-full max-h-[85vh] object-contain rounded-[40px] shadow-[0_0_100px_rgba(37,99,235,0.25)] animate-reveal border-8 border-white/5"
        />
      </div>
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
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-ui-darker overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="section-label bg-white/5 text-blue-400 border-white/10 mx-auto mb-8">Galereya</div>
          <h1 className="text-5xl sm:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-8">
            Maktab <span className="text-gradient">hayoti</span> kadrlarda
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-12">
            Bizning har bir kunimiz quvonchli lahzalar, yangi bilimlar va unutilmas tadbirlarga boy.
          </p>

          {/* Premium Filter */}
          {gallery.length > 0 && (
            <div className="inline-flex flex-wrap justify-center gap-3 p-2 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-8 py-4 rounded-[24px] text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === null 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Barchasi
              </button>
              {gallery.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-8 py-4 rounded-[24px] text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat.id 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
             <div className="columns-1 sm:columns-2 lg:columns-4 gap-8 space-y-8">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="rounded-[40px] bg-slate-50 animate-pulse" style={{ height: i % 3 === 0 ? '400px' : '300px' }} />
                ))}
             </div>
          ) : allImages.length === 0 ? (
            <div className="text-center py-32">
              <div className="text-6xl mb-8">🖼️</div>
              <h3 className="text-2xl font-black text-slate-950 mb-2">Rasmlar topilmadi</h3>
              <p className="text-slate-500 font-medium">Bu ruknda hozircha hech qanday rasm mavjud emas.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-4 gap-8 space-y-8">
              {allImages.map((img, i) => (
                <div
                  key={img.id}
                  className="relative group break-inside-avoid rounded-[40px] overflow-hidden bg-slate-100 cursor-pointer shadow-2xl shadow-slate-200/50 border border-slate-50 transition-all duration-700 hover:-translate-y-2"
                  onClick={() => setLightbox(img.image)}
                >
                  <img
                    src={img.image}
                    alt={img.title || `Gallery ${i + 1}`}
                    className="w-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    style={{ aspectRatio: i % 4 === 0 ? '3/4' : i % 3 === 0 ? '4/5' : '1/1' }}
                  />
                  
                  {/* Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                       <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-4 shadow-xl">
                          <ZoomIn size={24} />
                       </div>
                       <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-1">{img.categoryName}</div>
                       <div className="text-white font-black text-lg line-clamp-2 leading-tight">{img.title || "Maktab tadbiri"}</div>
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
