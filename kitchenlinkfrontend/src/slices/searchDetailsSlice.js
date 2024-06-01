import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchedState: null,
  searchedRestaurant: null,
};

const searchDetailsSlice = createSlice({
  name: "searchDetails",
  initialState,
  reducers: {
    setSearchedState: (state, action) => {
      state.searchedState = action.payload;
    },
    setSearchedRestaurant: (state, action) => {
      state.searchedRestaurant = action.payload;
    },
    resetSearch: (state, action) => {
      state = initialState;
    },
  },
});

export const searchDetailsActions = searchDetailsSlice.actions;
export default searchDetailsSlice.reducer;
