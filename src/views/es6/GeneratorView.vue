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
    <h3>throw()</h3>
    <p>如果 Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。</p>
    <h3>**</h3>
    <p>throw方法被内部捕获以后，会附带执行到下一条yield表达式，这种情况下等同于执行一次next方法。</p>
    <highlightjs code="
      var gen = function* gen(){
      try {
        yield 1;
      } catch (e) {
        yield 2;
      }
      yield 3;
    }

    var g = gen();
    g.next() // { value:1, done:false }
    g.throw() // { value:2, done:false }
    g.next() // { value:3, done:false }
    g.next() // { value:undefined, done:true }
    " />
    <p>上面代码中，g.throw方法被内部捕获以后，等同于执行了一次next方法，所以返回{ value:2, done:false }。另外，也可以看到，只要 Generator 函数内部部署了try...catch代码块，那么遍历器的throw方法抛出的错误，不影响下一次遍历。</p>
    <p>另外，throw命令与g.throw方法是无关的，两者互不影响。</p>
    <h3>return()</h3>
    <highlightjs code="
      function* gen() {
        yield 1;
        yield 2;
        yield 3;
      }

      var g = gen();

      g.next()        // { value: 1, done: false }
      g.return('foo') // { value: 'foo', done: true }
      g.next()        // { value: undefined, done: true }
    " />
    <p>上面代码中，遍历器对象g调用return()方法后，返回值的value属性就是return()方法的参数foo。并且，Generator 函数的遍历就终止了，返回值的done属性为true，以后再调用next()方法，done属性总是返回true。</p>
    <h3>yield* 表达式</h3>
    <p>如果在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，自己手动完成遍历。</p>
    <p>上面代码说明，yield*后面的 Generator 函数（没有return语句时），不过是for...of的一种简写形式，完全可以用后者替代前者。反之，在有return语句时，则需要用var value = yield* iterator的形式获取return语句的值。</p>
    <p>实际上，任何数据结构只要有 Iterator 接口，就可以被yield*遍历。</p>
    <p>如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据。</p>
    <highlightjs code="
      function* foo() {
        yield 2;
        yield 3;
        return 'foo';
      }

      function* bar() {
        yield 1;
        var v = yield* foo();
        console.log('v: '' + v);
        yield 4;
      }

      var it = bar();

      it.next()
      // {value: 1, done: false}
      it.next()
      // {value: 2, done: false}
      it.next()
      // {value: 3, done: false}
      it.next();
      // 'v: foo'
      // {value: 4, done: false}
      it.next()
      // {value: undefined, done: true}
    " />
    <p>上面代码在第四次调用next方法的时候，屏幕上会有输出，这是因为函数foo的return语句，向函数bar提供了返回值。</p>

    <h3>Generator 函数的this</h3>
    <h3>含义（*）</h3>
    <h3>应用（*）</h3>
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
       */
      console.log(i, reset)
      var reset = yield i; // 遇见 yield 就会停止
      /* 
        - 0 undefined
        - 1 true
        第一次next 不执行下面的方法 遇见 yield 就停止
        第二次next i 为0 reset 打印 undefined 遇见 yield 就停止
        第三次next(true) i 为1 reset=true 将i 重置为 -1 遇见yield就停止 所以上面打印三次下面打印2次
      */
      /*
        这个功能有很重要的语法意义。
        Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。
        通过next方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。
        也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。
      */
      console.log('-', i, reset)
      if(reset) { i = -1; }
    }
  }

  var g2 = f();

  g2.next() // { value: 0, done: false }
  g2.next() // { value: 1, done: false }
  g2.next(true) // { value: 0, done: false }


  function* inner() {
    yield 'hello!';
  }
  console.dir(inner)

  function* outer1() {
    yield 'open';
    yield inner();
    yield 'close';
  }

  var geng = outer1()
  console.dir(geng)
  console.log(geng.next().value) // "open"
  console.log(geng.next().value) // 返回一个遍历器对象
  console.log(geng.next().value) // "close"

  function* outer2() {
    yield 'open'
    yield* inner()
    yield 'close'
  }

  var gengg = outer2()
  console.log('----')
  console.log(gengg.next().value) // "open"
  console.log(gengg.next().value) // "hello!"
  console.log(gengg.next().value) // "close"


  function* genFuncWithReturn() {
    yield 'a';
    yield 'b';
    return 'The result';
  }
  function* logReturned(genObj) {
    let result = yield* genObj;
    console.log(result);
  }

  console.log([...logReturned(genFuncWithReturn())])
  // The result
  // 值为 [ 'a', 'b' ]

  onMounted(() => {
  })
</script>
  
<style>
  
</style>