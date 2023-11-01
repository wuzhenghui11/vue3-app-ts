<template>
  <div>
    <h2>Class 的基本语法</h2>
    <div style="display: flex;">
      <article class="article">
        <div style="padding: 5px; border: 1px solid gray;">
          <h3>类的由来</h3>
          <h3>constructor() 方法</h3>
          <h3>类的实例</h3>
          <h3>实例属性的新写法</h3>
          <h3>取值函数（getter）和存值函数（setter）</h3>
          <h3>属性表达式</h3>
          <h3>静态方法</h3>
          <h3>静态属性</h3>
          <h3>私有方法和私有属性</h3>
          <h3>静态块</h3>
          待整理...
          <h3>类的注意点</h3>
          待整理。。。
          <h3>in 运算符</h3>
          待整理...
          <h3>this 指向</h3>
          待整理...
          <h3>new.target 属性</h3>
          待整理...
          <h3>类不存在变量提升（hoist），这一点与 ES5 完全不同。</h3>
          <highlightjs
            language="js"
            code="
{
  let Foo = class {};
  class Bar extends Foo {
  }
}
            "/>
          上面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。但是，如果存在class的提升，
          上面代码就会报错，因为class会被提升到代码头部，而定义Foo的那一行没有提升，导致Bar继承Foo的时候，Foo还没有定义
          <h3>name属性</h3>
          <highlightjs
            language="js"
            code="
class Point {}
Point.name // Point
            "/>
          <h3>Class 表达式</h3>
          <highlightjs
          language="js"
          code="
// 这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。
// 在 Class 外部，这个类只能用MyClass引用。
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined

// 可以写出立即执行的 Class
let person = new class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}('张三');
person.sayName(); // 张三
          "/>
        </div>
      </article>
      <div class="code">
        <highlightjs
          language="js"
          :code="code"/>
      </div>
    </div>
    <h2>Class 的继承</h2>

    <div>
      <article class="article">
        <p>ES6 的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。call和apply用于改变this的指向</p>
        <p>ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。</p>
        <highlightjs
        language="js"
        code="
        function Parent(name, age) {
          this.name = name
          this.age = age
        }
        Parent.prototype.getName = function () {
          console.log('running~')
        }
        let p = new Parent('jack', '18')

        function Child (name, age, height) {
          // new 时 this 为Child 实例
          Parent.call(this, name, age)
          this.height = height
        }
        Child.prototype = p
        Child.prototype.constructor = Child
        Child.prototype.getHeight = function () {
          console.log(this.height)
        }
        
        let c = new Child('jason', '18', '180cm')
        ">
        </highlightjs>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, toRaw, onMounted, getCurrentInstance } from 'vue'
  const globalProperties: any = (getCurrentInstance() as any).appContext.config.globalProperties

  const code = ref(`
  const bar = Symbol('bar');
  const snaf = Symbol('snaf')
  let methodName = 'getArea';
  class Parent {
    constructor (x, y) {
      this.x = x
      this.y = y
      this.#privateProp = 2
    }
    toString () {
      return '(' + this.x + ', ' + this.y + ')';
    }

    // 实例属性新写法
    // 注意，新写法定义的属性是实例对象自身的属性，而不是定义在实例对象的原型上面
    _count = 0
    // 取值函数（getter）和存值函数（setter）
    get prop() {
      return 'getter';
    }
    set prop(value) {
      console.log('setter: '+value);
    }
    // 属性表达式
    [methodName] () {}
    // 静态属性
    static aa = 1
    // 静态方法
    // 父类的静态方法，可以被子类继承。
    // Child extend Parent  静态方法也是可以从super对象上调用的。 super.classMethod
    static classMethod() {
      // Parent.classMethod() 调用
      // parent.classMethod() TypeError: parent.classMethod is not a function
      return 'hello'
    }
    static bar() {
      // 如果静态方法包含this关键字，这个this指的是类，而不是实例
      // 这里的this指的是Parent类，而不是Parent的实例，等同于调用Parent.baz。另外。
      this.baz()
    }
    // 静态方法可以与非静态方法重名
    static baz() { console.log('hello') }
    baz () { console.log('world') }
    // 私有属性
    // 老写法
    _siyouProp = 1
    // Reflect.ownKeys(Parent.prototype) 可以拿到Symbol定义的私有方法
    // [ Symbol(bar), ... ]
    [bar] (aa) { this[snaf] = aa }
    // 新写法正式写法
    // 另外，不管在类的内部或外部，读取一个不存在的私有属性，也都会报错
    // 另外，私有属性也可以设置 getter 和 setter 方法
    // 私有属性不限于从this引用，只要是在类的内部，实例也可以引用私有属性。
    // 私有属性和私有方法前面，也可以加上static关键字，表示这是一个静态的私有属性或私有方法。
    #privateProp = 1
    #sum () {
      consol.log(parent.#privateProp)
      return this.#privateProp + 2
    }

  }
  const parent = new Parent(1, 2)
  Parent._count // 0
  `)

  onMounted(() => {
    globalProperties.$hljs.highlightAll()
  })
</script>

<style scoped lang="less">
  p {
    margin: 0;
  }
  .article {
    border: 0;
    height: auto;
    padding: 5px;
    min-width: 20%;
  }
  .code {
    flex: 1 0 auto;
    pre {
      width: 100%;
      height: 100%;
      .code {
        width: 100%;
        height: 100%;
      }
    }
    :deep(.hljs) {
      width: 100%;
      padding: 0.5em;
      height: 100%;
    }
    :deep(.hljs,.hljs-subst) {
      // background-color: #3d3c3c;
      text-align: left;
    }
  }
  
</style>