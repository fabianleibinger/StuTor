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
  Avatar,
  Typography,
  Rating,
} from "@mui/material";
import StarRating from "./StarRating.js";

const formatDate = dateString => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-GB');
  return formattedDate;
};

const StudysessionReviewDialog = ({ isOpen, onClose, reviews }) => {
  console.log(reviews)
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={'md'}>
      <DialogTitle>Reviews of other students</DialogTitle>
      <DialogContent>
        { reviews.map((review) => (
          <Box display={'flex'} flexDirection={'row'} paddingBottom={'2rem'}>
              <Box justifyContent={'flex-start'} paddingRight={'1rem'}>
          <Avatar alt="Profile Picture" src={review.booking.createdBy.picture}/>
          </Box>
          <Box flexDirection={'column'}>
            <Rating value={review.rating} precision={0.5} readOnly />
            <Typography variant="body2" paddingLeft={'0.25rem'} color={'gray'}>{review.booking.hours} hour{review.booking.hours === 1 ? "" : "s"} booked on {formatDate(review.booking.createdAt)}</Typography>
            <Typography variant="body1" paddingLeft={'0.25rem'}>{review.feedback}</Typography>
          </Box>
        </Box>))
          }
      
      </DialogContent>
    </Dialog>
  );
};
export default StudysessionReviewDialog;
