import React from 'react';

import CreateStudySessionForm from '../Forms/CreateStudySessionForm';
import { BootstrapDialog } from '../../styles';

import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';

export default function UpdateStudySessionDialog({
  openDialog,
  onUpdateDialogClose,
  selectedStudySession
}) {
  return (
    <BootstrapDialog open={openDialog} onClose={onUpdateDialogClose}>
      <DialogTitle sx={{ textAlign: 'center' }} variant="h4">
        {selectedStudySession.course.name || 'Loading...'}
      </DialogTitle>
      <DialogContent>
        <CreateStudySessionForm
          oldStudySession={selectedStudySession}
          handleClose={onUpdateDialogClose}
          usage="UPDATE"
        />
      </DialogContent>
      <Button
        id="cancelCreationButton"
        variant="contained"
        size="large"
        sx={{
          margin: '0 auto',
          backgroundColor: 'lightgray',
          color: 'black',
          width: '175px'
        }}
        onClick={() => onUpdateDialogClose()}
      >
        Cancel
      </Button>
      <DialogActions>{/* Dialog actions here */}</DialogActions>
    </BootstrapDialog>
  );
}
