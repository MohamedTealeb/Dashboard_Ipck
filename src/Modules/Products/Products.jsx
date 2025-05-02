import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { getallproducts } from "../../Apis/ProductsApi/Products";
import { toast } from "react-hot-toast";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Products() {
  const dispatch = useDispatch();
  const { allProducts, loading, error } = useSelector((state) => state.product);

  const [openForm, setOpenForm] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    model: "",
    imageCover: "",
    stock: "",
  });

  const handleOpenForm = (product = null) => {
    if (product) {
      setFormData(product);
      setEditProductId(product._id);
    } else {
      setFormData({ name: "", description: "", price: "", model: "", imageCover: "", stock: "" });
      setEditProductId(null);
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditProductId(null);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      const url = editProductId
        ? `${import.meta.env.VITE_BASEURL}/products/${editProductId}`
        : `${import.meta.env.VITE_BASEURL}/products`;
      const method = editProductId ? "put" : "post";
      await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(editProductId ? "Product updated successfully" : "Product added successfully");
      handleCloseForm();
      dispatch(getallproducts());
    } catch (err) {
      toast.error("Failed to submit product");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASEURL}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Product deleted successfully");
      dispatch(getallproducts());
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    dispatch(getallproducts());
  }, [dispatch]);

  return (
    <Box className="min-h-screen flex flex-col p-4 sm:p-6">
      <Typography variant="h4" className="mb-6 font-bold text-gray-800">
        Products
      </Typography>

      <Button variant="contained" color="primary" onClick={() => handleOpenForm()}>
        Add New Product
      </Button>

      {loading && (
        <Box className="flex justify-center mt-4">
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography color="error" className="mb-4">
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table sx={{ minWidth: 1150 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell align="right">Price ($)</StyledTableCell>
                <StyledTableCell>Model</StyledTableCell>
                <StyledTableCell>Image</StyledTableCell>
                <StyledTableCell align="right">Stock</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allProducts.map((product) => (
                <StyledTableRow key={product._id}>
                  <StyledTableCell>{product.name}</StyledTableCell>
                  <StyledTableCell>{product.description}</StyledTableCell>
                  <StyledTableCell align="right">${product.price}</StyledTableCell>
                  <StyledTableCell>{product.model}</StyledTableCell>
                  <StyledTableCell>
                    <img
                      src={`${import.meta.env.VITE_IMAGEURL}/${product.imageCover}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">{product.stock}</StyledTableCell>
                  <StyledTableCell>
                    <Button variant="outlined" onClick={() => handleOpenForm(product)}>
                      Edit
                    </Button>
                    <Button color="error" onClick={() => handleDeleteProduct(product._id)}>
                      <MdDelete size={20} />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Product Form Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
        <DialogTitle>{editProductId ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="normal" label="Name" name="name" value={formData.name} onChange={handleFormChange} />
          <TextField fullWidth margin="normal" label="Description" name="description" value={formData.description} onChange={handleFormChange} />
          <TextField fullWidth margin="normal" label="Price" name="price" type="number" value={formData.price} onChange={handleFormChange} />
          <TextField fullWidth margin="normal" label="Model" name="model" value={formData.model} onChange={handleFormChange} />
          <TextField fullWidth margin="normal" label="Image URL" name="imageCover" value={formData.imageCover} onChange={handleFormChange} />
          <TextField fullWidth margin="normal" label="Stock" name="stock" type="number" value={formData.stock} onChange={handleFormChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button variant="contained" onClick={handleFormSubmit}>
            {editProductId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
