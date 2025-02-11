<template>
  <div>
    <a-alert
      message="注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。"
      description=""
      type="warning"
      show-icon
    />
    <highlightjs
    language="js"
    code="
      (...[1, 2])
      // Uncaught SyntaxError: Unexpected number

      console.log((...[1, 2]))
      // Uncaught SyntaxError: Unexpected number

      console.log(...[1, 2])
      // 1 2
    " />
    <p>上面三种情况，扩展运算符都放在圆括号里面，但是前两种情况会报错，因为扩展运算符所在的括号不是函数调用。</p>
    <h3>(5) 实现了 Iterator 接口的对象</h3>
    <a-alert
      message="任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。"
      description=""
      type="warning"
      show-icon
    />
    <highlightjs
      language="js"
      code="
        let nodeList = document.querySelectorAll('div');
        let array = [...nodeList];
      "/>
    <p>上面代码中，querySelectorAll()方法返回的是一个NodeList对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了 Iterator。</p>
    <h3>Array.of()</h3>
    <p>Array.of()基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。</p>
    <p>Array.of()总是返回参数值组成的数组。如果没有参数，就返回一个空数组。</p>
    <p>Array.of()方法可以用下面的代码模拟实现。</p>
    <highlightjs
      language="js"
      code="
        function ArrayOf(){
          return [].slice.call(arguments);
        }
      "/>
  </div>
</template>
<script setup lang="ts">

</script>
<style lang="">
  
</style>