import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/auth/login`,
        {
          email,
          password,
        }
      );
      if (response.data.user.role !== "admin") {
        return "Access denied: Admins only.";
      }

      return response.data;
    } catch (error) {
      return error.response?.data?.message || "Login failed";
    }
  }
);
