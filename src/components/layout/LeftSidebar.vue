<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import routes from '@/router/routes'
  const router = useRouter()
  const selectedKeys = ref([])
  const openKeys = ref<string[]>([])

  routes.forEach((item, index) => {
    openKeys.value.push(`sub${index}`)
  })

  const menus = ref(routes)

  const handleClick = (value: any) => {
    // router.push({
    //   path: value.path,
    // })
    router.replace({
      path: value.path,
      // http://localhost:8080/?abc=123/#/micro/v3/other?abcd=123 
      // route.query.value 取不到 abc 取得到abcd 目前是
      // query: {
      //   abcd: 123
      // }
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
        :key="`sub${index}`">
        <template #title>
          {{ item.name }}
        </template>
        <a-menu-item
          v-for="(cItem, cIndex) in item.children"
          :key="`sub${index}-${cIndex}`"
          @click="handleClick(cItem)">
          {{ cItem.name }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<style scoped lang="less">
</style>
