import { useState } from "react";
import { useStudySessionsContext } from "../../hooks/UseStudySessionContext";
import { Button, Box, TextField } from "@mui/material";
import { Stack } from "@mui/system";

const StudySessionForm = ({ handleClose }) => {
  const { dispatch } = useStudySessionsContext();
  const [course, setCourse] = useState("");
  const [pricePerHourEuro, setPricePerHourEuro] = useState("");
  const [languages, setLanguages] = useState([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    const studySession = {
      // needs to be changed to real course, real user
      course: { course: "course" },
      tutoredBy: {
        username: "me",
        email: "me@me.de",
        password: "itsme",
        lastname: "me",
        firstname: "me",
        role: "TUTOR",
        university: "mine"
      },
      description: description,
      pricePerHourEuro: pricePerHourEuro,
      languages: languages
    };

    const response = await fetch("/api/studysession", {
      method: "POST",
      body: JSON.stringify(studySession),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setCourse("");
      setPricePerHourEuro("");
      setDescription("");
      setLanguages([]);
      setError(null);
      setEmptyFields([]);
      console.log("new study session added", json);
      dispatch({ type: "CREATE_STUDY_SESSION", payload: json });
      handleClose();
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Stack direction="column" spacing={2}>
          <TextField
            variant="outlined"
            autoFocus
            margin="dense"
            id="course"
            label="Course"
            type="Text"
            fullWidth
            required
            onChange={e => setCourse(e.target.value)}
            value={course}
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
          <TextField
            variant="outlined"
            autoFocus
            margin="dense"
            id="languages"
            label="Languages"
            type="Text"
            fullWidth
            required
            onChange={e => setLanguages(e.target.value)}
            value={languages}
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
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default StudySessionForm;
