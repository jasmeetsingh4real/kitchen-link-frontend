import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  totalAmount: 0,
  restaurantId: undefined,
};

const userOrderSlice = createSlice({
  name: "userOrder",
  initialState,
  reducers: {
    addItemToOrder: (state, action) => {
      if (state.orderItems && state.orderItems.length) {
        const existingItemIndex = state.orderItems.findIndex(
          (item) => item.itemId === action.payload.itemId
        );
        if (existingItemIndex >= 0) {
          state.orderItems[existingItemIndex].quantity +=
            action.payload.quantity;
          return;
        }
        state.orderItems = [...state.orderItems, action.payload];
      } else {
        state.orderItems = [action.payload];
      }
    },
    deleteFoodItem: (state, action) => {
      const foodItemIndex = state.orderItems.findIndex(
        (item) => item.itemId === action.payload
      );
      if (foodItemIndex >= 0) {
        state.orderItems = state.orderItems.filter(
          (item) => item.itemId !== action.payload
        );
      }
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setRestaurantId: (state, action) => {
      state.restaurantId = action.payload;
    },
    clearUserOrder: (state, action) => {
      state.orderItems = [];
    },
  },
});

export const orderActions = userOrderSlice.actions;
export default userOrderSlice.reducer;
