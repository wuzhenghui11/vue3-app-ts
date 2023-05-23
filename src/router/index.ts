import { createRouter, createWebHistory } from 'vue-router'

const layoutView = () => import('@/views/LayoutView.vue')

// console.log(import.meta)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      name: '404',
      path: '/404',
      component: () => import('@/views/error/404View.vue')
    },
    {
      path: '/',
      component: layoutView,
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
        }
      ]
    }
  ]
})

export default router
