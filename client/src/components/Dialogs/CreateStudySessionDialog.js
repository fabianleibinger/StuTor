import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

import CreateStudySessionForm from '../Forms/CreateStudySessionForm';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  },
  '& .MuiPaper-root': {
    maxWidth: '600px',
    minWidth: '45vw',
    minHeight: '50vh',
    maxHeight: '65vh'
  }
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 1, p: 2, textAlign: 'center' }} {...other}>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

export default function CreateStudySessionDialog({ role }) {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(1);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          textAlign: 'center',
          visibility: role === 'TUTOR' ? 'visible' : 'hidden',
          pointerEvents: role === 'TUTOR' ? 'auto' : 'none'
        }}
        size="large"
      >
        + Add new Study Session
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="createNewStudySession"
        open={open}
      >
        {step === 2 && (
          <IconButton
            onClick={() => setStep(1)}
            sx={{ position: 'absolute', left: '8px', top: '8px' }}
            size="large"
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <BootstrapDialogTitle id="createNewStudySession" onClose={handleClose}>
          Create a new Study Session
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography sx={{ textAlign: 'center', pb: 3 }} variant="h5">
            Create a new study session that you want ot offer for other
            students. Provide necessary data such that new students get to know
            you and your offer.
          </Typography>
          <CreateStudySessionForm
            handleClose={handleClose}
            oldStudySession={null}
            usage="CREATE"
            course={null}
            step={step}
            setStep={setStep}
          />
          <Box id="cancelCreationButtonBox" sx={{ textAlign: 'center', mt: 3 }}>
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
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </Box>
  );
}
