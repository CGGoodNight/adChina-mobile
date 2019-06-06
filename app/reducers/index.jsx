import { combineReducers } from "redux";

import loginReducers from './loginReducers';
import mainReducers from './mainReducers';
import detailReducers from './detailReducers';
import myReducers from "./myReducers";
import adReducers from "./adReducers";
import demandReducers from "./demandReducers";

const reducer = combineReducers({
  loginReducers,
  mainReducers,
  detailReducers,
  myReducers,
  adReducers,
  demandReducers
});

export default reducer;
