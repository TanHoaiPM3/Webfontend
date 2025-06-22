import React from "react";
import {
  Box,
  Paper,
  Typography,
  Snackbar,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import ProductList from "./components/ProductList";
//import ImportOrderForm from "./components/ImportOrderForm";
//import ImportOrderList from "./components/ImportOrderList";
//import ExportOrderForm from "./components/ExportOrderForm";
//import ExportOrderList from "./components/ExportOrderList";
import { createExportOrder } from "./api";

function App() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  const [importTrigger, setImportTrigger] = React.useState(0);
  const [exportTrigger, setExportTrigger] = React.useState(0);
  const [productsTrigger, setProductsTrigger] = React.useState(0);


  const [openProductDialog, setOpenProductDialog] = React.useState(false);

  const [openImportDialog, setOpenImportDialog] = React.useState(false);
  const [openExportDialog, setOpenExportDialog] = React.useState(false);

  const handleImportOrderSuccess = () => {
    setSnackbarMessage("Import order created successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setImportTrigger((prev) => prev + 1);
    setProductsTrigger((prev) => prev + 1);
    setOpenImportDialog(false);
  };

  const handleExportOrderSuccess = () => {
    setSnackbarMessage("Export order created successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setExportTrigger((prev) => prev + 1);
    setProductsTrigger((prev) => prev + 1);
    setOpenExportDialog(false);
  };

// dang khai bao handle cho Product
  const handleProductSuccess = () => {
    setSnackbarMessage("Product created successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
//    setImportTrigger((prev) => prev + 1);
    setProductsTrigger((prev) => prev + 1);
    setOpenProductDialog(false);
  };



  const handleError = (message) => {
    setSnackbarMessage(message || "Something went wrong!");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ height: "100vh", padding: 2, backgroundColor: "#eef2f6", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        fontWeight="bold"
        color="primary"
      >
        Inventory Management
      </Typography>

      {/* Action buttons */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setOpenImportDialog(true)}>
          + Import Order
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setOpenExportDialog(true)}>
          + Export Order
        </Button>
                <Button variant="contained" color="primary" onClick={() => setOpenProductDialog(true)}>
          + Import Product
        </Button>
      </Box>




      {/* Three-column layout */}
      <Box sx={{ display: "flex", gap: 2, flexGrow: 1 }}>
        {/* Import Orders */}
        <Box sx={{ flex: 1 }}>
          {/* <Paper elevation={3} sx={{ padding: 2, borderRadius: 3, height: "100%" }}>
            <Section title="Import Order List">
              <ImportOrderList
                trigger={importTrigger}
                setProductsTrigger={setProductsTrigger}
                onChange={() => setImportTrigger((prev) => prev + 1)}
              />
            </Section>
          </Paper> */}
        </Box>

        {/* Export Orders */}
        <Box sx={{ flex: 1 }}>
          {/* <Paper elevation={3} sx={{ padding: 2, borderRadius: 3, height: "100%" }}>
            <Section title="Export Order List">
              <ExportOrderList trigger={exportTrigger} />
            </Section>
          </Paper> */}
        </Box>

        {/* Product list */}
        <Box sx={{ flex: 1 }}>
          <Paper elevation={3} sx={{ padding: 2, borderRadius: 3, height: "100%" }}>
            <Section title="Product List">
              <ProductList trigger={productsTrigger} />
            </Section>
          </Paper>
        </Box>
      </Box>


{/* setOpenProductDialog */}
      {/* Product Dialog */}
      { <Dialog open={openProductDialog} onClose={() => setOpenProductDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Product</DialogTitle>
        <DialogContent>
          <ProductForm onSuccess={handleProductSuccess} onError={handleError} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProductDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog> }


      {/* Import Order Dialog */}
      {/* <Dialog open={openImportDialog} onClose={() => setOpenImportDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Import Order</DialogTitle>
        <DialogContent>
          <ImportOrderForm onSuccess={handleImportOrderSuccess} onError={handleError} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImportDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog> */}


      {/* Export Order Dialog */}
      {/* <Dialog open={openExportDialog} onClose={() => setOpenExportDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Export Order</DialogTitle>
        <DialogContent>
          <ExportOrderForm
            createExportOrder={createExportOrder}
            onSuccess={handleExportOrderSuccess}
            onError={(msg) => handleError(msg || "Failed to create export order!")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExportDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog> */}











      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function Section({ title, children }) {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" gutterBottom color="text.secondary" fontWeight="bold">
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Box>
  );
}

export default App;
