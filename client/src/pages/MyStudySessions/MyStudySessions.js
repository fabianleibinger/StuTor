import { useEffect } from "react";
import { useStudySessionsContext } from "../../hooks/UseStudySessionContext";
import axios from "axios";

// components
import StudySessionCard from "../../components/StudySessionCard/StudySessionDetailsCard/StudySessionDetailsCard";
import AddStudySessionCard from "../../components/StudySessionCard/AddStudySessionCard/AddStudySessionCard";
import CreateStudySessionDialog from "../../components/CreateStudySessionDialog/CreateStudySessionDialog";

import { Box, Grid } from "@mui/material";

const MyStudySessions = () => {
  const { studySessions, dispatch } = useStudySessionsContext();

  useEffect(() => {
    console.log("hi");
    const fetchStudySession = async () => {
      //const response = await fetch("http://localhost:3001/api/studysession");
      const response = await axios({
        method: "GET",
        url: "/api/studysession"
      });
      console.log(response);
      //const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_STUDY_SESSIONS", payload: response.data });
      }
    };

    fetchStudySession();
  }, [dispatch]);

  return (
    <Box style={{ maxHeight: "75vh", overflow: "auto" }}>
      <div>Hi</div>
      <Grid container spacing={2}>
        {studySessions &&
          studySessions.map(studySession => (
            <Grid item xs={12} sm={6} md={4}>
              <StudySessionCard
                key={studySession._id}
                studySession={studySession}
              />
            </Grid>
          ))}
        <Grid item xs={4}>
          <AddStudySessionCard>
            <CreateStudySessionDialog />
          </AddStudySessionCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyStudySessions;
