<template>
  <div>
    <p>下面是一个get方法的第三个参数的例子，它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例。</p>
    <highlightjs
      langguage="js"
      code="
        const proxy = new Proxy({}, {
          get: function(target, key, receiver) {
            return receiver;
          }
        });
        proxy.getReceiver === proxy // true
      "
    ></highlightjs>
    <p>上面代码中，proxy对象的getReceiver属性会被get()拦截，得到的返回值就是proxy对象。</p>
    <a-alert
      message="注意，如果目标对象自身的某个属性不可写，那么set方法将不起作用。"
      description=""
      type="warning"
      ></a-alert>
    <a-alert
      message="注意，set代理应当返回一个布尔值。严格模式下，set代理如果没有返回true，就会报错。"
      description=""
      type="warning"
      >
    </a-alert>
    <highlightjs
      langguage="js"
      code="
        'use strict';
        const handler = {
          set: function(obj, prop, value, receiver) {
            obj[prop] = receiver;
            // 无论有没有下面这一行，都会报错
            return false;
          }
        };
        const proxy = new Proxy({}, handler);
        proxy.foo = 'bar';
        // TypeError: 'set' on proxy: trap returned falsish for property 'foo'
      "
    ></highlightjs>
    <h3>apply()</h3>
    <p>apply方法拦截函数的调用、call和apply操作。</p>
    <h3>has()</h3>
    <p>方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
      has()方法可以接受两个参数，分别是目标对象、需查询的属性名。下面的例子使用has()方法隐藏某些属性，不被in运算符发现。
    </p>
    <highlightjs
      code="
        var handler = {
          has (target, key) {
            if (key[0] === '_') {
              return false;
            }
            return key in target;
          }
        };
        var target = { _prop: 'foo', prop: 'foo' };
        var proxy = new Proxy(target, handler);
        '_prop' in proxy // false
      "
    ></highlightjs>
    <a-alert message="如果原对象不可配置或者禁止扩展，这时has()拦截会报错。" type="warning"></a-alert>
    <p>另外，虽然for...in循环也用到了in运算符，但是has()拦截对for...in循环不生效。</p>
    <h3>construct()方法可以接受三个参数。</h3>
    <div>
      target：目标对象。
      args：构造函数的参数数组。
      newTarget：创造实例对象时，new命令作用的构造函数（下面例子的p）。
    </div>
    <highlightjs code="
      const p = new Proxy(function () {}, {
        construct: function(target, args) {
          console.log('called: ' + args.join(', '));
          return { value: args[0] * 10 };
        }
      });

      (new p(1)).value
      // called: 1
      // 10
      ">
    </highlightjs>
    <a-alert type="warning" message="construct()方法返回的必须是一个对象，否则会报错。"></a-alert>
    <h3>deleteProperty()</h3>
    <p>deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。</p>
    <h3>defineProperty()</h3>
    <highlightjs code="
      var handler = {
        defineProperty (target, key, descriptor) {
          return false;
        }
      };
      var target = {};
      var proxy = new Proxy(target, handler);
      proxy.foo = 'bar' // 不会生效
    ">
    </highlightjs>
    <p>
      上面代码中，defineProperty()方法内部没有任何操作，只返回false，导致添加新属性总是无效。
      注意，这里的false只是用来提示操作失败，本身并不能阻止添加新属性。
      注意，如果目标对象不可扩展（non-extensible），则defineProperty()不能增加目标对象上不存在的属性，否则会报错。
      另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty()方法不得改变这两个设置。
    </p>
    <h3>this</h3>
    <p>虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。</p>
    <h2>Reflect</h2>
    <a-alert message="Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。" type="info"></a-alert>
    <h3>Reflect.get() 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。</h3>
    <highlightjs code="
      var myObject = {
        foo: 1,
        bar: 2,
        get baz() {
          return this.foo + this.bar;
        },
      };

      var myReceiverObject = {
        foo: 4,
        bar: 4,
      };

      Reflect.get(myObject, 'baz', myReceiverObject) // 8
    " />
    <h3>Reflect.set(target, name, value, receiver) 如果name属性设置了赋值函数，则赋值函数的this绑定receiver。</h3>
    <highlightjs code="
      var myObject = {
        foo: 4,
        set bar(value) {
          return this.foo = value;
        },
      };

      var myReceiverObject = {
        foo: 0,
      };

      Reflect.set(myObject, 'bar', 1, myReceiverObject);
      myObject.foo // 4
      myReceiverObject.foo // 1
    "></highlightjs>
    <a-alert
      type="warning"
      message="注意，如果 Proxy对象和 Reflect对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了receiver，那么Reflect.set会触发Proxy.defineProperty拦截。"></a-alert>
  </div>
  <highlightjs code="
    let p = {
      a: 'a'
    };

    let handler = {
      set(target, key, value, receiver) {
        console.log('set');
        Reflect.set(target, key, value, receiver)
      },
      defineProperty(target, key, attribute) {
        console.log('defineProperty');
        Reflect.defineProperty(target, key, attribute);
      }
    };

    let obj = new Proxy(p, handler);
    obj.a = 'A';
    // set
    // defineProperty
  ">
  </highlightjs>
  <p>
    上面代码中，Proxy.set拦截里面使用了Reflect.set，而且传入了receiver，导致触发Proxy.defineProperty拦截。
    这是因为Proxy.set的receiver参数总是指向当前的 Proxy实例（即上例的obj），而Reflect.set一旦传入receiver，就会将属性赋值到receiver上面（即obj），导致触发defineProperty拦截。如果Reflect.set没有传入receiver，那么就不会触发defineProperty拦截。
  </p>
</template>
  
<script setup lang='ts'>
  
</script>
  
<style>
  
</style>