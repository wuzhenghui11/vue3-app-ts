<template>
  <div>
    <highlightjs
      code="
        const p1 = new Promise(function (resolve, reject) {
          // ...
        });

        const p2 = new Promise(function (resolve, reject) {
          // ...
          resolve(p1);
        })
      "
    ></highlightjs>
    <p>上面代码中，p1和p2都是 Promise 的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。</p>
    <a-alert type="warning" message="
      注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是resolved或者rejected，那么p2的回调函数将会立刻执行。
    "></a-alert>

    <highlightjs code="
    const someAsyncThing = function() {
      return new Promise(function(resolve, reject) {
        // 下面一行会报错，因为x没有声明
        resolve(x + 2);
      });
    };

    someAsyncThing().then(function() {
      console.log('everything is great');
    });

    setTimeout(() => { console.log(123) }, 2000);
    // Uncaught (in promise) ReferenceError: x is not defined
    // 123
    "></highlightjs>
    <a-alert type="warning" message="上面代码中，someAsyncThing()函数产生的 Promise 对象，内部有语法错误。
    浏览器运行到这一行，会打印出错误提示ReferenceError: x is not defined，
    但是不会退出进程、终止脚本执行，2 秒之后还是会输出123。这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，
    通俗的说法就是“Promise 会吃掉错误”。
    这个脚本放在服务器执行，退出码就是0（即表示执行成功）。
    不过，Node.js 有一个unhandledRejection事件，专门监听未捕获的reject错误，
    上面的脚本会触发这个事件的监听函数，可以在监听函数里面抛出错误。"></a-alert>
    <highlightjs code="
      process.on('unhandledRejection', function (err, p) {
        throw err;
      });
    " />
    <a-alert type="warning" message="上面代码中，unhandledRejection事件的监听函数有两个参数，第一个是错误对象，第二个是报错的 Promise 实例，它可以用来了解发生错误的环境信息。
注意，Node 有计划在未来废除unhandledRejection事件。如果 Promise 内部有未捕获的错误，会直接终止进程，并且进程的退出码不为 0。" />
    <h3>Promise.resolve()</h3>
    <a-alert type="warning" message="需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。" />
    <hightlightjs code="
      setTimeout(function () {
        console.log('three');
      }, 0);

      Promise.resolve().then(function () {
        console.log('two');
      });

      console.log('one');

      // one
      // two
      // three
    " />
    <p>上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。</p>
    <h3>Promise.try() (重点)</h3>
    <highlightjs code="
      const f = () => console.log('now');
      Promise.resolve().then(f);
      console.log('next');
      // next
      // now
    "></highlightjs>
    上面代码中，函数f是同步的，但是用 Promise 包装了以后，就变成异步执行了。
  </div>
</template>
<script setup>
// Promise.prototype.finally = function (callback) {
//   let P = this.constructor;
//   return this.then(
//     value  => P.resolve(callback()).then(() => value),
//     reason => P.resolve(callback()).then(() => { throw reason })
//   );
// };
// 上面代码中，不管前面的 Promise 是fulfilled还是rejected，都会执行回调函数callback。

// 从上面的实现还可以看到，finally方法总是会返回原来的值。
/* 
// resolve 的值是 undefined
Promise.resolve(2).then(() => {}, () => {})

// resolve 的值是 2
Promise.resolve(2).finally(() => {})

// reject 的值是 undefined
Promise.reject(3).then(() => {}, () => {})

// reject 的值是 3
Promise.reject(3).finally(() => {})
*/
</script>
<style lang="">
  
</style>