import * as React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, Button, CircularProgress,
  Typography, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Stack, MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getAllUsers } from '../Apis/Users/allUserApi';
import { MdDelete } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import { AiOutlineUserAdd } from 'react-icons/ai';

const columns = [
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'role', label: 'Role', minWidth: 100 },
  { id: 'createdAt', label: 'Created At', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

const roleOptions = ['admin', 'user'];

export default function StickyHeadTable() {
  const dispatch = useDispatch();
  const { allUsers, loading, error } = useSelector((state) => state.user);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [formType, setFormType] = useState('add');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDeleteDialog = (id) => {
    setSelectedUserId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedUserId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASEURL}/auth/user/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('User deleted successfully!');
      dispatch(getAllUsers());
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete user');
    } finally {
      handleCloseDeleteDialog();
    }
  };

  const handleOpenFormDialog = (type, user = {}) => {
    setFormType(type);
    setFormData({
      email: user.email || '',
      password: '',
      role: user.role || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
    });
    setSelectedUserId(user.id || user._id || null);
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    setSelectedUserId(null);
    setFormData({ email: '', password: '', role: '', firstName: '', lastName: '', phone: '' });
  };

  const handleFormSubmit = async () => {
    if (formType === 'add') {
      if (!formData.email || !formData.password || !formData.role) {
        toast.error('Email, password, and role are required');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address');
        return;
      }
    }

    const url = formType === 'add'
      ? `${import.meta.env.VITE_BASEURL}/auth/signup`
      : `${import.meta.env.VITE_BASEURL}/auth/user/${selectedUserId}`;
    const method = formType === 'add' ? 'post' : 'put';

    const payload = formType === 'add'
      ? {
          email: formData.email,
          password: formData.password,
          role: formData.role,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        }
      : { role: formData.role }; // Only send role for edit

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Remove if signup doesn't require token
    };

    try {
      console.log('Submitting payload:', payload);
      await axios[method](url, payload, { headers });
      toast.success(`User ${formType === 'add' ? 'created' : 'updated'} successfully!`);
      dispatch(getAllUsers());
      handleCloseFormDialog();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
      console.error('Error submitting form:', error.response?.data || error);
      toast.error(`Failed to ${formType === 'add' ? 'create' : 'update'} user: ${errorMessage}`);
    }
  };

  const rows = (allUsers || []).map((user) => {
    const id = user._id || user.id;
    return {
      id,
      email: user.email,
      role: user.role,
      createdAt: new Date(user.createdAt).toLocaleString(),
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
    };
  });

  return (
    <Paper sx={{ marginTop: '80px', width: '100%', overflow: 'hidden' }}>
      <Stack direction="row" justifyContent="flex-end" p={2}>
        <Button
          variant="contained"
          startIcon={<AiOutlineUserAdd />}
          onClick={() => handleOpenFormDialog('add')}
        >
          Add User
        </Button>
      </Stack>

      {loading ? (
        <CircularProgress sx={{ m: 4 }} />
      ) : error ? (
        <Typography color="error" sx={{ m: 4 }}>{error}</Typography>
      ) : (
        <>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.createdAt}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleOpenFormDialog('edit', row)}>
                        <FaUserEdit size={18} />
                      </Button>
                      <Button color="error" onClick={() => handleOpenDeleteDialog(row.id)}>
                        <MdDelete size={20} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>Are you sure you want to delete this user?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit User Dialog */}
      <Dialog open={openFormDialog} onClose={handleCloseFormDialog} fullWidth >
        <DialogTitle>{formType === 'add' ? 'Add New User' : 'Edit User Role'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {formType === 'add' && (
              <>
                <TextField
                  label="Email"
                  fullWidth
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <TextField
                  label="First Name"
                  fullWidth
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                <TextField
                  label="Last Name"
                  fullWidth
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
                <TextField
                  label="Phone"
                  fullWidth
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </>
            )}
            <FormControl fullWidth>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={formData.role}
                label="Role"
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              >
                {roleOptions.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFormDialog}>Cancel</Button>
          <Button onClick={handleFormSubmit} variant="contained">
            {formType === 'add' ? 'Add' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}