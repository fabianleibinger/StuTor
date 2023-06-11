import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, TextField } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { confirmBooking as confirmBookingCall } from '../api/Booking.js';
import { createReview } from '../api/Review.js';

const ReviewDialog = ({ open, onClose, onSubmit, bookingId }) => {
  const [review, setReview] = useState('');
    const queryClient = useQueryClient();
    console.log("open", open)

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  /*const handleReviewSubmit = () => {
    onSubmit(review);
  };*/
  // hard coded rating for now
  const giveReview = useMutation( () => createReview(bookingId, 5, review),
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(['reviews'])
                    },
                onError: (error) => {
                    console.log(error)
                }
                    });

    const handleReviewSubmit = (review) => {
                        // Save the review
                        giveReview.mutateAsync();
                        console.log('Review submitted:', review);
                        onClose();
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