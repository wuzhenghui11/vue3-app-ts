<script setup lang="ts">
  import NavBar from './NavBar.vue'
  import LeftSidebar from './LeftSidebar.vue'
  // import { ref } from 'vue'
  defineProps<{
    msg: string
  }>()
</script>

<template>
  <a-layout class="main">
    <nav-bar class="header-bara"></nav-bar>
    <a-layout class="second-wrap">
      <left-sidebar class="siderbar"></left-sidebar>
      <a-layout class="content-wrap">
        <div class="content">
          <router-view v-slot="{ Component, route }">
            <transition name="fade">
              <component :is="Component" :key="route.path" />
            </transition>
          </router-view>
        </div>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .second-wrap {
    flex: auto;
    display: flex;
    .siderbar {
      height: 100%;
      overflow: auto;
    }
    .content-wrap {
      display: flex;
      padding: 7px 0 0 7px;
      overflow: hidden;
      height: 100%;
      background-color: rgb(243, 243, 243);
      .content{
        padding: 5px;
        background-color: #fff;
        height: 100%;
        overflow: auto;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
