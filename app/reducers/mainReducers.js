import {actionType} from "../constants/actionType";

const defaultState = {
  adList: [],
  demandList: [],
  videoList: []
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionType.mainType.GET_MAIN_DATA: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.adList = action.adList;
      newState.demandList = action.demandList;
      newState.videoList = action.videoList;
      return newState;
    }
    default:
      return state;
  }
}
