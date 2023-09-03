<script setup lang="ts">
  import { RouterLink, useLink, useRouter, useRoute } from 'vue-router'
  import { ref, onMounted, computed, useAttrs, useSlots } from 'vue'
  import { storeToRefs } from 'pinia'
  import type { MutationType } from 'pinia'
  import { useCounterStore } from '@/stores/counter'
  import { useNewOption } from '@/stores/storeAddNewOption'

  const slot = useSlots()
  const attrs = useAttrs()

  defineOptions({
    customOptions: {

    }
  })

  const slots = defineSlots<{
    default(props: { msg: string }): any
  }>()


  const props = defineProps({
    foo: { type: String, required: true },
    ...(RouterLink as any).props,
  })

  const router = useRouter()
  const route = useRoute()
  // const link = useLink(props as any)

  const v1 = ref(0)
  const v2 = ref(0)

  const coptdSum = computed(() => {
    return v1.value + v2.value
  })

  const coptdSubtract = computed({
    get () {
      return v1.value - v2.value
    },
    set (val) {
      v2.value = val
    }
  })

  function onComputedClick () {
    v1.value++
    // coptdSubtract.value = 5

  }


  const counterStore = useCounterStore()
  const newOptionStore = useNewOption()

  const { count, countObj, doubleCount } = storeToRefs(counterStore)
  const { increment } = counterStore

  function onStoreCountClick () {
    counterStore.$patch((state) => {
      // state只是 state 不包含 doubleCount getter
      state.count = count.value + 1
      state.countObj.count++
      console.log(state)
    })

    increment(1)

    console.log(counterStore, 'counterStore')
    console.log(count.value, countObj, 'count value and countObj')
  }

  counterStore.$subscribe((mutation, state) => {
    // import { MutationType } from 'pinia'
    const { type, storeId, payload }: any = mutation
    // 'direct' | 'patch object' | 'patch function'
    // console.log(type)
    // 和 counterStore.$id 一样 为counter
    // console.log(storeId)
    // 只有 mutation.type === 'patch object'的情况下才可用
    // 传递给 cartStore.$patch() 的补丁对象。
    // console.log(payload)
    // console.log(state)
  })

  counterStore.$onAction((context) => {
    // name action 名称
    // store 实例，类似 `someStore`
    // args 传递给 action 的参数数组
    // after 在 action 返回或resolve后的钩子
    // onError action 抛出或拒绝的钩子
    const { name, store, args, after, onError } = context
    console.log(store)
    console.log('name:' + name, 'action args:' + args)
    // 这将在 action 成功并完全运行后触发。
    // 它等待着任何返回的 promise
    after((result) => {
      console.log(result)
    })
    onError((e) => {
      console.log('error:', e)
    })
  })
  
  onMounted(() => {
    // console.log(link)
    // console.log(RouterLink)
    // console.log(router)
    // console.log(route)
  })
</script>

<template>
  <div class="about">
    <!-- <span v-pre>{{ this will not be compiled }}</span> -->
    <p>v1:{{ v1 }}</p>
    <p>v2:{{ v2 }}</p>
    <p>computed sum:{{ coptdSum }}</p>
    <p>computed subtract:{{ coptdSubtract }}</p>
    <button type="button" @click="onStoreCountClick">store count</button>
    <button type="button" @click="onComputedClick">computed</button>
  </div>
</template>

<style scoped>

</style>