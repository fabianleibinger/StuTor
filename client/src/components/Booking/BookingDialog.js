import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
} from "@mui/material";
import { useQueryClient, useMutation } from "react-query";
import { createPayment as createPaymentCall } from "../../api/Payment.js";
import { useUserContext } from "../../context/UserProvider.js";

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
  const { user } = useUserContext();

  // Redirect to Stripe checkout
  const handleRedirect = (url) => {
    window.location.replace(url);
  };

  const createPayment = useMutation(
    () => createPaymentCall(user._id, totalAmount, studysession._id, hours),
    {
      onSuccess: (url) => {
        handleRedirect(url);
        queryClient.invalidateQueries("payment");
      },
      onError: (error) => {
        setShowAlert(true);
        console.log(error);
      },
    }
  );

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
      <DialogTitle>Book studysession for {studysession.courseName}</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" color={"grey"}>
          Here you can book the studysession offered by{" "}
          {studysession.tutoredBy.firstname} for {priceEuro}€ per hour. Please
          enter the number of hours that you agreed on with your tutor!
        </Typography>
        <TextField
          label="Number of hours"
          type="number"
          value={hours}
          onChange={handleHoursChange}
          fullWidth
          margin="normal"
        />
        <Typography variant="subtitle1">
          Total amount: {totalAmount.toFixed(2)}€
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
          <Box paddingTop={2}>
            <Alert severity="error">
              There was an error processing the payment. Probably your tutor
              didn't set up his Stripe account yet. Please contact him/her and
              otherwise the customer support.
            </Alert>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
