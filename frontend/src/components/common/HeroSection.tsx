import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSiteSettings } from '@/hooks/useSchool'
import heroVideFallback from '@/assets/hero-video.mp4'
import heroPng from '@/assets/hero.png'

export function HeroSection() {
  const { t } = useTranslation()
  const { data: settings } = useSiteSettings()

  const videoSrc = settings?.hero_video ?? heroVideFallback
  const schoolName = settings?.name ?? 'Elita Akademik Maktabi'
  const slogan = settings?.slogan

  return (
    <section className="relative h-[calc(100vh-140px)] min-h-[520px] overflow-hidden">
      {/* Background video */}
      <video
        key={videoSrc}
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#274c8f]/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

      {/* Content — chap pastda */}
      <div className="relative flex h-full flex-col justify-end px-8 pb-16 text-white md:px-16 lg:px-24">
        {/* Badge */}
        <span className="mb-5 inline-block w-fit rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
          {schoolName}
        </span>

        {/* Heading */}
        <h1 className="mb-3 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight drop-shadow-lg md:text-5xl lg:text-6xl">
          {t('hero.title')}
        </h1>

        {/* Slogan */}
        <p className="mb-8 max-w-lg text-lg font-medium text-white/85 drop-shadow md:text-xl">
          {slogan ?? t('hero.slogan')}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/contact"
            className="rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#274c8f] shadow-lg transition-all hover:bg-white/90 hover:shadow-xl active:scale-95"
          >
            {t('hero.cta_primary')}
          </Link>
          <Link
            to="/about"
            className="rounded-lg border border-white/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
          >
            {t('hero.cta_secondary')}
          </Link>
        </div>
      </div>

      {/* Hero image — o'ng pastda */}
      <div className="absolute bottom-0 right-8 hidden h-[75%] max-h-[480px] lg:block">
        <img
          src={heroPng}
          alt="O'quvchi"
          className="h-full w-auto object-contain object-bottom drop-shadow-2xl"
        />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent" />
    </section>
  )
}
