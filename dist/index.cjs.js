'use strict';

var axios = require('axios');

const baseURL = 'http://124.223.0.156:8082/';

const api = {
  home: 'api/home', // 首页接口
};

// 创建axios请求实例
function CreateAxiosRequestor(config) {
  return axios.create(config)
}

// 创建请求实例
function CreateRequestor(config) {
  return CreateAxiosRequestor(config)
}

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
  options = normalize(options);

  const request = CreateEnhancedRequest();

  CreateCacheStore(options.persist);

  // 请求之前
  request.on('beforeRequest', (config) => {
    //  查缓存 使用store能力
    // console.log('请求之前----', config)
  });

  // 请求之后
  request.on('afterRequest', (config, response) => {
    // 设置缓存 使用store能力
    // console.log('请求之后++++', config)
  });

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

// 请求事件触发器
class EventEmitter {
  constructor() {
    this.event = new Map();
  }

  // 注册
  on(event, callback) {
    if (!this.event.has(event)) {
      this.event.set(event, []);
    }
    this.event.get(event).push(callback);
  }

  // 触发
  async emit(event, ...args) {
    const callback = this.event.get(event) || [];
    for (let cb of callback) {
      await cb(...args);
    }
  }
}

// 创建增强函数
function CreateEnhancedRequest() {
  const emitter = new EventEmitter();
  const req = CreateRequestor(); // 底层请求库（如 axios）

  const createWrappedMethod = (method) => {
    return async (url, data, config) => {
      // OverWrite Config
      config = { method, url, data, ...config };

      // 触发请求前事件
      await emitter.emit('beforeRequest', config);

      try {
        const response = await req.request(config);

        // 触发请求后事件
        await emitter.emit('afterRequest', config, response);

        return response
      } catch (error) {
        // 触发错误事件
        await emitter.emit('requestError', error);

        return error
      }
    }
  };

  // 返回增强后的实例
  return {
    on: emitter.on.bind(emitter),
    get: createWrappedMethod('GET'),
    post: createWrappedMethod('POST'),
    // 其他方法...
  }
}

const req = CreateCacheRequest({
  key: (config) => {
    console.log('key', config);
  },
  persist: true,
  duration: 1000 * 60 * 10,
});

// 首页接口
const Home = async () => {
  const url = `${baseURL}${api.home}`;
  try {
    const { data } = await req.post(url);
    return data
  } catch (err) {
    return err
  }
};

const business = {
  hs: {
    home: Home,
  },
};

exports.CreateCacheRequest = CreateCacheRequest;
exports.business = business;
