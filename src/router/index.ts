import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import routes from './routes'

const layoutView = () => import('@/components/layout/LayoutView.vue')
const NotFundView = () => import('@/views/error/404View.vue')
const LoginView = () => import('@/views/LoginView.vue')
const HomeView = () => import('@/views/HomeView.vue')

// console.log(import.meta)

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory((window as any).__POWERED_BY_QIANKUN__ ? '#/micro' : '#/micro'),
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: LoginView,
    },
    {
      path: '/',
      components: {
        default: layoutView
      },
      redirect: '/home',
      children: [
        {
          name: 'Home',
          path: '/home',
          component: HomeView
        },
        ...routes
      ]
    },
    {
      name: 'error',
      // 匹配语法括号里是正则
      // 将匹配以 `/404` 开头的所有内容，并将其放在 `$route.params.notFound` 下
      path: '/404:notFound(.*)',
      component: NotFundView
    },
    // ...routes
  ]
})

export default router
