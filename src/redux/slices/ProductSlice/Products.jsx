import {  createSlice } from "@reduxjs/toolkit";
import { getallproducts } from "../../../Apis/ProductsApi/Products";

const producSlice = createSlice({
  name: "productSlice",
  initialState: {
    allProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getallproducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getallproducts.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload, "all products");
        
        state.allProducts = action.payload.products;
      })
      .addCase(getallproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default producSlice.reducer;