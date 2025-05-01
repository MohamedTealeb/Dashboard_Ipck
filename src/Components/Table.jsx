

import * as React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, Button, CircularProgress,
  Typography, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Stack
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getAllUsers } from '../Apis/Users/allUserApi';
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";

const columns = [
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'role', label: 'Role', minWidth: 100 },
  { id: 'createdAt', label: 'Created At', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

export default function StickyHeadTable() {
  const dispatch = useDispatch();
  const { allUsers, loading, error } = useSelector(state => state.user);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [formType, setFormType] = useState('add'); // 'add' or 'edit'
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [formData, setFormData] = useState({ role: '' });

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
      toast.error('Failed to delete user');
    } finally {
      handleCloseDeleteDialog();
    }
  };

  const handleOpenFormDialog = (type, user = {}) => {
    setFormType(type);
    setFormData({
      role: user.role || '',
    });
    setSelectedUserId(user.id || null);
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    setSelectedUserId(null);
    setFormData({  role: '' });
  };

  const handleFormSubmit = async () => {
    const url = formType === 'add'
      ? `${import.meta.env.VITE_BASEURL}/auth/user`
      : `${import.meta.env.VITE_BASEURL}/auth/user/${selectedUserId}`;
    const method = formType === 'add' ? 'post' : 'put';

    try {
      await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      toast.success(`User ${formType === 'add' ? 'created' : 'updated'} successfully!`);
      dispatch(getAllUsers());
      handleCloseFormDialog();
    } catch (error) {
      console.error(`Error ${formType === 'add' ? 'creating' : 'updating'} user:`, error);
      toast.error(`Failed to ${formType === 'add' ? 'create' : 'update'} user`);
    }
  };

  const rows = (allUsers || []).map((user) => {
    const id = user._id || user.id;
    return {
      id,
      email: user.email,
      role: user.role,
      createdAt: new Date(user.createdAt).toLocaleString(),
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>Are you sure you want to delete this user?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Form Dialog */}
      <Dialog open={openFormDialog} onClose={handleCloseFormDialog}>
        <DialogTitle>{formType === 'add' ? 'Add New User' : 'Edit User'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Role"
              fullWidth
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
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
