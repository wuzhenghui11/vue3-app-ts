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

import './publicPath.js'





let app: any = null
// let history = null;

const pinia = createPinia()

pinia.use(myPiniaPlugin)
pinia.use(() => ({ objectWay: 'world!' }))


const whiteList = ['/login']

NProgress.configure({ showSpinner: false })
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


function render(props: any = {}) {
  const { container } = props;
  // history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/vue3' : '/');
  // router = createRouter({
  //   history,
  //   routes,
  // });

  // instance = createApp(App);
  // instance.use(router);
  // instance.use(store);
  // instance.mount(container ? container.querySelector('#app') : '#app');

  app = createApp(App)

  // errorHandler
  app.config.warnHandler = (err: any, instance: any, info: any) => {
    console.log(err, instance, info);
  }

  // app.config.performance = true
  // app.config.compilerOptions.delimiters​ = ['{{', '}}']

  // 顶级属性
  const $golabalProp: any = {}
  app.config.globalProperties = $golabalProp

  // 自定义指令
  app.directive('color', {
    mounted: (el: any, binding: any, vNode: any, prevNode: any) => {
      console.log(binding)
      el.style.color = binding.value
    },
  })

  // 插件
  const myPlugin = {
    install (app: any, options: any) {
      app.config.globalProperties.$test = options.value
    }
  }

  app.use(pinia)
  app.use(router)
  app.use(Antd)
  app.use(i18n)
  app.use(globalComponents)
  app.use(myPlugin, {
    value: true
  })
  app.mount(container ? container.querySelector('#app') : '#app');
}


if (!(window as any).__POWERED_BY_QIANKUN__) {
  render()
}

// console.log('app:', app)

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('vue app bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: any) {
  console.log(props)
  render(props)
  // ReactDOM.render(<App />, props.container ? props.container.querySelector('#root') : document.getElementById('root'));
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props: any) {
  app.unmount()
  app._container.innerHTML = ''
  app = null
  // router = null;
  // history.destroy();

  // ReactDOM.unmountComponentAtNode(
  //   props.container ? props.container.querySelector('#root') : document.getElementById('root'),
  // );
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props: any) {
  // console.log('update props', props);
}
