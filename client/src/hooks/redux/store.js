import { configureStore } from "@reduxjs/toolkit";
import { configurationSlice } from "./slices/configuration";
import { userSlice } from "./slices/user";
import { stockSlice } from "./slices/stock";
import { orderSlice } from "./slices/order";

export const store = configureStore({
  reducer: {
    setInitConf: configurationSlice.reducer,
    setUserSlice: userSlice.reducer,
    setStockSlice: stockSlice.reducer,
    setOrderSlice: orderSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
