import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./../../../Apis/Users/allUserApi";

const userSlice = createSlice({
    "name": "userslice",
    initialState: {
        allUsers: [],
        totalUsers: 0,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false,
                    state.allUsers = action.payload.data,
                    state.totalUsers = action.payload.totalDocs
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error
            })
    }
});

export default userSlice.reducer;