<template>
  <div>
    <highlightjs
      language="js"
      code="
      // Symbol.species 指向一个构造函数。创建衍生对象时，会使用该属性
      class MyArray extends Array {}

      const a = new MyArray(1, 2, 3);
      const b = a.map(x => x);
      const c = a.filter(x => x > 1);

      b instanceof MyArray // true
      c instanceof MyArray // true
      class MyArray extends Array {
        static get [Symbol.species]() { return Array; }
      }
      /* 上面代码中，子类MyArray继承了父类Array，a是MyArray的实例，b和c是a的衍生对象。
      你可能会认为，b和c都是调用数组方法生成的，所以应该是数组（Array的实例），但实际上它们也是MyArray的实例。
      Symbol.species属性就是为了解决这个问题而提供的。现在，我们可以为MyArray设置Symbol.species属性。 */
      ">
    </highlightjs>
    <p>有时，我们希望重新使用同一个 Symbol 值，Symbol.for()方法可以做到这一点。</p>
    <p>Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。</p>
    <h3>Symbol.hasInstance</h3>
    <p>对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)。</p>
    <highlightjs
      language="js"
      code="
        class MyClass {
          [Symbol.hasInstance](foo) {
            return foo instanceof Array;
          }
        }

        [1, 2, 3] instanceof new MyClass() // true

        // 实际是 (new MyClass())[Symbol.hasInstance]([1, 2, 3])
      "
    />
    <h3>Symbol.isConcatSpreadable</h3>
    <p>对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。</p>

    <h3>Symbol.unscopables</h3>
    <p>对象的Symbol.unscopables属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除。</p>
    <highlightjs
      language="JavaScript"
      code="
        // 没有 unscopables 时
        class MyClass {
          foo() { return 1; }
        }

        var foo = function () { return 2; };

        with (MyClass.prototype) {
          foo(); // 1
        }

        // 有 unscopables 时
        class MyClass {
          foo() { return 1; }
          get [Symbol.unscopables]() {
            return { foo: true };
          }
        }

        var foo = function () { return 2; };

        with (MyClass.prototype) {
          foo(); // 2
        }
      "
      >
    </highlightjs>
    <p>上面代码通过指定Symbol.unscopables属性，使得with语法块不会在当前作用域寻找foo属性，即foo将指向外层作用域的变量。</p>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, toRaw } from 'vue'

  let sb = Symbol('mySymbol')

  let s1 = Symbol.for('yigeSymbol')
  let s2 = Symbol.for('yigeSymbol')
  console.log(s1 === s2)
  console.log(Symbol.keyFor(s2))

  // 对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开
  let arr1 = ref<any>([])
  let arr2: any = ['c', 'd']
  arr2[Symbol.isConcatSpreadable] = false
  arr1.value.concat(arr2, 'e')

  const obj = {
    [s1]: 's1',
    [s2]: 's2',
    pt: '普通属性'
  }
  console.log(Reflect.ownKeys(obj))

  class MyClass {
    foo() {
      return 1
    }
  }
  console.dir(MyClass)
</script>

<style scoped>

</style>