import React from "react";
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Rating } from "@mui/material";
import StarRating from "./StarRating.js";

const StudysessionReviewDialog = ({ isOpen, onClose, reviews }) => {
    return (
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>All Reviews</DialogTitle>
        <DialogContent>
        <List>
            { reviews.map((review) => (
              <ListItem key={review._id}>
                <ListItemText primary={review.feedback} />
                <StarRating rating={review.rating} isReadOnly={true} />
                </ListItem>
            ))}
                </List>
        </DialogContent>
      </Dialog>
    );
  };
export default StudysessionReviewDialog;