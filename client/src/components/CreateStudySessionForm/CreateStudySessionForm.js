import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { Button, Box, TextField } from '@mui/material';
import { Stack } from '@mui/system';

// import other components
import CourseSearch from '../CourseSearch/CourseSearch';
import LanguageSelection from '../LanguageSelection/LanguageSelection';
import { createStudysession } from '../../api/StudySession';

const StudySessionForm = ({ handleClose }) => {
  const [course, setCourse] = useState('');
  const [pricePerHourEuro, setPricePerHourEuro] = useState('');
  const [languages, setLanguages] = useState([]);
  const [description, setDescription] = useState('');
  const [e, setE] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  const queryClient = useQueryClient();

  const mutation = useMutation(createStudysession, {
    onSuccess: () => {
      setCourse('');
      setPricePerHourEuro('');
      setDescription('');
      setLanguages([]);
      setE('');
      setEmptyFields([]);
      handleClose();
      queryClient.invalidateQueries('studysessions');
    },
    onError: error => {
      // Handle error
      console.log('EEEEEEEEERRRRRRRRRRROOOOOOOOOOR', error.data);
      setE(error.data);
    }
  });

  const handleSubmit = event => {
    event.preventDefault();

    if (!course) {
      setEmptyFields(list(emptyFields).push('course'));
    }
    if (!languages) {
      setEmptyFields(emptyFields.push('LanguageSelection'));
    }

    if (emptyFields) {
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
          <LanguageSelection
            onSelectedLanguage={handleSelectedLanguages}
            required
          />

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
      {emptyFields && <div className="error">{emptyFields[0]}</div>}
    </form>
  );
};

export default StudySessionForm;
