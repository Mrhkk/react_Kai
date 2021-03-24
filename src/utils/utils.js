
import { message } from 'antd'
// import router from '@/router'

// const path = require('path');
// const resolve = dir => path.join(__dirname, dir);

// 处理异步请求返回数据
const handlePromise = async (promise) => {
  try {
    const result = await promise;
    if (result.code === 507) {
      return
    } else if (result.code !== 200) {
      throw result;
    }
    if (result.code === 200) {
      return result.data || {};
    }
    return result.msg;
  } catch (error) {
    let { msg, code } = error
    // console.log('错误信息', JSON.stringify(err));
    switch (code) {
      case 404:
        message.error('身份失效!请重新登录.')
        // router.push('/notFound')
        break;
      case 300:
        message.error('身份失效!请重新登录.')
        // router.push('/login')
        break
      default:
        console.log(22222)
        message.warning(msg)
        break;
    }
  }
};
const dateFormat = function (date, fmt = 'yyyy-MM-dd HH:mm:ss') {
  let o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'H+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
};
/**
 * 随机数
 */
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * 防抖函数  无效...
 */
const debounce = (func, delay) => {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export {
  handlePromise, dateFormat, random, debounce
};
