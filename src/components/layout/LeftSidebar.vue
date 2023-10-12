<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { routes } from '@/router'
  const router = useRouter()
  const selectedKeys = ref([])
  const openKeys = ref(['sub0'])

  const menus = ref(routes)
  

  const handleClick = (value: any) => {
    router.replace({
      path: value.path
    })
  }

  // const titleClick = (value) => {
  //   console.log(value)
  // }
</script>

<template>
  <a-layout-sider>
    <a-menu
      id="dddddd"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark">
      <a-sub-menu
        v-for="(item, index) in menus"
        :key="'sub' + index">
        <template #title>
          {{ item.name }}
        </template>
        <a-menu-item
          v-for="(cItem, cIndex) in item.children"
          :key="cIndex"
          @click="handleClick(cItem)">
          {{ cItem.name }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<style scoped lang="less">
</style>
