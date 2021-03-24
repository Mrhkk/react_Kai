//引入网络请求
// import Api from "../api/api"
// import store from "./store";
import other from "../pages/login/other.service"
//包含n个action creator函数的模块   同步action：对象{type：‘xxx’，data:"数据值"}  异步action：函数 dispatch=>{}
// 设置同步标题的同步action
import { SET_HEAD_TITLE, INCREMENT, DECREMENT, SAVETOKEN, SAVENAVLIST } from './action-types'
export const setHeadTitle = (headTitle) => ({ type: SET_HEAD_TITLE, data: headTitle })
export const increment = (num) => ({ type: INCREMENT, data: num })
export const saveToken = (token) => ({ type: SAVETOKEN, data: token })
export const decrement = (num) => ({ type: DECREMENT, data: num })
const saveNavList = (num) => ({ type: SAVENAVLIST, data: num })
// const dealplatform = (num) => ({ type: DEALPLATFORM, data: num })
    // 异步增加的actions
export const incrementAsync = (num) => {
    return dispath => {
        // 执行定时器Ajax请求，promise
        setTimeout(() => {
            // 当前异步任务执行完成时，分发一个同步action
            dispath(increment(num))
        }, 1000)
    }
}
export const saveAsyncRouteData = ()=>{
    return async dispatch=>{
        let res = await other.getMenuTreeByUser();
        console.log(res)
        if (!res||!Array.isArray(res)) return
        let RouterPath = []
        let navList = getTreeData(res, RouterPath)
        console.log(navList)
        // saveNavList(navList)
        dispatch(saveNavList(navList))
        dispatch(saveToken(sessionStorage.token))
        // dispatch('saveToken', sessionStorage.token)
    }
}
function getTreeData (data, RouterPath) {
    // 循环遍历数据
    let arr = data.map(item => {
      let obj = {
        key: item.id,
        title: item.permissionName,
        icon: item.icon,
        path: item.href
      };
      RouterPath.push(item.href)
      if (item.children) {
        if (item.children[0].type !== 2) {
          obj.children = getTreeData(item.children, RouterPath)
        }
      }
      return obj
    })
    sessionStorage.RouterPath = JSON.stringify(RouterPath)
    return arr
  }
// export const dealplatformd = ()=>{
//     return async(dispatch)=>{
//         let res = await Api.getPlatformList1();
//         let res1 = res.map((item) => {
//             let obj = { label: item.value, value: item.key + "&" + item.value };
//             if (item.shopList.length > 0) {
//                 obj.children = item.shopList.map((val) => {
//                     let obj2 = { label: val.value, value: val.key + "&" + val.value };
//                     return obj2;
//                 });
//             }
//             return obj;
//         });
//                 dispatch(dealplatform(res1));
//     }
// }
