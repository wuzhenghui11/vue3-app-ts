<script setup lang="ts">
  import AvatarMenu from './AvatarMenu.vue'
  import { ref } from 'vue'
  const selectedKeys1 = ref('')
</script>

<template>
  <a-layout-header class="header">
    <div class="logo">logo</div>
    <a-menu class="menu"
      theme="dark"
      mode="horizontal"
      :style="{ lineHeight: '64px' }">
      <!-- <a-menu-item key="1">nav 1</a-menu-item>
      <a-menu-item key="2">nav 2</a-menu-item>
      <a-menu-item key="3">nav 3</a-menu-item> -->
    </a-menu>
    <avatar-menu></avatar-menu>
  </a-layout-header>
</template>

<style scoped lang="less">
  .header {
    padding: 0;
    display: flex;
    .logo {
      width: 200px;
      color: #fff;
      font-size: 18px;
      text-align: center;
      // background-color: blue;
    }
    .menu {
      flex: 1
    }
  }
</style>
