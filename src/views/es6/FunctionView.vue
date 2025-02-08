<template lang="">
  <div>
    <h3>函数扩展</h3>
    <p>一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。</p>
    <highlightAll
    language="js"
    code="
      var x = 1;

      function f(x, y = x) {
        console.log(y);
      }

      f(2) // 2
    ">
    </highlightAll>
    <h3>箭头函数有几个使用注意点。</h3>
    （1）箭头函数没有自己的this对象（详见下文）。
    （2）不可以当作构造函数，也就是说，不可以对箭头函数使用new命令，否则会抛出一个错误。
    （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
    （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
    上面四点中，最重要的是第一点。对于普通函数来说，内部的this指向函数运行时所在的对象，但是这一点对箭头函数不成立。它没有自己的this对象，内部的this就是定义时上层作用域中的this。也就是说，箭头函数内部的this指向是固定的，相比之下，普通函数的this指向是可变的。
  </div>
</template>
<script setup lang="ts">
  import { onMounted } from 'vue'
  function printArguments (a: number) {
    console.log(a, arguments)
  }
  function rest (...args) {
    console.log(args)
  }
  onMounted(() => {
    printArguments(11)
    rest(1, 2)
  })
</script>
<style lang="">
  
</style>