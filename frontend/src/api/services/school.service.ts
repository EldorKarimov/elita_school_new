import type { ApiResponse, HomeData, About, Statistic, Teacher, TeacherDetail, ContactForm, SiteSettings } from '@/types'
import apiClient from '../client'
import { ENDPOINTS } from '../endpoints'

export const schoolService = {
  getSiteSettings: async (): Promise<SiteSettings | null> => {
    const { data } = await apiClient.get<ApiResponse<SiteSettings | null>>(ENDPOINTS.SITE_SETTINGS)
    return data.data
  },

  getHome: async (): Promise<HomeData> => {
    const { data } = await apiClient.get<ApiResponse<HomeData>>(ENDPOINTS.HOME)
    return data.data
  },

  getAbout: async (): Promise<About> => {
    const { data } = await apiClient.get<ApiResponse<About>>(ENDPOINTS.ABOUT)
    return data.data
  },

  getStatistics: async (): Promise<Statistic[]> => {
    const { data } = await apiClient.get<ApiResponse<Statistic[]>>(ENDPOINTS.STATISTICS)
    return data.data
  },

  getTeachers: async (type?: 'management' | 'teacher'): Promise<Teacher[]> => {
    const params = type ? { type } : {}
    const { data } = await apiClient.get<ApiResponse<Teacher[]>>(ENDPOINTS.TEACHERS, { params })
    return data.data
  },

  getTeacherDetail: async (uuid: string): Promise<TeacherDetail> => {
    const { data } = await apiClient.get<ApiResponse<TeacherDetail>>(ENDPOINTS.TEACHER_DETAIL(uuid))
    return data.data
  },

  submitContact: async (form: ContactForm): Promise<void> => {
    await apiClient.post(ENDPOINTS.CONTACT, form)
  },
}
