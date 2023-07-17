import { useMutation } from "react-query";
import { useEffect } from "react";
import { setBookingIsPayed } from "../api/Booking";
import { useParams } from "react-router-dom";
import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import socket from "../Socket";

const SuccessPage = () => {
  const { bookingId, tutorId } = useParams();
  const navigate = useNavigate();

  const setBookingPayed = useMutation(() => setBookingIsPayed(bookingId));
  useEffect(() => {
    setBookingPayed.mutateAsync();
    socket.emit("new booking", bookingId, tutorId);
  }, []);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <iframe
        src="https://giphy.com/embed/HyanD1KpfzPiw"
        width="480"
        height="258"
        frameBorder="0"
        class="giphy-embed"
        marginBottom="1rem"
        allowFullScreen
      />
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "1rem",
          borderRadius: "8px",
          marginTop: "1rem",
        }}
      >
        {setBookingPayed.data}
      </Box>
      <Button variant="contained" color="primary" onClick={handleGoBack} sx={{ marginTop: "1rem"}} >
        Go back to home page
      </Button>
    </Box>
  );
};

export default SuccessPage;
