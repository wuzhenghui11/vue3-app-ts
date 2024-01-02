<template>
  <div>
    <pre>
      <code>
        call和apply 都是改变this指向的
        call要比apply快
        call() 方法调用一个函数, 其具有一个指定的 this 值和分别地提供的参数(参数的列表)
        apply() 第二个参数是数组
      </code>
    </pre>

    <highlightjs
      language="js"
      code="
      Array.prototype.slice.call(this, 0)
      Array.prototype.slice.apply(this, [])

      // 合并两个数组
      var vegetables = ['parsnip', 'potato']
      var moreVegs = ['celery', 'beetroot']
      // 将第二个数组融合进第一个数组
      // 相当于 vegetables.push('celery', 'beetroot')
      // 相当于用vegetables执行push() 并且传入参数 moreVegs
      Array.prototype.push.apply(vegetables, moreVegs) // push返回4
      vegetables
      // ['parsnip', 'potato', 'celery', 'beetroot']
      ">
    </highlightjs>
  </div>
</template>

<script setup lang="ts">
  
</script>

<style scoped lang="less">
  
</style>