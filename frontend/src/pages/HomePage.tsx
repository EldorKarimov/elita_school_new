import { HeroSection } from '@/components/common/HeroSection'
import { StatisticsSection } from '@/components/sections/StatisticsSection'
import { WhyUsSection } from '@/components/sections/WhyUsSection'
import { TeachersSection } from '@/components/sections/TeachersSection'
import { NewsSection } from '@/components/sections/NewsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { BlogSection } from '@/components/sections/BlogSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { FaqsSection } from '@/components/sections/FaqsSection'
import { HighlightsSection } from '@/components/sections/HighlightsSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <WhyUsSection />
      <TeachersSection />
      <NewsSection />
      <ServicesSection />
      <BlogSection />
      <GallerySection />
      <FaqsSection />
      <HighlightsSection />
      <ContactSection />
    </>
  )
}
