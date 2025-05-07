import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/AuthSlices/AuthReducer.jsx";
import userReducer from "../redux/slices/UserSlices/UserReducer";
import productReducer from "../redux/slices/ProductSlice/Products.jsx";
import categoryReducer from "../redux/slices/CategorySlice/Category.jsx";
// import  VerifyReducer  from '../redux/slices/VerfySlice/Verify.jsx';
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    // verify: VerifyReducer

  },
});

export default store;
