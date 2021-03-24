import React, { Component } from "react";
import { Input, Button, DatePicker, Select, Table, Pagination } from "antd";
import order from "../order.serve";
import "./goodnotes.less";
const { RangePicker } = DatePicker;
const { Option } = Select;
export default class Goodnotes extends Component {
  state = {
    // 搜索条件
    params: {
      orderCode: "",
      appointOrderId: "",
      supplierInfo: "",
      materialInfo: "",
      start_time: "",
      end_time: "",
      ecc_status: undefined,
      orderId: "",
    },
    pageNum: 1,
    pageSize: 15,
    tableData: [],
    total: 0,
    moment: [],
    columns: [
      {
        title: "单据编号",
        width: '150px',
        key: "serialNumber",
        dataIndex: "serialNumber",
        ellipsis: true
      },
      {
        title: "EAS收货编号",
        dataIndex: "purReceivalBillNumber",
        width: 190,
        key: "purReceivalBillNumber",
        ellipsis: true
      },
      {
        title: "仓库预约单号",
        dataIndex: "appointOrderId",
        width: '190px',
        key: "appointOrderId",
        ellipsis: true
      },
      {
        title: "通知日期",
        dataIndex: "noticeDate",
        width: 136,
        key: "noticeDate",
        ellipsis: true
      },
      {
        title: "供应商名称",
        dataIndex: "supplierName",
        width: 100,
        key: "supplierName",
        ellipsis: true
      },
      {
        title: "采购组织",
        dataIndex: "purchaseOrgTxt",
        width: 180,
        key: "purchaseOrgTxt",
        ellipsis: true
      },
      {
        title: "确认状态",
        dataIndex: "serialStatusStr",
        width: 120,
        key: "serialStatusStr",
        ellipsis: true
      },
      {
        title: "仓库",
        dataIndex: "warehouse",
        width: 90,
        key: "warehouse",
        ellipsis: true
      },
      {
        title: "采购单号",
        dataIndex: "orderId",
        width: 200,
        key: "orderId",
        ellipsis: true
      },
      {
        title: "物料编码",
        dataIndex: "materialCode",
        width: 120,
        key: "materialCode",
        ellipsis: true
      },
      {
        title: "物料名称",
        dataIndex: "materialName",
        width: 300,
        key: "materialName",
        ellipsis: true
      },
      {
        title: "规格型号",
        dataIndex: "materialSpecifications",
        width: 90,
        key: "materialSpecifications",
        ellipsis: true
      },
      {
        title: "数量",
        dataIndex: "orderNum",
        width: 120,
        key: "orderNum",
        ellipsis: true
      },
      {
        title: "基本计量单位",
        dataIndex: "unit",
        width: 120,
        key: "unit",
        ellipsis: true
      },
      {
        title: "制单人",
        dataIndex: "unit",
        width: 110,
        key: "creatorName",
        ellipsis: true
      }
    //   { title: '申请时间', dataIndex: 'createTime',key:"createTime",
    //   onCell: () => {
    //     return {
    //       style: {
    //         maxWidth: 150,
    //         overflow: 'hidden',
    //         whiteSpace: 'nowrap',
    //         textOverflow:'ellipsis',
    //       }
    //     }
    //   },
    //   render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    // }
    ]
  };
  searchFun = async (pageNum) => {
    let pageSize,
      paramsA = this.state.params;
    let params = {
      pageNum,
      pageSize,
    };
    let res = await order.getOrderDeliveryNoticePage(
      Object.assign(params, paramsA)
    );

    if (!res) {
      return;
    }
    let tableData = res.records.map((item) => {
      item.serialStatusStr =
        item.serialStatus === 1
          ? "已确认"
          : item.serialStatus === 0
          ? "待确认"
          : item.serialStatus === 2
          ? "已作废"
          : "";
      return item;
    });
    this.setState({
      tableData,
      total: res.total,
    });
  };
  resetFun = () => {
    let paramsA = {
      orderCode: "",
      appointOrderId: "",
      supplierInfo: "",
      materialInfo: "",
      start_time: "",
      end_time: "",
      ecc_status: undefined,
      orderId: "",
    };
    this.setState(
      {
        params: paramsA,
        moment: [],
      },
      () => {
        this.searchFun(1);
      }
    );
  };
  render() {
    let { params, moment, tableData, total, pageSize, pageNum, columns } = this.state;
    return (
      <div className="goodNote">
        <div className="topBox">
          <div className="queryItem">
            <div className="queryItemIpt">
              <Input
                placeholder="请输入单据编号"
                value={params.orderCode}
                onChange={(event) => {
                  let paramsA = params;
                  paramsA.orderCode = event.target.value;
                  this.setState({ params: paramsA });
                }}
              />
            </div>
          </div>
          <div className="queryItem">
            <div className="queryItemIpt">
              <Input
                placeholder="请输入仓库预约单号"
                value={params.appointOrderId}
                onChange={(event) => {
                  let paramsA = params;
                  paramsA.appointOrderId = event.target.value;
                  this.setState({ params: paramsA });
                }}
              />
            </div>
          </div>
          <div className="queryItem">
            <div className="queryItemIpt">
              <RangePicker
                value={moment}
                onChange={(moment) => {
                  let paramsA = params;
                  paramsA.start_time = moment[0];
                  paramsA.end_time = moment[1];
                  this.setState({ params: paramsA, moment });
                }}
                placeholder={["通知开始时间", "通知结束时间"]}
                format={["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm:ss"]}
              />
            </div>
          </div>
          <div className="queryItem">
            <div className="queryItemIpt">
              <Select
                style={{ width: 150 }}
                allowClear
                value={params.ecc_status}
                onChange={(value) => {
                  let paramsA = params;
                  paramsA.ecc_status = value;
                  this.setState({ params: paramsA });
                }}
                placeholder="请选择排序"
              >
                <Option value={0}>待确认</Option>
                <Option value={1}>已确认</Option>
                <Option value={2}>已作废</Option>
              </Select>
            </div>
          </div>
          <div className="queryItem">
            <div className="queryItemIpt">
              <Input
                placeholder="请输入供应商名称或编码"
                value={params.supplierInfo}
                onChange={(event) => {
                  let paramsA = params;
                  paramsA.supplierInfo = event.target.value;
                  this.setState({ params: paramsA });
                }}
              />
            </div>
          </div>
          <div className="queryItem">
            <div className="queryItemIpt">
              <Input
                placeholder="请输入物料名称或编码"
                value={params.materialInfo}
                onChange={(event) => {
                  let paramsA = params;
                  paramsA.materialInfo = event.target.value;
                  this.setState({ params: paramsA });
                }}
              />
            </div>
          </div>
          <div className="queryItem">
            <div className="queryItemIpt">
              <Input
                placeholder="请输入采购单号"
                value={params.orderId}
                onChange={(event) => {
                  let paramsA = params;
                  paramsA.orderId = event.target.value;
                  this.setState({ params: paramsA });
                }}
              />
            </div>
          </div>
          <div className="queryBtn">
            <Button
              type="primary"
              style={{ marginRight: "10px" }}
              onClick={() => {
                this.searchFun(1);
              }}
            >
              查询
            </Button>
            <Button
              type="dashed"
              onClick={() => {
                this.resetFun();
              }}
            >
              重置
            </Button>
          </div>
        </div>
        <div className="tableBody">
          <Table
            dataSource={tableData}
            scroll={{ x: true, y: true }}
            columns={columns}
            bordered
            // rowKey="index + id"
            pagination={false}
            // loading={loading}
          />
          <Pagination
            style={{ marginTop: "20px", textAlign: "center" }}
            showQuickJumper
            hideOnSinglePage={false}
            defaultCurrent={pageNum}
            current={pageNum}
            total={total}
            pageSize={pageSize}
            onChange={() => {this.pageNumEvent()}}
            showTotal={(e) => {
              return "共 " + e + " 条";
            }}
          />
        </div>
      </div>
    );
  }
}
