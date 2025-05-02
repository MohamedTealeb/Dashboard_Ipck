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

export default function App() {
  
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const noSidebarRoutes = ["/login"];
  const isSidebarVisible = !noSidebarRoutes.includes(location.pathname);


  return (
    
    <>
    
      <Toaster />
      {isSidebarVisible ?(
          <Box sx={{ display: 'flex', width: '100%', overflowX: 'auto' }}>
             <Sidebar open={open} setOpen={setOpen} />
             <Routes>
        
               <Route path="home" element={<Home />} />
               <Route path="products" element={<Products />} />
               <Route path="admin" element={<Admin />} />
       
               <Route path="verify" element={<Verify />} />
               <Route path="categories" element={<Categories />} />
       
             </Routes>
             </Box>
      ):(
        // Fullscreen Layout for Login Page
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
  
    </>
  )
      
  
  
}
