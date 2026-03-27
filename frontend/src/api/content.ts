import apiClient from './client'
import type {
  News,
  NewsDetail,
  NewsCategory,
  Blog,
  BlogDetail,
  Tag,
  GalleryCategory,
  PaginatedResponse,
  ApiResponse,
} from '@/types'

export const getNews = async (page = 1, category?: string): Promise<PaginatedResponse<News>> => {
  const params: Record<string, string | number> = { page }
  if (category) params.category = category
  const res = await apiClient.get<PaginatedResponse<News>>('/news/', { params })
  return res.data
}

export const getNewsCategories = async (): Promise<NewsCategory[]> => {
  const res = await apiClient.get<ApiResponse<NewsCategory[]>>('/news/categories/')
  return res.data.data
}

export const getNewsDetail = async (slug: string): Promise<{ news: NewsDetail; latest_news: News[] }> => {
  const res = await apiClient.get<ApiResponse<{ news: NewsDetail; latest_news: News[] }>>(`/news/${slug}/`)
  return res.data.data
}

export const getBlogs = async (page = 1, tag?: string): Promise<PaginatedResponse<Blog>> => {
  const params: Record<string, string | number> = { page }
  if (tag) params.tag = tag
  const res = await apiClient.get<PaginatedResponse<Blog>>('/blogs/', { params })
  return res.data
}

export const getBlogTags = async (): Promise<Tag[]> => {
  const res = await apiClient.get<ApiResponse<Tag[]>>('/blogs/tags/')
  return res.data.data
}

export const getBlogDetail = async (slug: string): Promise<{ blog: BlogDetail; latest_blogs: Blog[]; all_tags: Tag[] }> => {
  const res = await apiClient.get<ApiResponse<{ blog: BlogDetail; latest_blogs: Blog[]; all_tags: Tag[] }>>(`/blogs/${slug}/`)
  return res.data.data
}

export const getGallery = async (): Promise<GalleryCategory[]> => {
  const res = await apiClient.get<ApiResponse<GalleryCategory[]>>('/gallery/')
  return res.data.data
}
