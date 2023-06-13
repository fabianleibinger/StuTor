import React, {useState} from 'react';
import { Grid, Button } from '@mui/material';
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

const BookingPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    //refetch();
    setDialogOpen(false);
  };

  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);

  const handleHistoryOpenDialog = () => {
    setHistoryDialogOpen(true);
    //refetch();
    console.log("historyDialogOpen", historyDialogOpen)
  };

  const handleHistoryCloseDialog = () => {
    setHistoryDialogOpen(false);
  };
  // Hard coded studySessionId for now
  const courseId = "64744a0eee6d5f6b120ddac2"
  const studySessionId = "6482e56033dbeb977cf730fb"
  const tutoredById = "6468f36705853e6071dfec63"
  const universityId = "64665b948c647ea7f079f779"
  const userId = "6468f36705853e6071dfec63"
  const { isLoading, error, data } = useQuery(['studysession', studySessionId], () => getStudySessionbyId(studySessionId));
  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred!'
  

  return (
    <div>
      <StudySessionBox
        title={data.course.name}
        tutor={data.tutoredBy.firstname + " " + data.tutoredBy.lastname}
        university={data.course.university.name}
        description={data.description}
      />
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
    </div>
  );
};

export default BookingPage;