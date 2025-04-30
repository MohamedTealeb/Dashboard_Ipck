import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk(
  "/getusers",
  async (params = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      // Filter out undefined, null, or empty string parameters
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(
          ([_, value]) => value !== undefined && value !== null && value !== ""
        )
      );

      const response = await axios.get(`${import.meta.env.VITE_BASEURL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);