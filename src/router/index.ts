import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const layoutView = () => import('@/views/LayoutView.vue')

console.log(import.meta)

const routes = [
  {
    name: '菜单',
    path: '/yewu',
    component: layoutView,
    children: [
      {
        name: 'Other',
        path: '/yewu/other',
        component: () => import('@/views/yewu1/OtherView.vue'),
        meta: { title: '其他', requiresAuth: true }
      },
      {
        name: 'About',
        path: '/yewu/about',
        component: () => import('@/views/yewu1/AboutView.vue'),
        meta: { title: '关于', requiresAuth: true }
      }
    ]
  },
  {
    name: 'ES6',
    path: '/es6',
    component: layoutView,
    children: [
      {
        name: 'let和const',
        path: '/es6/let-const',
        component: () => import('@/views/es6/LetConstView.vue'),
        meta: { title: 'let和const', requiresAuth: true }
      },
      {
        name: 'Class基本语法和继承',
        path: '/es6/class',
        component: () => import('@/views/es6/ClassView.vue'),
        meta: { title: 'let和const', requiresAuth: true }
      },
      {
        name: 'Symbol',
        path: '/yewu/Symbol',
        component: () => import('@/views/es6/SymbolView.vue'),
        meta: { title: 'Symbol', requiresAuth: true }
      },
      {
        name: 'SetMap',
        path: '/other-articl/set-map',
        component: () => import('@/views/es6/SetMapView.vue'),
        meta: { title: 'Set Map', requiresAuth: true }
      },
    ]
  },
  {
    name: '其他',
    path: '/other-articl',
    component: layoutView,
    children: [
      {
        name: '闭包',
        path: '/other-articl/close-func',
        component: () => import('@/views/other/CloseFuncView.vue'),
        meta: { title: '闭包', requiresAuth: true }
      },
      {
        name: '前端安全',
        path: '/other-articl/security',
        component: () => import('@/views/other/SecurityView.vue'),
        meta: { title: '前端安全', requiresAuth: true }
      },
      {
        name: 'call和apply',
        path: '/other-articl/call-apply',
        component: () => import('@/views/other/CallApplyView.vue'),
        meta: { title: 'Call和Apply', requiresAuth: true }
      },
      {
        name: 'JS检查类型的4种方式',
        path: '/other-articl/typeof-way',
        component: () => import('@/views/other/TypeofWayView.vue'),
        meta: { title: 'Call和Apply', requiresAuth: true }
      },
    ]
  }
]

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
    ...routes
  ]
})

export { routes }

export default router
