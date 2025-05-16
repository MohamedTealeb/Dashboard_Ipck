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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { getAllCategories } from "../../Apis/CategoryApi/CategoryApi";
import { getallproducts } from "../../Apis/ProductsApi/Products";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

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
  const { allCategories } = useSelector((state) => state.category);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openForm, setOpenForm] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [additionalPreviews, setAdditionalPreviews] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    model: "",
    stock: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleOpenDeleteDialog = (id) => {
    setSelectedProductId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedProductId(null);
  };
  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) =>
        ["image/jpeg", "image/png", "image/jpg"].includes(file.type) &&
        file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length !== files.length) {
      toast.error("Only JPEG/PNG/JPG images under 5MB are allowed");
    }

    setAdditionalImages(validFiles);

    const previews = validFiles.map((file) => URL.createObjectURL(file));
    setAdditionalPreviews(previews);
  };

  const handleOpenForm = (product = null) => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price !== undefined ? product.price.toString() : "",
        model: product.model || "",
        stock: product.stock !== undefined ? product.stock.toString() : "",
        category: product.category || "",
      });
      setImagePreview(
        product.imageCover
          ? `${import.meta.env.VITE_IMAGEURL}/${product.imageCover}`
          : null
      );
      setEditProductId(product._id);
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        model: "",
        stock: "",
        category: "",
      });
      setImageFile(null);
      setImagePreview(null);
      setEditProductId(null);
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditProductId(null);
    setImageFile(null);
    setImagePreview(null);
    setAdditionalImages([]);
    setAdditionalPreviews([]);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        toast.error("Only JPEG, JPG, or PNG images are allowed");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async () => {
    try {
      if (
        !formData.name ||!formData.category
      ) {
        toast.error("Name  and category are required");
        return;
      }
      if (!editProductId && !imageFile) {
        toast.error("Image is required for new products");
        return;
      }

      const url = editProductId
        ? `${import.meta.env.VITE_BASEURL}/products/${editProductId}`
        : `${import.meta.env.VITE_BASEURL}/products`;
      const method = editProductId ? "put" : "post";

      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description || "");
     if (formData.price) {
  data.append("price", parseFloat(formData.price));
}
if (formData.stock) {
  data.append("stock", parseInt(formData.stock, 10));
}
data.append("model", formData.model); // Assuming model is a string


      data.append("category", formData.category);
      if (imageFile) data.append("imageCover", imageFile);
      additionalImages.forEach((img) => data.append("images", img));
      

      await axios[method](url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        editProductId
          ? "Product updated successfully"
          : "Product added successfully"
      );
      handleCloseForm();
      dispatch(getallproducts());
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to submit product";
        console.log(err);
        
      toast.error(errorMessage);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASEURL}/products/${selectedProductId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Product deleted successfully");
      dispatch(getallproducts());
    } catch (err) {
      toast.error("Failed to delete product");
    } finally {
      handleCloseDeleteDialog();
    }
  };

  useEffect(() => {
    dispatch(getallproducts({}));
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <Box className="min-h-screen flex flex-col p-4 sm:p-6 mt-10 space-y-4">
      <div className="flex justify-between items-center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenForm()}
        >
          Add New Product
        </Button>
        <select
          className="ml-4 border rounded p-2 outline-none cursor-pointer"
          onChange={(e) =>
            dispatch(getallproducts({ category: e.target.value }))
          }
        >
          <option value="">كل الفئات</option>
          {allCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
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
        <TableContainer
          component={Paper}
          sx={{ overflowX: isMobile ? "auto" : "visible" }}
        >
          <Table className="min-w-[600px]" size={isMobile ? "small" : "medium"}>
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
      <StyledTableCell>
        {product.description || "N/A"}
      </StyledTableCell>
      <StyledTableCell align="right">
        ${Number.isFinite(product.price) ? product.price.toFixed(2) : "N/A"}
      </StyledTableCell>
      <StyledTableCell>{product.model || "N/A"}</StyledTableCell>
      <StyledTableCell>
        {product.imageCover ? (
          <img
            src={`${import.meta.env.VITE_IMAGEURL}/${product.imageCover}`}
            alt={product.name}
            className="w-16 h-16 object-cover rounded"
          />
        ) : (
          "N/A"
        )}
      </StyledTableCell>
      <StyledTableCell align="right">
        {Number.isFinite(product.stock) ? product.stock : "N/A"}
      </StyledTableCell>
      <StyledTableCell>
        <Button
          variant="outlined"
          onClick={() => handleOpenForm(product)}
        >
          Edit
        </Button>
        <Button
          color="error"
          onClick={() => handleOpenDeleteDialog(product._id)}
        >
          <MdDelete size={20} />
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  ))}
</TableBody>

          </Table>
        </TableContainer>
      )}

      {/* Form Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
        <DialogTitle>
          {editProductId ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleFormChange}
            required
            inputProps={{ step: "0.01" }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleFormChange}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={formData.category}
              onChange={handleFormChange}
              label="Category"
              required
            >
              {allCategories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel shrink htmlFor="imageCover">
              Image Cover
            </InputLabel>
            <input
              type="file"
              id="imageCover"
              name="imageCover"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleImageChange}
              className="mt-2"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel shrink htmlFor="images">
              Additional Images
            </InputLabel>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/jpeg,image/png,image/jpg"
              multiple
              onChange={handleAdditionalImagesChange}
              className="mt-2"
            />
          </FormControl>
          {additionalPreviews.length > 0 && (
            <Box mt={2}>
              <Typography variant="body2">
                Additional Images Preview:
              </Typography>
              <Box className="flex flex-wrap gap-2 mt-2">
                {additionalPreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Preview ${idx}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </Box>
            </Box>
          )}
          {imagePreview && (
            <Box mt={2}>
              <Typography variant="body2">Image Preview:</Typography>
              <img
                src={imagePreview}
                alt="Product preview"
                className="w-32 h-32 object-cover rounded mt-2"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button variant="contained" onClick={handleFormSubmit}>
            {editProductId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteProduct}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
