import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { createProduct } from "../api";

export default function ProductForm({ onSuccess, onError }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({ code, name, quantity });
      onSuccess();
      setCode("");
      setName("");
      setQuantity(0);
    } catch (err) {
      console.error(err);
      onError("Failed to create product!");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Product Code"
        value={code}
        required
        onChange={(e) => setCode(e.target.value)}
      />
      <TextField
        label="Product Name"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        required
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <Button type="submit" variant="contained" color="primary">
        Create Product
      </Button>
    </Box>
  );
}
