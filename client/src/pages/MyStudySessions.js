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
import { updateUser } from "../api/User";

import ConfirmationDialog from '../components/Dialogs/ConfirmationDialog';

const MyStudySessions = () => {
  const queryClient = useQueryClient();

  const { user, setUser } = useContext(UserContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudySession, setSelectedStudySession] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');

  const userId = user._id;
  const tutorFirstName = user.firstname;
  const tutorLastName = user.lastname;
  const tutorPicture = user.picture;

  let studySessions = [];

  // use mutation to update data
  const deleteStudySessionMutation = useMutation(deleteStudysession, {});
  const switchRoleMutation = useMutation(updateUser, {});

  const queryKey = {
    role: user.role,
    user: user._id
  };

  // fetch data
  const { isLoading, error, data } = useQuery(
    ['myStudySessions', queryKey],
    () => {
      if (user.role === 'TUTOR') {
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
      user.role === 'TUTOR'
        ? data || []
        : Array.from(
            new Set(
              (data || [])
                .map(chat => chat.studysession)
                .filter(session => session !== null && session !== undefined)
            )
          );
    console.log("ROOOOOOOOOOOOOOLLLLLLING: ", user.role);
  }

  // first confirm deletion the delete it
  const handleDeleteConfirmationNeeded = id => {
    setOpenConfirmDialog(true);
    setIdToDelete(id);
  };

  const onConfirmationDialogClose = () => {
    setOpenConfirmDialog(false);
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

  const handleRoleSwitchClick = async (role) => {
    const newUser = {"_id": user._id, "username": user.username, "firstname": user.firstname, "lastname": user.lastname,
    "email": user.email, "picture": user.picture, "role": role, "university": user.university
  }
    console.log("Switch Role for user", newUser);
    await switchRoleMutation.mutateAsync(newUser, {
      onSuccess: () => {
        setUser(newUser);
        queryClient.invalidateQueries('myStudySessions');
      }
    });
  }

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
    <Box id="MyStudySessionWrapper" sx={{ 
      width: '90vw',
      height: '90vh',
      minheight: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'right',
      pb: 1,
      pt: 2,
      pl: 1,
      pr: 1 
      }}>
      <Box
        id="MyStudySessionHeader"
        sx={{
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
            role={user.role}
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
          <CreateStudySessionDialog key={'AddDialog'} role={user.role} />
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
          border: '1px solid lightgray',
          borderRadius: '8px',
          padding: '10px',
          scrollMarginTop: '64px'
        }}
      >
        <Grid
  container
  spacing={0}
  sx={{ height: '100%', alignItems: 'top-left' }}
>
  {studySessions.length > 0 ? (
    studySessions.map((studySession) => (
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
          }}
          tutorFirstName={tutorFirstName}
          tutorLastName={tutorLastName}
          tutorPicture={tutorPicture}
          role={user.role}
          onItemClick={() => handleStudySessionClick(studySession)}
          details={true}
          addStudySessionComponent={null}
          backgroundColor={'#a9b0ab'}
        />
      </Grid>
    ))
  ) : (user.role === "TUTOR" ? 
  (
    <Typography>
      Create your first Study Session
    </Typography>
  ) :
  (
    <Typography>
      Your StudySessions are listed here as soon as you are chatting with a Tutor.
    </Typography>
  )
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
    </Box>
  );
};

export default MyStudySessions;
