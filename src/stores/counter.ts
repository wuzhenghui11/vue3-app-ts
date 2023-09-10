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
  const doubleCount = computed(() => {
    return count.value * 2
  })

  const counterPlus = computed((num = 0) => {
    return count.value += num
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
    increment
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
}
