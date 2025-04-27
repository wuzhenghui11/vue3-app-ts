<template>
  <div>

  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  type aa = boolean | number
  const test = ref<aa>(0)
  onMounted(() => {
    console.log(test)
  })

</script>
<style>

</style>