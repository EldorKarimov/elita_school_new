import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Layout
import { RootLayout } from '@/components/common/RootLayout'

// Pages (lazy loaded)
const HomePage = lazy(() => import('@/pages/HomePage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const TeachersPage = lazy(() => import('@/pages/TeachersPage'))
const TeacherDetailPage = lazy(() => import('@/pages/TeacherDetailPage'))
const NewsPage = lazy(() => import('@/pages/NewsPage'))
const NewsDetailPage = lazy(() => import('@/pages/NewsDetailPage'))
const BlogPage = lazy(() => import('@/pages/BlogPage'))
const BlogDetailPage = lazy(() => import('@/pages/BlogDetailPage'))
const GalleryPage = lazy(() => import('@/pages/GalleryPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

function PageLoader() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><HomePage /></Suspense> },
      { path: 'about', element: <Suspense fallback={<PageLoader />}><AboutPage /></Suspense> },
      { path: 'teachers', element: <Suspense fallback={<PageLoader />}><TeachersPage /></Suspense> },
      { path: 'teachers/:uuid', element: <Suspense fallback={<PageLoader />}><TeacherDetailPage /></Suspense> },
      { path: 'news', element: <Suspense fallback={<PageLoader />}><NewsPage /></Suspense> },
      { path: 'news/:slug', element: <Suspense fallback={<PageLoader />}><NewsDetailPage /></Suspense> },
      { path: 'blogs', element: <Suspense fallback={<PageLoader />}><BlogPage /></Suspense> },
      { path: 'blogs/:slug', element: <Suspense fallback={<PageLoader />}><BlogDetailPage /></Suspense> },
      { path: 'gallery', element: <Suspense fallback={<PageLoader />}><GalleryPage /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<PageLoader />}><ContactPage /></Suspense> },
      { path: '*', element: <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense> },
    ],
  },
])
