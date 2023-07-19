import { useState, useContext } from 'react';
//react-query
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useUserContext } from '../context/UserProvider';

// frontend
import { Box, Grid, Typography } from '@mui/material';

// components
import StudySessionCard from '../components/StudySessionCard/StudySessionDetailsCard';
import CreateStudySessionDialog from '../components/Dialogs/CreateStudySessionDialog';
import UpdateStudySessionDialog from '../components/Dialogs/UpdateStudySessionDialog';
import SwitchRoleButton from '../components/SwitchRoleButton';

import { LoadingIndicator } from '../components/General/LoadingIndicator';
import { ErrorIndicator } from '../components/General/ErrorIndicator';

//api
import {
  getStudysessionsTutoredByUser,
  deleteStudysession
} from '../api/StudySession';
import { getChatsOfUser } from '../api/Chat';
import { updateUser } from '../api/User';

import ConfirmationDialog from '../components/Dialogs/ConfirmationDialog';

const MyStudySessions = () => {
  /**
   * MyStudySession hold the MyStudySession page.
   * For a Tutor a page that shows all study sessions that are tutored by the user. These can be created, updated or deleted here.
   *
   * For a Student a page that shows all study sessions for which the student contacted the Tutor via chat. The user can also go to the details and chat pages directly by clicking on a study session.
   *
   * MyStudySessions returns a container showing the study sessions + a possibility to switch the current role.
   */
  const queryClient = useQueryClient();

  // context variables
  const { user, setUser } = useUserContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudySession, setSelectedStudySession] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');

  const [studySessions, setStudySessions] = useState([]);

  // Background colors for the study sessions shown on this page
  const myStudySessionColors = [
    '#0fab3c',
    '#98f5ff',
    '#ee6363',
    '#ffa500',
    '#eeaeee',
    '#1e90ff'
  ];

  // The texts shown if a Tutor does not offer any study sessions
  const emptyStudySessionTexts = [
    'This could be your next study session!',
    "Don't you want to offer more different study session?",
    'The next opportunity to earn money is just around the corner!'
  ];

  // use mutation to update data
  const deleteStudySessionMutation = useMutation(deleteStudysession, {});
  const switchRoleMutation = useMutation(updateUser, {});

  // these keys trigger the myStudySession query
  const queryKey = {
    role: user.role,
    user: user._id
  };

  // fetch the wanted study sessions (as a tutor your own, as a student the ones you started chatting with)
  useQuery(
    ['myStudySessions', queryKey],
    () => {
      if (user.role === 'TUTOR') {
        return getStudysessionsTutoredByUser(user._id);
      } else {
        return getChatsOfUser(user._id);
      }
    },
    {
      retry: (failureCount, error) => {
        return error.response?.status !== 404;
      },
      onSuccess: data => {
        if (user.role === 'TUTOR') {
          setStudySessions(data || []);
        } else {
          setStudySessions(
            Array.from(
              new Set(
                (data || [])
                  .map(chat => chat.studysession)
                  .filter(session => session !== null && session !== undefined)
              )
            ).filter(session => session.tutoredBy._id !== user._id)
          );
        }
      },
      onLoading: isLoading => {
        return <LoadingIndicator />;
      },
      onError: error => {
        if (!(error.response && error.response?.status === 404)) {
          return <ErrorIndicator />;
        }
      }
    }
  );

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
        setStudySessions(prevState =>
          prevState.filter(session => session._id !== studySessionId)
        );
      }
    });
  };

  const handleRoleSwitchClick = async role => {
    const newUser = {
      _id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      picture: user.picture,
      role: role,
      university: user.university
    };

    await switchRoleMutation.mutateAsync(newUser, {
      onSuccess: () => {
        setUser(newUser);
        setStudySessions([]);
        queryClient.invalidateQueries('myStudySessions');
      }
    });
  };

  // clicking on the StudySession
  const handleStudySessionUpdateClick = studySession => {
    setSelectedStudySession(studySession);
    setOpenDialog(true);
  };

  // update Dialog
  const onUpdateDialogClose = () => {
    setOpenDialog(false);
    setSelectedStudySession(null);
  };

  return (
    <Box
      id="MyStudySessionWrapperPageWrapper"
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Box
        id="MyStudySessionWrapper"
        sx={{
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
        }}
      >
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
            align="center"
            sx={{
              padding: 2,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textAlign: 'center'
            }}
          >
            {user.role === 'TUTOR'
              ? 'My Published Tutor Sessions'
              : "Study Sessions I'm Interested In"}
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
            maxHeight: '80vh',
            overflow: 'auto',
            display: 'flex',
            alignItems: 'top-left',
            margin: '10px',
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
              studySessions.map((studySession, index) => {
                const colorIndex = index % myStudySessionColors.length;
                const backgroundColor = myStudySessionColors[colorIndex];
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={`${studySession._id}-${index}`} // Use a combination of _id and index as the unique key
                    sx={{ alignItems: 'left' }}
                  >
                    <StudySessionCard
                      tutoredBy={studySession.tutoredBy}
                      studySession={studySession}
                      onDelete={() => {
                        handleDeleteConfirmationNeeded(studySession._id);
                      }}
                      role={user.role}
                      onUpdateClick={() =>
                        handleStudySessionUpdateClick(studySession)
                      }
                      details={true}
                      addStudySessionComponent={null}
                      backgroundColor={backgroundColor}
                    />
                  </Grid>
                );
              })
            ) : user.role === 'TUTOR' ? (
              emptyStudySessionTexts.map((text, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={index}
                  sx={{ alignItems: 'left' }}
                >
                  <StudySessionCard
                    key={index}
                    tutoredBy={user}
                    text={text}
                    studySession={null}
                    onDelete={() => {}}
                    role={user.role}
                    onUpdateClick={() => {}}
                    details={true}
                    addStudySessionComponent={null}
                    backgroundColor={'#d3d3d3'}
                  />
                </Grid>
              ))
            ) : (
              <Typography>
                Your StudySessions are listed here as soon as you are chatting
                with a Tutor.
              </Typography>
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
    </Box>
  );
};

export default MyStudySessions;
