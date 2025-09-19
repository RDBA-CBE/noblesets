import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterSidebar: false,
  filterData: {},
  filterByHomePage: null,
  childCategory:[]
};

export const shopFilterSlice = createSlice({
  name: "shopFilter",
  initialState,
  reducers: {
    handleFilterSidebarOpen: (state, { payload }) => {
      state.filterSidebar = true;
    },
    handleFilterSidebarClose: (state, { payload }) => {
      state.filterSidebar = false;
    },
    filterData: (state, { payload }) => {
      state.filterData = payload;
    },
    filterByHomePage: (state, { payload }) => {
      state.filterByHomePage = payload;
    },

    childCategory: (state, { payload }) => {
      state.childCategory = payload;
    },
    
  },
});

export const {
  handleFilterSidebarOpen,
  handleFilterSidebarClose,
  filterData,
  filterByHomePage,
  childCategory
} = shopFilterSlice.actions;
export default shopFilterSlice.reducer;
