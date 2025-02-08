<template>
  <div>
    y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。
    <p>实际上，y修饰符号隐含了头部匹配的标志^。</p>

    <h3>d 修饰符：正则匹配索引</h3>
    <p>组匹配的结果，在原始字符串里面的开始位置和结束位置，目前获取并不是很方便。正则实例的exec()方法有一个index属性，可以获取整个匹配结果的开始位置。但是，组匹配的每个组的开始位置，很难拿到。

ES2022 新增了d修饰符，这个修饰符可以让exec()、match()的返回结果添加indices属性，在该属性上面可以拿到匹配的开始位置和结束位置。</p>
    <highlightjs
      language="js"
      code="
      const text = 'zabbcdef'
      const re = /ab+(cd)/d
      const result = re.exec(text)
      result.indices // [ [ 1, 6 ], [ 4, 6 ] ]
      ">
    </highlightjs>
  </div>
</template>
<script setup lang="ts">
</script>
<style lang="less">
  
</style>