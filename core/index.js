import { CreateRequestor } from '../adapter/index.js'

// 请求事件触发器
class EventEmitter {
  constructor() {
    this.event = new Map()
  }

  // 注册
  on(event, callback) {
    if (!this.event.has(event)) {
      this.event.set(event, [])
    }
    this.event.get(event).push(callback)
  }

  // 触发
  async emit(event, ...args) {
    const callback = this.event.get(event) || []
    for (let cb of callback) {
      await cb(...args)
    }
  }
}

// 创建增强函数
function CreateEnhancedRequest() {
  const emitter = new EventEmitter()
  const req = CreateRequestor() // 底层请求库（如 axios）

  const createWrappedMethod = (method) => {
    return async (url, data, config) => {
      // OverWrite Config
      config = { method, url, data, ...config }

      // 触发请求前事件
      await emitter.emit('beforeRequest', config)

      try {
        const response = await req.request(config)

        // 触发请求后事件
        await emitter.emit('afterRequest', config, response)

        return response
      } catch (error) {
        // 触发错误事件
        await emitter.emit('requestError', error)

        return error
      }
    }
  }

  // 返回增强后的实例
  return {
    on: emitter.on.bind(emitter),
    get: createWrappedMethod('GET'),
    post: createWrappedMethod('POST'),
    // 其他方法...
  }
}

export { EventEmitter, CreateEnhancedRequest }

// 接口缓存
export { default as CreateCacheRequest } from './cache.js'
