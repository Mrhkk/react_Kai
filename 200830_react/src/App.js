import React, {Component} from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import Notice from './pages/notice/notice'

export default class App extends Component {

  render(){
    return (
    <BrowserRouter>
    <Switch>
     <Route path='/login' component={Login}></Route>
     <Route path='/notice' component={Notice}></Route>
     <Route path='/'  component={Admin}></Route>
     </Switch>
    </BrowserRouter>
    )
  }
}