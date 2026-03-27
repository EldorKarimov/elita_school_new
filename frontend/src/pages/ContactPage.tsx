import ContactSection from '@/components/sections/ContactSection'

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-40 pb-20 bg-ui-darker overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl text-center mx-auto">
            <div className="section-label bg-white/5 text-blue-400 border-white/10 mb-8 mx-auto">Bog'lanish</div>
            <h1 className="text-5xl sm:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-8">
              Biz bilan <span className="text-gradient">aloqa</span>
            </h1>
            <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto">
              Savollaringiz bormi? Bizga xabar qoldiring yoki to'g'ridan-to'g'ri qo'ng'iroq qiling.
            </p>
          </div>
        </div>
      </section>

      <div className="pb-20">
        <ContactSection />
      </div>
    </div>
  )
}
