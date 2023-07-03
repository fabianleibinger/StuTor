import { useState, useContext } from 'react';
//react-query
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { UserContext } from '../context/UserContext';

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
import { getChatsOfUser } from '../api/Chat';
import ConfirmationDialog from '../components/Dialogs/ConfirmationDialog';

const MyStudySessions = () => {
  const queryClient = useQueryClient();

  const { setUser, user } = useContext(UserContext);
  const [role, setRole] = useState('TUTOR');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudySession, setSelectedStudySession] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');

  const userId = user._id;
  const tutorFirstName = user.firstname;
  const tutorLastName = user.lastname;
  const tutorPicture = user.picture;

  let studySessions = [];

  const handleRoleSwitchClick = role => {
    // update role in the user missing
    setRole(role);
    queryClient.invalidateQueries('myStudySessions');
  };

  // use mutation to update data
  const deleteStudySessionMutation = useMutation(deleteStudysession, {});

  const queryKey = {
    role: role,
    user: userId
  };

  // fetch data
  const { isLoading, error, data } = useQuery(
    ['myStudySessions', queryKey],
    () => {
      if (role === 'TUTOR') {
        return getStudysessionsTutoredByUser(userId);
      } else {
        return getChatsOfUser(userId);
      }
    },
    {
      retry: (failureCount, error) => {
        return error.response?.status !== 404;
      }
    }
  );

  if (error) {
    if (error.response && error.response.status === 404) {
      studySessions = [];
    } else {
      return 'An error has occurred: ' + error.message;
    }
  } else {
    studySessions =
      role === 'TUTOR'
        ? data || []
        : Array.from(
            new Set(
              (data || [])
                .map(chat => chat.studysession)
                .filter(session => session !== null)
            )
          );
    if (role === 'STUDENT' && studySessions === []) {
      return 'Your StudySessions are listed here as soon as you are chatting with a Tutor.';
    }
  }

  // first confirm deletion the delete it
  const handleDeleteConfirmationNeeded = id => {
    setOpenConfirmDialog(true);
    setIdToDelete(id);
  };

  const handleDeleteStudySession = async studySessionId => {
    setOpenConfirmDialog(false);
    await deleteStudySessionMutation.mutateAsync(studySessionId, {
      // Manually refetch the query after successful deletion
      onSuccess: () => {
        queryClient.invalidateQueries('myStudySessions');
      }
    });
  };

  // clicking on the StudySession
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
    <Box id="MyStudySessionWrapper" sx={{ position: 'sticky' }}>
      <Box
        id="MyStudySessionHeader"
        sx={{
          width: '90vw',
          padding: '10px',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
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
          <CreateStudySessionDialog key={'AddDialog'} />
        </Box>
      </Box>

      {openConfirmDialog && (
        <ConfirmationDialog
          open={openConfirmDialog}
          onCancel={() => setOpenConfirmDialog(false)}
          onConfirmation={() => handleDeleteStudySession(idToDelete)}
        />
      )}

      <Box
        id="MyStudySessionContainer"
        sx={{
          //height: 'calc(90vh - 100px)',
          maxHeight: '80vh',
          overflow: 'auto',
          display: 'flex',
          alignItems: 'top-left',
          margin: '10px',
          mt: 15,
          border: '1px solid lightgray',
          borderRadius: '8px',
          padding: '10px',
          scrollMarginTop: '64px'
        }}
      >
        <Grid
          container
          spacing={1}
          sx={{ height: '100%', alignItems: 'top-left' }}
        >
          {studySessions &&
            studySessions.map(studySession => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={studySession._id}
                sx={{ alignItems: 'left' }}
              >
                <StudySessionCard
                  studySession={studySession}
                  onDelete={() => {
                    handleDeleteConfirmationNeeded(studySession._id);
                    console.log(openConfirmDialog);
                  }}
                  tutorFirstName={tutorFirstName}
                  tutorLastName={tutorLastName}
                  tutorPicture={tutorPicture}
                  role={role}
                  onItemClick={() => handleStudySessionClick(studySession)}
                  details={true}
                  addStudySessionComponent={null}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
      {selectedStudySession !== null && (
        <UpdateStudySessionDialog
          openDialog={openDialog}
          onUpdateDialogClose={onUpdateDialogClose}
          selectedStudySession={selectedStudySession}
        />
      )}
    </Box>
  );
};

export default MyStudySessions;
