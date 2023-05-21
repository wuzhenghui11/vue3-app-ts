import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useUserInfoStore = defineStore('userInfo', () => {
  const token = ref(Cookies.get('token'))

  let lsLang = localStorage.getItem('language')
  lsLang = lsLang ? lsLang : 'zh'

  const language = ref(lsLang)

  watch(language, (newValue) =>{
    localStorage.setItem('language', newValue)
  })

  function logout () {
    token.value = ''
  }

  return {
    language,
    token,
    logout,
  }
})