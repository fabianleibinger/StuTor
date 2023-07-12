import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
} from "@mui/material";
import StarRating from "./StarRating.js";

const StudysessionReviewDialog = ({ isOpen, onClose, reviews }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={'md'}>
      <DialogTitle>All Reviews</DialogTitle>
      <DialogContent>

      {reviews.map((review) => (
              <Box sx={{backgroundColor: "lightGray", p: 2, borderRadius: '14px'}}>
              <div>
                < Grid container spacing={2}>
                  <Grid item>
                    {review.hours} hours
                  </Grid>
                  <Grid item alignContent={'flex-end'}>
              <StarRating rating={review.rating} isReadOnly={true} smallStars={true}/>
                  </Grid>
                </Grid>
              <ListItemText primary={review.feedback} />
              </div>
              </Box>
          ))}
      </DialogContent>
    </Dialog>
  );
};
export default StudysessionReviewDialog;
