<template>
  <div>
    <highlightjs
      language="js"
      code="
      // 顶层的await命令，就是为了解决这个问题。它保证只有异步操作完成，模块才会输出值
      // awaiting.js
      const dynamic = import(someMission);
      const data = fetch(url);
      export const output = someProcess((await dynamic).default, await data)
      上面代码中，两个异步操作在输出的时候，都加上了await命令。只有等到异步操作完成，这个模块才会输出值

      // usage.js
      import { output } from './awaiting.js';
      function outputPlusValue(value) { return output + value }

      console.log(outputPlusValue(100));
      setTimeout(() => console.log(outputPlusValue(100)), 1000);

      这时，模块的加载会等待依赖模块（上例是awaiting.js）的异步操作完成，才执行后面的代码，有点像暂停在那里。
      所以，它总是会得到正确的output，不会因为加载时机的不同，而得到不一样的值。
      ">
    </highlightjs>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, toRaw, onMounted } from 'vue'
  import { getData } from '@/api'

  async function init () {
    console.log(1)
    const { data } = await getData({})
    console.log(data)
  }
  onMounted(() => {
    init()
  })

</script>

<style scoped>

</style>