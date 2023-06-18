import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { createReview } from "../../api/Review.js";

const ReviewDialog = ({
  open,
  onClose,
  onSubmit,
  bookingId,
  studysessionId,
}) => {
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const giveReview = useMutation(
    () => createReview(bookingId, rating, review),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["bookings"], studysessionId);
      },
      onError: (error) => {
        console.log("error", error);
      },
    }
  );

  const handleReviewSubmit = (review) => {
    // Save the review
    giveReview.mutateAsync();
    onClose();
    setReview("");
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