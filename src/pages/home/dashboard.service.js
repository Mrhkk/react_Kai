import apiAxios from '../../plugins/axios'
import { handlePromise } from '../../utils/utils'

class DashboardService {
  // 存储请求数组
  noticeList = {}
  pushList = []
  // 搜索列表
  // 未读
  getNoticeList = async params => {
    let res = await apiAxios.post('/manage/welcome/noticeall', params, 'String')
    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 已读
  getNoticeList2 = async params => {
    let res = await apiAxios.post(
      '/manage/welcome/noticeallno',
      params,
      'String'
    )
    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 推送
  getPushList = async params => {
    let res = await apiAxios.post(
      '/manage/welcome/noticeallpush',
      params,
      'String'
    )
    if (!res) {
      return
    }
    this.pushList = await handlePromise(res)

    return this.pushList
  }
  readFile = async id => {
    let res = await apiAxios.post(
      '/welcome/addNoticePush',
      { notid: id },
      'String'
    )
    if (!res) {
      return
    }
    return handlePromise(res)
  }
  readPushFile = async id => {
    let res = await apiAxios.post(
      '/welcome/addNoticePushlist',
      { notid: id },
      'String'
    )
    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 获取采购单-预约单 - 通知单统计信息
  getCardShowData = async () => {
    let res = await apiAxios.post(
      '/manage/welcome/getOrderStatistics',
      {},
      'String'
    )
    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 获取预约单申请记录信息
  getAppointRecord = async () => {
    let res = await apiAxios.post(
      '/manage/welcome/getLatestRecord',
      {},
      'String'
    )
    if (!res) {
      return
    }
    return handlePromise(res)
  }
  getTenNotice = async params => {
    let res = await apiAxios.post(
      '/manage/welcome/topTenNotice',
      params,
      'String'
    )
    if (!res) {
      return
    }
    return handlePromise(res)
  }
}
const dashboardService = new DashboardService()
export default dashboardService
