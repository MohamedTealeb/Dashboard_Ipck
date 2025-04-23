import React, { useState } from 'react';
import {
  Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField,
  DialogActions, useTheme, useMediaQuery} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'

import Sidebar from './../../Components/Shared/Sidebar';

export default function Admin() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const initialAdmins = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Super Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
  ];
  const [admins, setAdmins] = useState(initialAdmins);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = () => {
    setAdmins([
      ...admins,
      { id: admins.length + 1, ...form }
    ]);
    setForm({ name: '', email: '', role: '' });
    setOpen(false);
  };

  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <div className='flex flex-1 '>
          <Sidebar onSidebarChange={setSidebarOpen} />
          <Box 
            p={{ xs: 2, sm: 3, md: 4 }} 
            width="100%"
            sx={{
              
              transition: 'margin-left 0.3s',
              marginLeft: sidebarOpen ? '240px' : '64px',
              [theme.breakpoints.down('sm')]: {
                marginLeft: 0,
                padding: 2
              },
              display: 'flex',
              flexDirection: 'column',
              minHeight: 'calc(100vh - 64px)', // Subtract the height of the bottom bar
              pb: 8 // Add padding at the bottom to prevent content from being hidden
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h4">Admin Management</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => setOpen(true)}
                size={isMobile ? "small" : "medium"}
              >
                Add New Admin
              </Button>
            </Box>

            <Box 
              flex={1}
              width="100%"
              sx={{
                '& .MuiDataGrid-root': {
                  width: '100%',
                  height: '100%'
                }
              }}
            >
              <DataGrid
                rows={admins}
                columns={[
                  { field: 'id', headerName: 'ID', width: 90 },
                  { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
                  { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
                  { field: 'role', headerName: 'Role', flex: 1, minWidth: 150 }
                ]}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 5, page: 0 },
                  },
                }}
                pageSizeOptions={[5, 10, 25]}
                autoHeight={false}
              />
            </Box>

            <Dialog 
              open={open} 
              onClose={() => setOpen(false)}
              maxWidth="sm"
              fullWidth
              PaperProps={{
                sx: {
                  width: { xs: '90%', sm: '80%', md: '50%' },
                  maxWidth: '600px'
                }
              }}
            >
              <DialogTitle>Add New Admin</DialogTitle>
              <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                <TextField 
                  label="Name" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange}
                  fullWidth
                  size={isMobile ? "small" : "medium"}
                />
                <TextField 
                  label="Email" 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange}
                  fullWidth
                  size={isMobile ? "small" : "medium"}
                />
                <TextField 
                  label="Role" 
                  name="role" 
                  value={form.role} 
                  onChange={handleChange}
                  fullWidth
                  size={isMobile ? "small" : "medium"}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)} size={isMobile ? "small" : "medium"}>Cancel</Button>
                <Button variant="contained" onClick={handleAdd} size={isMobile ? "small" : "medium"}>Add</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </div>
      </div>
    </>
  );
}
