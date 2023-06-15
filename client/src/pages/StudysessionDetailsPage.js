import React, {useState} from 'react';
import { Grid, Button, Box, Typography } from '@mui/material';
import {
    useQuery,
    useMutation,
    useQueryClient,
  } from 'react-query'
import { createBooking, getBookingsOfStudysession } from '../api/Booking.js';
import BookingDialog from '../components/BookingDialog.js';
import PayPalDialog from '../components/PayPalDialog.js';
import { getStudySessionbyId, getStudysessions } from '../api/StudySession.js';
import StudySessionBox from '../components/StudySessionBox.js';
import { getCourse } from '../api/Course.js';
import { getUser } from '../api/User.js';
import { getUniversity } from '../api/University.js';
import { getBookingsOfStudysessionCreatedByUser } from '../api/Booking.js';
import Booking from '../api/Booking.js';
import BookingHistoryDialog from '../components/BookingHistoryDialog.js';
import StudysessionRating from '../components/Studysessionrating.js';
import './styles.css'
import { useParams } from 'react-router-dom';

const StudysessionDetailsPage = () => {
  const { studySessionId } = useParams();
  console.log("id", studySessionId) 

  console.log("StudysessionDetailsPage")
  const [dialogOpen, setDialogOpen] = useState(false);
  console.log("after state")

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);

  const handleHistoryOpenDialog = () => {
    setHistoryDialogOpen(true);
    console.log("historyDialogOpen", historyDialogOpen)
  };

  const handleHistoryCloseDialog = () => {
    setHistoryDialogOpen(false);
  };
  let buttonText = "View Bookings"
  const userId = "6468f36705853e6071dfec63"
  const { isLoading, error, data } = useQuery(['studysession', studySessionId], () => getStudySessionbyId(studySessionId));
  //const { isLoading: isloadingBookings, error: errorBookings, data: bookings, refetch } = useQuery(['bookings', studySessionId], () => getBookingsOfStudysessionCreatedByUser(studySessionId, userId));
  console.log("data", data)
  console.log("error", error)
  console.log("isLoading", isLoading)
  //if (isloadingBookings) return buttonText = 'Loading Bookings...'
  //if (errorBookings) return buttonText = 'An error has occurred!'
  if (isLoading) return 'Loading Studysession...'
  if (error) return 'An error has occurred!'
  console.log("data", data)
  

  return (
    <div>
      <Box sx={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
      <Typography variant="h5" sx={{ marginBottom: '0.5rem' }}>{data.course.name}</Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: '0.5rem' }}>{data.tutoredBy.firstname + " " + data.tutoredBy.lastname}</Typography>
      <Typography variant="subtitle2" sx={{ marginBottom: '0.5rem' }}>{data.course.university.name}</Typography>
      <StudysessionRating studySessionId={studySessionId} />
      <Typography variant="body1">{data.description}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
      <Button variant="contained" color="primary" onClick={handleHistoryOpenDialog}>
      View bookings
      </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Book now
      </Button>
      </Grid>
      </Grid>
      
      <BookingHistoryDialog
        open={historyDialogOpen}
        onClose={handleHistoryCloseDialog}
        userId={userId}
        studySessionId={studySessionId}
      />

      <BookingDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        priceEuro={data.pricePerHourEuro}
        createdBy={userId}
        studysession={studySessionId}
      />
      </Box> 
      </div> 
  );
};

export default StudysessionDetailsPage;