import {actionType} from "../constants/actionType";

const defaultState = {
  allSearchDemand: [],
  displaySearchDemand: []
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionType.DemandType.GET_Search_Demand: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.allSearchDemand = action.data;
      newState.displaySearchDemand = action.data.slice(0, 8);
      return newState;
    }
    case actionType.DemandType.ON_DEMAND_SEARCH_PAGE_CHANGEl: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.displaySearchDemand = newState.allSearchDemand.slice(action.start, action.end);
      return newState;
    }
    default:
      return state;
  }
}
