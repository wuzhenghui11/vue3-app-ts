<script setup lang="ts">
  import { RouterLink, useLink, useRouter, useRoute } from 'vue-router'
  import { ref, reactive, onMounted, computed, useAttrs, useSlots } from 'vue'
  import { storeToRefs } from 'pinia'
  import type { MutationType } from 'pinia'
  import { useCounterStore } from '@/stores/counter'
  import { useAddOptionStore } from '@/stores/storeAddNewOption'

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

  const counterStore = useCounterStore()
  const { count, obj, doubleCount, counterPlus } = storeToRefs(counterStore)
  const { increment } = counterStore


  const addOptionStore = useAddOptionStore()
  const { getData } = addOptionStore

  // 订阅state
  counterStore.$subscribe((mutation, state) => {
    const { type, storeId, payload }: any = mutation
    // 只有 type === 'patch object'的情况下才可用
    // import { MutationType } from 'pinia'
    // type = 'direct' | 'patch object' | 'patch function'
    // storeId 和 counterStore.$id 一样 为counter
    // payload 传递给 cartStore.$patch() 的补丁对象。
    console.log(state)
    console.log(`type：${type}   storeId：${storeId}   payload：${payload}`)
  })

  // 订阅action
  counterStore.$onAction((context) => {
    // name action 名称
    // store 实例，类似 `someStore`
    // args 传递给 action 的参数数组
    // after 在 action 返回或resolve后的钩子
    // onError action 抛出或拒绝的钩子
    const { name, store, args, after, onError } = context
    console.log(store)
    console.log(`name： ${name}   action args：${args}`)
    // 这将在 action 成功并完全运行后触发。
    // 它等待着任何返回的 promise
    after((result) => {
      console.log(result)
      console.log(counterPlus.value())
    })
    onError((e) => {
      console.log('error:', e)
    })
  }/* , true */)

  function onStoreCountClick () {
    // mutation type 为 patch object
    /* counterStore.$patch({
      count: ref(0),
      obj: reactive({
        count: 1
      })
    } as any) */

    /* mutation type 为 patch function
    counterStore.$patch((state) => {
      // state只是 state 不包含 doubleCount getter
      state.count = count.value + 1
      state.obj.count++
      // console.log(state)
    }) */

    // mutation type 为 direct
    increment(1)
    // console.log(counterStore, 'counterStore')
    // console.log(count.value, obj, 'count value and obj')
  }

  /* 计算属性 */

  const jisuan1 = ref(0)
  const jisuan2 = ref(0)

  const sum = computed(() => {
    return jisuan1.value + jisuan2.value
  })

  const subtract = computed({
    get () {
      return jisuan1.value - jisuan2.value
    },
    set (val) {
      jisuan2.value = val
    }
  })


  function onComputedClick () {
    jisuan1.value++
    subtract.value = 5

  }


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
    <button type="button" @click="onStoreCountClick">store count</button>
    <p>jisuan1:{{ jisuan1 }}</p>
    <p>jisuan2:{{ jisuan2 }}</p>
    <p>computed sum:{{ sum }}</p>
    <p>computed subtract:{{ subtract }}</p>
    <button type="button" @click="onComputedClick">computed</button>
  </div>
</template>

<style scoped>

</style>