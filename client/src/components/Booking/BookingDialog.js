import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Alert,
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
  const [showAlert, setShowAlert] = useState(false);
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log("currentUser", currentUser)

  // hardcoded for now (tutorId for stripe payment)
  const customerId = studysession.tutoredBy;

  const navigate = useNavigate();

  // Redirect to Stripe checkout
  const handleRedirect = (url) => {
    window.location.replace(url);
  };

  const createPayment = useMutation(() => createPaymentCall(currentUser._id, totalAmount, studysession, hours), {
    onSuccess: (url) => {
      handleRedirect(url);
      queryClient.invalidateQueries("payment");
    },
    onError: (error) => {
      setShowAlert(true);
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
        disabled={hours < 1}
          variant="contained"
          color="secondary"
          onClick={handlePayment}
        >
          Proceed to Payment
        </Button>
        {showAlert && (
          <Alert severity="error">
            There was an error processing the payment. 
            Probably your tutor didn't set up his Stripe account yet. 
            Please contact him/her and otherwise the customer support.
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
