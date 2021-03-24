// import storageUt from "../utils/storageUt"
import { SET_HEAD_TITLE, INCREMENT, DECREMENT,DEALPLATFORM, SAVETOKEN, SAVENAVLIST } from './action-types'

// 用来根据老的或者现有的state和指定的action生成并返回新的state函数
import { combineReducers } from 'redux'
const initHeadTitle = '控制台'

function headTitle(state = initHeadTitle, action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}
// 用来管理当前用户的
// const initUser = storageUt.getUser()

// function user(state = initUser, action) {
//     switch (action.type) {
//         default: return state
//     }
// }

function count(state = 1, action) {
    switch (action.type) {
        case INCREMENT:
            return state += action.data
        case DECREMENT:
            return state -= action.data
        default:
            return state
    }
}
function token(state = '', action) {
    switch (action.type) {
        case SAVETOKEN:
            return state = action.data
        default:
            return state
    }
}
function paltform2(state = [], action) {
    switch (action.type) {
        case DEALPLATFORM:
            return action.data;
        default:
            return state
    }
}
function navlist(state = [], action) {
    switch (action.type) {
        case SAVENAVLIST:
            return action.data;
        default:
            return state
    }
}
// 向外默认暴露的是合并产生的总的reducer函数管理的总的state的结构{headTitle,user}
export default combineReducers({
    headTitle,
    // user,
    count,
    paltform2,
    navlist,
    token
})
