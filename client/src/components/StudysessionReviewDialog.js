import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

const StudysessionReviewDialog = ({ isOpen, onClose, reviews }) => {
    return (
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>All Reviews</DialogTitle>
        <DialogContent>
          {reviews.map((review, index) => (
            <div key={index}>{review}</div>
          ))}
        </DialogContent>
      </Dialog>
    );
  };
export default StudysessionReviewDialog;