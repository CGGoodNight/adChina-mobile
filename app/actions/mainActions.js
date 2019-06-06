import { actionType } from '../constants/actionType'
import axios from 'axios';
// import { Toast } from 'antd-mobile';
// import {hashHistory} from "react-router";
import host from "../constants/host";

const getMainData = (adList, demandList, videoList) => ({
  type: actionType.mainType.GET_MAIN_DATA,
  adList,
  demandList,
  videoList
});

// ----------------- 请求 ----------------------------
// 获取主页数据
export const getMainDataAction  = () => {
  return (dispatch) => {
    let getMainAdData = () => {
      return new Promise((resolve, reject) => {
        axios.get(host + "/api/hotAdverts")
          .then((res) => {
            resolve(res);
          }).catch((err) => {
          reject(err);
        })
      })
    };

    let getMainDemandData = () => {
      return new Promise((resolve, reject) => {
        axios.get(host + "/api/hotDemands", {
        }).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        })
      })
    };

    // let getMainVideoData = () => {
    //   return new Promise((resolve, reject) => {
    //     axios("/public/main/videoList.json").then(res => {
    //       resolve(res);
    //     }).catch(err => {
    //       console.log(err);
    //     })
    //   })
    // };

    Promise.all([getMainAdData(), getMainDemandData()]).then((result) => {
      // result[2].data.data
      dispatch(getMainData(result[0].data.data, result[1].data.data, []));
    }).catch(err => {
      console.log(err);
    })
  }
};
