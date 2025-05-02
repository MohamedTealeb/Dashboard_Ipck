// import React, { useState } from "react";
// import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// import Admin from "./Modules/Admin/Admin";
// import Home from "./Modules/Home/Home";
// import Login from "./Modules/Login/Login";
// import Products from "./Modules/Products/Products";
// import Verify from "./Modules/Verfiy/Verify";
// import Sidebar from "./Components/Shared/Sidebar";
// import { Toaster } from "react-hot-toast";
// import { Box } from "@mui/material";
// import Categories from "./Modules/Categories/Categories";
// import ProtectedRoute from "./ProtectedRoutes/ProtectedRoutes";
// import SignUp from "./Modules/SignUp/SignUp";

// export default function App() {
//   const [open, setOpen] = useState(false);
//   const location = useLocation();

//   const noSidebarRoutes = ["/login", "/signup"];
//   const isSidebarVisible = !noSidebarRoutes.includes(location.pathname);

//   return (
//     <>
//       <Toaster />
//       {isSidebarVisible ? (
//         <Box sx={{ display: 'flex', width: '100%', overflowX: 'auto' }}>
//           <Sidebar open={open} setOpen={setOpen} />
//           <Routes>
//             <Route
//               path="home"
//               element={
//                 <ProtectedRoute>
//                   <Home />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="products"
//               element={
//                 <ProtectedRoute>
//                   <Products />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="admin"
//               element={
//                 <ProtectedRoute>
//                   <Admin />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="verify"
//               element={
//                 <ProtectedRoute>
//                   <Verify />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="categories"
//               element={
//                 <ProtectedRoute>
//                   <Categories />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </Box>
//       ) : (
//         // Fullscreen Layout for Login and SignUp Pages
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="*" element={<Navigate to="/login" />} />
         
//         </Routes>
//       )}
//     </>
//   );
// }
import React, { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Admin from "./Modules/Admin/Admin";
import Home from "./Modules/Home/Home";
import Login from "./Modules/Login/Login";
import Products from "./Modules/Products/Products";
import Verify from "./Modules/Verfiy/Verify";
import Sidebar from "./Components/Shared/Sidebar";
import { Toaster } from "react-hot-toast";
import { Box } from "@mui/material";
import Categories from "./Modules/Categories/Categories";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoutes";
import SignUp from "./Modules/SignUp/SignUp";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const noSidebarRoutes = ["/login", "/signup"];
  const isSidebarVisible = !noSidebarRoutes.includes(location.pathname);

  return (
    <>
      <Toaster />
      {isSidebarVisible ? (
        <Box sx={{ display: "flex", width: "100%" }}>
          {/* Sidebar with responsive behavior */}
          <Sidebar onSidebarChange={setSidebarOpen} />

          {/* Main content area */}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/verify"
                element={
                  <ProtectedRoute>
                    <Verify />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/categories"
                element={
                  <ProtectedRoute>
                    <Categories />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </Box>
        </Box>
      ) : (
        // No sidebar layout for login/signup
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
}
