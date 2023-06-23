import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { Button, Box, TextField, TextareaAutosize, Grid } from '@mui/material';
import { Stack } from '@mui/system';

// import other components
import CourseSearch from '../Searchbars/CourseSearch';
import LanguageSelection from '../Filters/LanguageSelection';
import { createStudysession, updateStudysession } from '../../api/StudySession';

const CreateStudySessionForm = ({ handleClose, oldStudySession, usage }) => {
  const queryClient = useQueryClient();

  const [course, setCourse] = useState('');
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
    queryClient.invalidateQueries('studySessions');
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
    onMutate: studySession => {
      console.log('mutation arguments', studySession);
    }
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
        tutoredBy: '6468f36705853e6071dfec63',
        description: description,
        pricePerHourEuro: String(pricePerHourEuro),
        languages: languages
      };
      createMutation.mutate(newStudySession);
    } else {
      const newStudySession = {
        _id: oldStudySession._id,
        course: String(oldStudySession.course._id),
        tutoredBy: String(oldStudySession.tutoredBy),
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
      <Stack spacing={2}>
        <Stack direction="column" spacing={2}>
          <CourseSearch
            onSelectCourse={handleSelectCourse}
            onDeleteCourse={handleDeleteCourse}
            course={oldStudySession !== null ? oldStudySession.course : null}
            usage={usage}
            required
          />
          <Grid container direction="row" spacing={2}>
            <Grid item xs={5}>
              <Grid container direction="column" spacing={2}>
                <Grid item id="PricePerHourGrid" style={{ paddingLeft: '0px' }}>
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
                    sx={{ mt: 0 }}
                  />
                </Grid>
                <Grid item style={{ paddingLeft: '0px' }}>
                  <LanguageSelection
                    handleLanguageChange={handleSelectedLanguages}
                    initialSelection={
                      oldStudySession !== null ? oldStudySession.languages : []
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
              <TextareaAutosize
                minRows={3}
                placeholder="Description *"
                aria-label="description *"
                required
                onChange={e => setDescription(e.target.value)}
                value={description}
                style={{
                  width: '100%',
                  height: '100%',
                  padding: '8px',
                  resize: 'vertical',
                  marginRight: '30px'
                }}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 10 }}>
            {usage === 'CREATE' ? (
              <Button type="submit" variant="contained">
                Add Study Session
              </Button>
            ) : (
              <Button type="submit" variant="contained">
                Update Study Session
              </Button>
            )}
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
