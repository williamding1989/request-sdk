import { CreateEnhancedRequest } from './index.js'

/**
 * 创建一个支持缓存的请求实例
 * @param {Object} options - 缓存配置选项
 * @param {Function} options.key - 生成缓存键的函数，接收请求配置对象作为参数
 * @param {boolean} [options.persist=false] - 是否持久化缓存（默认值: false），开启后将会存在localstorage中
 * @param {number} [options.duration] - 缓存有效期（毫秒）
 * @returns {Object} 返回请求方法
 */
function CreateCacheRequest(options) {
  // 参数归一化
  options = normalize(options)

  const request = CreateEnhancedRequest()

  const store = CreateCacheStore(options.persist)

  // 请求之前
  request.on('beforeRequest', (config) => {
    //  查缓存 使用store能力
    // console.log('请求之前----', config)
  })

  // 请求之后
  request.on('afterRequest', (config, response) => {
    // 设置缓存 使用store能力
    // console.log('请求之后++++', config)
  })

  return request
}

/**
 * 缓存仓库
 * @param {String} isPersist - 是否持久化缓存
 * @returns {}
 */
function CreateCacheStore(isPersist) {
  return {
    // has: ()=>{},   是否有缓存
    // get:()=>{} , 获取缓存
    // set:()=>{}  检查缓存
  }
}

// 参数归一化
function normalize(options) {
  return options
}

export default CreateCacheRequest
