<template>
  <div>
    <h3>Promise 对象的状态变化</h3>
    <p>async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。
      也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。</p>

    <highlightjs code ="
      async function f() {
        await Promise.reject('出错了');
        await Promise.resolve('hello world'); // 不会执行
      }
    " />
    <p>上面代码中，第二个await语句是不会执行的，因为第一个await语句状态变成了reject。</p>
    <p>有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。
      这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。</p>
    <highlightjs code ="
      async function f() {
        try {
          await Promise.reject('出错了');
        } catch(e) {
        }
        return await Promise.resolve('hello world');
      }

      f()
      .then(v => console.log(v))
      // hello world
      // 另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
      async function f() {
        await Promise.reject('出错了')
          .catch(e => console.log(e));
        return await Promise.resolve('hello world');
      }

      f()
      .then(v => console.log(v))
      // 出错了
      // hello world
    " />


    <h3>第四点，async 函数可以保留运行堆栈。</h3>

    <h3>4.async 函数的实现原理</h3>
    <p>async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。</p>

    <h3>6.实例：按顺序完成异步操作</h3>
    <highlightjs code="
      async function logInOrder(urls) {
        // 并发读取远程URL
        const textPromises = urls.map(async url => {
          const response = await fetch(url);
          return response.text();
        });

        // 按次序输出
        for (const textPromise of textPromises) {
          console.log(await textPromise);
        }
      }
    " />
    <p>上面代码中，虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响。后面的for..of循环内部使用了await，因此实现了按顺序输出。</p>

    <h3>顶层 await</h3>
    <highlightjs
      language="js"
      code="
      // 顶层的await命令，就是为了解决这个问题。 ---**它保证只有异步操作完成，模块才会输出值
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
    <a-alert message="注意，顶层await只能用在 ES6 模块，不能用在 CommonJS 模块。这是因为 CommonJS 模块的require()是同步加载，如果有顶层await，就没法处理加载了。" type="warning"></a-alert>
  </div>
</template>

<script setup>
  import { reactive, ref, toRaw, onMounted } from 'vue'
  import { getData } from '@/api'

  async function init () {
    console.log(1)
    const { data } = await getData({})
    console.log(data)
  }

  const pp = async function () {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        reslove()
      }, 6000)
    })
  }

  async function other () {
    const a = await pp()
    const b = await 2
    return b
  }
  other().then((a) => {
    console.log(a)
  })

  async function f() {
    throw new Error('出错了');
  }

  f().then(
    v => console.log('resolve', v),
    e => console.log('reject-', e)
  )
  //reject Error: 出错了


  onMounted(() => {
    init()
  })

</script>

<style scoped>

</style>