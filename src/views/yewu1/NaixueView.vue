<template>
  <div>

  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, toRaw } from 'vue'

  let s1 = Symbol.for('yigeSymbol')
  let s2 = Symbol.for('yigeSymbol')
  console.log(s1 === s2)
  console.log(Symbol.keyFor(s2))

  // 对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开
  let arr1 = ref<any>([])
  let arr2: any = ['c', 'd']
  arr2[Symbol.isConcatSpreadable] = false
  arr1.value.concat(arr2, 'e')


  // Symbol.species 指向一个构造函数。创建衍生对象时，会使用该属性
  // class MyArray extends Array {}

  // const a = new MyArray(1, 2, 3);
  // const b = a.map(x => x);
  // const c = a.filter(x => x > 1);

  // b instanceof MyArray // true
  // c instanceof MyArray // true
  // class MyArray extends Array {
  //   static get [Symbol.species]() { return Array; }
  // }
</script>

<style scoped>

</style>