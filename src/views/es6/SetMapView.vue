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