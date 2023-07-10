import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { confirmBooking as confirmBookingCall, getBookingsOfStudysessionCreatedByUser } from "../../api/Booking.js";
import ReviewDialog from "./ReviewDialog.js";
import { WidthNormal } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import RateReviewIcon from '@mui/icons-material/RateReview';
import CheckIcon from '@mui/icons-material/Check';

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB');
    return formattedDate;
  };

  console.log(bookings);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Bookings</DialogTitle>
        <DialogContent>
          {isloading && <div>Loading...</div>}
          {error && <div>No bookings found!</div>}
          {!isloading && !error && (
            <Grid container spacing={4} direction={'column'}>
              {bookings.map((booking) => (
                booking.isPayed && (
                <Grid container item key={booking._id} direction={'row'} spacing={1}>
                <Grid item key={booking._id} xs={20}>
                  <Typography variant="body1">
                    { booking.hours < 2 ? booking.hours + " hour" : booking.hours + " hours"}
                  </Typography>
                  <Typography variant="body2">
                  booked on {formatDate(booking.createdAt)}
                  </Typography>
                  </Grid>
                  {booking.isPayed && !booking.isConfirmed && (
                    <Grid item key={booking._id} justifyContent={'flex-end'}>
                      <IconButton
                        aria-label="confirm booking"
                        onClick={() => handleConfirm(booking._id)}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Grid>
                  )}
                  {booking.isConfirmed && !booking.reviewGiven && (
                    <Grid item key={booking._id} alignContent={'center'}>
                      <div>
                      <IconButton
                        aria-label="give review"
                        onClick={() => handleGiveReview(booking._id)}
                      >
                        <RateReviewIcon />
                      </IconButton>
                      </div>
                    </Grid>
                  )}
                  </Grid>
                )
              ))}
            </Grid>

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
