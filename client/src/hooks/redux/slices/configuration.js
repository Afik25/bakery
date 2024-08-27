import { createSlice } from "@reduxjs/toolkit";

export const configurationSlice = createSlice({
  name: "setUp",
  initialState: {
    initConnectedUser: {},
    initCategories: {},
    initArticles: {},
  },
  reducers: {
    initConnectedUser: (state, action) => {
      state.initConnectedUser = {
        connectedUserData: action.payload,
      };
    },
    getCategories: (state, action) => {
      state.initCategories = {
        categoriesData: action.payload,
      };
    },
    getArticles: (state, action) => {
      state.initArticles = {
        articlesData: action.payload,
      };
    },
  },
});
