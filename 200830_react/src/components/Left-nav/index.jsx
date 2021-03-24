import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";
import {connect} from 'react-redux'
import {setHeadTitle, saveAsyncRouteData} from '../../redux/actions'
import "./index.less";
// import menuList from "../../config/menuConfig";
const { SubMenu } = Menu;
/*
左侧导航的组件
*/

class LeftNav extends Component {
  state = {
    openKeys: [],
    MenuNodes: []
  }
  // 根据menu的数据数组生成对应的标签数组 使用map（）+递归调用
  // getMenuNodes=(menuList)=>{
  //  return menuList.map(item=>{
  //    if(!item.subs){
  //      return (
  //       <Menu.Item key={item.id}>
  //       <Link to={'/'+item.index}>
  //         <Icon type={item.icon} />
  //      <span>{item.title}</span>
  //         </Link>
  //       </Menu.Item>
  //      )
  //    }else{
  //     return (
  //       <SubMenu
  //       key={item.id}
  //           title={
  //             <span>
  //               <Icon 
  
  
  // type={item.icon} />
  //               <span>{item.title}</span>
  //             </span>
  //           }
  //         >
  //          {
  //           this.getMenuNodes(item.subs)
  //         }
  //         </SubMenu>
  //     )
  //    }
  //  })
  // }
  // reduce
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname;
    return menuList.reduce((pre, item) => {
      // 向pre中添加项
      if (!item.children) {
        if(item.path===path){
          this.props.setHeadTitle(item.title)
        }
        pre.push(
          <Menu.Item key={item.path}>
            <Link to={item.path} onClick={()=>this.props.setHeadTitle(item.title)}>
              <Icon type="mail" />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        console.log(path, item.path)
        // 查找一个与当前请求路径匹配的子item
        // const cItem = item.children.find(cItem =>cItem.path === path)
        // if (cItem) {
        //   // 如果存在
        //   this.openKey = item.path;
        //   console.log(this.openKey, item.path)
        // }
        pre.push(
          <SubMenu
            key={item.path}
            title={
              <span>
                <Icon type="mail" />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
      return pre;
    }, []);
  };
  onOpenChange = (openKeys) => {
    let keysLen = openKeys.length
    if (keysLen > 1) {
      var trueOpen = openKeys.filter((item) => {
        // 最后一个是当前展开的，把当前展开以及父导航设置为openkeys
        return openKeys[keysLen - 1].includes(item)
      })
      this.setState({ openKeys: trueOpen })
    } else {
      this.setState({ openKeys: openKeys })
    }
  }
  UNSAFE_componentWillMount() {
    if (!this.props.token) {
      this.props.saveAsyncRouteData().then(() => {
        console.log(222,this.props.navlist)
        // this.MenuNodes = this.getMenuNodes(this.props.navlist);
        this.setState({
          MenuNodes: this.getMenuNodes(this.props.navlist)
        })
      })
    }
  }
  componentDidMount() {
    console.log('菜单333', this.props.navlist)
    this.setState({
      MenuNodes: this.getMenuNodes(this.props.navlist)
    })
    // this.MenuNodes = this.getMenuNodes(this.props.navlist);
  }
  render() {
    // 得到请求的当前路由路径
    const path = this.props.location.pathname;
    // 得到需要打开菜单项的key
    const openKeys = this.state.openKeys;
    let MenuNodes = this.state.MenuNodes

    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
    <h1>{this.props.collapsed?'SRM':'SRM供应商系统'}</h1>
        </Link>
        <Menu mode="inline" theme="dark" selectedKeys={[path]} onOpenChange = {this.onOpenChange} openKeys={openKeys}>
          {MenuNodes}
        </Menu>
      </div>
    );
  }
}
// withRouter 高阶组件包裹非路由组件返回一个新的组件向非路由组件传递history location match三个属性
export default connect(
  state=>({navlist: state.navlist}),{setHeadTitle, saveAsyncRouteData}
)(withRouter(LeftNav))
