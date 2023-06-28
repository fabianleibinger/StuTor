import React, { useState, useContext } from "react";
import { Grid, Button, Box, Typography, Avatar } from "@mui/material";
import { useQuery } from "react-query";
import BookingDialog from "../components/Booking/BookingDialog.js";
import { getStudySessionbyId, getStudysessions } from "../api/StudySession.js";
import BookingHistoryDialog from "../components/Booking/BookingHistoryDialog.js";
import StudysessionRating from "../components/Booking/Studysessionrating.js";
import "./styles.css";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";

const StudysessionDetailsPage = () => {
  const { studySessionId } = useParams();
  const { user } = useContext(UserContext); // Access user state from UserContext

  // states and functions for booking dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // states and functions for booking history dialog
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const handleHistoryOpenDialog = () => {
    setHistoryDialogOpen(true);
  };
  const handleHistoryCloseDialog = () => {
    setHistoryDialogOpen(false);
  };

  const userId = user ? user._id : null; // TODO: Check if currentUser is null
  const { isLoading, error, data } = useQuery(
    ["studysession", studySessionId],
    () => getStudySessionbyId(studySessionId)
  );

  if (isLoading) return "Loading Studysession...";
  if (error) return "An error has occurred!";

  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        <Avatar
          src={data.tutoredBy.picture}
          alt=""
          sx={{ width: 90, height: 90 }}
        />
        <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
          {data.course.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
          {data.tutoredBy.firstname + " " + data.tutoredBy.lastname}
        </Typography>
        <Typography variant="subtitle2" sx={{ marginBottom: "0.5rem" }}>
          {data.course.university.name}
        </Typography>
        <StudysessionRating studySessionId={studySessionId} />
        <Typography variant="body1">{data.description}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleHistoryOpenDialog}
            >
              View bookings
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
            >
              Book now
            </Button>
          </Grid>
        </Grid>

        <BookingHistoryDialog
          open={historyDialogOpen}
          onClose={handleHistoryCloseDialog}
          userId={userId}
          studySessionId={studySessionId}
        />

        <BookingDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          priceEuro={data.pricePerHourEuro}
          createdBy={userId}
          studysession={studySessionId}
        />
      </Box>
    </div>
  );
};

export default StudysessionDetailsPage;
