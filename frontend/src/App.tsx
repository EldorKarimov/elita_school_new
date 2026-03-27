import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import TeachersPage from '@/pages/TeachersPage'
import TeacherDetailPage from '@/pages/TeacherDetailPage'
import NewsListPage from '@/pages/NewsListPage'
import NewsDetailPage from '@/pages/NewsDetailPage'
import BlogListPage from '@/pages/BlogListPage'
import BlogDetailPage from '@/pages/BlogDetailPage'
import GalleryPage from '@/pages/GalleryPage'
import ContactPage from '@/pages/ContactPage'
import ScrollToTop from '@/components/utils/ScrollToTop'
import './App.css'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="teachers/:uuid" element={<TeacherDetailPage />} />
          <Route path="news" element={<NewsListPage />} />
          <Route path="news/:slug" element={<NewsDetailPage />} />
          <Route path="blog" element={<BlogListPage />} />
          <Route path="blog/:slug" element={<BlogDetailPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
