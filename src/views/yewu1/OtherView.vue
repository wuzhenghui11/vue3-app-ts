<script setup lang="ts">
  import { reactive, ref, toRaw } from 'vue'
  import type { UnwrapRef } from 'vue'
  import zhzl from 'zhzl'

  let rc = ref({ counter: 1})

  function onBtnClick () {
    // rc.counter += 1
    rc.value = { counter: 2 }
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