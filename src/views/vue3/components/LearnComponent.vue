<template>
  <div style="border: 1px solid yellow; padding: 5px;">
    <h2>计算属性</h2>
    <h2>生命周期</h2>
    <h2>侦听器</h2>
    <h2>组件基础</h2>
    <h2>组合式函数</h2>
    <h2>插件</h2>
    <h2>工具链</h2>
    <ul>
      <li>单文件组件自定义块集成</li>
    </ul>
    <h2>深入响应式系统</h2>
    <article v-highlight.border.backgroundColor="'gray'">
      Vue 的响应性系统是通过深度转换普通 JavaScript 对象为响应式代理来实现的。这种深度转换在一些情况下是不必要的，在和一些外部状态管理系统集成时，甚至是需要避免的 (例如，当一个外部的解决方案也用了 Proxy 时)。
    </article>

    <a-button @click="subClick('qq', '123')">提交</a-button>
  </div>
</template>
  
<script setup>
  import { defineEmits } from 'vue';
  
  const emit = defineEmits({
    // 必须有对象 email和password 参数
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  })

  const vHighlight =  {
    mounted: (el, binding, vnode) => {
      console.log(binding)
      el.style.color = binding.value
      if (binding.modifiers.border) {
        el.style.border = "1px solid yellow"
      }
      if (binding.modifiers.backgroundColor) {
        // el.style.backgroundColor = "green"
      }
    }
  }

  function subClick (email, password) {
    emit('submit', { email, password })
  }

</script>
  
<style>
  
</style>