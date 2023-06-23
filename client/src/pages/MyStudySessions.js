import { useState } from 'react';
//react-query
import { useQuery, useMutation, useQueryClient } from 'react-query';

// frontend
import { Box, Grid, Typography } from '@mui/material';

// components
import StudySessionCard from '../components/StudySessionCard/StudySessionDetailsCard';
import CreateStudySessionDialog from '../components/Dialogs/CreateStudySessionDialog';
import UpdateStudySessionDialog from '../components/Dialogs/UpdateStudySessionDialog';
import SwitchRoleButton from '../components/SwitchRoleButton';

//api
import {
  getStudysessionsTutoredByUser,
  deleteStudysession
} from '../api/StudySession';

const MyStudySessions = () => {
  const queryClient = useQueryClient();
  // use a real user
  const tutorId = '6468f36705853e6071dfec63';
  const tutorFirstName = 'Herbert';
  const tutorLastName = 'theHerber';
  const [role, setRole] = useState('STUDENT');

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudySession, setSelectedStudySession] = useState(null);

  const handleRoleSwitchClick = role => {
    // update role in the user
    setRole(role);
  };

  // use mutation to update data
  const deleteStudySessionMutation = useMutation(deleteStudysession, {
    onSuccess: () => {
      queryClient.invalidateQueries('studySessions');
    }
  });

  // fetch data
  const { isLoading, error, data } = useQuery(['studySessions'], () =>
    getStudysessionsTutoredByUser(tutorId)
  );

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;
  const studySessions = data;

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

  return (
    <div>
      <Box
        sx={{
          border: '1px solid lightgray',
          maxWidth: '90%',
          padding: '10px',
          margin: '10px',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography
          variant="h4"
          sx={{
            padding: 2,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textAlign: 'center'
          }}
        >
          My StudySessions
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-end'
          }}
        >
          <SwitchRoleButton
            role={role}
            handleRoleSwitchClick={handleRoleSwitchClick}
          />
        </Box>
      </Box>

      <Box
        id="MyStudySessionContainer"
        sx={{
          height: 'calc(90vh - 20px)',
          maxWidth: '90%',
          overflow: 'auto',
          display: 'flex',
          alignItems: 'top-left',
          margin: '10px',
          border: '1px solid lightgray',
          borderRadius: '8px',
          padding: '10px',
          scrollMarginTop: '64px'
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ height: '100%', alignItems: 'top-left' }}
        >
          {studySessions &&
            studySessions.map(studySession => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={studySession._id}
                sx={{ alignItems: 'center' }}
              >
                <StudySessionCard
                  studySession={studySession}
                  onDelete={() => handleDeleteStudySession(studySession._id)}
                  tutorFirstName={tutorFirstName}
                  tutorLastName={tutorLastName}
                  role={role}
                  onItemClick={() => handleStudySessionClick(studySession)}
                  details={true}
                  addStudySessionComponent={null}
                />
              </Grid>
            ))}
          {role === 'TUTOR' && (
            <Grid item xs={12} sm={6} md={4}>
              <StudySessionCard
                studySession={null}
                onDelete={() => {}}
                tutorFirstName={tutorFirstName}
                tutorLastName={tutorLastName}
                role={role}
                onItemClick={() => {}}
                details={false}
                addStudySessionComponent={
                  <CreateStudySessionDialog key={'AddDialog'} />
                }
              />
            </Grid>
          )}
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

export default MyStudySessions;
