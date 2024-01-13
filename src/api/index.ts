import fetch from '@/utils/http'

export const getData = (data: any) => {
  return fetch({ url: 'api/getData2', method: 'post', data })
}
