import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "setUpOrder",
  initialState: {
    initOrders: {},
  },
  reducers: {
    getOrders: (state, action) => {
      state.initOrders = {
        ordersData: action.payload,
      };
    },
  },
});
