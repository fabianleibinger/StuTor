import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useUserContext } from '../../context/UserProvider';

import { Button, Box, TextField } from '@mui/material';
import { Stack } from '@mui/system';

// import other components
import LanguageSelection from '../Filters/LanguageSelection';
import ErrorDialog from '../Dialogs/ErrorDialog';
import { createStudysession, updateStudysession } from '../../api/StudySession';

const CreateStudySessionForm = ({
  handleClose,
  oldStudySession,
  usage,
  step,
  setStep
}) => {
  const queryClient = useQueryClient();

  const { user, setUser } = useUserContext();
  const [courseName, setCourseName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [pricePerHourEuro, setPricePerHourEuro] = useState('');
  const [languages, setLanguages] = useState(
    oldStudySession ? oldStudySession.languages : []
  );
  const [description, setDescription] = useState('');
  const [postError, setPostError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    if (oldStudySession !== null) {
      setCourseName(oldStudySession.courseName);
      setCourseId(oldStudySession.courseId);
      setPricePerHourEuro(parseInt(oldStudySession.pricePerHourEuro));
      setLanguages(oldStudySession.languages);
      setDescription(oldStudySession.description);
    }
  }, [oldStudySession]);

  const handleSuccesfullSubmit = () => {
    setCourseName('');
    setCourseId('');
    setPricePerHourEuro('');
    setDescription('');
    setLanguages([]);
    setPostError('');
    setEmptyFields([]);
    handleClose();
    queryClient.invalidateQueries('myStudySessions');
  };

  const createMutation = useMutation(createStudysession, {
    onSuccess: () => {
      handleSuccesfullSubmit();
    },
    onError: error => {
      // Handle error
      setPostError(error.message);
    }
  });

  const updateMutation = useMutation(updateStudysession, {
    onSuccess: () => {
      handleSuccesfullSubmit();
    },
    onError: error => {
      // Handle error
      setPostError(error.message);
    }
  });

  const handleSubmit = event => {
    event.preventDefault();
    setEmptyFields([]);

    if (languages.length === 0) {
      setEmptyFields(prevFields => [...prevFields, 'LanguageSelection']);
      return;
    }
    if (step == 1) {
      setStep(2);
    } else if (step == 2) {
      if (usage === 'CREATE') {
        const newStudySession = {
          courseName: courseName,
          courseId: courseId,
          tutoredBy: user._id,
          description: description,
          pricePerHourEuro: String(pricePerHourEuro),
          languages: languages
        };
        console.log('newStudysession: ', newStudySession);
        createMutation.mutate(newStudySession);
      } else {
        const newStudySession = {
          _id: oldStudySession._id,
          courseName: oldStudySession.courseName,
          courseId: oldStudySession.courseId,
          tutoredBy: String(oldStudySession.tutoredBy._id),
          description: description,
          pricePerHourEuro: String(pricePerHourEuro),
          languages: languages
        };
        updateMutation.mutate(newStudySession);
      }
    }
  };

  // handle values of Language Selection
  const handleSelectedLanguages = languages => {
    setLanguages(languages);
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      {step == 1 && (
        <Stack
          id="formStack"
          spacing={2}
          sx={{ alignItems: 'center', width: 1, mt: 3 }}
        >
          <Stack
            direction="column"
            spacing={2}
            sx={{ width: 1, alignItems: 'center' }}
          >
            <TextField
              variant="outlined"
              autoFocus
              margin="dense"
              id="courseName"
              label="Course Name"
              type="String"
              fullWidth
              required
              onChange={e => setCourseName(e.target.value)}
              value={courseName}
              sx={{ mt: 0, width: 0.6 }}
            />
            <TextField
              variant="outlined"
              autoFocus
              margin="dense"
              id="courseId"
              label="Course Identifier"
              type="String"
              fullWidth
              required
              onChange={e => setCourseId(e.target.value)}
              value={courseId}
              sx={{ mt: 0, width: 0.6 }}
            />
            <TextField
              variant="outlined"
              autoFocus
              margin="dense"
              id="pricePerHourEuro"
              label="Price per Hour"
              type="Number"
              fullWidth
              required
              onChange={e => setPricePerHourEuro(e.target.value)}
              value={pricePerHourEuro}
              sx={{ mt: 0, width: 0.6 }}
            />
            <LanguageSelection
              handleLanguageChange={handleSelectedLanguages}
              initialSelection={languages}
            />
            <Box sx={{ mt: 10 }}>
              <Button type="submit" variant="contained" size="large">
                Next
              </Button>
            </Box>
          </Stack>
        </Stack>
      )}
      {step == 2 && (
        <Stack
          direction="column"
          spacing={2}
          sx={{ width: 1, alignItems: 'center' }}
        >
          <TextField
            variant="outlined"
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            required
            multiline
            rows={10}
            onChange={e => setDescription(e.target.value)}
            value={description}
            InputLabelProps={{ shrink: !!description || undefined }}
            placeholder="Please describe your experience in the field, tutoring methods and everything you want to tell your students, e.g. content of your sessions, preferred location, in person or online sessions, preferred time..."
            sx={{
              mt: 0,
              width: '90%',
              resize: 'vertical'
            }}
          />

          <Box sx={{ mt: 10 }}>
            {usage === 'CREATE' ? (
              <Button type="submit" variant="contained" size="large">
                Publish
              </Button>
            ) : (
              <Button type="submit" variant="contained" size="large">
                Update
              </Button>
            )}
          </Box>
        </Stack>
      )}

      {emptyFields.length !== 0 && (
        <div className="error">Please fill out all empty fields</div>
      )}
      {createMutation.isError && emptyFields.length == 0 && (
        <ErrorDialog
          errorMessage={
            'Please check if you already offer a study session for this course'
          }
          dialogOpen={true}
        />
      )}
      {updateMutation.isError && emptyFields.length == 0 && (
        <div className="error">{postError} </div>
      )}
    </form>
  );
};

export default CreateStudySessionForm;
