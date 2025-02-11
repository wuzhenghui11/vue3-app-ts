<template>
  <div>
    <highlightjs
      language="js"
      code="
      const s = new Set([1, 2])
      [3, 4].forEach(e => s.add(e))
      s.size // 4
      // WeakRef 对象，用于直接创建对象的弱引用
      // 注意，标准规定，一旦使用WeakRef()创建了原始对象的弱引用，那么在本轮事件循环（event loop），原始对象肯定不会被清除，只会在后面的事件循环才会被清除
      let target = {}
      let wr = new WeakRef(target)

      // deref()方法可以判断原始对象是否已被清除 该方法返回原始对象 被清除则是undefined
      let obj = wr.deref() 

      // 新建一个注册表实例
      const registry = new FinalizationRegistry(heldValue => {
        // ....
      })
      ">
    </highlightjs>
    <h3>WeakSet</h3>
    <a-alert
      message="WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。首先，
      WeakSet 的成员只能是对象和 Symbol 值，而不能是其他类型的值。"
      description="其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。"
      type="warning"
      show-icon
    ></a-alert>
    <div style="width: auto; overflow: hidden;">
      这是因为垃圾回收机制根据对象的可达性（reachability）来判断回收，如果对象还能被访问到，垃圾回收机制就不会释放这块内存。
      结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。
      WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。
      因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。
      只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。
      由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。
      另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。
    </div>
    <h3>Map</h3>
    <p>get、set、has、delete、clear</p>
    <div>
      为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
      也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。
    </div>
    <h3>WeakMap</h3>
    <div>首先，WeakMap只接受对象（null除外）和 Symbol 值作为键名，不接受其他类型的值作为键名。</div>
    <h3>WeakRef</h3>
    <div>WeakSet 和 WeakMap 是基于弱引用的数据结构，ES2021 更进一步，提供了 WeakRef 对象，用于直接创建对象的弱引用。</div>
    <highlightjs
      language="js"
      code="
        let target = {};
        let wr = new WeakRef(target);
      "
    ></highlightjs>
    <p>上面示例中，target是原始对象，构造函数WeakRef()创建了一个基于target的新对象wr。这里，wr就是一个 WeakRef 的实例，属于对target的弱引用，垃圾回收机制不会计入这个引用，也就是说，wr的引用不会妨碍原始对象target被垃圾回收机制清除。</p>
    <h3>FinalizationRegistry</h3>
    <p>ES2021 引入了清理器注册表功能 FinalizationRegistry，用来指定目标对象被垃圾回收机制清除以后，所要执行的回调函数。</p>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, toRaw, getCurrentInstance, onMounted } from 'vue'
  const globalProperties: any = (getCurrentInstance() as any).appContext.config.globalProperties

  let s1: any = Symbol.for('s1')

  console.log(Symbol.keyFor(s1))

  const set = new Set([1, 2, 3])

  // 成员为弱引用 不计入垃圾回收机制
  const weakSet = new WeakSet([[1, 2], [3]])

  const map = new Map()
  const mapKey = {}
  map.set('a', '12')
  map.set(mapKey, 'obj')
  console.log(map.get('a'), map.get(mapKey))

  // 只接受 对象或者Symbol 值作为键名 不能为其他
  // const weakMap = new WeakMap()
  // weakMap.set(s1, '只能symbol')
  onMounted(() => {
    globalProperties.$hljs.highlightAll()
  })

</script>

<style scoped>

</style>