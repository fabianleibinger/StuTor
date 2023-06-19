import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { Button, Box, TextField } from '@mui/material';

// import other components
import CourseSearch from '../Searchbars/CourseSearch';
import LanguageSelection from '../Filters/LanguageSelection';
import { updateStudysession } from '../../api/StudySession';

const UpdateStudySessionForm = ({ studySession, handleClose }) => {
  const [course, setCourse] = useState(studySession.course);
  const [pricePerHourEuro, setPricePerHourEuro] = useState(
    studySession.pricePerHourEuro
  );
  const [languages, setLanguages] = useState(studySession.languages);
  const [description, setDescription] = useState(studySession.description);
  const [postError, setPostError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    //Hier stimmt irgendwas nicht anscheinend ist updateStudysession nicht definiert
    () => updateStudysession(studySession._id, updatedStudySession),
    {
      onSuccess: () => {
        handleClose();
        queryClient.invalidateQueries('studysessions');
      },
      onError: error => {
        // Handle error
        setPostError(error.message);
      }
    }
  );

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

    const updatedStudySession = {
      course: String(course._id),
      description: description,
      pricePerHourEuro: pricePerHourEuro,
      languages: languages
    };

    mutation.mutate(updatedStudySession);
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
    <form className="update" onSubmit={handleSubmit}>
      <div>
        <div>
          <CourseSearch
            onSelectCourse={handleSelectCourse}
            onDeleteCourse={handleDeleteCourse}
            required
            initialValue={course}
          />
        </div>

        <TextField
          variant="outlined"
          autoFocus
          margin="dense"
          id="pricePerHourEuro"
          label="Price per Hour"
          type="number"
          fullWidth
          required
          onChange={e => setPricePerHourEuro(e.target.value)}
          value={pricePerHourEuro}
        />

        <LanguageSelection
          handleLanguageChange={handleSelectedLanguages}
          initialValue={languages}
        />

        <TextField
          variant="outlined"
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          required
          onChange={e => setDescription(e.target.value)}
          value={description}
        />

        <Box mt={2}>
          <Button type="submit" variant="contained">
            Update Study Session
          </Button>
        </Box>
      </div>
      {emptyFields.length !== 0 && (
        <div className="error">Please fill out all empty fields</div>
      )}
      {mutation.isError && emptyFields.length === 0 && (
        <div className="error">
          Error updating study session. Please try again.
        </div>
      )}
    </form>
  );
};

export default UpdateStudySessionForm;
