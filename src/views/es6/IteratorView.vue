<template>
  <div>
    <h3>原生具备 Iterator 接口的数据结构如下</h3>
    <pre>
      Array
      Map
      Set
      String
      TypedArray
      函数的 arguments 对象
      NodeList 对象
    </pre>
    <h3></h3>
    <highlightjs code="
      let iterable = {
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3,
        [Symbol.iterator]: Array.prototype[Symbol.iterator]
      };
      for (let item of iterable) {
        console.log(item); // 'a', 'b', 'c'
      }
    " />
    <a-alert message="注意，普通对象部署数组的Symbol.iterator方法，并无效果。" type="warning" />
    <highlightjs code="
      let iterable = {
        a: 'a',
        b: 'b',
        c: 'c',
        length: 3,
        [Symbol.iterator]: Array.prototype[Symbol.iterator]
      };
      for (let item of iterable) {
        console.log(item); // undefined, undefined, undefined
      }
    " />
    <h3>调用 Iterator 接口的场合</h3>
    <p>1 解构赋值</p>
    <p>2 扩展运算符（...）也会调用默认的 Iterator 接口。</p>
    <p>3 yield*</p>
    <p>4 其他场合</p>
    <pre>
      由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。
      for...of
      Array.from()
      Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
      Promise.all()
      Promise.race()
    </pre>

    <h3>(5) Iterator 接口与 Generator 函数</h3>
    <a-alert message="Symbol.iterator()方法的最简单实现，还是使用下一章要介绍的 Generator 函数。" type="warning" />
    <highlightjs code="
      let myIterable = {
        [Symbol.iterator]: function* () {
          yield 1;
          yield 2;
          yield 3;
        }
      };
      [...myIterable] // [1, 2, 3]

      // 或者采用下面的简洁写法

      let obj = {
        * [Symbol.iterator]() {
          yield 'hello';
          yield 'world';
        }
      };

      for (let x of obj) {
        console.log(x);
      }
      // hello
      // world
    "></highlightjs>
    <p>上面代码中，Symbol.iterator()方法几乎不用部署任何代码，只要用 yield 命令给出每一步的返回值即可。</p>
    <h3>(6) 遍历器对象的 return()，throw()</h3>
    <p>遍历器对象除了具有next()方法，还可以具有return()方法和throw()方法。
      如果你自己写遍历器对象生成函数，那么next()方法是必须部署的，return()方法和throw()方法是否部署是可选的。
      return()方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句），就会调用return()方法。
      如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return()方法。
    </p>
    <highlightjs code="
      function readLinesSync(file) {
        return {
          [Symbol.iterator]() {
            return {
              next() {
                return { done: false };
              },
              return() {
                file.close();
                return { done: true };
              }
            };
          },
        };
      }
      // 上面代码中，函数readLinesSync接受一个文件对象作为参数，返回一个遍历器对象，其中除了next()方法，还部署了return()方法。
      // 下面的两种情况，都会触发执行return()方法。
      // 情况一
      for (let line of readLinesSync(fileName)) {
        console.log(line);
        break;
      }

      // 情况二
      for (let line of readLinesSync(fileName)) {
        console.log(line);
        throw new Error();
      }
    " />
    <h3>7 for...of 循环 (重要用法上)</h3>
    <div>ES6 借鉴 C++、Java、C# 和 Python 语言，引入了for...of循环，作为遍历所有数据结构的统一的方法。
一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。
for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。</div>
  </div>
</template>
  
<script setup lang='ts'>
  
</script>
  
<style>
  
</style>