import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState = {
  userDetails: {
    id: "",
    fullName: "",
    email: "",
    role: "",
  },
  sellerDetails: {
    id: "",
    fullName: "",
    email: "",
    role: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userDetails = action.payload;
    },
    setSeller: (state, action) => {
      state.sellerDetails = action.payload;
    },
    logoutUser: (state, action) => {
      state.userDetails = null;
      Cookies.remove("authToken");
    },
    logoutSeller: (state, action) => {
      state.sellerDetails = null;
      Cookies.remove("sellerAuthToken");
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
