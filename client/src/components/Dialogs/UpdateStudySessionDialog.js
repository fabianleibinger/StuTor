import React from 'react';
import { useState } from 'react';

import CreateStudySessionForm from '../Forms/CreateStudySessionForm';
import { BootstrapDialog } from '../../styles';

import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function UpdateStudySessionDialog({
  openDialog,
  onUpdateDialogClose,
  selectedStudySession
}) {
  const [step, setStep] = useState(1);
  return (
    <BootstrapDialog open={openDialog} onClose={onUpdateDialogClose}>
      {step === 2 && (
        <IconButton
          onClick={() => setStep(1)}
          sx={{
            position: 'absolute',
            left: 5,
            top: 5,
            '&:hover': {
              backgroundColor: 'lightgray'
            }
          }}
          size="large"
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      <DialogTitle sx={{ textAlign: 'center' }} variant="h4">
        {selectedStudySession.courseName || 'Loading...'}
      </DialogTitle>
      <DialogContent>
        <CreateStudySessionForm
          oldStudySession={selectedStudySession}
          handleClose={onUpdateDialogClose}
          usage="UPDATE"
          step={step}
          setStep={setStep}
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
