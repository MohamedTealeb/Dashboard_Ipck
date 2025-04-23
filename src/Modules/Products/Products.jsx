import Sidebar from '../../Components/Shared/Sidebar'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import logo from '../../assets/WhatsApp Image 2025-04-17 at 15.34.26_678dceb0.jpg'

export default function Products() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({ 
    name: '', 
    code: '', 
    population: '', 
    size: '' 
  });

  const columns = [
    { 
      id: 'logo', 
      label: 'Logo', 
      minWidth: isMobile ? 60 : 100,
      format: (value) => (
        <img 
          src={value} 
          alt="logo" 
          style={{ 
            width: isMobile ? '40px' : '50px', 
            height: isMobile ? '40px' : '50px', 
            objectFit: 'cover',
            borderRadius: '50%'
          }} 
        />
      )
    },
    { 
      id: 'name', 
      label: 'Name', 
      minWidth: isMobile ? 120 : 170 
    },
    { 
      id: 'code', 
      label: 'ISO\u00a0Code', 
      minWidth: isMobile ? 80 : 100 
    },
    {
      id: 'population',
      label: 'Population',
      minWidth: isMobile ? 120 : 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: isMobile ? 120 : 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: isMobile ? 100 : 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];
  
  function createData(name, code, population, size, logo) {
    const density = population / size;
    return { name, code, population, size, density, logo };
  }
  
  const [rows, setRows] = React.useState([
    createData('India', 'IN', 1324171354, 3287263, logo),
    createData('China', 'CN', 1403500365, 9596961, logo),
    createData('Italy', 'IT', 60483973, 301340, logo),
    createData('United States', 'US', 327167434, 9833520, logo),
    createData('Canada', 'CA', 37602103, 9984670, logo),
    createData('Australia', 'AU', 25475400, 7692024, logo),
    createData('Germany', 'DE', 83019200, 357578, logo),
    createData('Ireland', 'IE', 4857000, 70273, logo),
    createData('Mexico', 'MX', 126577691, 1972550, logo),
    createData('Japan', 'JP', 126317000, 377973, logo),
    createData('France', 'FR', 67022000, 640679, logo),
    createData('United Kingdom', 'GB', 67545757, 242495, logo),
    createData('Russia', 'RU', 146793744, 17098246, logo),
    createData('Nigeria', 'NG', 200962417, 923768, logo),
    createData('Brazil', 'BR', 210147125, 8515767, logo),
  ]);
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(isMobile ? 5 : 10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const newRow = createData(
      form.name,
      form.code,
      Number(form.population),
      Number(form.size),
      logo
    );
    setRows([...rows, newRow]);
    setForm({ name: '', code: '', population: '', size: '' });
    setOpen(false);
  };

  return (
    <>
      <div className='min-h-screen flex'>
        <Sidebar onSidebarChange={setSidebarOpen} />
        <Box 
          p={isMobile ? 2 : 4} 
          sx={{ 
            flexGrow: 1,
            width: '100%',
            overflow: 'auto'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            mb: 3,
            gap: 2
          }}>
            <Typography variant={isMobile ? "h5" : "h4"}>Products Management</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => setOpen(true)}
              fullWidth={isMobile}
            >
              Add New Product
            </Button>
          </Box>

          <Paper sx={{ 
            width: '100%', 
            overflow: 'hidden',
            boxShadow: isMobile ? 'none' : theme.shadows[1]
          }}>
            <TableContainer sx={{ 
              maxHeight: isMobile ? 300 : 440,
              '& .MuiTableCell-root': {
                padding: isMobile ? '8px' : '16px'
              }
            }}>
              <Table stickyHeader aria-label="sticky table" size={isMobile ? "small" : "medium"}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={1}>
                      Logo
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      Country
                    </TableCell>
                    <TableCell align="center" colSpan={3}>
                      Details
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ 
                          top: isMobile ? 45 : 57, 
                          minWidth: column.minWidth,
                          fontSize: isMobile ? '0.75rem' : '0.875rem'
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell 
                                key={column.id} 
                                align={column.align}
                                sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                              >
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : column.format && column.id === 'logo'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={isMobile ? [5, 10, 25] : [10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

          {/* Add Product Dialog */}
          <Dialog 
            open={open} 
            onClose={() => setOpen(false)}
            fullScreen={isMobile}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Add New Product</DialogTitle>
            <DialogContent sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2, 
              minWidth: isMobile ? 'auto' : 400,
              pt: 2
            }}>
              <TextField 
                label="Name" 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                fullWidth
                size={isMobile ? "small" : "medium"}
              />
              <TextField 
                label="Code" 
                name="code" 
                value={form.code} 
                onChange={handleChange} 
                fullWidth
                size={isMobile ? "small" : "medium"}
              />
              <TextField 
                label="Population" 
                name="population" 
                value={form.population} 
                onChange={handleChange} 
                type="number"
                fullWidth
                size={isMobile ? "small" : "medium"}
              />
              <TextField 
                label="Size (km²)" 
                name="size" 
                value={form.size} 
                onChange={handleChange} 
                type="number"
                fullWidth
                size={isMobile ? "small" : "medium"}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleAdd}>Add</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    </>
  );
}
