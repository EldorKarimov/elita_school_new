import { useTranslation } from 'react-i18next'
import { queryClient } from '@/providers/QueryProvider'

const LANGUAGES = [
  { code: 'uz', label: "O'z" },
  { code: 'ru', label: 'Ру' },
  { code: 'en', label: 'En' },
] as const

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  function changeLanguage(code: string) {
    i18n.changeLanguage(code)
    // Barcha cached querylarni tozalash — yangi til bilan API qayta so'rovlar yuboradi
    queryClient.invalidateQueries()
  }

  return (
    <div className="flex gap-1">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => changeLanguage(code)}
          className={`rounded px-2.5 py-1 text-xs font-semibold transition-all ${
            i18n.language === code
              ? 'bg-white text-[#274c8f]'
              : 'text-white/80 hover:bg-white/15 hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
