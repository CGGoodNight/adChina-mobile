import {actionType} from "../constants/actionType";

const defaultState = {
  // 注册验证码图片数据
  verificationCodeData: "",
  turnToLoginPage: false,
  registerMail: "",
  userInfo: [],
  // 之前使用localstorage判断是否处于登录，但是如果token失效组件不能及时改变，只能通过props触发组件更新
  isLogin: false
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionType.loginType.VERIFICATION_CODE_DATA: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.verificationCodeData = action.data;
      return newState;
    }
    case actionType.loginType.DESTROY_VERIFICATION_CODE_DATA: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.verificationCodeData = "";
      return newState;
    }
    case actionType.loginType.TURN_TO_LOGIN_PAGE: {
      const newState = JSON.parse(JSON.stringify(state));
      if(!newState.turnToLoginPage) {
        newState.registerMail = action.registerMail;
      } else {
        newState.registerMail = "";
      }
      newState.turnToLoginPage = !newState.turnToLoginPage;
      return newState;
    }
    case actionType.loginType.GET_USER_INFO: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.userInfo = action.data;
      return newState;
    }
    case actionType.loginType.LOGIN_IN: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.isLogin = true;
      return newState;
    }
    case actionType.loginType.LOGIN_OUT: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.isLogin = false;
      return newState;
    }
    default:
      return state;
  }
}
