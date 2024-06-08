import { combineReducers } from "redux";
import userReducer from "./slices/userSlice";
import searchDetailsReducer from "./slices/searchDetailsSlice";
import userOrderReducer from "./slices/userOrderSlice";

const rootReducer = combineReducers({
  user: userReducer,
  searchDetails: searchDetailsReducer,
  userOrder: userOrderReducer,
});

export default rootReducer;
