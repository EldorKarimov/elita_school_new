// Base
export interface BaseModel {
  id: number
  uuid: string
  created_at: string
  updated_at: string
  is_active: boolean
}

// Statistics
export interface Statistic {
  id: number
  label: string
  value: number
}

// Science (subject)
export interface Science {
  id: number
  name: string
}

// Teacher
export interface Teacher {
  id: number
  uuid: string
  full_name: string
  image: string
  experience: string
  phone: string
  position: string
  type: 'management' | 'teacher'
  degree: 'bachelor' | 'master' | 'phd' | 'doctor' | 'none'
  sciences: Science[]
}

export interface LessonExample {
  id: number
  title: string
  youtube_link: string
}

export interface Schedule {
  id: number
  weekday: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
  start_time: string
  end_time: string
}

export interface TeacherDetail extends Teacher {
  about: string
  lessons: LessonExample[]
  schedules: Schedule[]
}

// About
export interface About {
  id: number
  content: string
  photo1: string
  photo2: string | null
  photo3: string | null
}

// News
export interface NewsCategory {
  id: number
  name: string
  slug: string
}

export interface News {
  id: number
  title: string
  slug: string
  main_image: string
  category: NewsCategory | null
  views_count: number
  publish_date: string
  created_at: string
}

export interface NewsDetail extends News {
  content: string
  additional_images: { id: number; image: string }[]
}

// Blog
export interface Tag {
  id: number
  name: string
  slug: string
}

export interface Blog {
  id: number
  title: string
  slug: string
  image: string
  author: string
  tags: Tag[]
  created_at: string
}

export interface BlogDetail extends Blog {
  content: string
}

// Gallery
export interface GalleryImage {
  id: number
  image: string
  title: string
}

export interface GalleryCategory {
  id: number
  name: string
  images: GalleryImage[]
}

// Contact form
export interface ContactForm {
  full_name: string
  phone: string
  subject?: string
  message: string
}

// Homepage data (from /api/v1/home/)
export interface HomepageData {
  statistics: Statistic[]
  latest_news: News[]
  latest_blogs: Blog[]
  teachers: Teacher[]
  gallery: GalleryCategory[]
}

// Paginated response
export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// API wrapper
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}
