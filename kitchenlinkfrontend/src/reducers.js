import { combineReducers } from "redux";
import userReducer from "./slices/userSlice";
import searchDetailsReducer from "./slices/searchDetailsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  searchDetails: searchDetailsReducer,
});

export default rootReducer;
