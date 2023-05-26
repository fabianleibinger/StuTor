import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useQuery } from "@tanstack/react-query";

async function fetchStudySession() {
  const response = await fetch(`/api/studySession/`);
  if (!response.ok) {
    throw new Error('Failed to fetch study session');
  }
  return response.json();
}

function BookingPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  /*const { data, error, isLoading } = useQuery(
    "course",
    () => fetchStudySession()
  );*/

  const [selectedNumber, setSelectedNumber] = React.useState('');

  const handleNumberChange = (event) => {
    setSelectedNumber(event.target.value);
  };

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
        <DialogTitle>Book a study session for Introduction to Quantum Computing</DialogTitle>
        <DialogContent>
          <InputLabel id="number-label">Select a number</InputLabel>
          <Select labelId="number-label" value={selectedNumber} onChange={handleNumberChange}>
            {Array.from({ length: 10 }, (_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


export default BookingPage;
