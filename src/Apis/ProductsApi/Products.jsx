import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getallproducts = createAsyncThunk("get/products", async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASEURL}/products`
    );

    return response.data;
  } catch (error) {
    return error.response?.data?.message || "Data failed";
  }
});
