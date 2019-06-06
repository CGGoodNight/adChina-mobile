import {actionType} from "../constants/actionType";

const defaultState = {
  allSearchDemand: []
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionType.DemandType.GET_Search_Demand: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.allSearchDemand = action.data;
      return newState;
    }
    default:
      return state;
  }
}
