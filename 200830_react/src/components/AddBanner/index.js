import React, { Component } from "react";
import {Cascader, InputNumber, Upload, Icon, message, Button, Modal } from "antd";
import  './index.less'
import connect from "react-redux/es/connect/connect";
class AddBanner extends Component {
    state = {
        options: [],
        pageParams: {
            platform: "",
            platformShop: "",
            orderCode: "",
            attachmentId: ""
        },
        loading: false,
        imageUrl:'',
        showDelete:false
    };
    onChange = (v) => {
        let d = Object.assign({}, this.state.pageParams, {
            platform: v[0],
            platformShop: v[1],
        })
        this.setState({
            pageParams: d,
            arrP:[...v]
        });
    };
    changeOrder=(v)=>{
        console.log(v)
        let data = Object.assign({}, this.state.pageParams, { orderCode: v })
        this.setState({
            pageParams:data
        })
    }
    //文件上传处理
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            // return;
        }
        this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl
                }),
            )
    };
    getBase64=(img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

     beforeUpload=(file)=> {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    // 文件上传
     FileUpload=async(file)=> {
        let theFile = file.file || "";
        let formdata = new FormData(); // 创建form对象

        formdata.append("myfile", theFile);
        formdata.append("theType", "carousel");
        let res = await React.$Api.uploadFile(formdata);

        if (!res) {
            return;
        }
         let data = Object.assign({}, this.state.pageParams, { attachmentId: res.id })
         this.setState({
             loading:false,
             pageParams:data
         })
        console.log("上传成功", res);
        message.success("上传成功!");
    }
    // 删除当前图片
    deleteImg=(e)=>{
        //阻止冒泡
        // e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        this.setState({
            imageUrl:'',
            showDelete:false
        })
    }
    // 取消按钮
    canclesub=()=>{
       this.clearData()
    }
    // 确定按钮
    creatActive=async()=>{
        let params = this.state.pageParams;
        if(!this.verifyParams(params))return
        let res = await React.$Api.addBanner(params);
        if(res.code===200){
            this.clearData()
        }
    }
    // 清空弹框数据
    clearData=()=> {
        this.setState({
            pageParams:{
                platform: "",
                platformShop: "",
                orderCode: "",
                attachmentId: ""
            },
            imageUrl: "",
            arrP:[]
        })
    }
    //校验方法
    verifyParams=(params)=> {
        let paramsMap = new Map();

        for (let val in params) {
            paramsMap.set(val, params[val]);
        }
        let theList = {
            platform: "平台",
            platformShop: "店铺",
            orderCode: "排序",
            attachmentId: "上传图片"
        };
        let str = "";

        for (const key in theList) {
            let bool = !paramsMap.get(key);

            if (bool) {
                if (str.length === 0) {
                    str = theList[key];
                } else {
                    str += "," + theList[key];
                }
            }
        }
        if (str.length === 0) {
            return true;
        }
        Modal.warning({
            content: str+'不能为空',
        });
        return false
    }
    componentDidMount(){
//         document.body.addEventListener('click',e=>{
// // 通过e.target判断阻止冒泡
//             if(e.target&&e.target.matches('a')){
//                 return;
//             }
//             console.log('body');
//         })
        let res=this.props.paltform2
        this.setState({
            options:res
        })
    }
    render() {
        const  {options,loading,imageUrl,pageParams,arrP}=this.state
        const uploadButton = (
            <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="AddBanner">
                <div className="row">
                    <span className="left">平台店铺<span className="setRed">*</span></span>
                    <Cascader
                        style={{width:'230px'}}
                        changeOnSelect={true}
                        options={options}
                        onChange={this.onChange.bind(this)}
                        placeholder="请选择平台店铺"
                        value={arrP}
                    />
                </div>
                <div className="row">
                    <span className="left">轮播顺序<span className="setRed">*</span></span>
                    <InputNumber min={1} max={100} defaultValue={''} value={pageParams.orderCode} onChange={this.changeOrder.bind(this)} placeholder={"请输入轮播顺序"}style={{width:'230px'}}/>
                </div>
                <div className="row">
                    <span className="left" style={{verticalAlign:'165px'}}>图片上传:</span>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={this.beforeUpload.bind(this)}
                        onChange={this.handleChange.bind(this)}
                        customRequest={this.FileUpload.bind(this)}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" onMouseEnter={()=>{this.setState({showDelete:true})}} onMouseLeave={()=>{this.setState({showDelete:false})}} style={{ width: '100%' }} /> : uploadButton}
                        {this.state.showDelete?(<span
                            className="deleteIcon"
                            onMouseEnter={()=>{this.setState({showDelete:true})}}
                            onMouseLeave={()=>{this.setState({showDelete:false})}}
                            onClick={(e)=>{this.deleteImg(e)}}
                    >
                        <Icon type="delete" />
                    </span>):null}
                    </Upload>
                </div>
                <div className="flex foot" style={{justifyContent:"flex-end"}}>
                    <Button type="danger" onClick={this.canclesub.bind(this)} style={{width:"60px"}}>取消</Button>
                    <Button type="primary" onClick={this.creatActive.bind(this)} style={{width:"60px",marginLeft:'20px'}}>确定</Button>
              </div>
            </div>
        );
    }
}
export default connect(
    state=>({paltform2:state.paltform2}),{}
)(AddBanner)
