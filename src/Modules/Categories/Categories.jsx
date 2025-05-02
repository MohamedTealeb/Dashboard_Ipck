import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
  CircularProgress,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllCategories } from "../../Apis/CategoryApi/CategoryApi";
import { toast } from "react-hot-toast";

export default function Categories() {
  const dispatch = useDispatch();
  const { allCategories, loading, error } = useSelector((state) => state.category);

  const [openForm, setOpenForm] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [formData, setFormData] = useState({ name: "", image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleOpenForm = (category = null) => {
    if (category) {
      setFormData({ name: category.name || "", image: null });
      setImagePreview(category.image ? `${import.meta.env.VITE_IMAGEURL}/${category.image}` : null);
      setEditCategoryId(category._id);
    } else {
      setFormData({ name: "", image: null });
      setImagePreview(null);
      setEditCategoryId(null);
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditCategoryId(null);
    setFormData({ name: "", image: null });
    setImagePreview(null);
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
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async () => {
    try {
      if (!formData.name) {
        toast.error("Category name is required");
        return;
      }
      if (!editCategoryId && !formData.image) {
        toast.error("Category image is required for new categories");
        return;
      }

      const url = editCategoryId
        ? `${import.meta.env.VITE_BASEURL}/categories/${editCategoryId}`
        : `${import.meta.env.VITE_BASEURL}/categories`;
      const method = editCategoryId ? "put" : "post";

      const data = new FormData();
      data.append("name", formData.name);
      if (formData.image) {
        data.append("image", formData.image);
      }

      await axios[method](url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(editCategoryId ? "Category updated successfully" : "Category added successfully");
      handleCloseForm();
      dispatch(getAllCategories());
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to submit category";
      toast.error(errorMessage);
      console.error("Submit error:", err.response?.data);
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setSelectedCategoryId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedCategoryId(null);
  };

  const handleDeleteCategory = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASEURL}/categories/${selectedCategoryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Category deleted successfully");
      dispatch(getAllCategories());
    } catch (err) {
      toast.error("Failed to delete category");
      console.error("Delete error:", err.response?.data);
    } finally {
      handleCloseDeleteDialog();
    }
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <Box className="min-h-screen w-full flex flex-col p-4 mt-10 sm:p-6">
      

      <Button variant="contained" color="primary" onClick={() => handleOpenForm()} sx={{ mb: 4 }}>
        Add New Category
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
        <Grid container spacing={3}>
          {allCategories.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ maxWidth: 380, height: "100%", display: "flex", flexDirection: "column" }}>
                {item.image ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={`${import.meta.env.VITE_IMAGEURL}/${item.image}`}
                    alt={item.name}
                    sx={{ objectFit: "cover" }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 200,
                      bgcolor: "grey.200",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      No Image
                    </Typography>
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div">
                    {item.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="outlined" size="small" onClick={() => handleOpenForm(item)}>
                    Edit
                  </Button>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => handleOpenDeleteDialog(item._id)}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        fullWidth
        maxWidth="sm"
        disableRestoreFocus
        disablePortal
      >
        <DialogTitle>{editCategoryId ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" component="label" htmlFor="category-image">
              Category Image {editCategoryId ? "(Optional)" : "(Required)"}
            </Typography>
            <input
              type="file"
              id="category-image"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleImageChange}
              style={{ display: "block", marginTop: "8px" }}
            />
          </Box>
          {imagePreview && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">Image Preview:</Typography>
              <img
                src={imagePreview}
                alt="Category preview"
                style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button variant="contained" onClick={handleFormSubmit}>
            {editCategoryId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this category? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDeleteCategory}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}