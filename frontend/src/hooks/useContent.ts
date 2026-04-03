import { useQuery } from '@tanstack/react-query'
import { contentService } from '@/api/services'

export const CONTENT_KEYS = {
  highlights: ['highlights'] as const,
  faqs: ['faqs'] as const,
  gallery: ['gallery'] as const,
  galleryCategories: ['gallery-categories'] as const,
  galleryImages: (params?: object) => ['gallery-images', params] as const,
  newsCategories: ['news-categories'] as const,
  newsList: (params?: object) => ['news', params] as const,
  newsDetail: (slug: string) => ['news', slug] as const,
  blogCategories: ['blog-categories'] as const,
  blogTags: ['blog-tags'] as const,
  blogList: (params?: object) => ['blogs', params] as const,
  blogDetail: (slug: string) => ['blogs', slug] as const,
}

export function useHighlights() {
  return useQuery({
    queryKey: CONTENT_KEYS.highlights,
    queryFn: contentService.getHighlights,
    staleTime: 10 * 60 * 1000,
  })
}

export function useFaqs() {
  return useQuery({
    queryKey: CONTENT_KEYS.faqs,
    queryFn: contentService.getFaqs,
    staleTime: 10 * 60 * 1000,
  })
}

export function useGallery() {
  return useQuery({
    queryKey: CONTENT_KEYS.gallery,
    queryFn: contentService.getGallery,
    staleTime: 10 * 60 * 1000,
  })
}

export function useGalleryCategories() {
  return useQuery({
    queryKey: CONTENT_KEYS.galleryCategories,
    queryFn: contentService.getGalleryCategories,
    staleTime: 10 * 60 * 1000,
  })
}

export function useGalleryImages(params?: { category?: string; page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: CONTENT_KEYS.galleryImages(params),
    queryFn: () => contentService.getGalleryImages(params),
    staleTime: 3 * 60 * 1000,
  })
}

export function useNewsCategories() {
  return useQuery({
    queryKey: CONTENT_KEYS.newsCategories,
    queryFn: contentService.getNewsCategories,
    staleTime: 10 * 60 * 1000,
  })
}

export function useNewsList(params?: { category?: string; page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: CONTENT_KEYS.newsList(params),
    queryFn: () => contentService.getNewsList(params),
    staleTime: 3 * 60 * 1000,
  })
}

export function useNewsDetail(slug: string) {
  return useQuery({
    queryKey: CONTENT_KEYS.newsDetail(slug),
    queryFn: () => contentService.getNewsDetail(slug),
    enabled: !!slug,
  })
}

export function useBlogCategories() {
  return useQuery({
    queryKey: CONTENT_KEYS.blogCategories,
    queryFn: contentService.getBlogCategories,
    staleTime: 10 * 60 * 1000,
  })
}

export function useBlogTags() {
  return useQuery({
    queryKey: CONTENT_KEYS.blogTags,
    queryFn: contentService.getBlogTags,
    staleTime: 10 * 60 * 1000,
  })
}

export function useBlogList(params?: { category?: string; tag?: string; page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: CONTENT_KEYS.blogList(params),
    queryFn: () => contentService.getBlogList(params),
    staleTime: 3 * 60 * 1000,
  })
}

export function useBlogDetail(slug: string) {
  return useQuery({
    queryKey: CONTENT_KEYS.blogDetail(slug),
    queryFn: () => contentService.getBlogDetail(slug),
    enabled: !!slug,
  })
}
