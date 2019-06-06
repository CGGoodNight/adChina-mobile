import axios from 'axios';
import { actionType } from '../constants/actionType'
import { Toast } from 'antd-mobile';
import {hashHistory} from "react-router";
import host from "../constants/host";

const getSearchDemand = (data) => ({
  type: actionType.DemandType.GET_Search_Demand,
  data
});

// 分页器发生变化
export const onDemandSearchPageChangeAction = (start, end) => ({
  type: actionType.DemandType.ON_DEMAND_SEARCH_PAGE_CHANGEl,
  start,
  end
});

// ----------------- 请求 ----------------------------
// 获取搜索的需求
export const getSearchDemandAction = (dataObj) => {
  return dispatch => {
    let type = dataObj.type;
    let traffic = dataObj.traffic;
    let price_start = dataObj.price_start;
    let price_end = dataObj.price_end;
    axios({
      method: "post",
      url: host + "/api/allDemands",
      data: {
        type, traffic, price_start,price_end
      }
    }).then(res => {
      if(res.status === 200) {
        Toast.hide();
        dispatch(getSearchDemand(res.data.data));
      }
    }).catch((err) => {
      Toast.fail("获取数据失败！", 1.2);
      console.log(err);
    })
  }
}

// 添加需求
export const submitDemandAction = (dataObj) => {
  return dispatch => {
    let name = dataObj.addName;
    let type = dataObj.addType;
    let size = dataObj.addSize;
    let exposureDay = dataObj.addDay;
    let exposureHour = dataObj.addHour;
    let tel = dataObj.addTel;
    let price = dataObj.addPrice;
    let content = dataObj.addDetail;
    let traffic = dataObj.addTraffic;
    axios({
      method: "post",
      url: host + "/api/demands",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      data: {
        name,
        type,
        minArea: size,
        exposureDay,
        exposureHour,
        tel,
        price,
        content,
        traffic
      }
    }).then(res => {
      if (res.status === 201) {
        Toast.hide();
        Toast.success("添加成功！", 1.5);
      }
    }).catch(err => {
      Toast.hide();
      Toast.fail("添加失败！", 1.5);
      console.log(err);
    })
  }
}

// 根据id搜索需求
export const crossIdSearchDemandAction = (id) => {
  return dispatch => {
    axios({
      method: "get",
      url: host + "/api/demands/" + id,
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      Toast.hide();
      let data = [res.data.data];
      dispatch(getSearchDemand(data));
    }).catch(err => {
      Toast.hide();
      Toast.fail("没有搜索到指定id的需求", 1.5);
    })
  }
}

// 修改需求
export const modifyDemandAction = (dataObj) => {
  return dispatch => {
    let name = dataObj.addName;
    let type = dataObj.addType;
    let size = dataObj.addSize;
    let exposureDay = dataObj.addDay;
    let exposureHour = dataObj.addHour;
    let tel = dataObj.addTel;
    let price = dataObj.addPrice;
    let content = dataObj.addDetail;
    let traffic = dataObj.addTraffic;
    axios({
      method: "patch",
      url: host + "/api/demands/" + dataObj.modifyId,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      data: {
        name,
        type,
        minArea: size,
        exposureDay,
        exposureHour,
        traffic,
        tel,
        price,
        content
      }
    }).then(res => {
      if (res.status === 204) {
        Toast.hide();
        Toast.success("修改成功！", 1.5);
        setTimeout(() => {
          hashHistory.push("/my");
        }, 1500);
      }
    }).catch(err => {
      Toast.hide();
      Toast.fail("修改失败！", 1.5);
    })
  }
}


