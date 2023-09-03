import { ref, computed, reactive } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

interface CountObj {
  count: number;
  [propName: string]: any;
}

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const countObj = reactive<CountObj>({
    count: 2
  })

  const doubleCount = computed(() => count.value * 2)

  async function increment(number?: number) {
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
    countObj,
    doubleCount,
    increment
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
}
