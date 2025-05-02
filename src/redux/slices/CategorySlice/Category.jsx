import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "../../../Apis/CategoryApi/CategoryApi";

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
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.allCategories = action.payload.categories;
                console.log("allCategories", action.payload);
                
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
 })
  export default categorySlice.reducer;