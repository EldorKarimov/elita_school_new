import { useQuery, useMutation } from '@tanstack/react-query'
import { schoolService } from '@/api/services'
import type { ContactForm } from '@/types'

export const SCHOOL_KEYS = {
  siteSettings: ['site-settings'] as const,
  home: ['home'] as const,
  about: ['about'] as const,
  statistics: ['statistics'] as const,
  teachers: (type?: string) => ['teachers', type] as const,
  teacher: (uuid: string) => ['teachers', uuid] as const,
}

export function useSiteSettings() {
  return useQuery({
    queryKey: SCHOOL_KEYS.siteSettings,
    queryFn: schoolService.getSiteSettings,
    staleTime: 30 * 60 * 1000, // 30 daqiqa — kamdan-kam o'zgaradi
  })
}

export function useHome() {
  return useQuery({
    queryKey: SCHOOL_KEYS.home,
    queryFn: schoolService.getHome,
    staleTime: 5 * 60 * 1000, // 5 daqiqa
  })
}

export function useAbout() {
  return useQuery({
    queryKey: SCHOOL_KEYS.about,
    queryFn: schoolService.getAbout,
    staleTime: 10 * 60 * 1000,
  })
}

export function useStatistics() {
  return useQuery({
    queryKey: SCHOOL_KEYS.statistics,
    queryFn: schoolService.getStatistics,
    staleTime: 10 * 60 * 1000,
  })
}

export function useTeachers(type?: 'management' | 'teacher') {
  return useQuery({
    queryKey: SCHOOL_KEYS.teachers(type),
    queryFn: () => schoolService.getTeachers(type),
    staleTime: 5 * 60 * 1000,
  })
}

export function useTeacherDetail(uuid: string) {
  return useQuery({
    queryKey: SCHOOL_KEYS.teacher(uuid),
    queryFn: () => schoolService.getTeacherDetail(uuid),
    enabled: !!uuid,
  })
}

export function useContactMutation() {
  return useMutation({
    mutationFn: (form: ContactForm) => schoolService.submitContact(form),
  })
}
