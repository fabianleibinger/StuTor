import React, { useState, useContext, useEffect } from "react";
import { Grid, Button, Box, Typography, Avatar } from "@mui/material";
import { useQuery, useMutation } from "react-query";
import BookingDialog from "../components/Booking/BookingDialog.js";
import { getStudySessionbyId, getStudysessions } from "../api/StudySession.js";
import BookingHistoryDialog from "../components/Booking/BookingHistoryDialog.js";
import StudysessionRating from "../components/Booking/Studysessionrating.js";
import { useParams } from "react-router-dom";
import { useChatContext } from "../context/ChatProvider.js";
import { accessChat as accessChatCall } from "../api/Chat.js";
import ChatBox from "../components/Chat/ChatBox";
import TextTruncate from "react-text-truncate";
import GreenCircleComponent from "../components/Booking/GreenCircle.js";
import getCurrentUser from "../utils/getCurrentUser.js";

const StudysessionDetailsPage = () => {
  const { studySessionId } = useParams();
  const user = getCurrentUser()
  const [studysession, setStudysession] = useState(false);
  const { selectedChat, setSelectedChat } = useChatContext();

  // states and functions for read more
  const [expanded, setExpanded] = useState(false);

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

  const accessChat = useMutation(
    () =>
      accessChatCall([studysession.tutoredBy._id, user._id], studySessionId),
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
    };
    getChat();
  }, [studysession]);

  if (isLoading) return "Loading Studysession for you...";
  if (error) return "Oh noooo! An error has occurred!";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "stretch",
        alignContent: "stretch",
        width: "96vw",
        height: "92vh",
        mx: "auto",
        marginTop: "4vh",
        marginBottom: "3vh",
      }}
    >
      <Box width={0.49} height={1}>
        <div>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              padding: "1rem",
              borderRadius: "8px",
              width: "100%",
            }}
          >
            <Box
              height={1}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <GreenCircleComponent pricePerHourEuro={data.pricePerHourEuro} />
            </Box>
            <Typography variant="h3" sx={{ marginBottom: "1rem" }}>
              {data.course.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Avatar
                src={data.tutoredBy.picture}
                alt=""
                sx={{ width: 120, height: 120 }}
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5">
                  {data.tutoredBy.firstname + " " + data.tutoredBy.lastname}
                </Typography>
                <Typography variant="subtitle2" sx={{ marginBottom: "1.5rem" }}>
                  {data.course.university.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} alignContent={"center"}>
                <StudysessionRating studySessionId={studySessionId} />
              </Grid>
            </Grid>
            <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
              Course description
            </Typography>
            <Typography variant="body1" marginBottom={6}>
              <TextTruncate
                line={20}
                truncateText="..."
                text={data.description}
                textTruncateChild={
                  <Button onClick={() => setExpanded(true)}>Read More</Button>
                }
                expanded={expanded}
                onTruncate={() => setExpanded(false)}
              />
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid item marginRight={8}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleHistoryOpenDialog}
                    style={{ width: "auto" }}
                  >
                    View bookings
                  </Button>
                </Grid>
                <Grid item marginLeft={8}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenDialog}
                  >
                    Book now
                  </Button>
                </Grid>
              </Box>
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
              priceEuro={data.pricePerHourEuro}
              createdBy={user._id}
              studysession={data}
            />
          </Box>
        </div>
      </Box>
      <Box width={0.49} height={1}>
        {<ChatBox />}
      </Box>
    </Box>
  );
};

export default StudysessionDetailsPage;
