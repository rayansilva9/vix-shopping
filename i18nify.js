import i18next from 'i18next'
import enTranslation from './locales/en/common.json'
import esTranslation from './locales/es/common.json'
import ptTranslation from './locales/pt/common.json'

import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  },
  pt: {
    translation: ptTranslation
  }
}
i18next.use(initReactI18next).init({
  lng: 'pt', // if you're using a language detector, do not define the lng option
  debug: true,
  resources,
  interpolation: {
    escapeValue: false
  },
  react: {
    wait: true
  }
})

export default i18next
