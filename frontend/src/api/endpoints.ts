export const ENDPOINTS = {
  // Core
  SITE_SETTINGS: '/site-settings/',

  // School
  HOME: '/home/',
  ABOUT: '/about/',
  STATISTICS: '/statistics/',
  TEACHERS: '/teachers/',
  TEACHER_DETAIL: (uuid: string) => `/teachers/${uuid}/`,
  CONTACT: '/contact/',

  // Content — News
  NEWS: '/news/',
  NEWS_CATEGORIES: '/news/categories/',
  NEWS_DETAIL: (slug: string) => `/news/${slug}/`,

  // Content — Blog
  BLOGS: '/blogs/',
  BLOG_CATEGORIES: '/blogs/categories/',
  BLOG_TAGS: '/blogs/tags/',
  BLOG_DETAIL: (slug: string) => `/blogs/${slug}/`,

  // Content — FAQ
  FAQS: '/faqs/',

  // Content — Highlights
  HIGHLIGHTS: '/highlights/',

  // Content — Gallery
  GALLERY: '/gallery/',
  GALLERY_CATEGORIES: '/gallery/categories/',
  GALLERY_IMAGES: '/gallery/images/',
} as const
