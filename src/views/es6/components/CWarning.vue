<template>
  <a-alert :message="props.message" :description="props.description" type="warning" show-icon></a-alert>
</template>
  
<script setup>
  import { defineProps } from 'vue'
  const props = defineProps({
    message: {
      type: String,
      default: ''
    },
    description:{
      type: String,
      default: ''
    }
  })
</script>
  
<style>
  
</style>