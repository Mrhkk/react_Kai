import React, { Component } from "react";
import DashboardService from "./dashboard.service";
import {Table, Icon, Card, Tooltip } from "antd";
import "./home.less";
/*
左侧导航的组件
*/

export default class Home extends Component {
  state = {
    orderAppointStatistics: {},
    orderPurchaseStatistics: {},
    orderDeliveryStatistics: {},
    isAdmin: [],
    tableData: [],
    noticeShowList: [],
    loading: false,
    noticeType: 1,
    columns: [
      {
        title: "申请人",
        width: 200,
        key: "applier",
        dataIndex: "applier",
        ellipsis: true
      },
      {
        title: "事项",
        dataIndex: "item",
        width: 100,
        key: "item"
      },
      { title: '申请时间', dataIndex: 'createTime',key:"createTime",
      onCell: () => {
        return {
          style: {
            maxWidth: 150,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow:'ellipsis',
          }
        }
      },
      render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    }, 
      // {
      //   title: "申请时间",
      //   width: 150,
      //   dataIndex: "createTime",
      //   key: "createTime",
      // },
      {
        title: "状态",
        width: 100,
        dataIndex: "statusStr",
        key: "statusStr",
      }
    ]
  };
  jumpPage = (name, params) => {
    console.log(name, params);
    let arr = this.state.isAdmin;
    if (!arr.includes(name)) {
      this.$message.warning("无权限访问！");
      return;
    }
    this.props.history.push({ pathname: name, state: { params } });
  };
  getCardShowData = async () => {
    let res = await DashboardService.getCardShowData();
    if (!res) {
      return;
    }
    this.setState({
      orderPurchaseStatistics: res.orderPurchaseStatistics || {},
      orderAppointStatistics: res.orderAppointStatistics || {},
      orderDeliveryStatistics: res.orderDeliveryStatistics || {},
    });
  };
  getAppointRecord = async() => {
    this.setState({
      loading: true
    })
    let res = await DashboardService.getAppointRecord()
    if (!res) {
      return
    }
    this.setState({
      tableData: res,
      loading: false
    })
  };
  handleChangeType=(num)=>{
    this.setState({
      noticeType: num
    }, () => {
      this.getTenNotice(num)
    })
  }
  getTenNotice = async() => {
    let res = await DashboardService.getTenNotice({ type: this.state.noticeType, source: 1 })
    if (!res) {
      return
    }
    this.setState({
      noticeShowList: res
    })
  }
  handleView = (id) => {
    window.open(window.location.origin + '/notice?' + id, "_blank")
  }
  UNSAFE_componentWillMount() {
    this.setState({
      isAdmin: JSON.parse(sessionStorage.RouterPath),
    });
  }
  componentDidMount() {
    this.getCardShowData();
    this.getAppointRecord()
    this.getTenNotice()
  }
  render() {
    let {
      orderAppointStatistics,
      orderPurchaseStatistics,
      orderDeliveryStatistics,
      columns,
      isAdmin,
      noticeType,
      tableData,
      loading,
      noticeShowList
    } = this.state;
    console.log(noticeType)
    const extra = (
      <div>
        <div className="cardChange flex">
              <p className={[this.state.noticeType === 1 ? 'active' : '', 'cardHead_btn'].join(' ')} onClick={() => {this.handleChangeType(1)}}>系统公告</p>
              <p className={[this.state.noticeType === 2 ? 'active' : '', 'cardHead_btn'].join(' ')} onClick={() => {this.handleChangeType(2)}}>其他通知</p>
         </div>
      </div>
    );
    let IconFont = Icon.createFromIconfontCN({
      scriptUrl: "//at.alicdn.com/t/font_2288657_nov4gaj87t.js",
    });
    console.log(isAdmin, isAdmin.includes("/orderSynergy/purOrderEntry"))
    return (
      <div className="home">
        <div className="top">
          <ul>
            <li>
              <div
                className="box"
                style={
                  isAdmin.includes("/orderSynergy/purOrderEntry")
                    ? { backgroundColor: " rgb(46, 199, 201)" }
                    : { backgroundColor: "#ff0000" }
                }
              >
                <div className="text">
                  <IconFont
                    style={{ fontStyle: "48px" }}
                    type="icon-quanxian"
                  />
                </div>
              </div>
              <div className="title">
                <span>采购订单</span>
              </div>
              <div className="number">
                <div
                  className="number-item"
                  onClick={() => {
                    this.jumpPage("/orderSynergy/purOrderEntry", {
                      status: "0",
                    });
                  }}
                >
                  <p className="num">
                    {orderPurchaseStatistics.status0
                      ? orderPurchaseStatistics.status0
                      : 0}
                  </p>
                  <p className="status">待确认</p>
                </div>
                <div
                  className="number-item"
                  onClick={() => {
                    this.jumpPage("/orderSynergy/purOrderEntry", {
                      status: "1",
                    });
                  }}
                >
                  <p className="num">
                    {orderPurchaseStatistics.status1
                      ? orderPurchaseStatistics.status1
                      : 0}
                  </p>
                  <p className="status">已确认</p>
                </div>
              </div>
              <p className="item-tip">采</p>
            </li>
            <li>
              <div
                className="box"
                style={{
                  backgroundColor: isAdmin.includes(
                    "/orderSynergy/stockAppoint"
                  )
                    ? " rgb(46, 199, 201)"
                    : "#ff0000",
                }}
              >
                <div className="text">
                  <IconFont type="icon-quanxian" />
                </div>
              </div>
              <p className="item-tip">约</p>
              <div className="title">
                <span>仓库预约单</span>
              </div>
              <div className="number">
                <div
                  className="number-item"
                  onClick={() => {
                    this.jumpPage("/orderSynergy/stockAppoint", { status: 0 });
                  }}
                >
                  <p className="num">
                    {orderAppointStatistics.status0
                      ? orderAppointStatistics.status0
                      : 0}
                  </p>
                  <p className="status">已保存</p>
                </div>
                <div
                  className="number-item"
                  onClick={() => {
                    this.jumpPage("/orderSynergy/stockAppoint", { status: 1 });
                  }}
                >
                  <p className="num">
                    {orderAppointStatistics.status1
                      ? orderAppointStatistics.status1
                      : 0}
                  </p>
                  <p className="status">审批中</p>
                </div>
                <div
                  className="number-item"
                  onClick={() => {
                    this.jumpPage("/orderSynergy/stockAppoint", { status: 2 });
                  }}
                >
                  <p className="num">
                    {orderAppointStatistics.status2
                      ? orderAppointStatistics.status2
                      : 0}
                  </p>
                  <p className="status">已通过</p>
                </div>
                <div
                  className="number-item"
                  onClick={() => {
                    this.jumpPage("/orderSynergy/stockAppoint", { status: 3 });
                  }}
                >
                  <p className="num">
                    {orderAppointStatistics.status3
                      ? orderAppointStatistics.status3
                      : 0}
                  </p>
                  <p className="status">已拒绝</p>
                </div>
              </div>
            </li>
            <li>
              <div
                className="box"
                style={{
                  backgroundColor: isAdmin.includes("/orderSynergy/goodsNotice")
                    ? " rgb(46, 199, 201)"
                    : "#ff0000",
                }}
              >
                <div className="text">
                  <IconFont type="icon-quanxian" />
                </div>
              </div>
              <p className="item-tip">送</p>
              <div className="title">
                <span>送货通知单</span>
              </div>
              <div className="number">
                <div
                  className="number-item"
                  onClick={() => {
                    this.jumpPage("/orderSynergy/goodsNotice", { status: 0 });
                  }}
                >
                  <p className="num">
                    {orderDeliveryStatistics.status0 || "0"}
                  </p>
                  <p className="status">待确认</p>
                </div>
                <div
                  className="number-item"
                  onClick={() => {
                    this.jumpPage("/orderSynergy/goodsNotice", { status: 1 });
                  }}
                >
                  <p className="num">
                    {orderDeliveryStatistics.status1 || "0"}
                  </p>
                  <p className="status">已确认</p>
                </div>
              </div>
            </li>
            <li>
              <p className="item-tip">入</p>
              <div className="title">
                <span>采购入库单</span>
              </div>
              <div className="number">
                <div className="number-item">
                  <p className="num">0</p>
                  <p className="status">未确认</p>
                </div>
                <div className="number-item">
                  <p className="num">0</p>
                  <p className="status">未确认</p>
                </div>
                <div className="number-item">
                  <p className="num">0</p>
                  <p className="status">未确认</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="bottom">
          <div className="left leftBox" style={{ width: "48%" }}>
          <Table
            // style={{ whiteSpace: 'nowrap',textOverflow: 'ellipsis',overflow: 'hidden', wordWrap: 'break-word', wordBreak: 'break-all' }}
            scroll={{ y: 560 }}
            dataSource={tableData}
            columns={columns}
            bordered
            rowKey="id"
            pagination={false}
            loading={loading}
          />
          </div>
          <div className="right">
            <Card title={'通知公告'} extra={extra} className="box-card el-table">
          <ul className="noticeCon">
          {noticeShowList.map((item,index)=>{
                return(
                    <li className="text" key={item.id}>
                    <Icon type="sound" style={{marginRight: '10px'}}/>
                    <p className="flex justify-between">
                      <span className="noticeName" type="primary" onClick={() => {this.handleView(item.id)}}>{item.title}</span>
                      <span>
                        { item.publishDate }
                      </span>
                    </p>
                  </li> 
                )
            })}
          </ul>
        </Card>
          </div>
        </div>
      </div>
    );
  }
}
