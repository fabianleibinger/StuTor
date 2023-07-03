import React, {useState} from 'react';
import { Grid, Button, Box, Typography, Avatar } from '@mui/material';
import TextTruncate from 'react-text-truncate';
import {
    useQuery
  } from 'react-query'
import BookingDialog from '../components/Booking/BookingDialog.js';
import { getStudySessionbyId, getStudysessions } from '../api/StudySession.js';
import BookingHistoryDialog from '../components/Booking/BookingHistoryDialog.js';
import StudysessionRating from '../components/Booking/Studysessionrating.js';
import { useParams } from 'react-router-dom';
import { CenterFocusStrong } from '@mui/icons-material';

const StudysessionDetailsPage = () => {
  const { studySessionId } = useParams()
  const padding = 5;

  // states and functions for read more
  const [expanded, setExpanded] = useState(false);

  // states and functions for booking dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // states and functions for booking history dialog
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const handleHistoryOpenDialog = () => {
    setHistoryDialogOpen(true);
  };
  const handleHistoryCloseDialog = () => {
    setHistoryDialogOpen(false);
  };

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser._id
  const { isLoading, error, data } = useQuery(['studysession', studySessionId], () => getStudySessionbyId(studySessionId));

  if (isLoading) return 'Loading Studysession...'
  if (error) return 'An error has occurred!'
  

  return (
    <div style={{marginTop: '1rem'}}>
      < Grid container spacing={2} padding={2}>
        <Grid item xs={12} sm={6}>
      <Box sx={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '8px', width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <Avatar
                  src={data.tutoredBy.picture}
                  alt=""
                  sx={{ width: 120, height: 120 }}
                />
                </Box>
      <Typography variant="h3" sx={{ marginBottom: '1rem' }}>{data.course.name}</Typography>
      < Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
      <Typography variant="subtitle1" >{data.tutoredBy.firstname + " " + data.tutoredBy.lastname}</Typography>
      <Typography variant="subtitle2" sx={{ marginBottom: '1.5rem' }}>{data.course.university.name}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} alignContent={'center'}>
      <StudysessionRating studySessionId={studySessionId} />
      </Grid>
      </Grid>
      <Typography variant="h5" sx={{ marginBottom: '0.5rem' }}>Course description</Typography>
      <Typography variant="body1" marginBottom={6}>
  <TextTruncate
    line={20}
    truncateText="..."
    text={data.description}
    textTruncateChild={<Button onClick={() => setExpanded(true)}>Read More</Button>}
    expanded={expanded}
    onTruncate={() => setExpanded(false)}
  />
</Typography>
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
      </Box>
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
      </Grid>
      </Grid>
      </div> 
  );
};

export default StudysessionDetailsPage;