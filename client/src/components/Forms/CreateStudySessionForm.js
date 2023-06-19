import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { Button, Box, TextField } from '@mui/material';
import { Stack } from '@mui/system';

// import other components
import CourseSearch from '../Searchbars/CourseSearch';
import LanguageSelection from '../Filters/LanguageSelection';
import { createStudysession } from '../../api/StudySession';

const CreateStudySessionForm = ({ handleClose }) => {
  const [course, setCourse] = useState('');
  const [pricePerHourEuro, setPricePerHourEuro] = useState('');
  const [languages, setLanguages] = useState([]);
  const [description, setDescription] = useState('');
  const [postError, setPostError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  const queryClient = useQueryClient();

  const mutation = useMutation(createStudysession, {
    onSuccess: () => {
      setCourse('');
      setPricePerHourEuro('');
      setDescription('');
      setLanguages([]);
      setPostError('');
      setEmptyFields([]);
      handleClose();
      queryClient.invalidateQueries('studysessions');
    },
    onError: error => {
      // Handle error
      setPostError(error.message);
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

    const newStudySession = {
      course: String(course._id),
      tutoredBy: '6468f36705853e6071dfec63',
      description: description,
      pricePerHourEuro: pricePerHourEuro,
      languages: languages
    };

    mutation.mutate(newStudySession);
  };

  // handle values of Course Search
  const handleSelectCourse = selectedCourse => {
    setCourse(selectedCourse);
  };

  const handleDeleteCourse = () => {
    setCourse('');
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
            required
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
          />
          <LanguageSelection onSelectedLanguage={handleSelectedLanguages} />

          <TextField
            variant="outlined"
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="Text"
            fullWidth
            required
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
          <Box sx={{ mt: 10 }}>
            <Button type="submit" variant="contained">
              Add Study Session
            </Button>
          </Box>
        </Stack>
      </Stack>
      {emptyFields.length !== 0 && (
        <div className="error">Please fill out all empty fields</div>
      )}
      {mutation.isError && emptyFields.length == 0 && (
        <div className="error">
          Please check if you already offer a study session for this course{' '}
        </div>
      )}
    </form>
  );
};

export default CreateStudySessionForm;
