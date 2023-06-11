import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, TextField } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { confirmBooking as confirmBookingCall } from '../api/Booking.js';

const ReviewDialog = ({ open, onClose, onSubmit }) => {
  const [review, setReview] = useState('');

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleReviewSubmit = () => {
    onSubmit(review);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Give Review</DialogTitle>
      <DialogContent>
        <TextField
          value={review}
          onChange={handleReviewChange}
          label="Review"
          multiline
          fullWidth
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReviewSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
    );
};

export default ReviewDialog;