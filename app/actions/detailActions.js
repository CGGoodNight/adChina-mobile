import { actionType } from '../constants/actionType'
import axios from 'axios';
import { Toast } from 'antd-mobile';
// import {hashHistory} from "react-router";
import host from "../constants/host";

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
