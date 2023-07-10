import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmationDialog({ open, onCancel, onConfirmation }) {
  const handleClose = () => {
    open = false;
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleConfirmation = async () => {
    await onConfirmation();
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onBackdropClick={handleCancel}
      >
        <DialogTitle id="alert-dialog-title" variant="h4">
          {'Delete Study Session'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this Study Session?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmation} size="large">
            Confirm
          </Button>
          <Button
            onClick={handleCancel}
            autoFocus
            variant="contained"
            size="large"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
