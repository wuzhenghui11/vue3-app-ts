import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const layoutView = () => import('@/views/LayoutView.vue')

console.log(import.meta)

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory((window as any).__POWERED_BY_QIANKUN__ ? '#/micro' : '#/micro'),
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      name: '404',
      // 匹配语法括号里是正则
      // 将匹配以 `/404` 开头的所有内容，并将其放在 `$route.params.notFound` 下
      path: '/404:notFound(.*)',
      component: () => import('@/views/error/404View.vue')
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
          component: () => import('@/views/HomeView.vue')
        }
      ]
    },
    {
      path: '/yewu',
      component: layoutView,
      children: [
        {
          name: 'Other',
          path: '/yewu/other',
          component: () => import('@/views/yewu1/OtherView.vue')
        },
        {
          name: 'About',
          path: '/yewu/about',
          component: () => import('@/views/yewu1/AboutView.vue'),
          meta: { title: '关于', requiresAuth: true }
        }
      ]
    }
  ]
})

export default router
