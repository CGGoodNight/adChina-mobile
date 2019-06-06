import {actionType} from "../constants/actionType";

const defaultState = {
  adDetail: [],
  demandDetail: [],
  editorObj: {}
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
    case actionType.detailType.EDITOR_OBJECT: {
      const newState = JSON.parse(JSON.stringify(state));
      if(action.isClear) {
        newState.editorObj = {};
      } else {
        newState.editorObj = action.dataObj;
      }
      return newState;
    }
    default:
      return state;
  }
}
