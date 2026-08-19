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
    <h2>u修饰符</h2>
    <h3>点字符</h3>
    <p>点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符。</p>
    <highlightjs
     code="
var s = '𠮷';
/^.$/.test(s) // false
/^.$/u.test(s) // true
     "></highlightjs>
     <h2>解构赋值和替换</h2>
     <highlightjs
      code="
let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
one  // foo
two  // bar

let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;

'2015-01-02'.replace(re, '$<day>/$<month>/$<year>')
// '02/01/2015'
      "></highlightjs>
      <h2>非捕获组匹配</h2>
      匹配pattern 但不获取匹配结果，不进行存储供以后使用，避免浪费内存
      <highlightjs
        code="
// (?:pattern)
/^x(?:HELLO)x$/i.exec('xHELLOx')
// ['xHELLOx', index: 0, input: 'xHELLOx', groups: undefined]
        ">
      </highlightjs>
  </div>
</template>
<script setup>
function replacer(match, p1, p2, p3, offset, string, groups) {
  const { log } = console
  // p1 是非数字，p2 是数字，且 p3 非字母数字
  log(match, offset, string, groups)
  return [p1, p2, p3].join(" - ");
}
const newString = "abc12345#$*%".replace(/(?<word>[^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString); // abc - 12345 - #$*%
</script>
<style lang="less">
  
</style>