<script setup lang="ts">
  import { useRouter } from 'vue-router'
  // import type { HistoryState, NavigationFailure } from 'vue-router'
  import type { FormInstance } from 'ant-design-vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import { useCounterStore } from '../stores/counter'
  import { useUserInfoStore } from '../stores/userInfo'
  import { storeToRefs } from 'pinia'
  import Cookies from 'js-cookie'
  import { ref, reactive, onMounted, isRef } from 'vue'
  import { useI18n } from 'vue-i18n'
  const router = useRouter()
  const counterStore = useCounterStore()
  const userInfoStore = useUserInfoStore()
  const { token } = storeToRefs(userInfoStore)

  const { t, locale } = useI18n()

  console.log(router, history)

  function onChangeLanguageClick () {
    locale.value = locale.value === 'en' ? 'zh' : 'en'
    userInfoStore.$patch((state) => {
      state.language = locale.value
    })
  }
  
  const formRef = ref<FormInstance>()
  const formState = reactive({
    username: '',
    password: '',
    remember: Boolean(Cookies.get('username'))
  })
  const formRules = reactive({
    username: [{ required: true, pattern: /^wzh/, message: '请输入用户名!', trigger: 'blur' }],
    password: [{ required: true, validator: passwordValidator, trigger: 'blur' }]
  })
  async function passwordValidator (rule: Rule, value: any) {
    if (value === '') {
      return Promise.reject('请输入密码！');
    } else if (value !== 'wzh123wzh') {
      return Promise.reject('请输入正确的密码！');
    } else {
      return Promise.resolve()
    }
  }
  function resetForm () {
    if (formRef.value) {
      formRef.value.resetFields()
    }
  }
  function handleFinishFailed (obj: any) {
    console.log('表单验证失败')
  }
  function handleValidate (...args: any) {
    // 表单验证触发
    // console.log(args)
  }
  function onFinish (value: any) {
    if (value.remember) {
      Cookies.set('username', value.username)
      Cookies.set('password', value.password, 7)
    } else {
      Cookies.remove('username')
      Cookies.remove('password')
    }
    Cookies.set('token', '111')
    // 一次更新多个
    userInfoStore.$patch((state) => {
      state.token = '111'
    })
    router.push({ path: '/' })
  }
  // 在 patch 后只触发一次
  userInfoStore.$subscribe((mutation, state) => {
    console.log(mutation, state)
  })
  onMounted(() => {
    console.log(isRef(token)) // false
    console.log(userInfoStore)
    counterStore.$patch({
      count: counterStore.count + 2
    })
    // console.log(counterStore.count) // 2

    if (Cookies.get('username')) {
      formState.username = Cookies.get('username')
      formState.password = Cookies.get('password')
    }
  })
</script>

<template>
  <div class="lg-bg">
    <section class="login-box">
      <div class="login-content">
        <a-form
          ref="formRef"
          :model="formState"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
          :noStyle="true"
          name="basic"
          autocomplete="off"
          :rules="formRules"
          @finish="onFinish"
          @validate="handleValidate"
          @onFinishFailed="handleFinishFailed">
          <a-form-item
            :label="t('login.username')"
            name="username">
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item
            :label="t('login.password')"
            name="password">
            <a-input-password v-model:value="formState.password" />
          </a-form-item>

          <a-form-item name="remember" :wrapper-col="{ offset: 6, span: 18 }">
            <a-row>
              <a-col :span="12" style="display: flex; align-items: center;">
                <a-checkbox v-model:checked="formState.remember">{{ t('login.remenberMe') }}</a-checkbox>
              </a-col>
              <a-col :span="12" style="text-align: right;">
                <a-button style="min-width: 80px;" @click="onChangeLanguageClick" type="link">
                  {{ locale === 'en' ? '中文' : 'English' }}
                </a-button>
              </a-col>
            </a-row>
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 24 }" style="margin-bottom: 0; text-align: center;">
            <a-space :size="20">
              <a-button @click="resetForm">{{ t('common.reset') }}</a-button>
              <a-button type="primary" html-type="submit">{{ t('login.login') }}</a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </div>
    </section>
  </div>
</template>

<style scoped lang="less">
.lg-bg {
  background-color: rgb(246, 240, 218);
  width: 100%;
  height: 100%;
}
.login-box {
  box-shadow: 0 0 3px rgba(198, 197, 197, .3);
  border: 1px solid rgb(198, 197, 197);
  border-radius: 2px;
  min-width: 400px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .login-content {
    padding: 10px;
  }
}
</style>
