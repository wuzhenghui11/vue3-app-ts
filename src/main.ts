import { createApp } from 'vue'
// import type { InjectionKey, ComponentPublicInstance } from 'vue'
import { createPinia } from 'pinia'
import { useUserInfoStore } from './stores/userInfo'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import globalComponents from './components'

import Antd from 'ant-design-vue'
import './assets/theme.less'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import i18n from './i18n'

import { myPiniaPlugin } from './stores/storesPlugin'

const pinia = createPinia()
pinia.use(myPiniaPlugin)
pinia.use(() => ({ objectWay: 'world!' }))

const app = createApp(App)

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach((to, from) => {
  NProgress.start()
  // console.log('to:', to)
  // console.log('from:', from)
  const userInfoStore = useUserInfoStore()

  // console.log('token:', userInfoStore.token)
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

// errorHandler
app.config.warnHandler = (err, instance, info) => {
  console.log(err, instance, info);
}

// app.config.performance = true

// app.config.compilerOptions.delimiters​ = ['{{', '}}']

const $aa: any = {}

app.config.globalProperties = $aa

app.directive('color', {
  mounted: (el: any, binding, vNode, prevNode) => {
    console.log(binding)
    el.style.color = binding.value
  },
})

const muPlugin = {
  install (app: any, options: any) {
    app.config.globalProperties.$test = options.value
  }
}

app.use(pinia)
app.use(router)
app.use(Antd)
app.use(i18n)


app.use(globalComponents)

app.use(muPlugin, {
  value: true
})


// console.log('app:', app)

app.mount('#app')
