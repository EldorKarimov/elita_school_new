import { useEffect, useState } from 'react'
import { getHome, getAbout } from '@/api/school'
import type { HomepageData, About } from '@/types'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import AboutSection from '@/components/sections/AboutSection'
import TeachersSection from '@/components/sections/TeachersSection'
import NewsSection from '@/components/sections/NewsSection'
import BlogSection from '@/components/sections/BlogSection'
import GallerySection from '@/components/sections/GallerySection'
import ContactSection from '@/components/sections/ContactSection'

export default function HomePage() {
  const [data, setData] = useState<HomepageData | null>(null)
  const [about, setAbout] = useState<About | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [homeData, aboutData] = await Promise.all([getHome(), getAbout()])
        setData(homeData)
        setAbout(aboutData)
      } catch (err) {
        console.error('Failed to load homepage data:', err)
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f172a' }}>
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-14 h-14 rounded-full border-4 border-t-blue-500 border-white/10 animate-spin"
          />
          <span className="text-sm font-medium" style={{ color: '#64748b' }}>Yuklanmoqda...</span>
        </div>
      </div>
    )
  }

  return (
    <main>
      <HeroSection />
      {data?.statistics && <StatsSection statistics={data.statistics} />}
      <AboutSection about={about} />
      {data?.teachers && <TeachersSection teachers={data.teachers} />}
      {data?.latest_news && <NewsSection news={data.latest_news} />}
      {data?.latest_blogs && <BlogSection blogs={data.latest_blogs} />}
      {data?.gallery && <GallerySection gallery={data.gallery} />}
      <ContactSection />
    </main>
  )
}
