import { CreateAxiosRequestor } from './axios.js'

// 创建请求实例
function CreateRequestor(config) {
  return CreateAxiosRequestor(config)
}

export { CreateRequestor }
