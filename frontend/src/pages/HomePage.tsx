import { useEffect, useState } from 'react'
import { GraduationCap } from 'lucide-react'
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
      <div className="min-h-screen flex items-center justify-center bg-ui-darker relative overflow-hidden">
        {/* Animated Background orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
        
        <div className="relative flex flex-col items-center gap-10">
          <div className="relative">
            <div className="w-24 h-24 rounded-[32px] border-4 border-blue-500/10 border-t-blue-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
               <GraduationCap size={32} className="text-blue-500 animate-pulse" />
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="font-black text-white text-3xl tracking-tighter">ELITA<span className="text-blue-500">.</span></div>
            <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] animate-pulse">Yuklanmoqda</div>
          </div>
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
