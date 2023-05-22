export function setCookie (key: string, value: string, days = 3) {
  const date = new Date()
  date.setTime(date.getTime() + (days * 24 * 3600000))
  const expires = 'expires=' + date.toUTCString()
  document.cookie = `${key}=${value};${expires}`
}

export function getCookie (key: string): string {
  const name = `${key}=`
  const cookieArr = document.cookie.split(';')
  for (let i = 0; i < cookieArr.length; i++) {
    const c = cookieArr[i].trim()
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length) as string
    }
  }
  return ''
}

export function removeCookie (key: string) {
  setCookie(key, '', -1)
}
  