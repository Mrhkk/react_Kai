import React, { Component } from "react";
import { Form, Icon, Input, Button, message, Col, Row } from "antd";
import {saveToken, saveAsyncRouteData, incrementAsync} from '../../redux/actions'
import {connect} from 'react-redux'
import apiHost from '../../plugins/constans'
import otherService from './other.service'
import "./login.less";
import logo from "./imgs/head.jpg";
// import Api from "../../api/api"
// import memoryUt from "../../utils/memoryUt"
// import storageUt from "../../utils/storageUt"
const FormItem = Form.Item
class Login extends Component {
  state = {
    vcode: '',
    num: '',
    count: 0
  }
  goReg = () => {
    this.props.incrementAsync(2)
    console.log(this.props.count)
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let { form } = this.props
    form.validateFields(async (err, values) => {
      if (err) {
        message.error(err)
        return
      }
      let { username, password, code } = values

      let res = await otherService.loginIn({ username, password, code, mark: this.state.num })
      if (!res) {
        return
      }
      this.props.saveToken(res['Access-Token'])
      sessionStorage.setItem('token', res['Access-Token'])
      sessionStorage.setItem('userId', res.userInfo.id)

      sessionStorage.setItem('username', res.userInfo.username)
      this.props.saveAsyncRouteData().then(() => {
        console.log(this.props.navlist)
        this.props.history.push({pathname:'/'})
      })
    })
  }
  refreshCode = () => {
    // var num = Math.ceil(Math.random() * 10) // 生成一个随机数（防止缓存）
    // this.vcode = 'http://10.0.1.171:8303/srmApi/base/getCode?' + num
    let count = this.state.count + 1
    let num = (new Date()).getTime() + count.toString()
    this.setState({
      num,
      vcode: apiHost + '/base/getCode?mark=' + num
    })
  }
  findPass= () => {
    console.log(12121)
  }
  UNSAFE_componentWillMount() {
    this.refreshCode();
  }
  render() {
    const {
      getFieldDecorator
    } = this.props.form
    const { vcode } = this.state
    // const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login_header">
          <img src={logo} alt="logo" />
          <h1>SRM后台管理系统</h1>
        </header>
        <div className="login-boxnew">
          <div className="login-input">
            <Form onSubmit={this.handleSubmit} className="login_form">
              <FormItem className="userInfo">
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入您的用户名!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
              </FormItem>
              <FormItem className="password">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入您的密码!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </FormItem>
              <FormItem className="codes">
                {getFieldDecorator('code', {
                  rules: [{ required: true, message: '请输入您的验证码!' }],
                })(
                  <Row gutter={8}>
                    <Col span={16}>
                      <Input
                        placeholder='验证码'
                        size='large' />
                    </Col>
                    <Col span={8} onClick={this.refreshCode}>
                      <img src={vcode} alt="" title="你真好看！！！"/>
                    </Col>
                  </Row>
                )}
              </FormItem>
              <Button type="primary" htmlType="submit" className="loginBtn">登  录</Button>
              <FormItem style={{ marginBottom: 0 }}>
                <div className="loginInfo">
                  <span className="registered" onClick={this.goReg}>立即注册</span>
                  <span className="repeatPass" onClick={this.findPass}>忘记密码？</span>
                </div>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
const WrappeLogin = Form.create()(Login);
export default connect(
  state=>({count:state.count,token:state.token,navlist:state.navlist}),{saveToken, saveAsyncRouteData, incrementAsync}
)(WrappeLogin);
