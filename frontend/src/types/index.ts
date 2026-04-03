// --- BASE ---
export interface BaseEntity {
  uuid: string
  created_at: string
  is_active?: boolean
}

// --- API ---
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface Pagination {
  totalCount: number
  pageSize: number
  pageCount: number
  page: number
  next: string | null
  previous: string | null
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: Pagination
}

// --- SCHOOL ---
export interface Science extends BaseEntity {
  name: string
}

export type TeacherType = 'management' | 'teacher'
export type TeacherDegree = 'bachelor' | 'master' | 'phd' | 'doctor' | 'none'

export interface Teacher extends BaseEntity {
  full_name: string
  image: string
  position: string
  experience: string
  about: string
  type: TeacherType
  degree: TeacherDegree
  sciences: Science[]
  order: number
}

export interface TeacherDetail extends Teacher {
  about: string
  phone: string
  lessons: LessonExample[]
  schedules: Schedule[]
}

export interface LessonExample extends BaseEntity {
  title: string
  youtube_link: string
}

export type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export interface Schedule extends BaseEntity {
  weekday: Weekday
  start_time: string
  end_time: string
}

export interface About extends BaseEntity {
  content: string
  photo1: string
  photo2: string
  photo3: string
}

export interface Statistic extends BaseEntity {
  label: string
  value: number
}

export interface ContactForm {
  full_name: string
  phone: string
  subject?: string
  message: string
}

// --- CONTENT ---
export interface GalleryCategory extends BaseEntity {
  name: string
  images: GalleryItem[]
}

export interface GalleryCategoryMeta extends BaseEntity {
  name: string
  images_count: number
}

export interface GalleryItem extends BaseEntity {
  title: string
  image: string
}

export interface GalleryImage extends BaseEntity {
  title: string
  image: string
  category_uuid: string
  category_name: string
}

export interface NewsCategory extends BaseEntity {
  name: string
  slug: string
}

export interface NewsList extends BaseEntity {
  category: NewsCategory | null
  title: string
  slug: string
  main_image: string
  views_count: number
  publish_date: string
}

export interface NewsDetail extends NewsList {
  content: string
  additional_images: { uuid: string; image: string }[]
}

export interface Tag extends BaseEntity {
  name: string
  slug: string
}

export interface BlogCategory extends BaseEntity {
  name: string
  slug: string
}

export interface BlogAuthor {
  uuid: string
  full_name: string
  image: string
  position: string
}

export interface BlogList extends BaseEntity {
  title: string
  slug: string
  image: string
  category: BlogCategory | null
  author: BlogAuthor | null
  tags: Tag[]
  excerpt: string
}

export interface BlogDetail extends BlogList {
  content: string
}

// --- SCHOOL HIGHLIGHTS ---
export interface SchoolHighlight extends BaseEntity {
  title: string
  youtube_link: string
  youtube_id: string | null
  order: number
}

// --- FAQ ---
export interface FAQ extends BaseEntity {
  question: string
  answer: string
  order: number
}

// --- SITE SETTINGS ---
export interface SiteSettings {
  uuid: string
  name: string
  slogan: string
  logo: string | null
  hero_video: string | null
  address: string
  email: string | null
  main_phone: string
  other_phone: string
  reception: string
  telegram: string | null
  instagram: string | null
  youtube: string | null
  facebook: string | null
}

// --- HOME ---
export interface HomeData {
  statistics: Statistic[]
  latest_news: NewsList[]
  latest_blogs: BlogList[]
  teachers: Teacher[]
  gallery: GalleryCategory[]
}
