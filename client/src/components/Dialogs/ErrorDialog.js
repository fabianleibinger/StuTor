import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function ErrorDialog({ errorMessage, dialogOpen }) {
  const [open, setOpen] = useState(dialogOpen);

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleDialogClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        sx={{ color: "#1976d2", textAlign: "center", fontSize: "25" }}
      >
        {"Sorry, no study session with this name available at this moment"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-slide-description"
          sx={{
            fontWeight: "bold",
            color: "black",
            fontSize: "20px",
            textAlign: "center",
          }}
        >
          {errorMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleDialogClose} size="large">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
