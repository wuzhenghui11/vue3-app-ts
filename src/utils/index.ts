export function test<T extends string> (key: T[]): T[] {
  console.log(key.length)
  return key
}
const baseUrl = '/'
export {
  baseUrl
}
  