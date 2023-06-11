import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material';


const BookingHistoryDialog = ({ open, onClose, bookings }) => {

  const handleConfirm = (bookingId) => {
    // Handle confirm logic for the booking with the given bookingId
    console.log(`Booking confirmed: ${bookingId}`);
  };

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Bookings</DialogTitle>
        <DialogContent>
          <List>
            { bookings.map((booking) => (
              <ListItem key={booking._id}>
                <ListItemText primary={booking.hours} secondary={booking.createdAt} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleConfirm(booking._id)}
                >
                  Confirm
                </Button>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
  );
};

export default BookingHistoryDialog;
