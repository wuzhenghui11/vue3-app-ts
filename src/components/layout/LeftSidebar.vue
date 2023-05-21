<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const selectedKeys = ref([])
  const openKeys = ref([])

  const menus = ref([
    {
      title: '业务1',
      children: [
        {
          title: 'other',
          path: '/yewu/other'
        }
      ]
    }
  ])
  

  const handleClick = (value: any) => {
    console.log(value)
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
          {{ item.title }}
        </template>
        <a-menu-item
          v-for="(cItem, cIndex) in item.children"
          :key="cIndex"
          @click="handleClick(cItem)">
          {{ cItem.title }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<style scoped lang="less">
</style>
