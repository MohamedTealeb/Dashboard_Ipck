
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../Apis/Users/allUserApi';
import store from '../redux/store';

export default function Table() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Keep if sidebar is used elsewhere
  // const [users, setUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState(false); // Added loading state
  const { allUsers: users = [], loading: isLoading, error } = useSelector((state) => state.user || {}); let x= useSelector(store=>store.users)
console.log(x);

const dispatch = useDispatch();

useEffect(() => {
  dispatch(getAllUsers());
}, [dispatch]);
  // Pagination state
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 60, flex: 0.5 },
    { field: 'email', headerName: 'Email', minWidth: 150, flex: 1 },
    { field: 'role', headerName: 'Role', minWidth: 100, flex: 1 },
    { field: 'createdAt', headerName: 'Created At', minWidth: 150, flex: 1 },
  ];

  // Map users to rows
  const rows = (users || []).map((user) =>  ({
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt, // Fixed case to match column
  }));

  return (
    <Box
      component="main"
      className="transition-all duration-300 flex flex-col w-full overflow-x-hidden"
      sx={{
        flexGrow: 1,
        marginLeft: {
          xs: '0px',
          sm: sidebarOpen ? '50px' : '0px',
        },
        transition: 'margin-left 0.3s ease-in-out',
        padding: {
          xs: '12px',
          sm: '20px',
        },
        marginTop: {
          xs: '56px',
          sm: '64px',
        },
      }}
    >
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="bg-[#3c8dad] text-white rounded-lg shadow-lg flex flex-col items-center p-4 sm:p-8">
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
            {isLoading ? '...' : users.filter((u) => u.role === 'admin').length}
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
          <p className="text-lg sm:text-xl font-bold">{isLoading ? '...' : users.length}</p>
        </div>
      </div>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Paper
        sx={{
          flexGrow: 1,
          width: '100%',
          borderRadius: {
            xs: '8px',
            sm: '12px',
          },
          overflow: 'hidden',
          '& .MuiDataGrid-root': {
            fontSize: {
              xs: '0.875rem',
              sm: '1rem',
            },
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          loading={isLoading} // Show loading overlay
          sx={{
            border: 0,
            width: '100%',
            height: '100%',
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#046584',
              color: 'black',
            },
            '& .MuiDataGrid-cell': {
              padding: {
                xs: '8px 4px',
                sm: '16px',
              },
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
            },
          }}
        />
      </Paper>
    </Box>
  );
}
