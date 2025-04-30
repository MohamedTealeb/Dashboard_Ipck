import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk(
  "/getusers",
  async (params = {}, { rejectWithValue }) => {
   
    try {
      if (!token) {
        return rejectWithValue("No token found. Please log in.");
      }

      const token = localStorage.getItem("token");

    
      const response = await axios.get(`${import.meta.env.VITE_BASEURL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    
      });

      return response.data;
    } catch (error) {
      
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
