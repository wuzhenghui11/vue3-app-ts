<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { useMouse } from '@vueuse/core'

  interface Test {
    [propName: string]: any;
  }
  interface TestBigData {
    index: number;
    text: string;
    [propName: string]: any;
  }

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
</script>

<template>
  <div class="home">
    首页
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
  </div>
</template>

<style scoped lang="less">

</style>
