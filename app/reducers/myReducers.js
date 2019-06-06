import {actionType} from "../constants/actionType";

const defaultState = {
  myAd: [],
  myDemand: [],
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
    default:
      return state;
  }
}
