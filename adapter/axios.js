import axios from 'axios'

// 创建axios请求实例
function CreateAxiosRequestor(config) {
  return axios.create(config)
}

export { CreateAxiosRequestor }
