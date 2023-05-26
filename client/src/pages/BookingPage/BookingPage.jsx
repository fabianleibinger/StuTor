import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

async function fetchStudySession() {
  const response = await fetch(`/api/studySession/`);
  if (!response.ok) {
    throw new Error('Failed to fetch study session');
  }
  return response.json();
}

function BookingPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, error, isLoading } = useQuery(
    "course",
    () => fetchStudySession()
  );

  const handleBookingButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <h1>Booking Page</h1>
      <Button variant="contained" onClick={handleBookingButtonClick}>
        Book Now
      </Button>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Course: {data.course}</DialogTitle>
        <DialogContent>
          <p>This is the dialog content.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


export default BookingPage;
