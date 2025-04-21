import React, { useState } from 'react';
import {
  Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField,
  DialogActions} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import Sidebar from './../../Components/Shared/Sidebar';

export default function Admin() {
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
      <Sidebar/>
      <Box p={4}>
          <Typography variant="h4" mb={3}>Admin Management</Typography>
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Add New Admin
          </Button>

          <Box mt={3} height={400}>
            <DataGrid
              rows={admins}
              columns={[
                { field: 'id', headerName: 'ID', width: 90 },
                { field: 'name', headerName: 'Name', flex: 1 },
                { field: 'email', headerName: 'Email', flex: 1 },
                { field: 'role', headerName: 'Role', flex: 1 }
              ]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5, page: 0 },
                },
              }}
            />
          </Box>

          {/* Add Admin Dialog */}
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Add New Admin</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Name" name="name" value={form.name} onChange={handleChange} />
              <TextField label="Email" name="email" value={form.email} onChange={handleChange} />
              <TextField label="Role" name="role" value={form.role} onChange={handleChange} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleAdd}>Add</Button>
            </DialogActions>
          </Dialog>
        </Box>
    </>
  );
}
