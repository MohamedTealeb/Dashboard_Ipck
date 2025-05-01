import React, { useState, useContext } from 'react'
import Sidebar from '../../Components/Shared/Sidebar'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Table from '../../Components/Table';
import { useSelector } from 'react-redux';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { allUsers, loading, error } = useSelector(state => state.user) ; 
 
  return <>
    <div className='min-h-screen flex'>
      
     
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-25 mt-10 h-10 sm:gap-4 mb-3 sm:mb-4">
        <div className="bg-[#3c8dad] text-white rounded-lg  shadow-lg flex flex-col items-center p-4 sm:p-8">
          <div className="text-xl sm:text-2xl">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 fill-current inline-block"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-sm sm:text-lg font-semibold mt-2">Admin</h3>
          <p className="text-lg sm:text-xl font-bold">
            {loading ? '...' : allUsers.filter((u) => u.role === 'admin').length}
          </p>
        </div>
        <div className="bg-[#3c8dad] text-white rounded-lg shadow-lg flex flex-col items-center p-4 sm:p-8">
          <div className="text-xl sm:text-2xl">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 fill-current inline-block"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
              />
            </svg>
          </div>
          <h3 className="text-sm sm:text-lg font-semibold mt-2">Users</h3>
          <p className="text-lg sm:text-xl font-bold">{loading ? '...' : allUsers.length}</p>
        </div>
      </div>

   
      
      
    </div>
  </>
}
