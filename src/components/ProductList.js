import { useEffect, useState } from "react";
import { fetchProducts, updateProduct, deleteProduct } from "../api";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function ProductList({ trigger }) {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  const fetchList = async () => {
    try {
      const res = await fetchProducts();
      const data = Array.isArray(res) ? res : res?.data || [];
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchList();
  }, [trigger]);

  const openEditDialog = (product) => {
    setEditingProduct(product);
    setEditedProduct({ ...product });
  };

  const handleChange = (field, value) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateProduct(editedProduct);
      setEditingProduct(null);
      fetchList();
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  const handleDelete = async (code) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct({code});
        fetchList();
      } catch (err) {
        console.error("Failed to delete product:", err);
      }
    }
  };

  return (
    <Box>
      <TableContainer component={Paper} elevation={0}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f9fafb" }}>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Code</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Qty
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.code} hover>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.code}</TableCell>
                <TableCell align="right">{p.quantity}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => openEditDialog(p)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(p.code)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {products.length === 0 && (
        <Box p={2}>
          <Typography color="text.secondary" align="center">
            No products found.
          </Typography>
        </Box>
      )}

      {/* Edit dialog */}
      <Dialog
        open={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            margin="normal"
            label="Product Name"
            value={editedProduct.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Quantity"
            type="number"
            value={editedProduct.quantity || ""}
            onChange={(e) => handleChange("quantity", e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingProduct(null)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
