import React, {Component} from 'react';
import { connect } from 'react-redux'
import {saveAsyncRouteData} from '../../redux/actions'
import {Redirect} from 'react-router-dom'
import {Route,Switch} from 'react-router-dom';
import { Layout } from 'antd';

// import memoryUt from "../../utils/memoryUt"
import LeftNav from "../../components/Left-nav"
// import AnimatedSwitch from '../../components/AnimatedSwitch'
import Header from "../../components/Header"
import Banner from "../banner/banner";
import Good from "../good/good";
import Goodnotes from "../goodnotes/goodnotes";
import User from "../user/user";
import Group from "../group/group";
import Home from "../home/home";
// import connect from "react-redux/es/connect/connect";
// import {dealplatformd, decrement, increment, incrementAsync} from "../../redux/actions";
const { Sider ,Content } = Layout;
 class Admin extends Component {
    state={
      collapsed:false
    }
    callback=(collapsed)=>{
      this.setState({
        collapsed:!collapsed
      })
    }
    UNSAFE_componentWillMount () {
        console.log(sessionStorage.token)
        // this.props.dealplatformd()
    }
    componentDidMount(){
        // this.props.dealplatformd()
    }
    render(){
        if(!sessionStorage.token){
         return <Redirect to='/login'></Redirect>
        }
        const {collapsed}=this.state
        return(
            <Layout style={{height:'100%'}}>
            <Sider collapsed={collapsed}><LeftNav collapsed={collapsed}></LeftNav></Sider >
            <Layout>
              <Header collapsed={collapsed} callback={this.callback.bind(this,collapsed)}>Header</Header>
              <Content style={{backgroundColor:'#f8f8f9',padding:'20px 20px 0'}}>
                <Switch>
                  <Route path='/srm' component={Home}/>
                  <Route path='/supplier' component={Banner}/>
                  <Route path='/orderSynergy/purOrderEntry' component={Good}/>
                  <Route path='/orderSynergy/stockAppoint' component={User}/>
                  <Route path='/orderSynergy/goodsNotice' component={Goodnotes}/>
                  <Route path='/group' component={Group}/>
                  <Redirect to='/srm'></Redirect>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        )
    }
}
export default connect(
    state=>({token: state.token}),{saveAsyncRouteData}
)(Admin)
