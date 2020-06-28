import { combineReducers } from "redux";
import centralReducer from "./reducers/centralReducer";

const rootReducer = combineReducers({
  centralState: centralReducer,
});

export default rootReducer;
