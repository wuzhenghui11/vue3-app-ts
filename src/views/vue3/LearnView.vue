<template>
  <div class="learn">
    <p v-for="(item, key, index) in myObject" :key="key">
      {{ item }}:{{ key }}:{{ index }}
    </p>
    <p v-for="(item, key, index) of myObject" :key="key">
      {{ item }}:{{ key }}:{{ index }}
    </p>
    <a-button type="primary" @click="okBtnClick(11, $event)">确定</a-button>
    或者
    <a-button type="primary" @click="(event) => okBtnClick(11, event)">ok</a-button>

    <a-button @click="goToOther()">Go to other page</a-button>

    <c-alert message="下面是组件"></c-alert>

    <LearnComponent @submit="componentSubmit"></LearnComponent>
  </div>
</template>
  
<script setup>
  import './test.css'
  import { ref, reactive, computed, onMounted } from 'vue'
  import { useRoute, useRouter} from 'vue-router'
  import LearnComponent from './components/LearnComponent.vue'

  const router = useRouter()
  const route = useRoute()

  const count = ref(1)
  const state = reactive({ count: 1 })

  const plusOne = computed(() => count.value + 1, {
    onTrack () {
      debugger
    },
    onTrigger () {
      debugger
    }
  })

  const myObject = reactive({
    title: 'How to do lists in Vue',
    author: 'Jane Doe',
    publishedAt: '2016-04-10'
  })

  function okBtnClick (num, event) {
    // 访问 plusOne 会触发 onTrack
    // console.log(plusOne.value)
    // 更改 count.value 会触发 onTrigger
    count.value++
    console.log(num, event)
  }

  onMounted(() => {
    console.log(count)
    console.log(state)
  })

  function goToOther () {
    console.dir(route);
    router.push({ path: '/vue3/Other' })
  }

  function componentSubmit (e) {
    console.log(e)
  }

</script>
  
<style lang="less">
  .learn {
    p {
      color: red;
    }
  }
</style>