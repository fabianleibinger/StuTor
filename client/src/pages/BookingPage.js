import React, {useState} from 'react';
import { Box, Typography, Button } from '@mui/material';
import {
    useQuery,
    useMutation,
    useQueryClient,
  } from 'react-query'
import { createBooking, getBookingsOfStudysession } from '../api/Booking.js';
import BookingDialog from '../components/BookingDialog.js';
import PayPalDialog from '../components/PayPalDialog.js';

const BookingPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  // Hard coded studySessionId for now
  const studySessionId = "647213c2d119142ec0b57f30"
  const { isLoading, error, data } = useQuery(['bookings'], () => getBookingsOfStudysession(studySessionId));
  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  const booking = data[0]
  console.log(data)

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Open Booking Dialog
      </Button>

      <BookingDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        priceEuro={booking.priceEuro} 
      />
    </div>
  );
};

export default BookingPage;