import React from 'react';

import UpdateStudySessionForm from '../Forms/UpdateStudySessionForm';
import CreateStudySessionForm from '../Forms/CreateStudySessionForm';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

export default function UpdateStudySessionDialog({
  openDialog,
  onUpdateDialogClose,
  selectedStudySession
}) {
  return (
    <Dialog open={openDialog} onClose={onUpdateDialogClose}>
      <DialogTitle>
        {selectedStudySession.course.name || 'Loading...'}
      </DialogTitle>
      <DialogContent>
        <CreateStudySessionForm
          oldStudySession={selectedStudySession}
          handleClose={onUpdateDialogClose}
          usage="UPDATE"
        />
      </DialogContent>
      <DialogActions>{/* Dialog actions here */}</DialogActions>
    </Dialog>
  );
}
