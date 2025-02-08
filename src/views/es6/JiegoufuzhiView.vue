<template>
  <div>
    <highlightjs
      language="js"
      code="
      // 事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
      let [x, y, z] = new Set(['a', 'b', 'c']);
      x // a
      ">
    </highlightjs>
    <h3>注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。</h3>
    <highlightjs
      language="js"
      code="
      let [x = 1] = [undefined];
      x // 1

      let [x = 1] = [null];
      x // null
      ">
    </highlightjs>
    <highlightjs
      language="js"
      code="
      var {x = 3} = {x: undefined};
      x // 3

      var {x = 3} = {x: null};
      x // null
      ">
    </highlightjs>
    上面代码中，属性x等于null，因为null与undefined不严格相等，所以是个有效的赋值，导致默认值3不会生效。
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted, getCurrentInstance } from 'vue'
  const globalProperties: any = (getCurrentInstance() as any).appContext.config.globalProperties
  const code = ref(``)
  const { log } = console

  onMounted(() => {
    globalProperties.$hljs.highlightAll()
  })
</script>
<style scoped lang="less">

</style>
