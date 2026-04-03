import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mediaUrl(path: string | null | undefined): string {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const base = import.meta.env.VITE_MEDIA_BASE_URL ?? ''
  return `${base}${path}`
}
