// import * as React from 'react';
// import {
//   Paper, Table, TableBody, TableCell,
//   TableContainer, TableHead, TablePagination,
//   TableRow, Button, CircularProgress, Typography,
//   Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
// } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { getAllUsers } from '../Apis/Users/allUserApi';
// import { MdDelete } from "react-icons/md";

// const columns = [
//   { id: 'email', label: 'Email', minWidth: 170 },
//   { id: 'role', label: 'Role', minWidth: 100 },
//   { id: 'createdAt', label: 'Created At', minWidth: 170 },
//   { id: 'actions', label: 'Actions', minWidth: 100 },
// ];

// export default function StickyHeadTable() {
//   const dispatch = useDispatch();
//   const { allUsers, loading, error } = useSelector(state => state.user);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedUserId, setSelectedUserId] = useState(null);

//   useEffect(() => {
//     dispatch(getAllUsers());
//   }, [dispatch]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleOpenDialog = (id) => {
//     setSelectedUserId(id);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedUserId(null);
//   };

//   const handleConfirmDelete = async (selectedUserId) => {
//     console.log('Deleting user with ID:', selectedUserId);
    
//     try {
//       await axios.delete(`${import.meta.env.VITE_BASEURL}/users/${selectedUserId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       toast.success('User deleted successfully!');
//       dispatch(getAllUsers());
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       toast.error('Failed to delete user');
//     } finally {
//       handleCloseDialog();
//     }
//   };

//   const rows = (allUsers || []).map((user) => ({
//     id: user._id,
//     email: user.email,
//     role: user.role,
//     createdAt: new Date(user.createdAt).toLocaleString(),
//   }));

//   return (
//     <Paper sx={{ marginTop:'80px', width: '100%', overflow: 'hidden' }}>
//       {loading ? (
//         <CircularProgress sx={{ m: 4 }} />
//       ) : error ? (
//         <Typography color="error" sx={{ m: 4 }}>{error}</Typography>
//       ) : (
//         <>
//           <TableContainer sx={{ maxHeight: 440 }}>
//             <Table stickyHeader aria-label="user table">
//               <TableHead>
//                 <TableRow>
//                   {columns.map((column) => (
//                     <TableCell
//                       key={column.id}
//                       style={{ minWidth: column.minWidth }}
//                     >
//                       {column.label}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rows
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((row) => (
//                     <TableRow  tabIndex={-1} key={row.id}>
//                       <TableCell>{row.email}</TableCell>
//                       <TableCell>{row.role}</TableCell>
//                       <TableCell>{row.createdAt}</TableCell>
//                       <TableCell>
//                         <Button
//                           color="error"
                        
//                           onClick={() => {
//                             handleOpenDialog(row.id)
//                           }}
//                         >
//                           <MdDelete  size={20} />
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[10, 25, 100]}
//             component="div"
//             count={rows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </>
//       )}

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//       >
//         <DialogTitle>Delete User</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this user? This action cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={() => { handleConfirmDelete(selectedUserId) }} color="error" >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Paper>
//   );
// }
import * as React from 'react';
import {
  Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination,
  TableRow, Button, CircularProgress, Typography,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getAllUsers } from '../Apis/Users/allUserApi';
import { MdDelete } from "react-icons/md";

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

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (id) => {
    console.log('Opening delete dialog for user ID:', id); // Debug log
    setSelectedUserId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUserId(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUserId) {
      toast.error('No user selected for deletion');
      return;
    }

    console.log('Deleting user with ID:', selectedUserId);

    try {
      await axios.delete(`${import.meta.env.VITE_BASEURL}/users/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('User deleted successfully!');
      dispatch(getAllUsers());
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    } finally {
      handleCloseDialog();
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
      {loading ? (
        <CircularProgress sx={{ m: 4 }} />
      ) : error ? (
        <Typography color="error" sx={{ m: 4 }}>{error}</Typography>
      ) : (
        <>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="user table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow tabIndex={-1} key={row.id}>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>{row.createdAt}</TableCell>
                      <TableCell>
                        <Button
                          color="error"
                          onClick={() => {
                            if (!row.id) {
                              console.error('Missing user ID in row:', row);
                              toast.error('Cannot delete user without ID');
                              return;
                            }
                            handleOpenDialog(row.id);
                          }}
                        >
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
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

