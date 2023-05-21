<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Cookies from 'js-cookie'

  import { useUserInfoStore } from '../../stores/userInfo'

  const userInfoStore = useUserInfoStore()

  const router = useRouter()
  const menuNav = ref([
    { name: '用户信息', path: '' },
    { name: '修改密码', path: '' },
    {
      name: '退出',
      path: '/login',
      beforeJump: (callBack: Function) => {
        callBack()
      }
    },
  ])
  const onClick = (e: any) => {
    const curMenu = menuNav.value[e.key]
    if (typeof curMenu.beforeJump === 'function') {
      curMenu.beforeJump(() => {
        Cookies.remove('token')
        userInfoStore.$patch((state) => {
          state.token = ''
        })
        router.push({ path: curMenu.path })
      })
    }
  }
</script>

<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      <a-avatar style="background-color: #87d068">
        <template #icon></template>
      </a-avatar>
    </a>
    <template #overlay>
      <a-menu @click="onClick">
        <a-menu-item
          v-for="(item, index) in menuNav"
          :key="index">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped lang="less">
.ant-dropdown-link {
  padding: 0 15px;
}
</style>
