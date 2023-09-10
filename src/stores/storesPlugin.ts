/// <reference path="store.d.ts"/>
import type { PiniaPluginContext } from 'pinia'


export function myPiniaPlugin (context: PiniaPluginContext) {
  const { pinia, app, store, options } = context

  // 用 `createPinia()` 创建的 pinia。 
  // console.log(pinia)
  // 用 `createApp()` 创建的当前应用(仅 Vue 3)。
  // console.log(app)
  // 该插件想扩展的 store
  // console.log(store)
  // 定义传给 `defineStore()` 的 store 的可选对象。
  // console.log(options)

  store.$subscribe(() => {
    // 响应 store 变化
    console.log('store change')
  })

  store.$onAction(() => {
    // 响应 store actions
    console.log('action change')
  })

  // 如果某个store有自定义选项可以做些自定义的事情
  if (options.delay) {
    // console.log('比如调用某个action时做些特殊的事情')
    // delay: {
    //   second: 1000,
    // }
    // 用新的 action 覆盖原有action
    // 覆盖带有options.delay store的 getdate方法
    store.getData = async function () {
      setTimeout(() => {
        store.getData()
      }, options.delay)
    }
  }

  store.hello = 'hello'
  if (process.env.NODE_ENV === 'development') {
    // 添加你在 store 中设置的键值
    store._customProperties.add('hello')
  }
  // 给 store 添加一个golabalProp1属性
  store.golabalProp1 = 11
  // 都是为store添加新的属性
  // 给 store 添加一个golabalProp2属性
  return {
    golabalProp2: 22
  }
}