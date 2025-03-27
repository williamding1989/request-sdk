import { api, baseURL } from './api.js'
import { CreateCacheRequest } from '../../core/index.js'

const req = CreateCacheRequest({
  key: (config) => {
    console.log('key', config)
  },
  persist: true,
  duration: 1000 * 60 * 10,
})

// 首页接口
export const Home = async () => {
  const url = `${baseURL}${api.home}`
  try {
    const { data } = await req.post(url)
    return data
  } catch (err) {
    return err
  }
}
