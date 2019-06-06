import { actionType } from '../constants/actionType'
import axios from 'axios';
import { Toast } from 'antd-mobile';
import {hashHistory} from "react-router";
import host from "../constants/host";

const verificationCodeData = (data) => ({
  type: actionType.loginType.VERIFICATION_CODE_DATA,
  data
});

// 切换到注册页时可能有上次注册的验证码 需要每次切换时消除数据
export const destroyVerificationCodeDataAction = () => ({
  type: actionType.loginType.DESTROY_VERIFICATION_CODE_DATA
});

// 注册成功后跳转到登录页
export const turnToLoginPageAction = (registerMail) => ({
  type: actionType.loginType.TURN_TO_LOGIN_PAGE,
  registerMail
});

// 获取的个人信息
const getUserInfo = (data) => ({
  type: actionType.loginType.GET_USER_INFO,
  data
});

// 登录
const loginInAction = () => ({
  type: actionType.loginType.LOGIN_IN
});

// 登出
const loginOutAction = () => ({
  type: actionType.loginType.LOGIN_OUT
});

// ----------------- 请求 ----------------------------

// 获取验证码
export const getVerificationCodeAction = (email) => {
  return dispatch => {
    axios({
      method: "post",
      url: host + "/api/captchas",
      data: {
        email: email
      }
    }).then(res => {
      dispatch(verificationCodeData(res.data));
    }).catch(err => {
      Toast.fail("邮箱已被注册", 1.2);
    })
  }
};

// 注册用户
export const registerUserAction = (email, username, password, password2, verificationCode, captcha_key) => {
  return dispatch => {
    axios({
      method: "post",
      url: host + "/api/users/register",
      data: {
        name: username,
        email: email,
        password: password,
        password_confirmation: password2,
        captcha_key: captcha_key,
        captcha_code: verificationCode
      }
    }).then(res => {
        if(res.status === 201) {
          Toast.hide();
          Toast.success(res.data.message, 2, () => {
            // 注册成功后跳转到登录页
            dispatch(turnToLoginPageAction(email));
          });
        }
    }).catch(err => {
      if(err.response.status === 401) {
        Toast.hide();
        Toast.fail(err.response.data.message, 1.2);
      }
    })
  }
};

// 登录用户
export const loginUserAction = (email, password) => {
  return dispatch => {
    axios.post(host + '/api/users/login', {
      email: email,
      password: password
    })
      .then(function (response) {
        console.log(response);
        if(response.status === 200) {
          let localToken = "Bearer" + " " + response.data.access_token;
          localStorage.setItem("token", localToken);
          hashHistory.push("/");
        }
      })
      .catch(function (err) {
        if(err.response.status === 401) {
          Toast.fail("账号或密码错误！", 1.5);
        }
        if(err.response.status === 403) {
          Toast.fail("邮箱尚未激活，请前往邮箱激活！", 1.5);
        }
      });
  }
};

// 登出用户
export const loginOutUserAction = () => {
  const token = localStorage.getItem("token");
  localStorage.removeItem("token");
  return dispatch => {
    dispatch(loginOutAction());
    axios({
      method: "get",
      url: host + "/api/user/logout",
      headers: {
        'Authorization':  token
      }
    }).then(res => {
      Toast.success(res.data.message, 1.5);
    }).catch(error => {
      console.log(error);
    })
  }
};

// 根据登录获取的token来获取用户的个人信息
export const getUserInfoAction = () => {
  // 得到当前token
  const token = localStorage.getItem("token");
  return dispatch => {
    axios({
      method: "get",
      url: host + "/api/user/me",
      headers: {
        'Authorization':  token
      }
    }).then(res => {
      dispatch(getUserInfo(res.data.data));
      dispatch(loginInAction());
    }).catch(err => {
      dispatch(loginOutUserAction());
      console.log(err);
    })
  }
};






