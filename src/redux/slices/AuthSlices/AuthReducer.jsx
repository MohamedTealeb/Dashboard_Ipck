import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./../../../Apis/LoginApi/LoginApi";



const authSlice = createSlice({
  name: "auth",
  initialState: {
    
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
   accept: (state) => {
    const token =localStorage.getItem("token");
        if (data.user.role === 'admin') {
            localStorage.setItem("token", data.token);
    
            if (window.location.pathname === "/") {
                navigate("/home");
            } else {
                Navigate(window.location.pathname);
            }
        } else {
            setErrorMsg("You are not authorized to access the admin area.");
        }
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        const token = action.payload.token;
        state.token = token;
        localStorage.setItem("token", token);
      
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default authSlice.reducer;