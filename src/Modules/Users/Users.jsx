import React, { useState } from "react";
import Sidebar from "../../Components/Shared/Sidebar";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import {
  GridRowModes,
  GridActionsCellItem,
} from "@mui/x-data-grid";

// Helper function to create a formatted date string
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 25,
      joinDate: formatDate('2023-01-15'),
      lastLogin: formatDate('2024-03-10'),
      role: "Admin",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 30,
      joinDate: formatDate('2023-02-20'),
      lastLogin: formatDate('2024-03-12'),
      role: "User",
    },
    {
      id: 3,
      name: "Bob Johnson",
      age: 35,
      joinDate: formatDate('2023-03-10'),
      lastLogin: formatDate('2024-03-11'),
      role: "User",
    },
    {
      id: 4,
      name: "Alice Brown",
      age: 28,
      joinDate: formatDate('2023-04-05'),
      lastLogin: formatDate('2024-03-13'),
      role: "Editor",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      age: 32,
      joinDate: formatDate('2023-05-15'),
      lastLogin: formatDate('2024-03-14'),
      role: "User",
    }
  ]);

  const [rowModesModel, setRowModesModel] = useState({});

  const handleAddUser = () => {
    const id = Date.now();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        name: '',
        age: '',
        joinDate: formatDate(new Date()),
        lastLogin: formatDate(new Date()),
        role: '',
        isNew: true
      }
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }
    }));
  };

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { 
      field: "name", 
      headerName: "Name", 
      width: 180, 
      editable: true,
      flex: 1,
      minWidth: 150
    },
    { 
      field: "age", 
      headerName: "Age", 
      type: "number", 
      width: 80, 
      editable: true,
      minWidth: 60
    },
    { 
      field: "joinDate", 
      headerName: "Join Date", 
      width: 120, 
      editable: false,
      minWidth: 100,
      hide: window.innerWidth < 600
    },
    { 
      field: "lastLogin", 
      headerName: "Last Login", 
      width: 120, 
      editable: false,
      minWidth: 100,
      hide: window.innerWidth < 600
    },
    { 
      field: "role", 
      headerName: "Role", 
      width: 100, 
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Admin', 'Editor', 'User'],
      minWidth: 80
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div className="min-h-screen flex">
      <Sidebar onSidebarChange={setSidebarOpen} />
      <Box
        component="main"
        className="transition-all duration-300 flex flex-col w-full"
        sx={{
          flexGrow: 1,
          marginLeft: sidebarOpen ? { xs: '0', sm: '50px' } : '0px',
          transition: "margin-left 0.3s ease-in-out",
          padding: { xs: '10px', sm: '20px' },
          marginTop: { xs: '56px', sm: '64px' },
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: { xs: 2, sm: 3 },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 }
        }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#046584',
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontWeight: 'bold'
            }}
          >
            User Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddUser}
            sx={{
              bgcolor: '#046584',
              color: 'white',
              py: { xs: 1, sm: 1.5 },
              px: { xs: 3, sm: 4 },
              '&:hover': {
                bgcolor: '#035673'
              },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Add New User
          </Button>
        </Box>

        <Paper
          sx={{
            height: { xs: 'calc(100vh - 180px)', sm: 'calc(100vh - 200px)' },
            width: "100%",
            overflow: "hidden",
            borderRadius: { xs: '8px', sm: '12px' },
            boxShadow: { xs: 1, sm: 2 }
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            sx={{
              border: 0,
              '& .MuiDataGrid-cell': {
                padding: { xs: '8px 4px', sm: '16px' },
                fontSize: { xs: '0.875rem', sm: '1rem' }
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#046584',
                color: 'white'
              },
              '& .MuiDataGrid-footer': {
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }
            }}
          />
        </Paper>
      </Box>
    </div>
  );
}