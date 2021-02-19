import axios from 'axios'

// let uc_token = getCookie('uc_token')
const uc_token = ''

const instance = axios.create({
  timeout: 30 * 1000 // 超时时间设置
})

instance.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = JSON.stringify(config.data) // 数据转化
  }
  if (uc_token) {
    // config.headers['uc_token'] = uc_token;
    // config.headers['Content-Type'] = 'application/json;charset=UTF-8';

    config.headers = {
      ...config.headers,
      'uc_token': uc_token,
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
  return config
}, error => {
  Promise.reject(error)
})

instance.interceptors.response.use(response => {
  if (response.status === '200' && response.data.result_code === '200') {
    return Promise.resolve(response.data)
  } else if (response.status === '200' && response.data.code === '0') {
    return Promise.resolve(response.data)
  } else {
    return Promise.reject(response)
  }
}, error => {
  return Promise.reject(error)
})

export default instance
