import { createSlice } from "@reduxjs/toolkit";

 const categorySlice = createSlice({
    name: "categorySlice",
    initialState: {
        allCategories: [],
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase("getallcategories/pending", (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase("getallcategories/fulfilled", (state, action) => {
                state.loading = false;
                state.allCategories = action.payload.categories;
            })
            .addCase("getallcategories/rejected", (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
 })
  export default categorySlice.reducer;