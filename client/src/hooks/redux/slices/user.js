import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "setUpUser",
  initialState: {
    initUsers: {},
  },
  reducers: {
    getUsers: (state, action) => {
      state.initUsers = {
        usersData: action.payload,
      };
    },
  },
});
