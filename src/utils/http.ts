import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()

// 服务器地址
const baseUrl = '/'

const httpService = axios.create({
	baseURL: baseUrl,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json; charset=UTF-8'
	}
})

// request 拦截器
httpService.interceptors.request.use(
	config => {
		const token = Cookies.get('token')
		config.headers.common['token'] = token === null ? '' : token
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// 响应拦截器即异常处理
httpService.interceptors.response.use(res => {
	if (res.data.code === 'AUTHEN0001') {
		router.push({
			name: 'login'
		})
	} else if (res.data.code !== '0') {
		if (res.data.msg && res.data.msg != "") {
      message.warning(res.data.msg)
		}
	}
	return res
}, err => {
	// 请求失败！提示服务器错误
	message.warning('网络错误')
	return Promise.reject(err)
})


// Promise 扩展 增加处理状态0 和非0 情况 分别对应success 和 error
// class PromiseExtend extends Promise {
// 	constructor (fn, successStatusFieldName, successStatusCode) {
// 		super(fn)
// 		this.successStatusFieldName = successStatusFieldName
// 		this.successStatusCode = successStatusCode
// 	}
// 	success (fn) {
// 		const {successStatusFieldName, successStatusCode} = this
// 		this.then((data) => {
// 			if (data.data[successStatusFieldName] === successStatusCode && typeof fn === 'function') fn(data)
// 		})
// 		return this
// 	}
// 	error (fn) {
// 		const {successStatusFieldName, successStatusCode} = this
// 		this.then((data) => {
// 			if (data.data[successStatusFieldName] !== successStatusCode && typeof fn === 'function') fn(data)
// 		})
// 		return this
// 	}
// }

// const fetch = (httpParams: any) => {
// 	return new PromiseExtend((resolve: Function, reject: Function) => {
// 		const config = Object.assign({
// 			method: 'post',
// 		}, httpParams)

// 		if (!config.data) config.data = {}

// 		if (config.method === 'get' && !config.params) config.params = config.data

// 		httpService(config).then((data) => {
// 			// downloadConfig 参考 download 方法第一个参数后的参数
// 			const { responseType, downloadConfig = {} } = config
// 			if (responseType === 'blob') {
// 				let filename = data.headers['content-disposition']
// 					? data.headers['content-disposition']
// 						.split(';')
// 						.find((item) => item.includes('filename'))
// 						.split('=')[1]
// 					: undefined
// 				if (filename) {
// 					const filenameArr = filename.split('.')
// 					const { name, suffix } = downloadConfig
// 					if ((!name || name === '') && filenameArr[0]) downloadConfig.name = window.decodeURIComponent(filenameArr[0])
// 					if ((!suffix || suffix === '') && filenameArr[1]) downloadConfig.suffix = filenameArr[1]
// 				}
// 				if (downloadConfig.name) download({ data: data.data, ...downloadConfig })
// 			}
// 			resolve(data)
// 		}).catch((e) => {
// 			console.error(e)
// 			reject(e)
// 		})
// 	}, 'code', '0')
// }

export default fetch

