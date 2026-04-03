import type {
  ApiResponse,
  PaginatedResponse,
  FAQ,
  SchoolHighlight,
  GalleryCategory,
  GalleryCategoryMeta,
  GalleryImage,
  NewsCategory,
  NewsList,
  NewsDetail,
  Tag,
  BlogCategory,
  BlogList,
  BlogDetail,
} from '@/types'
import apiClient from '../client'
import { ENDPOINTS } from '../endpoints'

export const contentService = {
  // --- Highlights ---
  getHighlights: async (): Promise<SchoolHighlight[]> => {
    const { data } = await apiClient.get<ApiResponse<SchoolHighlight[]>>(ENDPOINTS.HIGHLIGHTS)
    return data.data
  },

  // --- FAQ ---
  getFaqs: async (): Promise<FAQ[]> => {
    const { data } = await apiClient.get<ApiResponse<FAQ[]>>(ENDPOINTS.FAQS)
    return data.data
  },

  // --- Gallery ---
  getGallery: async (): Promise<GalleryCategory[]> => {
    const { data } = await apiClient.get<ApiResponse<GalleryCategory[]>>(ENDPOINTS.GALLERY)
    return data.data
  },

  getGalleryCategories: async (): Promise<GalleryCategoryMeta[]> => {
    const { data } = await apiClient.get<ApiResponse<GalleryCategoryMeta[]>>(ENDPOINTS.GALLERY_CATEGORIES)
    return data.data
  },

  getGalleryImages: async (params?: { category?: string; page?: number; pageSize?: number }): Promise<PaginatedResponse<GalleryImage>> => {
    const res = await apiClient.get<PaginatedResponse<GalleryImage>>(ENDPOINTS.GALLERY_IMAGES, { params })
    return res.data
  },

  // --- News ---
  getNewsCategories: async (): Promise<NewsCategory[]> => {
    const { data } = await apiClient.get<ApiResponse<NewsCategory[]>>(ENDPOINTS.NEWS_CATEGORIES)
    return data.data
  },

  getNewsList: async (params?: { category?: string; page?: number; pageSize?: number }): Promise<PaginatedResponse<NewsList>> => {
    const res = await apiClient.get<PaginatedResponse<NewsList>>(ENDPOINTS.NEWS, { params })
    return res.data
  },

  getNewsDetail: async (slug: string): Promise<{ news: NewsDetail; latest_news: NewsList[] }> => {
    const { data } = await apiClient.get<ApiResponse<{ news: NewsDetail; latest_news: NewsList[] }>>(ENDPOINTS.NEWS_DETAIL(slug))
    return data.data
  },

  // --- Blog ---
  getBlogCategories: async (): Promise<BlogCategory[]> => {
    const { data } = await apiClient.get<ApiResponse<BlogCategory[]>>(ENDPOINTS.BLOG_CATEGORIES)
    return data.data
  },

  getBlogTags: async (): Promise<Tag[]> => {
    const { data } = await apiClient.get<ApiResponse<Tag[]>>(ENDPOINTS.BLOG_TAGS)
    return data.data
  },

  getBlogList: async (params?: { category?: string; tag?: string; page?: number; pageSize?: number }): Promise<PaginatedResponse<BlogList>> => {
    const res = await apiClient.get<PaginatedResponse<BlogList>>(ENDPOINTS.BLOGS, { params })
    return res.data
  },

  getBlogDetail: async (slug: string): Promise<{ blog: BlogDetail; latest_blogs: BlogList[]; all_tags: Tag[] }> => {
    const { data } = await apiClient.get<ApiResponse<{ blog: BlogDetail; latest_blogs: BlogList[]; all_tags: Tag[] }>>(ENDPOINTS.BLOG_DETAIL(slug))
    return data.data
  },
}
