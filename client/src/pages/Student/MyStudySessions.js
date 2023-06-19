// components
import StudySessionCard from '../../components/StudySessionCard/StudySessionDetailsCard';

//api
import { getChatsOfUser } from '../../api/Chat';

//react-query
import { useQuery, useQueryClient } from 'react-query';

// frontend
import { Box, Grid } from '@mui/material';

const userId = '6468f36705853e6071dfec63';

const StudentMyStudySessions = () => {
  const queryClient = useQueryClient();

  // fetch data
  const { isLoading, error, data } = useQuery(['StudentStudysessions'], () =>
    getChatsOfUser(userId)
  );

  // I actually dk for what this is
  const handleDeleteStudySession = async studySessionId => {
    return;
  };

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;
  const chats = data;
  const studySessions = Array.from(
    new Set(chats.map(chat => chat.studysession))
  );
  console.log(studySessions);

  return (
    <div>
      <Box style={{ maxHeight: '75vh', overflow: 'auto' }}>
        <Grid container spacing={2}>
          {studySessions &&
            studySessions.map(studySession => (
              <Grid item xs={12} sm={6} md={4} key={studySession._id}>
                <StudySessionCard
                  studySession={studySession}
                  onDelete={() => handleDeleteStudySession(studySession._id)}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
};

export default StudentMyStudySessions;
