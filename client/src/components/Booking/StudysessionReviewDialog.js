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

const StudysessionReviewDialog = ({ isOpen, onClose, reviews }) => {
  console.log(reviews)
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={'md'}>
      <DialogTitle>All Reviews</DialogTitle>
      <DialogContent>
      <Box display="flex" alignItems="center">
      <Avatar alt="Profile Picture" />
      <Box ml={2}>
        <Rating value={5} precision={0.5} readOnly />
        <Typography variant="body2" paddingLeft={'0.25rem'} color={'gray'}>User Rating</Typography>
      </Box>
    </Box>
      </DialogContent>
    </Dialog>
  );
};
export default StudysessionReviewDialog;
