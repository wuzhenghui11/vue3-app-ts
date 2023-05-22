<script setup lang="ts">
import { useMouse } from '@vueuse/core'
const { x, y } = useMouse()
defineProps<{
  msg: string
}>()
  
</script>

<template>
  <div class="home">
    首页
    <p>x: {{ x }}</p>
    <p>y: {{ y }}</p>
  </div>
</template>

<style scoped lang="less">

</style>
