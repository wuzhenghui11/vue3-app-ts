import { ref, computed, reactive } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

interface CountObj {
  count: number;
  [propName: string]: any;
}

export const useCounterStore = defineStore('counter', () => {
  // state
  const count = ref(0)
  const obj = reactive<CountObj>({
    count: 1
  })
  // getter 
  // 在computed中，其属性值所依赖的数据对象会被设置为响应式数据，当这些响应式数据发生改变时，会通知存储computed的Dep对象，标记该computed为dirty。
  // 当下次访问该computed的属性值时，computed会检查依赖的响应式数据是否发生了变更，如果没有则直接返回已缓存的属性值；
  // 如果依赖的数据发生了变更 dirty则变为ture 则会重新计算值，并将计算后的结果缓存起来。此时，该computed会将dirty标记重置为false，等待下次依赖项发生变化时再次重新计算。
  const doubleCount = computed(() => {
    return count.value * 2
  })
  // getter 计算属性传递参数
  const counterPlus = computed(() => {
    return (num: number = 0) => {
      return count.value += num
    }
  })
  // action
  async function increment(number = 0) {
    const aa = await '结束'
    if (typeof number === 'number') {
      count.value += number
    } else {
      count.value++
    }
    return aa
  }

  return { 
    count,
    obj,
    doubleCount,
    counterPlus,
    increment
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
}
