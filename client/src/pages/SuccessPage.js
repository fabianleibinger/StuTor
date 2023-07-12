import { useMutation } from "react-query";
import { useState, useEffect } from "react";
import { createBooking, setBookingIsPayed } from "../api/Booking";
import { useParams } from "react-router-dom";
import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import socket from "../Socket";

const SuccessPage = () => {
  const [success, setSuccess] = useState(false);
  const { bookingId, tutorId } = useParams();
  const navigate = useNavigate();

  const setBookingPayed = useMutation(() => setBookingIsPayed(bookingId));
  useEffect(() => {
    setBookingPayed.mutateAsync();
    socket.emit("new booking", bookingId, tutorId);;
  }, []);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        {setBookingPayed.data}
      </Box>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go back to home page
      </Button>
    </div>
  );
};

export default SuccessPage;
