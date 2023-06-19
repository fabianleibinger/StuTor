import React from 'react';

import UpdateStudySessionForm from '../Forms/UpdateStudySessionForm';

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
        <UpdateStudySessionForm
          studySession={selectedStudySession}
          onClose={onUpdateDialogClose}
        />
      </DialogContent>
      <DialogActions>{/* Dialog actions here */}</DialogActions>}
    </Dialog>
  );
}
