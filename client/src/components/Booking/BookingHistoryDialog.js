import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { confirmBooking as confirmBookingCall, getBookingsCreatedByUser } from "../../api/Booking.js";
import ReviewDialog from "./ReviewDialog.js";

const BookingHistoryDialog = ({ open, onClose, userId, studySessionId }) => {
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const {
    isLoading: isloading,
    error: error,
    data: bookings,
    refetch,
  } = useQuery(["bookings", studySessionId], () =>
    getBookingsOfStudysessionCreatedByUser(studySessionId, userId)
  );
  const queryClient = useQueryClient();

  const confirmBooking = useMutation(
    (bookingId) => confirmBookingCall(bookingId),
    {
      onSuccess: () => {
        refetch();
        queryClient.invalidateQueries(["bookings", studySessionId]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleConfirm = async (bookingId) => {
    try {
      await confirmBooking.mutateAsync(bookingId);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGiveReview = (bookingId) => {
    setOpenReviewDialog(true);
    setSelectedBookingId(bookingId);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Bookings</DialogTitle>
        <DialogContent>
          {isloading && <div>Loading...</div>}
          {error && <div>No bookings found!</div>}
          {!isloading && !error && (
            <List>
              {bookings.map((booking) => (
                <ListItem key={booking._id}>
                  <ListItemText
                    primary={booking.hours}
                    secondary={booking.createdAt}
                  />
                  {!booking.isConfirmed && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleConfirm(booking._id)}
                    >
                      Confirm
                    </Button>
                  )}
                  {booking.isConfirmed && !booking.reviewGiven && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleGiveReview(booking._id)}
                      studySessionId={studySessionId}
                    >
                      Give review
                    </Button>
                  )}
                  {booking.reviewGiven && (
                    <Button variant="contained" color="primary">
                      Show review
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>

      {selectedBookingId && (
        <ReviewDialog
          open={openReviewDialog}
          onClose={() => setOpenReviewDialog(false)}
          bookingId={selectedBookingId}
        />
      )}
    </>
  );
};

export default BookingHistoryDialog;
