import React from 'react';

import CreateStudySessionForm from '../Forms/CreateStudySessionForm';
import { BootstrapDialog } from '../../styles';

import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box
} from '@mui/material';

export default function UpdateStudySessionDialog({
  openDialog,
  onUpdateDialogClose,
  selectedStudySession
}) {
  return (
    <BootstrapDialog open={openDialog} onClose={onUpdateDialogClose}>
      <DialogTitle sx={{ textAlign: 'center' }} variant="h4">
        {selectedStudySession.courseName || 'Loading...'}
      </DialogTitle>
      <DialogContent>
        <CreateStudySessionForm
          oldStudySession={selectedStudySession}
          handleClose={onUpdateDialogClose}
          usage="UPDATE"
        />
        <Box id="cancelUpdateButtonBox" sx={{ textAlign: 'center', mt: 3 }}>
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
        </Box>
      </DialogContent>
      <DialogActions>{/* Dialog actions here */}</DialogActions>
    </BootstrapDialog>
  );
}
