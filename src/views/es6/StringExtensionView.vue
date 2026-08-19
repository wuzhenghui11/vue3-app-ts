<template>
  <div>
    字符串扩展
    <h2>ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。</h2>
    <highlightjs
      language="js"
      code='
        "\u{20BB7}"
        // "𠮷"

        "\u{41}\u{42}\u{43}"
        // "ABC"

        let hello = 123;
        hell\u{6F} // 123

        "\u{1F680}" === "\uD83D\uDE80"
        // true
      '>
    </highlightjs>
    <p>上面代码中，最后一个例子表明，大括号表示法与四字节的 UTF-16 编码是等价的。</p>
    <p>有了这种表示法之后，JavaScript 共有 6 种方法可以表示一个字符。</p>
    <highlightjs
      code="
      '\z' === 'z'  // true
      '\172' === 'z' // true
      '\x7A' === 'z' // true
      '\u007A' === 'z' // true
      '\u{7A}' === 'z' // true
      "></highlightjs>
    <p>ES6 为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历。</p>
    <p>除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。</p>
    <h2>JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript 会认为它们是两个字符。</h2>
  </div>
</template>

<script setup>
const { log } = console
log('\u0061', '\uD842\uDFB7', '\u20BB7')
log('\u{20BB7}')
// 字符串里面不能直接包含反斜杠，一定要转义写成\\或者\u005c。
// log('\a') // 报错
// 写成下面这样
log('\\a')
// 这个规定本身没有问题，麻烦在于 JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符）。
// 这样一来，服务器输出的 JSON 被JSON.parse解析，就有可能直接报错。
const json = '"\u2028"';
JSON.parse(json); // 可能报错
// JSON 格式已经冻结（RFC 7159），没法修改了。为了消除这个报错，ES2019 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）。

function test (a, ...value) {
  console.log(value)
}
test({a: 123}, 1)

const str = '123abc456';
// const regex = /(\d+)([a-z]+)(\d+)/g;
const regex = /(a)/g

function replacer(match, p1, offset, string) {
  log(offset)
  return '-';
}

log(str.replaceAll(regex, replacer))

</script>

<style lang="scss" scoped>

</style>