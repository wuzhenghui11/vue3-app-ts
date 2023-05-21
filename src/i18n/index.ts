import { createI18n } from 'vue-i18n'
import { messages } from 'vite-i18n-resources'

console.log(messages)

const i18n = createI18n({
  legacy: false,
  allowComposition: true,
  locale: localStorage.getItem('language') || 'zh',
  fallbackLocale: 'zh',
  messages
})

// i18n.global.locale.value = 'zh'

export default i18n