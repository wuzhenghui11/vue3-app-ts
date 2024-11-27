<script setup lang="ts">
  import { ref, onMounted, reactive, computed, unref } from 'vue'
  const arr = ref(Array.from('123'))

  console.log(Array.isArray(arr.value))
  console.log(['0'].concat(arr.value, ['4']))
  console.log((arr.value as any).at(1))

  for (const [index, element] of arr.value.entries()) {
    console.log(index, element)
  }
  console.log(arr.value.every((elem, index, arr) => {
    return Number(elem) >= 0
  }))

  const result = arr.value.reduceRight((accumulator, currentValue, index) => {
    console.log(accumulator, currentValue, index)
    return `${accumulator}-${currentValue}`
  }, 0)
  console.log(result)
  console.log(arr)
  console.log(arr.value.reverse(), arr.value)
  const test = [2, 1, 3, 4, 5, 6, 7]
  // console.log(test.toReversed())
  
  test.sort((a, b) => {
    return b - a
  })
  console.log(test)
  // slice splice

  Object.defineProperties({}, {
    property1: {
      writable: true,
    }
  })
  Object.defineProperty({
    test: '',
  }, 'aa', {

  })

  const obj = reactive({
    a: 1,
    b: {
      bb: 1,
    }
  })

  const obj2 = ref({
    a: 1,
    b: {
      bb: 1,
    }
  })

  const count = ref(0)

  const obj3 = reactive({
    count
  })

  console.log(obj3)

  const proxyObj = new Proxy({
    property1: 1
  },
  {
    get: function (target, propKey, receiver) {
      return Reflect.get(target, propKey, receiver)
    },
    set: function (target, propKey, value, receiver) {
      console.log(target, propKey, value, receiver)
      console.log(Reflect.set)
      const success = Reflect.set(target, propKey, value, receiver)
      console.log(success)
      return success
    }
  })
  proxyObj.property1 = 2
  console.log(proxyObj)

  function btnClick() {
    console.log(obj)
    console.log(obj2)
    console.log(Object.is(obj2.value, obj2._value))
    alert(unref(count))
    obj.b.bb = 3
  }

  const computedData = computed(() => {
    return arr.value.length > 0 ? 1 : 0
  })

  const newMap = new Map([])

  /** 浏览器网络不打印数据问题寻找原因 */

  async function goSign () {
    const params = {
      id: '121',
      arr: [1, 2, 3]
    };
    // default 配置都包含
    const headers = new Headers({
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
    })
    // headers.append('Content-Type', 'application/json')
    const request = new Request('http://localhost:3006/api/getData2', {
      method: 'post',
      cache: 'default',
      body: JSON.stringify(params),
      headers,
    })
    // return true
    return fetch(request).then((response) => {
      // console.log(response, 'response')
      return response.json()
    })
    /* fetch(request).then((response) => {
      console.log(response, 'response')
      return response.json()
    })
    .then((data) => {
      console.log(data)
    }) */
  }

  async function goPay () {
    const data = await goSign()
    console.log(data)
    if (data.state === 0) {
      // window.location = 'https://www.baidu.com/'
    }
  }



  async function getStockPriceByName() {
    const symbol = await new Promise((resolve, reject) => { resolve(11) })
    const stockPrice = await 22
    console.log(symbol)
    return stockPrice
  }

  getStockPriceByName().then(function (result) {
    // console.log(result)
  })

  const target = { a: 2, }
  const gsObj = {
    b: 1,
    set abc (value) {
      this.b = value
    },
    get abc () {
      return this.b
    }
  }
  const s = Object.assign(target, gsObj)
  gsObj.abc = 20
  console.log(gsObj.abc)
  s.abc = 30
  console.log(s)
  console.log(s.b)


  onMounted(() => {

  })


</script>

<template>
  <div class="home">
    首页{{ arr }}
    <p></p>
    {{ arr.findLast((e, i, arr) => e === '2') }}
    <button @click="btnClick">btn</button>
    {{ obj.b }}
    <button @click="goPay">goPayBtn</button>
  </div>
</template>

<style scoped lang="less">

</style>
