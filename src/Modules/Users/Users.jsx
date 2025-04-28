import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Shared/Sidebar";

import Table from "../../Components/Table";



export default function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setuser] = useState([]);
  return <>
    <div className='min-h-screen flex'>
        <Sidebar onSidebarChange={setSidebarOpen} />
        <Table />
        
        
      </div>
  
  
  
  </>}
  
  