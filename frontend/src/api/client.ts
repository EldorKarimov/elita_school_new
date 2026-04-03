import axios from 'axios'
import i18n from '@/i18n'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — tildagi Accept-Language headerini qo'shadi
apiClient.interceptors.request.use((config) => {
  const locale = i18n.resolvedLanguage || i18n.language || "uz";
  config.headers['Accept-Language'] = locale;
  return config
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor — xatolarni markazlashgan holda ushlaydi
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      return Promise.reject(new Error('not_found'))
    }
    if (error.response?.status >= 500) {
      return Promise.reject(new Error('server_error'))
    }
    return Promise.reject(error)
  }
)

export default apiClient
