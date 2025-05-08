import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getallproducts = createAsyncThunk(
  "get/products",
  async ({ model, name, category, id } = {}) => {
    try {
      let url = `${import.meta.env.VITE_BASEURL}/products`;

      // If id is provided, fetch a specific product
      if (id) {
        url += `/${id}`;
      } else {
        const params = new URLSearchParams();
        if (model) params.append("model", model);
        if (name) params.append("name", name);
        if (category) params.append("category", category);

        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;
      }

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error.response?.data?.message || "Data failed";
    }
  }
);
