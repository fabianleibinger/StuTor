import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Typography } from '@mui/material';
import { useQueryClient } from 'react-query';
import { useCreateBooking } from '../hooks/CreateBooking.jsx';
import { useMutation } from 'react-query';
import { create } from '@mui/material/styles/createTransitions.js';
import {createBooking as createBookingCall} from '../api/Booking.js';

const BookingDialog = ({ open, onClose, perHourPrice }) => {

    const [hours, setHours] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const queryClient = useQueryClient();

  const createBooking = useMutation(
    (data) => createBookingCall(data),
    {
        onSuccess: () => {
            queryClient.invalidateQueries('bookings')
            console.log("hours:"    + hours)
            onClose()
            },
        onError: (error) => {
            console.log(error)
        }
            });

  const handleHoursChange = (event) => {
    const { value } = event.target;
    setHours(value);

    // Calculate total amount
    const amount = parseFloat(value) * perHourPrice;
    setTotalAmount(amount);
  };

  const handleBookingConfirm = async () => {
        await createBooking.mutateAsync({
            "studysession": "647213c2d119142ec0b57f30",
                    "hours": "20",
                    "priceEuro": "30",
                    "createdBy": "6468f36705853e6071dfec63"
        })
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Booking</DialogTitle>
      <DialogContent>
        <TextField
          label="Number of hours"
          type="number"
          value={hours}
          onChange={handleHoursChange}
          fullWidth
          margin="normal"
        />
        <Typography variant="subtitle1">
          Total amount: ${totalAmount.toFixed(2)}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleBookingConfirm}>
          Confirm Booking
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
