const layoutView = () => import('@/components/layout/LayoutView.vue')

// tool
const ImageCropper = () => import('@/views/conversionTool/ImageCropper.vue')

// v3
const OtherView = () => import('@/views/vue3/OtherView.vue')
const Pinia = () => import('@/views/vue3/Pinia.vue')

// es6
const LetConstView = () => import('@/views/es6/LetConstView.vue')
const ClassView = () => import('@/views/es6/ClassView.vue')
const SymbolView = () => import('@/views/es6/SymbolView.vue')
const SetMapView = () => import('@/views/es6/SetMapView.vue')
const AsyncView = () => import('@/views/es6/AsyncView.vue')

// basic
const CloseFuncView = () => import('@/views/basic/CloseFuncView.vue')
const SecurityView = () => import('@/views/basic/SecurityView.vue')
const CallApplyView = () => import('@/views/basic/CallApplyView.vue')
const TypeofWayView = () => import('@/views/basic/TypeofWayView.vue')


const routes = [
  {
    name: 'tool',
    path: '/tool',
    component: layoutView,
    children: [
      {
        name: '图片裁剪',
        path: '/tool/image-cropper',
        component: ImageCropper,
        meta: { title: '图片裁剪', requiresAuth: true },
      },
    ],
  },
  {
    name: 'V3',
    path: '/vue3',
    component: layoutView,
    children: [
      {
        name: 'Other',
        path: '/vue3/other',
        component: OtherView,
        meta: { title: '其他', requiresAuth: true },
      },
      {
        name: 'About',
        path: '/vue3/about',
        component: Pinia,
        meta: { title: 'Pinia', requiresAuth: true },
      }
    ]
  },
  {
    name: 'ECMAScript',
    path: '/es6',
    component: layoutView,
    children: [
      {
        name: 'let和const',
        path: '/es6/let-const',
        component: LetConstView,
        meta: { title: 'let和const', requiresAuth: true },
      },
      {
        name: 'Class基本语法和继承',
        path: '/es6/class',
        component: ClassView,
        meta: { title: 'let和const', requiresAuth: true },
      },
      {
        name: 'Symbol',
        path: '/es6/Symbol',
        component: SymbolView,
        meta: { title: 'Symbol', requiresAuth: true },
      },
      {
        name: 'SetMap',
        path: '/es6/set-map',
        component: SetMapView,
        meta: { title: 'Set Map', requiresAuth: true },
      },
      {
        name: 'async',
        path: '/es6/async',
        component: AsyncView,
        meta: { title: 'async', requiresAuth: true },
      },
    ]
  },
  {
    name: 'Basic',
    path: '/basic',
    component: layoutView,
    children: [
      {
        name: '闭包',
        path: '/basic/close-func',
        component: CloseFuncView,
        meta: { title: '闭包', requiresAuth: true },
      },
      {
        name: '前端安全',
        path: '/basic/security',
        component: SecurityView,
        meta: { title: '前端安全', requiresAuth: true },
      },
      {
        name: 'call和apply',
        path: '/basic/call-apply',
        component: CallApplyView,
        meta: { title: 'Call和Apply', requiresAuth: true },
      },
      {
        name: 'JS检查类型的4种方式',
        path: '/basic/typeof-way',
        component: TypeofWayView,
        meta: { title: 'Call和Apply', requiresAuth: true },
      },
    ]
  }
]

export default routes
