import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography,
  } from "@mui/material";
  
  export default function ProductFormDialog({
    open,
    onClose,
    formData,
    onFormChange,
    onFormSubmit,
    onImageChange,
    imagePreview,
    categories,
    isEdit,
  }) {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="normal" label="Name" name="name" value={formData.name} onChange={onFormChange} required />
<div style={{ marginTop: '1rem', width: '100%' }}>
  <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
    Description
  </label>
  <textarea
    id="description"
    name="description"
    value={formData.description}
    onChange={onFormChange}
    rows={4}
    style={{
      width: '100%',
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      resize: 'vertical',
    }}
  />
</div>

          <TextField fullWidth margin="normal" label="Price" name="price" type="number" value={formData.price} onChange={onFormChange}  inputProps={{ step: "0.01" }} />
          <TextField fullWidth margin="normal" label="Model" name="model" value={formData.model} onChange={onFormChange} />
          <TextField fullWidth margin="normal" label="Stock" name="stock" type="number" value={formData.stock} onChange={onFormChange} />
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select labelId="category-label" name="category" value={formData.category} onChange={onFormChange} label="Category" required>
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <input type="file" accept="image/jpeg,image/png,image/jpg" onChange={onImageChange} />
          </FormControl>
          {imagePreview && (
            <Box mt={2}>
              <Typography variant="body2">Image Preview:</Typography>
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded mt-2" />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={onFormSubmit}>
            {isEdit ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  