<template>
  <div>
    function 既是方法也是对象 既可以有自定义的对象属性

    <highlightjs
      language="js"
      code="
      
      ">
    </highlightjs>
  </div>
</template>

<script setup lang="ts">
  const func = function () {
    console.log('执行时我是一个方法');
    return '11'
  }
  func.desc = function () {
    console.log('func 这个方法对象的一个属性也可以是个方法');
  }
  func()
  console.dir(func)
  func.desc()
</script>

<style scoped lang="less">
  
</style>