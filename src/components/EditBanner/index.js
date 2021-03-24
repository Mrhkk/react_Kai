import React, { Component } from "react";
export default class EditBanner extends Component {
    state = {
        bannerArr: [],
        loading: false,
        total: 0,
        pageSize: 4,
        pageNumber: 1,
        options: [],
        platform: "",
        platformShop: "",
        orderCode:'',
        visible:false
    };
    render() {
        return (
            <div>编辑轮播</div>
        );
    }
}
