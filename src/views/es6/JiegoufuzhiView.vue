<template>
  <div>
    <highlightjs
      language="js"
      code="
      // 报错
      let [foo] = 1;
      let [foo] = false;
      let [foo] = NaN;
      let [foo] = undefined;
      let [foo] = null;
      let [foo] = {};
      ">
    </highlightjs>
    上面的语句都会报错，因为等号右边的值，<b>要么转为对象以后不具备 Iterator 接口（前五个表达式）</b>，要么本身就不具备 Iterator 接口（最后一个表达式）。
    <highlightjs
      language="js"
      code="
      // 事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
      let [x, y, z] = new Set(['a', 'b', 'c']);
      x // a
      ">
    </highlightjs>
    <h3>注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。</h3>
    <highlightjs
      language="js"
      code="
      let [x = 1] = [undefined];
      x // 1

      let [x = 1] = [null];
      x // null
      ">
    </highlightjs>
    <highlightjs
      language="js"
      code="
      var {x = 3} = {x: undefined};
      x // 3

      var {x = 3} = {x: null};
      x // null
      ">
    </highlightjs>
    上面代码中，属性x等于null，因为null与undefined不严格相等，所以是个有效的赋值，导致默认值3不会生效。
    <highlightjs
      language="js"
      code="
  let obj = {};
  let arr = [];

  ({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

  obj // {prop:123}
  arr // [true]
  // 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。
  // 报错
  let {foo: {bar}} = {baz: 'baz'};
  // 上面代码中，等号左边对象的foo属性，对应一个子对象。该子对象的bar属性，解构时会报错。原因很简单，因为foo这时等于undefined，再取子属性就会报错。
      ">
    </highlightjs>
    注意，对象的解构赋值可以取到继承的属性。
    <highlightjs
      language="js"
      code="
      const obj1 = {};
      const obj2 = { foo: 'bar' };
      Object.setPrototypeOf(obj1, obj2);

      const { foo } = obj1;
      foo // 'bar'
      ">
    </highlightjs>
    <h2>注意</h2>
    （1）如果要将一个已经声明的变量用于解构赋值，必须非常小心。
    <highlightjs
      language="js"
      code="
      // 错误的写法
      let x;
      {x} = {x: 1};
      // SyntaxError: syntax error
      ">
    </highlightjs>
    上面代码的写法会报错，因为 JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。
    <highlightjs
      language="js"
      code="
      // 正确的写法
      let x;
      ({x} = {x: 1});
      ">
    </highlightjs>
    上面代码将整个解构赋值语句，放在一个圆括号里面，就可以正确执行。关于圆括号与解构赋值的关系，参见下文。
    （3）由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。
    <highlightjs
      language="js"
      code="
      let arr = [1, 2, 3];
      let {0 : first, [arr.length - 1] : last} = arr;
      first // 1
      last // 3
      ">
    </highlightjs>
    解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted, getCurrentInstance } from 'vue'
  const globalProperties: any = (getCurrentInstance() as any).appContext.config.globalProperties
  const code = ref(``)
  const { log } = console

  onMounted(() => {
    log(123)
    globalProperties.$hljs.highlightAll()
  })
</script>
<style scoped lang="less">

</style>
