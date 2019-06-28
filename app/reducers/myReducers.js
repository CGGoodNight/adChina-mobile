import {actionType} from "../constants/actionType";

const defaultState = {
  myAd: [],
  myDemand: [],
  myOrder: [],
  userPayModal: false,
  userPayUrl: "",
  systemInfo: [],
  totalMessage: [],
  detailMessage: []
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionType.myType.GET_MY_ALL_AD: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.myAd = action.data;
      return newState;
    }
    case actionType.myType.GET_MY_ALL_Demand: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.myDemand = action.data;
      return newState;
    }
    case actionType.myType.GET_MY_ORDER: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.myOrder = action.data;
      return newState;
    }
    case actionType.myType.GET_SYSTEM_INFO: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.systemInfo = action.data;
      return newState;
    }
    case actionType.myType.GET_MESSAGE_TOTAL: {
      const newState = JSON.parse(JSON.stringify(state));
      let total = action.accept.concat(action.send);
      newState.totalMessage = total;
      return newState;
    }
    case actionType.myType.GET_MESSAGE_DETAIL: {
      const newState = JSON.parse(JSON.stringify(state));
      if(action.clear) {
        newState.detailMessage = [];
        return newState;
      }
      action.data.reverse();
      newState.detailMessage = action.data;
      return newState;
    }
    default:
      return state;
  }
}
