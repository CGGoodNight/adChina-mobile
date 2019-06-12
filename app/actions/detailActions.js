import { actionType } from '../constants/actionType'
import axios from 'axios';
import { Toast } from 'antd-mobile';
import {hashHistory} from "react-router";
import host from "../constants/host";
import {onProgressChange} from "./adActions";

const getAdDetail = (data) => ({
  type: actionType.detailType.GET_AD_DETAIL,
  data
});

const getDemandDetail = (data) => ({
  type: actionType.detailType.GET_DEMAND_DETAIL,
  data
});

// 清楚详情数据
export const clearDetailAction = () => ({
  type: actionType.detailType.CLEAR_DETAIL
});

// 传递编辑的内容
export const editorObjectAction = (dataObj, isClear) => ({
  type: actionType.detailType.EDITOR_OBJECT,
  dataObj,
  isClear
})

// ----------------- 请求 ----------------------------

// 根据id获取广告详情
export const getAdDetailAction = (id) => {
  return dispatch => {
    axios({
      method: "get",
      url: host + "/api/adverts/" + id,
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }).then((res) => {
      if(res.status === 200) {
        dispatch(getAdDetail(res.data.data));
      }
    }).catch((err) => {
      Toast.fail("广告位不存在或已被删除", 1.2);
      console.log(err);
    })
  }
};

// 根据id获取到需求详情
export const getDemandDetailAction = (id) => {
  return dispatch => {
    axios({
      method: "get",
      url: host + "/api/demands/" + id,
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }).then((res) => {
      if(res.status === 200) {
        dispatch(getDemandDetail(res.data.data));
      }
    }).catch((err) => {
      Toast.fail("获取数据失败", 1.2);
      console.log(err);
    })
  }
};

// 删除广告
export const deleteAdAction = (id) => {
  return dispatch => {
    axios({
      method: "delete",
      url: host + "/api/adverts/" + id,
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      if (res.status === 204) {
        Toast.success("删除成功！", 1.5);
        hashHistory.push("/my/1");
      }
    }).catch(err => {
      Toast.fail("该广告位有订单交易，不能删除!", 2);
    })
  }
};

// 删除需求
export const deleteDemandAction = (id) => {
  return dispatch => {
    axios({
      method: "delete",
      url: host + "/api/demands/" + id,
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      if (res.status === 204) {
        Toast.success("删除成功！", 1.5);
        hashHistory.push("/my/2");
      }
    }).catch(err => {
      Toast.fail("删除失败！", 1.5);
    })
  }
};

// 上传底图并创建订单
export const uploadAdImageAction = (id,formData) => {
  return dispatch => {
    axios({
      method: "post",
      url: host + "/api/UploadBaseImage",
      headers: {
        "Authorization": localStorage.getItem("token")
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
      if(res.status === 201) {
        dispatch(createOrder(id, res.data.url));
      }
    }).catch(err => {
      console.log(err);
    })
  }
};

// 创建订单
export const createOrder = (id, url) => {
  return dispatch => {
    let str = url;
    const addStr = "adchina_baseimages/";
    str = str.split("adchina_baseimages/");
    url = addStr + str[1];
    axios({
      method: "post",
      url: host + "/api/orders",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      data: {
        advert_baseImage: url,
        sellersinfo_id: id
      }
    }).then(res => {
      Toast.success(res.data.message, 1.5);
      hashHistory.push("/my/3");
    }).catch(err => {
      Toast.fail("创建订单失败！", 1.5);
      console.log(err);
    })
  }
};
