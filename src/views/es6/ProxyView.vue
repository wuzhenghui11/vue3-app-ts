<template>
  <div>
    <p>下面是一个get方法的第三个参数的例子，它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例。</p>
    <highlightjs
      langguage="js"
      code="
        const proxy = new Proxy({}, {
          get: function(target, key, receiver) {
            return receiver;
          }
        });
        proxy.getReceiver === proxy // true
      "
    ></highlightjs>
    <p>上面代码中，proxy对象的getReceiver属性会被get()拦截，得到的返回值就是proxy对象。</p>
  </div>
</template>
  
<script setup lang='ts'>
  
</script>
  
<style>
  
</style>