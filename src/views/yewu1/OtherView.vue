<script setup lang="ts">
  import { reactive, ref, toRaw, toRefs } from 'vue'
  import type { UnwrapRef } from 'vue'
  import zhzl from 'zhzl'

  const obj = reactive({ aa: 'a', bb: 'b' })

  const { aa, bb } = toRefs(obj)


  let rc = ref({ counter: 1})

  function onBtnClick () {
    // rc.counter += 1
    rc.value = { counter: 2 }
    console.log(aa.value)
  }

</script>

<template>
  <div class="other">
    <button @click="onBtnClick">click</button>
    {{  rc.counter }}
  </div>
</template>

<style scoped>

</style>