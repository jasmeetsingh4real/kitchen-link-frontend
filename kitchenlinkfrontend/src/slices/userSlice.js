import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState = {
  userDetails: {
    id: null,
    fullName: "",
    email: "",
    role: "",
  },
  sellerDetails: {
    id: null,
    fullName: "",
    email: "",
    role: "",
    restaurantDetails: null,
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
      state.sellerDetails = { ...state, ...action.payload };
    },
    setSellerRestaurant: (state, action) => {
      if (state.sellerDetails?.id) {
        state.sellerDetails.restaurantDetails = action.payload;
      }
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
