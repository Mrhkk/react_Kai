import apiAxios from '../plugins/axios';
import { handlePromise } from '../utils/utils';
class OrderService {
  // 存储请求数组
  userInfo = {}
  dialogTableData = []
  /**
   *-------------------------------采购订单-----------------------------
   */
  // 获取采购显示列表
  getOrderPurchasePage = async ({
    endTime,
    orderCode,
    materialInfo,
    supplierInfo,
    pageNum,
    pageSize,
    startTime,
    status
  }) => {
    let obj = {
      orderId: orderCode,
      confirmStatus: status,
      orderDateStart: startTime,
      orderDateEnd: endTime,
      materialInfo,
      supplierInfo,
      pageSize,
      pageNum
    }
    let res = await apiAxios.post(
      '/manage/orderPurchase/getOrderPurchasePage',
      obj,
      'String'
    )

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 确认
  getOrderPurchaseItemPage = async obj => {
    let res = await apiAxios.post(
      '/manage/orderPurchase/getOrderPurchaseItemPage',
      obj,
      'String'
    )

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 反确认
  reverseConfirmDelivery = async obj => {
    let res = await apiAxios.post(
      '/manage/orderPurchase/reverseConfirmDelivery',
      obj,
      'String'
    )

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 删除
  deleteOrderPurchase = async obj => {
    let res = await apiAxios.post(
      '/manage/orderPurchase/deleteOrderPurchase',
      obj,
      'String'
    )

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 确认明细
  confirmDelivery = async obj => {
    let res = await apiAxios.post(
      '/manage/orderPurchase/confirmDelivery',
      obj
    )

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 更新交货日期
  updateOrderPurchaseItem = async obj => {
    let res = await apiAxios.post(
      '/manage/orderPurchase/updateOrderPurchaseItem',
      obj,
      'String'
    )

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 获取下游数据列表
  viewPurOrderEntryList = async (obj) => {
    let res = await apiAxios.post('/manage/orderPurchase/getOrderPurchaseList', obj, 'form')

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // ----------------------------------------送货通知单---------------------------------------------------
  // 获取送货通知单
  viewGoodsNotice = async (obj) => {
    let res = await apiAxios.post('/manage/orderDeliveryNotice/getOrderDeliveryNoticeList', obj, 'form')

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 获取送货通知单搜索列表
  getOrderDeliveryNoticePage = async ({
    end_time,
    orderCode,
    materialInfo,
    appointOrderId,
    supplierInfo,
    pageNum,
    pageSize,
    start_time,
    ecc_status,
    orderId
  }) => {
    let obj = {
      serialNumber: orderCode,
      serialStatus: ecc_status,
      noticeDateStart: start_time,
      noticeDateEnd: end_time,
      orderId: orderId,
      materialInfo,
      supplierInfo,
      appointOrderId,
      pageSize,
      pageNum
    }
    let res = await apiAxios.post(
      '/manage/orderDeliveryNotice/getOrderDeliveryNoticePage',
      obj,
      'String'
    )

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 获取送货通知单明细列表
  getOrderDeliveryNoticeItemPage = async obj => {
    let res = await apiAxios.post(
      '/manage/orderDeliveryNotice/getOrderDeliveryNoticeItemPage',
      obj,
      'String'
    )

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 更新数量
  updateOrderDeliveryNoticeItem = async obj => {
    let res = await apiAxios.post(
      '/manage/orderDeliveryNotice/updateOrderDeliveryNoticeItem',
      obj,
      'String'
    )

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 确认弹框
  updateOrderDeliveryNotice = async obj => {
    let res = await apiAxios.post(
      '/manage/orderDeliveryNotice/confirmDeliveryOrderNum',
      obj
    )

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 反确认
  reverseConfirmDeliveryOrderNum = async obj => {
    let res = await apiAxios.post(
      '/manage/orderDeliveryNotice/reverseConfirmDeliveryOrderNum',
      obj,
      'String'
    )

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // ----------------------------------------仓储预约单---------------------------------------------------
  // 仓库预约单
  viewStockAppoint = async (obj) => {
    let res = await apiAxios.post('/manage/orderAppoint/getOrderAppointList', obj, 'form')

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 初始化
  Initialize = async obj => {
    let res = await apiAxios.post(
      '/manage/orderAppoint/initOrderAppoint',
       obj,
      'String'
    )
    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 采购跟单
  getHrocpList = async () => {
    let res = await apiAxios.post(
      '/manage/orderAppoint/getHrocpList',
      {},
      'String'
    )

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 仓储预约单明细列表
  getOrderAppointDetail = async obj => {
    let res = await apiAxios.post(
      '/manage/orderAppoint/getOrderAppointDetail',
      obj,
      'String'
    )

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 更新物流信息
  updateOrderAppoint = async obj => {
    let res = await apiAxios.post(
      '/manage/orderAppoint/updateOrderAppoint',
      obj,
      'String'
    )

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 获取仓储预约单搜索列表
  getOrderAppointPage = async ({
    end_time,
    pageNum,
    pageSize,
    start_time,
    ecc_status,
    materialInfo,
    supplierInfo,
    orderId
  }) => {
    let obj = {
      status: ecc_status,
      applyDateStart: start_time,
      applyDateEnd: end_time,
      materialInfo,
      supplierInfo,
      pageSize,
      orderId,
      pageNum
    }
    let res = await apiAxios.post(
      '/manage/orderAppoint/getOrderAppointPage',
      obj,
      'String'
    )

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 获取仓储预约单建单
  addOrderAppoint = async ({
    status,
    deliveryWarehouse,
    deliveryAddress,
    appointArriveDate,
    carNumber,
    carModel,
    driverPhone,
    remark,
    item,
    totalAmount,
    deliveryAmount,
    deliveryNum,
    deliveryBox,
    isTransport,
    pickupDate,
    pickupAddr,
    pickupContact,
    pickupContactPhone,
    supplierName,
    supplierCode,
    merchandiserId,
    merchandiser,
    merchandiserLogname,
    id
  }) => {
    let obj
    if (isTransport === 1) {
      appointArriveDate = appointArriveDate + ' 00:00:00'
      obj = {
        status,
        deliveryWarehouse: deliveryWarehouse,
        deliveryAddress: deliveryAddress,
        appointArriveDate: appointArriveDate,
        carNumber: carNumber,
        carModel: carModel,
        driverPhone: driverPhone,
        remark,
        item,
        totalAmount,
        deliveryAmount,
        deliveryNum,
        deliveryBox,
        isTransport,
        supplierName,
        supplierCode,
        merchandiserId,
        merchandiser,
        merchandiserLogname
      }
    } else {
      pickupDate = pickupDate + ' 00:00:00'
      obj = {
        status,
        deliveryWarehouse,
        deliveryAddress: deliveryAddress,
        appointArriveDate,
        remark,
        item,
        totalAmount,
        deliveryAmount,
        deliveryNum,
        deliveryBox,
        isTransport,
        pickupDate: pickupDate,
        pickupAddr,
        pickupContact,
        pickupContactPhone,
        supplierName,
        supplierCode,
        merchandiserId,
        merchandiser,
        merchandiserLogname
      }
    }
    if (id) {
      obj.id = id
    }
    let res = await apiAxios.post('/manage/orderAppoint/addOrderAppoint', obj)

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 获取仓储预约单建单保存
  saveOrderAppoint = async ({
    status,
    deliveryWarehouse,
    deliveryAddress,
    appointArriveDate,
    carNumber,
    carModel,
    driverPhone,
    remark,
    item,
    totalAmount,
    deliveryAmount,
    deliveryNum,
    deliveryBox,
    isTransport,
    pickupDate,
    pickupAddr,
    pickupContact,
    pickupContactPhone,
    supplierName,
    supplierCode,
    merchandiserId,
    merchandiser,
    merchandiserLogname,
    id
  }) => {
    let obj
    if (isTransport === 1) {
      if (appointArriveDate) {
        appointArriveDate = appointArriveDate + ' 00:00:00'
      }
      obj = {
        id,
        status,
        deliveryWarehouse: deliveryWarehouse,
        deliveryAddress: deliveryAddress,
        appointArriveDate: appointArriveDate,
        carNumber: carNumber,
        carModel: carModel,
        driverPhone: driverPhone,
        remark,
        item,
        totalAmount,
        deliveryAmount,
        deliveryNum,
        deliveryBox,
        isTransport,
        supplierName,
        supplierCode,
        merchandiserId,
        merchandiser,
        merchandiserLogname
      }
    } else {
      if (pickupDate) {
        pickupDate = pickupDate + ' 00:00:00'
      }
      obj = {
        id,
        status,
        deliveryWarehouse,
        deliveryAddress: deliveryAddress,
        appointArriveDate,
        remark,
        item,
        totalAmount,
        deliveryAmount,
        deliveryNum,
        deliveryBox,
        isTransport,
        pickupDate: pickupDate,
        pickupAddr,
        pickupContact,
        pickupContactPhone,
        supplierName,
        supplierCode,
        merchandiserId,
        merchandiser,
        merchandiserLogname
      }
    }
    let res = await apiAxios.post('/manage/orderAppoint/saveOrderAppoint', obj)

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 生成通知单
  addOrderDeliveryNotice = async obj => {
    let res = await apiAxios.post(
      '/manage/orderAppoint/addOrderDeliveryNotice',
      obj,
      'String'
    )

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 移除仓库预约单
  delOrderAppoint = async obj => {
    let res = await apiAxios.post(
      '/manage/orderAppoint/delOrderAppoint',
      obj,
      'String'
    )

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 获取采购显示列表
  selectOrderPurchaseItemPage = async ({
    orderCode,
    pageNum,
    pageSize,
    orderId,
    materialName,
    supplierCode
  }) => {
    let obj = {
      materialCode: orderCode,
      pageSize,
      pageNum,
      orderId,
      materialName,
      supplierCode
    }
    let res = await apiAxios.post(
      '/manage/orderAppoint/selectOrderPurchaseItemPage',
      obj,
      'String'
    )

    if (!res) {
      return
    }
    return handlePromise(res)
  }
  // 异步定时调取
  selectStatus = async obj => {
    let res = await apiAxios.post(
      '/manage/orderAppoint/selectStatus',
      obj,
      'String'
    )

    if (!res) {
      return
    }
    return res
  }
}
const orderService = new OrderService()
export default orderService
