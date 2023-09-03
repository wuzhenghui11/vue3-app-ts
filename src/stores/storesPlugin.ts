export function myPiniaPlugin (context: any) {
  const { pinia, app, store, options } = context
  /* 
  // 用 `createPinia()` 创建的 pinia。 
  console.log(pinia)
  // 用 `createApp()` 创建的当前应用(仅 Vue 3)。
  console.log(app)
  // 该插件想扩展的 store
  console.log(store)
  // 定义传给 `defineStore()` 的 store 的可选对象。
  console.log(options) */
  store.hello = 'hello'
  if (process.env.NODE_ENV === 'development') {
    // 添加你在 store 中设置的键值
    store._customProperties.add('hello')
  }

  store.$subscribe(() => {
    console.log('store change')
  })

  store.$onAction(() => {
    console.log('action change')
  })


  store.golabalProp1 = 11
  return {
    golabalProp2: 22
  }
}