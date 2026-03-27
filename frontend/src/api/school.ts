import apiClient from './client'
import type {
  HomepageData,
  About,
  Teacher,
  TeacherDetail,
  Statistic,
  ContactForm,
  ApiResponse,
} from '@/types'

export const getHome = async (): Promise<HomepageData> => {
  const res = await apiClient.get<ApiResponse<HomepageData>>('/home/')
  return res.data.data
}

export const getAbout = async (): Promise<About | null> => {
  const res = await apiClient.get<ApiResponse<About | null>>('/about/')
  return res.data.data
}

export const getStatistics = async (): Promise<Statistic[]> => {
  const res = await apiClient.get<ApiResponse<Statistic[]>>('/statistics/')
  return res.data.data
}

export const getTeachers = async (type?: 'management' | 'teacher'): Promise<Teacher[]> => {
  const params = type ? { type } : {}
  const res = await apiClient.get<ApiResponse<Teacher[]>>('/teachers/', { params })
  return res.data.data
}

export const getTeacherDetail = async (uuid: string): Promise<TeacherDetail> => {
  const res = await apiClient.get<ApiResponse<TeacherDetail>>(`/teachers/${uuid}/`)
  return res.data.data
}

export const postContact = async (data: ContactForm): Promise<void> => {
  await apiClient.post('/contact/', data)
}
