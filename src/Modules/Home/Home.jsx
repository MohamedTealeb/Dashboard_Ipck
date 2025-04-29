import React, { useState, useContext } from 'react'
import Sidebar from '../../Components/Shared/Sidebar'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Table from '../../Components/Table';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
 
  return <>
    <div className='min-h-screen flex'>
      
      <Sidebar onSidebarChange={setSidebarOpen} />
        
      <Table />
      
      
    </div>
  </>
}
