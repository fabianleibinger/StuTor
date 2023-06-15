// components
import StudySessionCard from '../../components/StudySessionCard/StudySessionDetailsCard/StudySessionDetailsCard';
import AddStudySessionCard from '../../components/StudySessionCard/AddStudySessionCard/AddStudySessionCard';
import CreateStudySessionDialog from '../../components/CreateStudySessionDialog/CreateStudySessionDialog';

//api
import { getStudysessions, deleteStudysession } from '../../api/StudySession';

//react-query
import { useQuery, useMutation, useQueryClient } from 'react-query';

// frontend
import { Box, Button, Grid } from '@mui/material';

const MyStudySessions = () => {
  const queryClient = useQueryClient();

  // fetch data
  const { isLoading, error, data } = useQuery(
    ['studysessions'],
    getStudysessions
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
                <StudySessionCard
                  studySession={studySession}
                  onDelete={() => handleDeleteStudySession(studySession._id)}
                />
              </Grid>
            ))}
          <Grid item xs={4}>
            <AddStudySessionCard>
              <CreateStudySessionDialog key={'AddDialog'} />
            </AddStudySessionCard>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default MyStudySessions;
