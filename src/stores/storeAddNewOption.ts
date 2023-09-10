import { defineStore } from 'pinia'
export const useAddOptionStore = defineStore('addOption', () =>{
  
  async function getData () {

  }

  return {
    getData
  }
}, {
  // 有我 插件会有特殊处理
  delay: {
    second: 1000,
  }
})