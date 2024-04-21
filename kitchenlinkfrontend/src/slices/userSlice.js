import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
