import axios from 'axios';
import { actionType } from '../constants/actionType'
import { Toast, Modal } from 'antd-mobile';
const alert = Modal.alert;
import {hashHistory} from "react-router";
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

const getMyOrder = (data) => ({
  type: actionType.myType.GET_MY_ORDER,
  data
});
const getSystemInfo = (data) => ({
  type: actionType.myType.GET_SYSTEM_INFO,
  data
});
const getMessageTotal = (accept, send) => ({
  type: actionType.myType.GET_MESSAGE_TOTAL,
  accept,
  send
})
export const getMessageDetail = (data, clear=false) => ({
  type: actionType.myType.GET_MESSAGE_DETAIL,
  data
})

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

// 得到我的所有的订单详情  isBuyPage 判断是购买页  还是卖出页
export const getMyOrderAction = (isBuyPage) => {
  return dispatch => {
    if(isBuyPage) {
      axios({
        method: "get",
        url: host + "/api/getAllOrdersAsBuyer",
        headers: {
          "Content-Type": "application/json",
          'Authorization': localStorage.getItem("token")
        }
      }).then(res => {
        const data = res.data.data;
        dispatch(getMyOrder(data));
      }).catch((err) => {
        console.log(err);
      })
    } else {
      axios({
        method: "get",
        url: host + "/api/getAllOrdersAsSeller",
        headers: {
          "Content-Type": "application/json",
          'Authorization': localStorage.getItem("token")
        }
      }).then(res => {
        const data = res.data.data;
        dispatch(getMyOrder(data));
      }).catch((err) => {
        console.log(err);
      });
    }
  }
};

// 改变订单状态
export const changeOrderStateAction = (order_id) => {
  return dispatch => {
    axios({
      method: "patch",
      url: host + "/api/orders/" + order_id,
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      // window.location.reload();
      dispatch(getMyOrderAction(true));
    }).catch(err => {
      console.log(err);
    })
  }
};

// 为支付页面单独新建一个action
export const changeOrderStateToPayAction = (order_id) => {
  let newWindow = window.open();
  return dispatch => {
    axios({
      method: "patch",
      url: host + "/api/orders/" + order_id,
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      newWindow.location.href = res.data.url;
    }).catch(err => {
      console.log(err);
    })
  }
};

// 订单的下载的底图
export const downloadBaseImageAction = (order_id) => {
  let newWindow = window.open();
  return dispatch => {
    console.log(order_id);
    axios({
      method: "get",
      url: host + "/api/downloadCompoundPic/" + order_id,
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      newWindow.location.href = `http://${res.data.url}`;
    }).catch(err => {
      console.log(err);
    })
  }
};

// 查看满意图
export const viewSellerImageAction = (order_id) => {
  let newWindow = window.open();
  return dispatch => {
    axios({
      method: "get",
      url: host + "/api/getConfirmPic/" + order_id,
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      if(res.status === 200) {
        newWindow.location.href = res.data.url;
      }
    }).catch(err => {
      console.log(err);
    })
  }
};

// 上传广告图片并把url返回给我
export const uploadAdImageAction = (formData, order_id = 1) => {
  return dispatch => {

    axios({
      method: "post",
      url: host + "/api/UploadAdverts",
      headers: {
        'Authorization': localStorage.getItem("token")
      },
      data: formData
    }).then(res => {
      if(res.status === 201) {
        let result = "";
        let str = res.data.url;
        const addStr = "adchina_adverts/";
        str = str.split("adchina_adverts/");
        result = addStr + str[1];
        axios({
          method: "patch",
          url: host + "/api/orders/" + order_id,
          headers: {
            'Authorization': localStorage.getItem("token")
          },
          data: {
            order_confirmImage: result
          }
        }).then(res => {
          if(res.status === 204) {
            Toast.success("上传成功");
            // window.location.reload();
            dispatch(getMyOrderAction(true));
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }).catch(error => {
      console.log(error);
    })

  }
};

// 获取系统信息  isSerach为false时为获取部分信息 为true则是获取改系统信息的全部信息 value是某个系统信息的id
export const getSystemInfoAction = (isSerach = false, value = "") => {
  return dispatch => {
    if(isSerach) {
      axios({
        method: "get",
        url: host + "/api/systemNotifications/" + value,
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      }).then(res => {
        if(res.status === 200) {
          let data = [res.data.data];
          dispatch(getSystemInfo(data));
        }
      }).catch((err) => {
        error("没有查询到对应的通知");
        console.log(err);
      })
    } else {
      axios({
        method: "get",
        url: host + "/api/systemNotifications",
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      }).then(res => {
        if(res.status === 200) {
          dispatch(getSystemInfo(res.data.data));
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }
};

// 获取全部私信内容
export const getMessageAction = () => {
  return dispatch => {

    let getAcceptdData = () => {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: host + "/api/users/contacts/Received",
          headers: {
            'Authorization': localStorage.getItem("token")
          }
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    };

    let getSendData = () => {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: host + "/api/users/contacts/Sended",
          headers: {
            'Authorization': localStorage.getItem("token")
          }
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    };

    Promise.all([getAcceptdData(), getSendData()]).then((result) => {
      dispatch(getMessageTotal(result[0].data.data, result[1].data.data));
    }).catch(err => {
      console.log(err);
    })




  }
}

// 获取与某人私信的详细内容
export const getMessageDetailAction = (id) => {
  return dispatch => {
    axios({
      method: "get",
      url: host + "/api/users/contacts/"  + id + "/detail",
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }).then(res => {
      dispatch(getMessageDetail(res.data.data));
    }).catch(err => {
      console.log(err);
    })
  }
}

// 回复私信
export const submitReplyContentAction = (other_id, replyContent) => {
  return dispatch => {
    if(replyContent === "") {
      Toast.fail("发送内容不能为空", 1.5);
      return;
    }
    dispatch(submitPrivateLetter(other_id, replyContent, true));
  }
};

// 发送私信
export const submitPrivateLetter = (to, content, isReply=false) => {
  return dispatch => {
    if(content === "") {
      Toast.fail("发送的内容不能为空！", 1.5);
      return;
    }
    axios({
      method: "post",
      url: host + "/api/users/contacts/"+ to +"/create",
      headers: {
        'Authorization': localStorage.getItem("token")
      },
      data: {
        content
      }
    }).then(res => {
      if(res.status === 201) {
        if(isReply) {
          Toast.success(res.data.message, 1.5);
          dispatch(getMessageDetailAction(to));
        } else {
          Toast.success(res.data.message, 1.5);
          setTimeout(() => {
            hashHistory.push("/my/4");
          }, 1500);
        }
      }
    }).catch((err) => {
      Toast.fail("发送失败或该用户已注销", 1.5);
      console.log(err);
    })
  }
};