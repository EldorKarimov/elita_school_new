import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useContactMutation, useSiteSettings } from '@/hooks/useSchool'
import type { ContactForm } from '@/types'

const LAT = 39.4285078586252
const LNG = 67.2407312767161

const EMPTY_FORM: ContactForm = {
  full_name: '',
  phone: '',
  subject: '',
  message: '',
}

export function ContactSection() {
  const { t } = useTranslation()
  const { data: settings } = useSiteSettings()
  const [form, setForm] = useState<ContactForm>(EMPTY_FORM)
  const [success, setSuccess] = useState(false)
  const { mutate, isPending, isError } = useContactMutation()

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    mutate(form, {
      onSuccess: () => {
        setSuccess(true)
        setForm(EMPTY_FORM)
      },
    })
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#274c8f]/8 px-4 py-1.5 text-sm font-semibold text-[#274c8f]">
            {t('contact.section_label')}
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
            {t('contact.title')}
          </h2>
          <p className="mt-2 text-base text-gray-500">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Left — Info + Map */}
          <div className="flex flex-col gap-6">

            {/* Info cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Address */}
              <div className="flex gap-3 rounded-2xl border border-gray-100 bg-[#f8faff] p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#274c8f] text-white">
                  <LocationIcon />
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">{t('contact.address_label')}</p>
                  <p className="text-sm font-semibold leading-snug text-gray-800">{settings?.address}</p>
                </div>
              </div>

              {/* Work time */}
              <div className="flex gap-3 rounded-2xl border border-gray-100 bg-[#f8faff] p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#274c8f] text-white">
                  <ClockIcon />
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">{t('contact.worktime_label')}</p>
                  <p className="text-sm font-semibold leading-snug text-gray-800">{settings?.reception}</p>
                </div>
              </div>

              {/* Phone 1 */}
              <div className="flex gap-3 rounded-2xl border border-gray-100 bg-[#f8faff] p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#274c8f] text-white">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">{t('contact.phone1_label')}</p>
                  {settings?.main_phone && (
                    <a
                      href={`tel:${settings.main_phone.replace(/\s/g, '')}`}
                      className="text-sm font-semibold text-gray-800 hover:text-[#274c8f]"
                    >
                      {settings.main_phone}
                    </a>
                  )}
                </div>
              </div>

              {/* Phone 2 */}
              <div className="flex gap-3 rounded-2xl border border-gray-100 bg-[#f8faff] p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#274c8f] text-white">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">{t('contact.phone2_label')}</p>
                  {settings?.other_phone && (
                    <a
                      href={`tel:${settings.other_phone.replace(/\s/g, '')}`}
                      className="text-sm font-semibold text-gray-800 hover:text-[#274c8f]"
                    >
                      {settings.other_phone}
                    </a>
                  )}
                </div>
              </div>

              {/* Email */}
              {settings?.email && (
                <div className="flex gap-3 rounded-2xl border border-gray-100 bg-[#f8faff] p-5 sm:col-span-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#274c8f] text-white">
                    <MailIcon />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">{t('contact.email_label')}</p>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-sm font-semibold text-gray-800 hover:text-[#274c8f]"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm" style={{ height: 300 }}>
              <iframe
                title={t('contact.map_title')}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3081.810177962785!2d67.2405167!3d39.4284167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4ccfd8d18441f3%3A0x9d35898534fa523c!2sELITA%20AKADEMIK%20MAKTABI!5e0!3m2!1sen!2s!4v1775030780885!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Open in maps link */}
            <a
              href={`https://www.google.com/maps?q=${LAT},${LNG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-[#274c8f] hover:underline"
            >
              <ExternalIcon />
              {t('contact.open_maps')}
            </a>
          </div>

          {/* Right — Form */}
          <div className="rounded-2xl border border-gray-100 bg-[#f8faff] p-8">
            <h3 className="mb-6 text-xl font-bold text-gray-900">{t('contact.send')}</h3>

            {success ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckIcon />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{t('contact.success_title')}</p>
                  <p className="mt-1 text-sm text-gray-500">{t('contact.success_subtitle')}</p>
                </div>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-sm font-semibold text-[#274c8f] hover:underline"
                >
                  {t('contact.send_another')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Full name */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                    {t('contact.full_name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.full_name_placeholder')}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-300 focus:border-[#274c8f] focus:ring-2 focus:ring-[#274c8f]/15"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                    {t('contact.phone')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.phone_placeholder')}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-300 focus:border-[#274c8f] focus:ring-2 focus:ring-[#274c8f]/15"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-600">{t('contact.subject')}</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder={t('contact.subject_placeholder')}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-300 focus:border-[#274c8f] focus:ring-2 focus:ring-[#274c8f]/15"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                    {t('contact.message')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder={t('contact.message_placeholder')}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-300 focus:border-[#274c8f] focus:ring-2 focus:ring-[#274c8f]/15"
                  />
                </div>

                {isError && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                    {t('contact.error')}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#274c8f] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#274c8f]/25 transition-all hover:bg-[#1e3a6e] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <>
                      <SpinnerIcon />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      {t('contact.send')}
                      <SendIcon />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Icons ---
function LocationIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
    </svg>
  )
}
function SendIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}
function ExternalIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}
function SpinnerIcon() {
  return (
    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}
