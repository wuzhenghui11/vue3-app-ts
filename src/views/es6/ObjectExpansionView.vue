<template>
  <div>
    <a-alert
      message="注意，简写的对象方法不能用作构造函数，会报错。"
      description=""
      type="warning"
      show-icon
    />
    <highlightjs
      language="js"
      code="
        const obj = {
          f() {
            this.foo = 'bar';
          }
        };

        new obj.f() // 报错
      "
    />
    <p>上面代码中，f是一个简写的对象方法，所以obj.f不能当作构造函数使用。</p>
    <h3>super 关键字</h3>
    <a-alert
      message="我们知道，this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。"
      description=""
      type="warning"
      show-icon
    ></a-alert>
    <highlightjs language="js"
    code="
    const proto = {
      foo: 'hello'
    };

    const obj = {
      foo: 'world',
      find() {
        return super.foo;
      }
    };

    Object.setPrototypeOf(obj, proto);
    obj.find() // hello
    "
    ></highlightjs>
    <p>上面代码中，对象obj.find()方法之中，通过super.foo引用了原型对象proto的foo属性。</p>
    <a-alert
      type="warning"
      message="注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。"
      show-icon
      >
    </a-alert>
    <highlightjs
      language="js"
      code="
      // 报错
      const obj = {
        foo: super.foo
      }

      // 报错
      const obj = {
        foo: () => super.foo
      }

      // 报错
      const obj = {
        foo: function () {
          return super.foo
        }
      }
      "
    ></highlightjs>
    <p>上面三种super的用法都会报错，因为对于 JavaScript 引擎来说，这里的super都没有用在对象的方法之中。第一种写法是super用在属性里面，第二种和第三种写法是super用在一个函数里面，然后赋值给foo属性。目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。</p>
    <p>JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）。</p>
    <highlightjs
      language="js"
      code="
        const proto = {
          x: 'hello',
          foo() {
            console.log(this.x);
          },
        };

        const obj = {
          x: 'world',
          foo() {
            super.foo();
          }
        }

        Object.setPrototypeOf(obj, proto);

        obj.foo() // world
      "
    />
    <p>上面代码中，super.foo指向原型对象proto的foo方法，但是绑定的this却还是当前对象obj，因此输出的就是world。</p>
    <h3>对象的扩展运算符</h3>
    <a-alert
      message="注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。"
      type="warning"
      show-icon
    ></a-alert>
    <highlightjs
      language="js"
      code="
        let obj = { a: { b: 1 } };
        let { ...x } = obj;
        obj.a.b = 2;
        x.a.b // 2
        // 上面代码中，x是解构赋值所在的对象，拷贝了对象obj的a属性。a属性引用了一个对象，修改这个对象的值，会影响到解构赋值对它的引用。另外，扩展运算符的解构赋值，不能复制继承自原型对象的属性。
        // 另外，扩展运算符的解构赋值，不能复制继承自原型对象的属性。

        let o1 = { a: 1 };
        let o2 = { b: 2 };
        o2.__proto__ = o1;
        let { ...o3 } = o2;
        o3 // { b: 2 }
        o3.a // undefined
        // 上面代码中，对象o3复制了o2，但是只复制了o2自身的属性，没有复制它的原型对象o1的属性。

        // 另外一个例子
        const o = Object.create({ x: 1, y: 2 });
        o.z = 3;

        let { x, ...newObj } = o;
        let { y, z } = newObj;
        x // 1
        y // undefined
        z // 3

        // 上面代码中，变量x是单纯的解构赋值，所以可以读取对象o继承的属性；变量y和z是扩展运算符的解构赋值，只能读取对象o自身的属性，所以变量z可以赋值成功，变量y取不到值。ES6 规定，变量声明语句之中，如果使用解构赋值，扩展运算符后面必须是一个变量名，而不能是一个解构赋值表达式，所以上面代码引入了中间变量newObj，如果写成下面这样会报错。

      ">
    </highlightjs>
    <h3>AggregateError 错误对象</h3>
    <p>AggregateError 在一个错误对象里面，封装了多个错误。如果某个单一操作，同时引发了多个错误，需要同时抛出这些错误，那么就可以抛出一个 AggregateError 错误对象，把各种错误都放在这个对象里面。</p>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  const a = ref(1)
</script>
<style scoped>
  
</style>
