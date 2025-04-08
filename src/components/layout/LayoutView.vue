<script setup>
  // import type { ComponentPublicInstance } from 'vue'
  import { ref, onMounted } from 'vue'
  import NavBar from './NavBar.vue'
  import LeftSidebar from './LeftSidebar.vue'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  onMounted(() => {
    console.log(route)
  })
</script>

<template>
  <a-layout class="main">
    <NavBar class="header-bara"></NavBar>
    <a-layout class="second-wrap">
      <LeftSidebar class="siderbar"></LeftSidebar>
      <a-layout class="content-wrap">
        <div class="content">
          <router-view v-slot="{ Component, route }">
            <transition :name="route.meta.transition || 'fade'">
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
