import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import  "./App.css";
import memoryUt from "./utils/memoryUt";
import storageUt from "./utils/storageUt";
// import Api from "./api/api";
// React.$Api = Api;
React.$Store = store;
const user = storageUt.getUser();
memoryUt.user = user;
ReactDOM.render(
  (<Provider store={store}>
    <App />
  </Provider>),document.getElementById("root")
);
