import { createSlice } from "@reduxjs/toolkit";

export const stockSlice = createSlice({
  name: "setUpStock",
  initialState: {
    initStocks: {},
    initStockMovements: {},
  },
  reducers: {
    getStocks: (state, action) => {
      state.initStocks = {
        stocksData: action.payload,
      };
    },
    getStockMovements: (state, action) => {
      state.initStockMovements = {
        stockMovementsData: action.payload,
      };
    },
  },
});
