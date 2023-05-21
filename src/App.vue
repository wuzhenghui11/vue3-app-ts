<script setup lang="ts">
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useUserInfoStore } from './stores/userInfo'

const userInfoStore = useUserInfoStore()
const { language } = storeToRefs(userInfoStore)

</script>

<template>
  <a-config-provider :locale="language === 'en' ? enUS : zhCN">
    <RouterView />
  </a-config-provider>
  <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
</template>

<style scoped>
</style>
