<template>
  <div>
    <h2>4种Javascript类型检测的方式</h2>
    <p>typeof</p>
    <p>instanceof</p>
    <p>Object.prototype.toString.call()</p>
    <p>Array.isArray</p>
    <pre>
      <code>
        
      </code>
    </pre>

    <highlightjs
      language="js"
      code="
      console.log(typeof '123') //'string'

      arr instanceof arr.constructor(Array) true


      console.log(Object.prototype.toString.call(12)) //[object Number]
      console.log(Object.prototype.toString.call(true)) //[object Boolean]
      ">
    </highlightjs>
  </div>
</template>

<script setup lang="ts">
  
</script>

<style scoped lang="less">
  
</style>