
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

    export const loginUser = createAsyncThunk(
        "auth/login",
        async ({ email, password },{ rejectWithValue }) => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BASEURL}/auth/login`,
                    {
                        email,
                        password,
                    
                     
                    }
                  
                    
                );
                if (response.data.user.role !== 'admin') {
                    return rejectWithValue("Access denied: Admins only.");
                  }
               
                return response.data;
            } catch (error) {
                return rejectWithValue(error.response?.data?.message || "Login failed");
            }
        }
    );
  
  
  
  
  
  
  


