import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { createBooking as createBookingCall } from "../../api/Booking.js";
import { createPayment as createPaymentCall } from "../../api/Payment.js";
import { useNavigate } from 'react-router-dom';

const BookingDialog = ({
  open,
  onClose,
  priceEuro,
  createdBy,
  studysession,
}) => {
  const [hours, setHours] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // hardcoded for now (tutorId for stripe payment)
  const customerId = "6468f36705853e6071dfec63";

  const navigate = useNavigate();

  // Redirect to Stripe checkout
  const handleRedirect = (url) => {
    //const path = new URL(url).pathname
    window.location.replace(url);
    //navigate(path);
  };

  const createBooking = useMutation(
    () => createBookingCall(studysession, hours, priceEuro, createdBy),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["bookings", studysession]);
        onClose();
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  console.log("studysession", studysession)

  // TODO: replace customerId with currentUser._id
  const createPayment = useMutation(() => createPaymentCall(customerId, totalAmount, studysession, hours), {
    onSuccess: (url) => {
      handleRedirect(url);
      queryClient.invalidateQueries("payment");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleHoursChange = (event) => {
    const { value } = event.target;
    setHours(value);

    // Calculate total amount
    const amount = parseFloat(value) * priceEuro;
    setTotalAmount(amount);
  };

  const handleBookingConfirm = async () => {
    try {
      await createBooking.mutateAsync(
        studysession,
        hours,
        priceEuro,
        createdBy
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      await createPayment.mutateAsync();
    } catch (error) {
      console.log(error);
    }
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleBookingConfirm}
        >
          Confirm Booking
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handlePayment}
        >
          Set up Stripe payment
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
