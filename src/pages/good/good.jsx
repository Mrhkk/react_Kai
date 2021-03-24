import React, { Component } from "react";
import {connect} from 'react-redux'
import {increment,decrement,incrementAsync} from '../../redux/actions'
import { Button } from "antd";
class Good extends Component {
    add=()=>{
        this.props.increment(3)
    }
    decr=(r)=>{
        this.props.decrement(r)
    }
    asyncAdd=(r)=>{
     this.props.incrementAsync(r)
    }
    render() {
        console.log(this.props.location.state)
        return (
            <div>
                <h1>{this.props.count}</h1>
               <Button type="primary" onClick={this.add.bind(this)}>点击加3</Button>
               <Button type="primary" onClick={this.decr.bind(this,2)}>点击减2</Button>
               <Button type="primary" onClick={this.asyncAdd.bind(this,1)}>点击加1延迟</Button>
               <br></br>
               <h1>1111</h1>
                </div>
        );
    }
}
export default connect(
    state=>({count:state.count}),{increment,decrement,incrementAsync}
  )(Good)
