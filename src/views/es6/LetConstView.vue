<template>
  <div>
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel key="1" header="let 命令*重点">
        <article></article>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="块级作用域*重点">
        <article></article>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="const 命令*重点">
        <article>
          <p>ES5 只有两种声明变量的方法：var命令和function命令。ES6 除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6 一共有 6 种声明变量的方法。</p>

          <p>ES6 为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。</p>
          <highlightjs
            language="js"
            code="
            var a = 1;
            // 如果在 Node 的 REPL 环境，可以写成 global.a
            // 或者采用通用方法，写成 this.a
            window.a // 1
            let b = 1;
            window.b // undefined
            ">
          </highlightjs>
          <p>上面代码中，全局变量a由var命令声明，所以它是顶层对象的属性；全局变量b由let命令声明，所以它不是顶层对象的属性，返回undefined。</p>
        </article>
      </a-collapse-panel>
      <a-collapse-panel key="4" header="顶层对象的属性*重点">
        <article>
          <p>浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。</p>
          <p>浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。</p>
          <p>Node 里面，顶层对象是global，但其他环境都不支持。</p>
          <p>全局环境中，this会返回顶层对象。但是，Node.js 模块中this返回的是当前模块，ES6 模块中this返回的是undefined。</p>
          <p>函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。但是，严格模式下，这时this会返回undefined。</p>
          <p>不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么eval、new Function这些方法都可能无法使用</p>
        </article>
      </a-collapse-panel>
      <a-collapse-panel key="5" header="函数提升">
        <article>
          
        </article>
        <highlightjs
            language="js"
            code="
function chifan(){
  console.log('我要吃米饭')
}
chifan()
function chifan(){
  console.log('我要吃面')
}
chifan()
// 我要吃面
// 我要吃面
这就是所谓的js的函数提升，我们使用的是函数声明的方式，所以js会有类似于变量提升的函数提升，
与变量提升不同，函数提升不仅仅提升函数声明，而是提升函数整体，具体过程即：
var chifan=function (){
  console.log('我要吃米饭')
}
var chifan=function (){
  console.log('我要吃面')
}
chifan()
chifan()
// 我们可以看到，函数提升不仅仅把声明做了提升，同时还把赋值跟着声明一起提升到了最前面

// 再来看下面这个例子
var game=function (){
  console.log('玩英雄联盟')
}
game()
var game=function (){
  console.log('玩CSGO')
}
game()
这里并没有用函数声明的方式，而用的是函数表达式的方式，所以并不存在函数整体提升，仅仅也只是声明提升，具体执行过程如下：
var game
var game
game=function (){
  console.log('玩英雄联盟')
}
game()
game=function (){
  console.log('玩CSGO')
}
game()
// '玩英雄联盟'
// '玩CSGO'

另外一个例子
console.log(drink)
function drink(){
  console.log('酒')
}
var drink='饮料'

这里我们可以看到drink即是函数声明的函数，又在最后赋值了一次，
这样去执行时，如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性，具体编译过程如下：

var drink=function drink(){
  console.log('酒')
};
console.log(drink);
var drink='饮料';
// [function:drink]
">
          </highlightjs>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, toRaw } from 'vue'
  const activeKey = ref(['1', '2', '3', '4', '5', '6'])
</script>

<style scoped>
  textarea {
    border: 0;
    width: 100%;
    height: auto;
  }
</style>