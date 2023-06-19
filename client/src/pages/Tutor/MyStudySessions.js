// components
import StudySessionCard from '../../components/StudySessionCard/StudySessionDetailsCard';
import AddStudySessionCard from '../../components/StudySessionCard/AddStudySessionCard';
import CreateStudySessionDialog from '../../components/Dialogs/CreateStudySessionDialog';
import UpdateStudySessionDialog from '../../components/Dialogs/UpdateStudySessionDialog';

//api
import {
  getStudysessions,
  getStudysessionsTutoredByUser,
  deleteStudysession
} from '../../api/StudySession';

import { useState } from 'react';

//react-query
import { useQuery, useMutation, useQueryClient } from 'react-query';

// frontend
import { Box, Grid } from '@mui/material';

const TutorMyStudySessions = () => {
  const queryClient = useQueryClient();
  const tutorId = '6468f36705853e6071dfec63';

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudySession, setSelectedStudySession] = useState(null);

  // fetch data
  const { isLoading, error, data } = useQuery(['TutorStudysessions'], () =>
    getStudysessionsTutoredByUser(tutorId)
  );

  // use mutation to update data
  const deleteStudySessionMutation = useMutation(deleteStudysession, {
    onSuccess: () => {
      queryClient.invalidateQueries('studysessions');
    }
  });

  // I actually dk for what this is
  const handleDeleteStudySession = async studySessionId => {
    await deleteStudySessionMutation.mutateAsync(studySessionId);
  };

  const handleStudySessionClick = studySession => {
    setSelectedStudySession(studySession);
    setOpenDialog(true);
  };

  // update Dialog
  const onUpdateDialogClose = () => {
    setOpenDialog(false);
    setSelectedStudySession(null);
  };

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;
  const studySessions = data;

  return (
    <div>
      <Box style={{ maxHeight: '75vh', overflow: 'auto' }}>
        <Grid container spacing={2}>
          {studySessions &&
            studySessions.map(studySession => (
              <Grid item xs={12} sm={6} md={4} key={studySession._id}>
                <Box onClick={() => handleStudySessionClick(studySession)}>
                  <StudySessionCard
                    studySession={studySession}
                    onDelete={() => handleDeleteStudySession(studySession._id)}
                  />
                </Box>
              </Grid>
            ))}
          <Grid item xs={12} sm={6} md={4}>
            <AddStudySessionCard>
              <CreateStudySessionDialog key={'AddDialog'} />
            </AddStudySessionCard>
          </Grid>
        </Grid>
      </Box>
      {selectedStudySession !== null && (
        <UpdateStudySessionDialog
          openDialog={openDialog}
          onUpdateDialogClose={onUpdateDialogClose}
          selectedStudySession={selectedStudySession}
        />
      )}
    </div>
  );
};

export default TutorMyStudySessions;
