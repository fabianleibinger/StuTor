import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { confirmBooking as confirmBookingCall } from '../api/Booking.js';
import ReviewDialog from './ReviewDialog.js';

const BookingHistoryDialog = ({ open, onClose, bookings, studysession }) => {
    const [openReviewDialog, setOpenReviewDialog] = useState(false);

  const handleConfirm = async (bookingId) => {
    try {
        await confirmBooking.mutateAsync(bookingId)
    } catch (error) { 
        console.log(error)
    }
  };

  const queryClient = useQueryClient();

  const confirmBooking = useMutation( (bookingId) => confirmBookingCall(bookingId),
    {
        onSuccess: () => {
            queryClient.invalidateQueries(['bookings', studysession])
            },
        onError: (error) => {
            console.log(error)
        }
            });

    const handleGiveReview = () => {
                setOpenReviewDialog(true);
              };
            
    const handleReviewSubmit = (review) => {
                // Save the review
                console.log('Review submitted:', review);
                setOpenReviewDialog(false);
              };

  return (
    <>
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Bookings</DialogTitle>
        <DialogContent>
          <List>
            { bookings.map((booking) => (
              <ListItem key={booking._id}>
                <ListItemText primary={booking.hours} secondary={booking.createdAt} />
                {!booking.isConfirmed && (
        <Button
        variant="contained"
        color="primary"
        onClick={() => handleConfirm(booking._id)}
      >
        Confirm
      </Button>
      )}
      {booking.isConfirmed && (
        <Button
        variant="contained"
        color="primary"
        onClick={() => handleGiveReview()}
      >
        Give review
      </Button>
      )}
                
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
      <ReviewDialog
        open={openReviewDialog}
        onClose={() => setOpenReviewDialog(false)}
        onSubmit={handleReviewSubmit}
      />
      </>
      
  );
};

export default BookingHistoryDialog;
