<template>
  <div>
    <a-button @click="btnClick">click</a-button>
  </div>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue'

  function* gen() {
    yield  123 + 456;
  }

  let g = gen()

  function btnClick () {
    console.log(g.next())
  }

  onMounted(() => {
  })
</script>
  
<style>
  
</style>