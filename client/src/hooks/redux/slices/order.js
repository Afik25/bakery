import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "setUpOrder",
  initialState: {
    initOrders: {},
    initDashboard: {},
  },
  reducers: {
    getOrders: (state, action) => {
      state.initOrders = {
        ordersData: action.payload,
      };
    },
    getDashboard: (state, action) => {
      state.initDashboard = {
        dashboardData: action.payload,
      };
    },
  },
});
