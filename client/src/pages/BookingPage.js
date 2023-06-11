import React, {useState} from 'react';
import { Box, Typography, Button } from '@mui/material';
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

const BookingPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  // Hard coded studySessionId for now
  const courseId = "6468d8b7a6b6ebbc588433aa"
  const studySessionId = "647213c2d119142ec0b57f30"
  const { isLoading, error, data } = useQuery(['studysession', studySessionId], () => getStudySessionbyId(studySessionId));
  const { isLoading: isLoadingCourse, error: errorCourse, data: dataCourse } = useQuery(['course', courseId], () => getStudysessions(courseId));
  if (isLoading || isLoadingCourse) return 'Loading...'
  if (error || errorCourse) return 'An error has occurred: ' + error.message
  //console.log(data)
  //const studySession = data[0]
  //console.log("studySession", studySession)
  

  return (
    <div>
      <StudySessionBox
        title={data.course}
        tutor={data.tutoredBy}
        description={data.description}
      />
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Open Booking Dialog
      </Button>

      <BookingDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        priceEuro={10} 
      />
    </div>
  );
};

export default BookingPage;