<script setup lang="ts">
  import { reactive, ref, toRaw, toRefs, onMounted } from 'vue'
  import { useMouse } from '@vueuse/core'
  import { useRoute } from 'vue-router'
  import type { UnwrapRef } from 'vue'
  import moment from 'moment'
  import zhzl from 'zhzl'

  interface Test {
    [propName: string]: any;
  }

  interface TestBigData {
    index: number;
    text: string;
    [propName: string]: any;
  }
  const route = useRoute()

  const { x, y } = useMouse()

  defineProps<{
    msg: string
  }>()
  
  const bigData = ref<TestBigData[]>([])

  let state = reactive({ count: 0})
  // const state = ref({ count: 0})
  state = reactive({ count: 1 })
  const onClick = (name: string) => {
    console.log(event)
    state.count++
  }
  
  const obj = reactive({ aa: 'a', bb: 'b' })

  const { aa, bb } = toRefs(obj)

  let rc = ref({ counter: 1})

  function onBtnClick () {
    // rc.counter += 1
    rc.value = { counter: 2 }
    console.log(aa.value)
  }
  onMounted(() => {
    console.log(route)
  })
</script>

<template>
  <p>x: {{ x }}</p>
  <p>y: {{ y }}</p>
  {{ state.count }}
  <c-icon :name="1212" @c-click="(name: string) => onClick(name)"></c-icon>
  <div v-for="(item, index) in bigData" :key="index">
    {{ item.text }}
  </div>

  <div>
    <highlightjs
      language="js"
      code="
      template
      ">
    </highlightjs>
  </div>

  <div class="other">
    <button @click="onBtnClick">click</button>
    {{  rc.counter }}
  </div>
</template>

<style scoped>

</style>