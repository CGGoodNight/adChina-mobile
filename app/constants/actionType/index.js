//首页
const mainType = {
  GET_MAIN_DATA: "GET_MAIN_DATA"
};

// 登录页
const loginType = {
  VERIFICATION_CODE_DATA: "VERIFICATION_CODE_DATA",
  DESTROY_VERIFICATION_CODE_DATA: "DESTROY_VERIFICATION_CODE_DATA",
  TURN_TO_LOGIN_PAGE: "TURN_TO_LOGIN_PAGE",
  GET_USER_INFO: "GET_USER_INFO",
  LOGIN_IN: "LOGIN_IN",
  LOGIN_OUT: "LOGIN_OUT"
};

// 详情页
const detailType = {
  GET_AD_DETAIL: "GET_AD_DETAIL",
  GET_DEMAND_DETAIL: "GET_DEMAND_DETAIL",
  CLEAR_DETAIL: "CLEAR_DETAIL"
};

// 个人信息页
const myType = {
  GET_MY_ALL_AD: "GET_MY_ALL_AD",
  GET_MY_ALL_Demand: "GET_MY_ALL_Demand"
};

// 广告页
const adType = {
  GET_Search_AD: "GET_Search_AD",
  ON_SEARCH_PAGE_CHANGE: "ON_SEARCH_PAGE_CHANGE",
  UOLOAD_IMAGE_URL: "UOLOAD_IMAGE_URL",
  CLEAR_CURRENT_IMAGE_URL: "CLEAR_CURRENT_IMAGE_URL",
  ON_PROGRESS_CHANGE: "ON_PROGRESS_CHANGE"
};

// 需求页
const DemandType = {
  GET_Search_Demand: "GET_Search_Demand",
};

export const actionType = {
  mainType,
  loginType,
  detailType,
  myType,
  adType,
  DemandType
};
