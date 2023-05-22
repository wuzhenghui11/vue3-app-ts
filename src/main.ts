import './assets/main.css'

import { createApp } from 'vue'
// import type { InjectionKey, ComponentPublicInstance } from 'vue'
import { createPinia } from 'pinia'
import { useUserInfoStore } from './stores/userInfo'

import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import i18n from './i18n'

const pinia = createPinia()

const app = createApp(App)

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach((to, from) => {
  NProgress.start()
  console.log('to:', to)
  console.log('from:', from)
  const userInfoStore = useUserInfoStore()

  console.log(userInfoStore.token)
  if (whiteList.includes(to.path)) {
    return true
  }
  if (userInfoStore.token === '111') {
    return true
  } else {
    return {
      path: '/login'
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

app.use(pinia)
app.use(router)
app.use(Antd)
app.use(i18n)
console.log(app)

app.mount('#app')
