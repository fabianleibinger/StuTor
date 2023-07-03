import React, { useState, useContext, useEffect } from "react";
import { Grid, Button, Box, Typography, Avatar } from "@mui/material";
import { useQuery, useMutation } from "react-query";
import BookingDialog from "../components/Booking/BookingDialog.js";
import { getStudySessionbyId, getStudysessions } from "../api/StudySession.js";
import BookingHistoryDialog from "../components/Booking/BookingHistoryDialog.js";
import StudysessionRating from "../components/Booking/Studysessionrating.js";
import "./styles.css";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";
import { useChatContext } from "../context/ChatProvider.js";
import { accessChat as accessChatCall } from "../api/Chat.js";
import ChatBox from '../components/Chat/ChatBox';

const StudysessionDetailsPage = () => {
  const { studySessionId } = useParams();
  const { user } = useContext(UserContext); // Access user state from UserContext
  const [studysession, setStudysession] = useState(false);
  const { selectedChat, setSelectedChat } = useChatContext();

  useEffect(() => {
    return () => {
      // Page is not visible, reset selectedChat to null
      setSelectedChat(null);
    };
  }, []);

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

  const { isLoading, error, data } = useQuery(
    ["studysession", studySessionId],
    () => getStudySessionbyId(studySessionId),
    {
      onSuccess: (data) => {
        setStudysession(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const accessChat = useMutation(() => accessChatCall([studysession.tutoredBy._id, user._id], studySessionId),
    {
      onSuccess: (data) => {
        setSelectedChat(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  useEffect(() => {
    const getChat = async () => {
      if (studysession) {
        try {
          await accessChat.mutateAsync();
        } catch (error) {
          console.log(error);
        }
      }
    }
    getChat();
  }, [studysession]);

  if (isLoading) return "Loading Studysession...";
  if (error) return "An error has occurred!";

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        alignContent: 'stretch',
        width: '96vw',
        height: '92vh',
        mx: 'auto',
        marginTop: '4vh',
        marginBottom: '3vh',
      }}
    >
      <Box width={0.49} height={1}>
        <div>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <Avatar
              src={studysession.tutoredBy.picture}
              alt=""
              sx={{ width: 90, height: 90 }}
            />
            <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
              {studysession.course.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
              {studysession.tutoredBy.firstname + " " + studysession.tutoredBy.lastname}
            </Typography>
            <Typography variant="subtitle2" sx={{ marginBottom: "0.5rem" }}>
              {studysession.course.university.name}
            </Typography>
            <StudysessionRating studySessionId={studySessionId} />
            <Typography variant="body1">{studysession.description}</Typography>
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
              userId={user._id}
              studySessionId={studySessionId}
            />

            <BookingDialog
              open={dialogOpen}
              onClose={handleCloseDialog}
              priceEuro={studysession.pricePerHourEuro}
              createdBy={user._id}
              studysession={studySessionId}
            />
          </Box>
        </div>
      </Box>
      <Box width={0.49} height={1}>
        {<ChatBox />}
      </Box>
    </Box >
  );
};

export default StudysessionDetailsPage;
