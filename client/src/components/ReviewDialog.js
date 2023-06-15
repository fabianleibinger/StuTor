import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Rating, TextField } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { confirmBooking as confirmBookingCall } from '../api/Booking.js';
import { createReview } from '../api/Review.js';
import StarRating from './Studysessionrating.js';

const ReviewDialog = ({ open, onClose, onSubmit, bookingId }) => {
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
    const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  /*const handleReviewSubmit = () => {
    onSubmit(review);
  };*/
  // hard coded rating for now
  const giveReview = useMutation( () => createReview(bookingId, rating, review),
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(['reviews'])
                    },
                onError: (error) => {
                    console.log("error", error)
                }
                    });

    const handleReviewSubmit = (review) => {
                        // Save the review
                        giveReview.mutateAsync();
                        console.log('Review submitted:', review);
                        onClose();
                        setReview('');
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
      <Rating
  name="simple-controlled"
  value={rating}
  onChange={(event, newValue) => {
    setRating(newValue);
  }}
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