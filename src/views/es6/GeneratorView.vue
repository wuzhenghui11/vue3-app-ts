<template>
  <div>
    <a-button @click="btnClick">click</a-button>
    <p>Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）。</p>
    <a-alert type="warning" message="上一章说过，任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。
由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。" />
    <highlightjs code="
      var myIterable = {};
      myIterable[Symbol.iterator] = function* () {
        yield 1;
        yield 2;
        yield 3;
      };

      [...myIterable] // [1, 2, 3]
    " />
    <p>Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。</p>
    <highlightjs code="
      function* gen(){
        // some code
      }

      var g = gen();

      g[Symbol.iterator]() === g
      // true
    " />
    <p>上面代码中，gen是一个 Generator 函数，调用它会生成一个遍历器对象g。它的Symbol.iterator属性，也是一个遍历器对象生成函数，执行后返回它自己。</p>
  </div>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue'

  function* gen() {
    // 第一次 next {value: 579, done: false}
    // 第二次执行 return 的 {value: 11, done: true}
    // 第三次的 next {value: undefined, done: true}
    yield  123 + 456
    return 11
  }

  let g = gen()

  function btnClick () {
    console.dir(g)
    // {value: 579, done: false}
    // {value: 11, done: true}
    // {value: undefined, done: true}
    //  每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。
    console.log(g.next())
  }
  // 重点** 每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。
  function* f() {
    for(var i = 0; true; i++) {
      /* 
        当执行 g2.next() g2.next() g2.next(true) 时会打印
        0 undefined
        1 undefined
        0 true
        第一次 next 遇见 yield 就停止 0 undefined
        第二次 next 执行后面的代码遇见 yield 后停止
        第三次 next 传入true 时 reset 就为 true 了
       */
      console.log(i, reset)
      var reset = yield i; // 遇见 yield 就会停止
      if(reset) { i = -1; }
    }
  }

  var g2 = f();

  g2.next() // { value: 0, done: false }
  g2.next() // { value: 1, done: false }
  g2.next(true) // { value: 0, done: false }

  onMounted(() => {
  })
</script>
  
<style>
  
</style>