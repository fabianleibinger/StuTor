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
  // Hard coded studySessionId for now
  const courseId = "6468d8b7a6b6ebbc588433aa"
  const studySessionId = "647213c2d119142ec0b57f30"
  const tutoredById = "6468f36705853e6071dfec63"
  const universityId = "64665b948c647ea7f079f779"
  const userId = "6468f36705853e6071dfec63"
  const { isLoading, error, data } = useQuery(['studysession', studySessionId], () => getStudySessionbyId(studySessionId));
  const { isLoading: isLoadingCourse, error: errorCourse, data: dataCourse } = useQuery(['course', courseId], () => getCourse(courseId));
  const { isLoading: isLoadingTutoredBy, error: errorTutoredBy, data: dataTutoredBy } = useQuery(['tutoredBy', tutoredById], () => getUser(tutoredById));
  const { isLoading: isLoadingUniversity, error: errorUniversity, data: dataUniversity } = useQuery(['university', universityId], () => getUniversity(universityId));
  const { isLoading: isloadingBookings, error: errorBookings, data: dataBookings } = useQuery(['bookings', studySessionId], () => getBookingsOfStudysessionCreatedByUser(studySessionId, userId));
  if (isLoading || isLoadingCourse || isLoadingTutoredBy || isLoadingUniversity || isloadingBookings) return 'Loading...'
  if (error || errorCourse || errorTutoredBy || errorUniversity || errorBookings) return 'An error has occurred!'
  //console.log("dataCourse ", dataCourse)
  //const studySession = data[0]
  //console.log("studySession", studySession)
  console.log("dataTutoredBy", dataTutoredBy)
  console.log("dataUniversity", dataUniversity)
  console.log("dataBookings", dataBookings)
  

  return (
    <div>
      <StudySessionBox
        title={dataCourse.name}
        tutor={dataTutoredBy.firstname + " " + dataTutoredBy.lastname}
        university={dataUniversity.name}
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
        bookings={dataBookings}
      />

      <BookingDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        priceEuro={10} 
      />
    </div>
  );
};

export default BookingPage;