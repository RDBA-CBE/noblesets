import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterSidebar: false,
  filterData: {},
  filterByHomePage: null,
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
  },
});

export const {
  handleFilterSidebarOpen,
  handleFilterSidebarClose,
  filterData,
  filterByHomePage,
} = shopFilterSlice.actions;
export default shopFilterSlice.reducer;
