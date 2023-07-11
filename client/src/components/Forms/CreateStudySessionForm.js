import { useState, useEffect, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { UserContext } from '../../context/UserContext';

import { Button, Box, TextField } from '@mui/material';
import { Stack } from '@mui/system';

// import other components
import CourseSearch from '../Searchbars/CourseSearch';
import LanguageSelection from '../Filters/LanguageSelection';
import { createStudysession, updateStudysession } from '../../api/StudySession';

const CreateStudySessionForm = ({ handleClose, oldStudySession, usage }) => {
  const queryClient = useQueryClient();

  const { setUser, user } = useContext(UserContext);
  const [course, setCourse] = useState('');
  const [courseName, setCourseName] = useState('');
  const [pricePerHourEuro, setPricePerHourEuro] = useState('');
  const [languages, setLanguages] = useState([]);
  const [description, setDescription] = useState('');
  const [postError, setPostError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    if (oldStudySession !== null) {
      setCourse(oldStudySession.course);
      setPricePerHourEuro(parseInt(oldStudySession.pricePerHourEuro));
      setLanguages(oldStudySession.languages);
      setDescription(oldStudySession.description);
      console.log(oldStudySession.course);
    }
  }, [oldStudySession]);

  const handleSuccesfullSubmit = () => {
    setCourse(null);
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
    },
  });

  const handleSubmit = event => {
    event.preventDefault();
    setEmptyFields([]);

    if (!course) {
      setEmptyFields(prevFields => [...prevFields, 'course']);
      return;
    }

    if (languages.length === 0) {
      setEmptyFields(prevFields => [...prevFields, 'LanguageSelection']);
      return;
    }

    if (usage === 'CREATE') {
      const newStudySession = {
        course: String(course._id),
        tutoredBy: user._id,
        description: description,
        pricePerHourEuro: String(pricePerHourEuro),
        languages: languages
      };
      createMutation.mutate(newStudySession);
    } else {
      const newStudySession = {
        _id: oldStudySession._id,
        course: String(oldStudySession.course._id),
        tutoredBy: String(oldStudySession.tutoredBy._id),
        description: description,
        pricePerHourEuro: String(pricePerHourEuro),
        languages: languages
      };
      updateMutation.mutate(newStudySession);
    }
  };

  // handle values of Course Search
  const handleSelectCourse = selectedCourse => {
    setCourse(selectedCourse);
  };

  const handleDeleteCourse = () => {
    setCourse(null);
  };

  // handle values of Language Selection
  const handleSelectedLanguages = languages => {
    setLanguages(languages);
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
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
          {usage === 'CREATE' && (
            <CourseSearch
              onSelectCourse={handleSelectCourse}
              onDeleteCourse={handleDeleteCourse}
              course={oldStudySession !== null ? oldStudySession.course : null}
              usage={usage}
              required
            />
          )}
          <TextField
            variant="outlined"
            autoFocus
            margin="dense"
            id="courseName"
            label="Course Name"
            type="String"
            fullWidth
            required
            onChange={e => setPricePerHourEuro(e.target.value)}
            value={pricePerHourEuro}
            sx={{ mt: 0, width: 0.6 }}
          />
          <TextField
            variant="outlined"
            autoFocus
            margin="dense"
            id="courseId"
            label="Course ID"
            type="String"
            fullWidth
            required
            onChange={e => setPricePerHourEuro(e.target.value)}
            value={pricePerHourEuro}
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
            initialSelection={
              oldStudySession !== null ? oldStudySession.languages : []
            }
          />

          <TextField
            variant="outlined"
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            required
            multiline
            rows={3}
            onChange={e => setDescription(e.target.value)}
            value={description}
            sx={{
              mt: 0,
              width: '60%',
              resize: 'vertical',
              marginRight: '30px'
            }}
          />
          <Box sx={{ mt: 10 }}>
            {usage === "CREATE" ? 
            <Button type="submit" variant="contained" size="large">
              Publish
            </Button> :
            <Button type="submit" variant="contained" size="large">
              Update
            </Button>
            }

          </Box>
        </Stack>
      </Stack>
      {emptyFields.length !== 0 && (
        <div className="error">Please fill out all empty fields</div>
      )}
      {createMutation.isError && emptyFields.length == 0 && (
        <div className="error">
          Please check if you already offer a study session for this course{' '}
        </div>
      )}
      {updateMutation.isError && emptyFields.length == 0 && (
        <div className="error">{postError} </div>
      )}
    </form>
  );
};

export default CreateStudySessionForm;
