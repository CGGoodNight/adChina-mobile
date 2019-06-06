import axios from 'axios';
import { actionType } from '../constants/actionType'
import { Toast } from 'antd-mobile';
// import {hashHistory} from "react-router";
import host from "../constants/host";
import {getUserInfoAction} from "./loginActions";
import {onProgressChange} from "./adActions";

const getMyAd = (data) => ({
  type: actionType.myType.GET_MY_ALL_AD,
  data
});

const getMyDemand = (data) => ({
  type: actionType.myType.GET_MY_ALL_Demand,
  data
});

// ----------------- 请求 ----------------------------

// 得到自己的所有的广告
export const getMyAdAction = () => {
  return dispatch => {
    axios.get(host + "/api/adverts", {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      const data = res.data.data;
      dispatch(getMyAd(data));
    }).catch((err) => {
      console.log(err);
    })
  }
};

// 得到自己的所有的需求
export const getMyDemandAction = () => {
  return dispatch => {
    axios.get(host + "/api/demands", {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      const data = res.data.data;
      dispatch(getMyDemand(data));
    }).catch((err) => {
      console.log(err);
    })
  }
};

// 修改个人信息
export const submitMyModifyInfoAction = (name, address, qrcode) => {
  return dispatch => {
    let str = qrcode;
    const addStr = "adchina_qrcode/";
    str = str.split("adchina_qrcode/");
    qrcode = addStr + str[1];
    axios({
      method: "post",
      url: host + "/api/users",
      headers: {
        'Authorization': localStorage.getItem("token")
      },
      data: {
        name,
        address,
        qrcode
      }
    }).then(res => {
      if(res.status === 204) {
        Toast.hide();
        Toast.success("上传成功", 1.2);
        dispatch(getUserInfoAction());
      }
    }).catch(err => {
      console.log(err);
    })
  }
};

// 上传/修改二维码
export const uploadQRCodeAction = (name, address, formData) => {
  return dispatch => {
    axios({
      method: "post",
      url: host + "/api/UploadQrCode",
      headers: {
        'Authorization': localStorage.getItem("token")
      },
      onUploadProgress:function(progressEvent){ //原生获取上传进度的事件
        if(progressEvent.lengthComputable){
          //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
          //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
          dispatch(onProgressChange(progressEvent.loaded/progressEvent.total, false));
          if(progressEvent.loaded/progressEvent.total === 1) {
            dispatch(onProgressChange(0, true));
            Toast.hide();
            Toast.loading("上传图片数据成功，服务器正在处理...", 999, () => {
              Toast.fail("上传失败！", 1.2);
            });
          }
        }
      },
      data: formData
    }).then(res => {
      dispatch(submitMyModifyInfoAction(name, address, res.data.url));
    }).catch(err => {
      console.log(err);
    });
  }
};

// 上传头像
export const uploadAvatarAction = (formData) => {
  return dispatch => {
    axios({
      method: "post",
      url: host + "/api/UploadAvatar",
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': localStorage.getItem("token")
      },
      onUploadProgress:function(progressEvent){ //原生获取上传进度的事件
        if(progressEvent.lengthComputable){
          //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
          //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
          dispatch(onProgressChange(progressEvent.loaded/progressEvent.total, false));
          if(progressEvent.loaded/progressEvent.total === 1) {
            dispatch(onProgressChange(0, true));
            Toast.hide();
            Toast.loading("上传图片数据成功，服务器正在处理...", 999, () => {
              Toast.fail("上传失败！", 1.2);
            });
          }
        }
      },
      data: formData
    }).then(res => {
      Toast.hide();
      Toast.success("上传成功！", 1.2);
      dispatch(getUserInfoAction());
    }).catch(err => {
      Toast.fail("上传失败！", 1.2);
      console.log(err);
    })
  }
};

