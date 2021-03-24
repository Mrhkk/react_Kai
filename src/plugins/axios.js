import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'
// import router from '@/router'
import apiHost from './constans'
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
const handleError = err => {
  // eslint-disable-next-line
  err = err.data && err.data || err
  if (!err.code) {
    // eslint-disable-next-line
    err.code = err.status || null
  }

  console.log('服务器返回错误信息', JSON.stringify(err));
  err.msg && message.error(`请求出错:${err.msg}`)
  // router.push("/Login");
  // 浏览器code 提示
  switch (err.code) {
    case 507:
      console.warn(err.msg);
      break;
    case 500:
      // router.push('/login')
      break;
    case 404:
      // router.push('/notFound')
      break;
    default:
      console.error('错误:~~', err);
      break;
  }
}
// axios.defaults.withCredentials = true

/** --------------------------------添加请求拦截器--------------------------------- */
axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      // eslint-disable-next-line no-param-reassign
      // config.data = qs.stringify(config.data)
    }
    // 开启全局蒙版
    console.time('请求时间');
    return config
  },
  error => Promise.reject(error)
)

/** --------------------------------添加响应拦截器--------------------------------- */
axios.interceptors.response.use(
  response => {
    console.timeEnd('请求时间');
    let res = response.data
    if (res.status === null) { // 无状态码，停止,并打印结果
      console.warn(res)
      return;
    }
    return res || null
  },
  // 允许在数据返回客户端前，修改响应的数据
  error => {
    // eslint-disable-next-line prefer-promise-reject-errors
    if (error.response) {
      handleError(error.response)
      error = error.response.data.msg
      return Promise.reject(error.response.data.msg || error.response);
    } else {
      message.error(`身份验证失败`)
      // router.push('/login')
      return Promise.reject('请求失败')
    }

  }
)

class ApiClient {
  /** --------------------------------封装axios--------------------------------- */
  /**
   * 请求方法 form/jsonString, PostFile,,GET
   * @param {String} url
   * @param {Object} params
   * @param {String} type form/jsonString
   */
  post = (url, params, type) => {
    let token1 = sessionStorage.getItem('token')
    const header = {
      'Content-Type': type ? 'application/x-www-form-urlencoded;charset=UTF-8' : 'application/json;charset=UTF-8',
      'Access-Token': token1,
      'Access-Source': '2'
    }

    if (type) {
      params = qs.stringify(params)
    }
    let options = {
      url: apiHost + url,
      method: 'POST',
      headers: header,
      rams: null,
      data: params
    }

    return new Promise((resolve, reject) => {
      axios(options)
        .then(res => {
          resolve(res)
        })
        .catch(response => {
          // 关闭全局蒙版
          reject(response)
        })
    })
  }

  // 文件上传方法
  postFile = (url, params) => {
    let token1 = sessionStorage.getItem('token')
    const header = {
      'Access-Token': token1
    }

    header['Content-Type'] = 'multipart/form-data'
    const options = {
      url: apiHost + url,
      method: 'POST',
      headers: header,
      params: null,
      data: params
    }

    return new Promise((resolve, reject) => {
      axios(options)
        .then(res => {
          resolve(res)
        })
        .catch(response => {
          // 关闭全局蒙版
          reject(response)
        })
    })
  }

  /**
   * 封装get方法
   * @param url
   * @param data
   * @returns {Promise}
   */
  get = (url, params = {}) => {
    let query = null

    // eslint-disable-next-line no-restricted-syntax
    for (let key in params) {
      if (!query) {
        query = `${key}=${encodeURI(encodeURI(params[key]))}`
      } else {
        query += `&${key}=${encodeURI(encodeURI(params[key]))}`
      }
    }

    if (query) {
      url = `${apiHost + url}?${query}`
    } else {
      url = apiHost + url
    }
    return new Promise((resolve, reject) => {
      axios
        .get(url, {})
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

const apiAxios = new ApiClient()

export default apiAxios
