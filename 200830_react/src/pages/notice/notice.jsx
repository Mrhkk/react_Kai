import React, { Component } from "react";
export default class Notice extends Component {
    state = { id: '' }
    componentDidMount () {
        this.setState({
            id: this.props.history.location.search.split('?')[1]
        })
   console.log(this.props.history.location)
    }
    render() { 
        let {id} = this.state
        return (
            <div><span>{id}</span>测试通过</div>
        );
    }
}