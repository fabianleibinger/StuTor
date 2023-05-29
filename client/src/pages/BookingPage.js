import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import {
    useQuery,
    useMutation,
    useQueryClient,
  } from 'react-query'
import { createBooking, getBookingsOfStudysession } from '../api/Booking.js';

const BookingBox = () => {
  // Hard coded studySessionId for now
  const studySessionId = "647213c2d119142ec0b57f30"
  const { isLoading, error, data } = useQuery(['bookings'], () => getBookingsOfStudysession(studySessionId));
  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  const booking = data[0]
  console.log(data)
  // just random button for now
  return (
    <Button variant="contained" color="primary">
      {booking.priceEuro}
    </Button>
  );
};

export default BookingBox;