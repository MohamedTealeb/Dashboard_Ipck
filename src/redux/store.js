import { configureStore } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
import authReducer from "../redux/slices/AuthSlices/AuthReducer.jsx";
import userSlice from "./slices/UserSlices/UserReducer";
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
  },
});
// (function initalizedAuth(){
//     const token =localStorage.getItem("token");
//     if (data.user.role === 'admin') {
//         localStorage.setItem("token", data.access_token);

//         if (window.location.pathname === "/") {
//             navigate("/home");
//         } else {
//             Navigate(window.location.pathname);
//         }
//     } else {
//         setErrorMsg("You are not authorized to access the admin area.");
//     }
// })()

export default store;
