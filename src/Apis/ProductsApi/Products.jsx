import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getallproducts = createAsyncThunk("get/products", async ({model,name,category,id}) => {
  try {
    
    let url=`${import.meta.env.VITE_BASEURL}/products`;
      if(model)url += `&model=${model}`
      if(name)url += `&name=${name}`
      if(category)url += `&category=${category}`
      if(id) url += `${import.meta.env.VITE_BASEURL}/products?id=${id}`
     const response= await axios.get(url)
    return response.data;
  } catch (error) {
    console.log(error);
    
    return error.response?.data?.message || "Data failed";
  }
});
