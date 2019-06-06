import {actionType} from "../constants/actionType";

const defaultState = {
  adDetail: [],
  demandDetail: []
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionType.detailType.GET_AD_DETAIL: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.adDetail = action.data;
      return newState;
    }
    case actionType.detailType.GET_DEMAND_DETAIL: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.demandDetail = action.data;
      return newState;
    }
    case actionType.detailType.CLEAR_DETAIL: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.adDetail = [];
      newState.demandDetail = [];
      return newState;
    }
    default:
      return state;
  }
}
