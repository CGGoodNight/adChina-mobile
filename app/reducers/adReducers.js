import {actionType} from "../constants/actionType";

const defaultState = {
  allSearchAd: [],
  displaySearchAd: [],
  uploadImgUrl: "",
  progressValue: 0
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionType.adType.GET_Search_AD: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.allSearchAd = action.data;
      newState.displaySearchAd = action.data.slice(0, 12);
      return newState;
    }
    case actionType.adType.ON_SEARCH_PAGE_CHANGE: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.displaySearchAd = newState.allSearchAd.slice(action.start, action.end);
      return newState;
    }
    case actionType.adType.UOLOAD_IMAGE_URL: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.uploadImgUrl = action.url;
      return newState;
    }
    case actionType.adType.CLEAR_CURRENT_IMAGE_URL: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.uploadImgUrl = "";
      return newState;
    }
    case actionType.adType.ON_PROGRESS_CHANGE: {
      const newState = JSON.parse(JSON.stringify(state));
      if(action.isDelete) {
        newState.progressValue = 0;
      } else {
        newState.progressValue = action.precent*100;
      }
      return newState;
    }
    default:
      return state;
  }
}
