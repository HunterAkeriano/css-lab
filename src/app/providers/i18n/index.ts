import { createI18n } from 'vue-i18n'
import ru from './locales/ru'
import en from './locales/en'

const savedLocale = localStorage.getItem('locale')
const browserLocale = navigator.language.split('-')[0]
const defaultLocale = savedLocale || (browserLocale === 'ru' ? 'ru' : 'en')

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: {
    ru,
    en
  }
})

export function setLocale(locale: string) {
  i18n.global.locale.value = locale as any
  localStorage.setItem('locale', locale)
  document.documentElement.setAttribute('lang', locale)
}

document.documentElement.setAttribute('lang', defaultLocale)
