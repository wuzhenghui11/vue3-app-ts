<script setup lang="ts">
import { useMouse } from '@vueuse/core'
const { x, y } = useMouse()
  defineProps<{
    msg: string
  }>()
  const onClick = (name: string) => {
    alert(name)
    console.log(event)
  }
</script>

<template>
  <div class="home">
    首页
    <p>x: {{ x }}</p>
    <p>y: {{ y }}</p>

    <c-icon :name="1212" @c-click="(name: string) => onClick(name)"></c-icon>
  </div>
</template>

<style scoped lang="less">

</style>
