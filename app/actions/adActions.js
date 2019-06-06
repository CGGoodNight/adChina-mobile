import axios from 'axios';
import { actionType } from '../constants/actionType'
import { Toast } from 'antd-mobile';
import {hashHistory} from "react-router";
import host from "../constants/host";

const getSearchAd = (data) => ({
  type: actionType.adType.GET_Search_AD,
  data
});

const uploadImageUrl = (url) => ({
  type: actionType.adType.UOLOAD_IMAGE_URL,
  url
});

export const clearImageUrl = () => ({
  type: actionType.adType.CLEAR_CURRENT_IMAGE_URL
});

// 分页器发生变化
export const onSearchPageChangeAction = (start, end) => ({
  type: actionType.adType.ON_SEARCH_PAGE_CHANGE,
  start,
  end
});

// 进度条发生变化
export const onProgressChange = (precent, isDelete) => ({
  type: actionType.adType.ON_PROGRESS_CHANGE,
  precent,
  isDelete
});

// ----------------- 请求 ----------------------------

// 搜索到的广告
export const getSearchAdAction = (dataObj) => {
  return dispatch => {
    let type = dataObj.type;
    let traffic = dataObj.traffic;
    let price_start = dataObj.price_start;
    let price_end = dataObj.price_end;
    let address = dataObj.address;
    // 搜索广告
    axios({
      method: "post",
      url: host + "/api/allAdverts",
      data: {
        type, traffic, price_start,price_end,address
      }
    }).then(res => {
      if(res.status === 200) {
        Toast.hide();
        dispatch(getSearchAd(res.data.data));
      }
    }).catch((err) => {
      Toast.hide();
      Toast.fail("获取数据失败", 1.2);
      console.log(err);
    })
  }
};

// 根据id获取广告
export const crossIdSearchAdAction = (id) => {
  return dispatch => {
    axios({
      method: "get",
      url: host + "/api/adverts/" + id,
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      Toast.hide();
      let data = [res.data.data];
      dispatch(getSearchAd(data));
    }).catch(err => {
      Toast.hide();
      Toast.fail("此Id广告位不存在", 1.2);
    })
  }
}

// 上传广告图片并把url返回给我
export const uploadAdImageAction = (formData) => {
  return dispatch => {
    axios({
      method: "post",
      url: host + "/api/UploadAdverts",
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
      if(res.status === 201) {
        Toast.hide();
        Toast.success("上传成功！", 1.2);
        dispatch(uploadImageUrl(res.data.url));
      }
    }).catch(error => {
      Toast.fail("上传广告图失败！", 1.2);
      console.log(error);
    })
  }
};

// 上传广告
export const submitAdAction = (dataObj) => {
  return dispatch => {
    // 添加广告
    let name = dataObj.addName;
    let address = dataObj.addAddress;
    let type = dataObj.addType;
    let maxArea = dataObj.addSize;
    let exposureDay = dataObj.addDay;
    let exposureHour = dataObj.addHour;
    let tel = dataObj.addTel;
    let price = dataObj.addPrice;
    let content = dataObj.addDetail;
    let images = dataObj.uploadImg;
    let traffic = dataObj.traffic;
    let imagesArr = [];
    images.map((item, index) => {
      let str = item;
      const addStr = "adchina_adverts/";
      str = str.split("adchina_adverts/");
      item = addStr + str[1];
      imagesArr.push({"image": item});
    });
    axios({
      method: "post",
      url: host + "/api/adverts",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      data: {
        name,
        type,
        address,
        maxArea,
        exposureDay,
        exposureHour,
        tel,
        price,
        content,
        traffic,
        images: imagesArr
      }
    }).then(res => {
      if (res.status === 201) {
        Toast.hide();
        Toast.success("添加成功！", 1.2);
        setTimeout(() => {
          hashHistory.push("/my");
        }, 1200);
      }
    }).catch(err => {
      Toast.hide();
      Toast.fail("添加失败", 1.2);
      console.log(err);
    })

  }
};

// 修改广告
export const modifyAdAction = (dataObj) => {
  return dispatch => {
    let name = dataObj.addName;
    let address = dataObj.addAddress;
    let type = dataObj.addType;
    let maxArea = dataObj.addSize;
    let exposureDay = dataObj.addDay;
    let exposureHour = dataObj.addHour;
    let tel = dataObj.addTel;
    let price = dataObj.addPrice;
    let content = dataObj.addDetail;
    let images = dataObj.uploadImg;
    let traffic = dataObj.addTraffic;
    let imagesArr = [];
    images.map((item, index) => {
      let str = item;
      const addStr = "adchina_adverts/";
      str = str.split("adchina_adverts/");
      item = addStr + str[1];
      imagesArr.push({"image": item});
    });
    axios({
      method: "patch",
      url: host + "/api/adverts/" + dataObj.modifyId,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      data: {
        name,
        address,
        type,
        maxArea,
        exposureDay,
        exposureHour,
        tel,
        price,
        content,
        traffic,
        images: imagesArr
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
        Toast.fail("修改失败！请查看自己的输入是否有误，例如：电话不能超过11位。", 2);
    })
  }
}



