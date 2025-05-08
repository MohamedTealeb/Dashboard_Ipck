import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

export default function DeleteConfirmDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this product? This action cannot be undone.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
