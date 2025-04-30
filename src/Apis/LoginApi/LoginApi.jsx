import React from 'react'
import { createAsyncThunk } from "@reduxjs/toolkit";

    export const loginUser = createAsyncThunk(
        "auth/login",
        async ({ email, password }, { rejectWithValue }) => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BASEURL}/api/auth/login`,
                    {
                        email,
                        password,
                    
                     
                    }
                );
                return response.data;
            } catch (error) {
                return rejectWithValue(error.response?.data?.message || "Login failed");
            }
        }
    );
  
  
  
  
  
  
  


