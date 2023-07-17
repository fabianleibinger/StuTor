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
import GreenCircleComponent from "../components/Booking/GreenCircle.js";
import { LoadingIndicator } from "../components/General/LoadingIndicator.js";
import { ErrorIndicator } from "../components/General/ErrorIndicator.js";
import LanguageIcon from "@mui/icons-material/Language";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useUserContext } from "../context/UserProvider.js";
import AchievementsDisplay from "../components/Achievement/AchievementsDisplay.js";

const StudysessionDetailsPage = () => {
  const { studySessionId } = useParams();
  const { user } = useUserContext();
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
      retry: (failureCount, error) => {
        return error.status !== 404 && failureCount < 2;
      },
    }
  );

  console.log("data", data);

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

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "stretch",
        alignContent: "stretch",
        width: "97vw",
        height: "100vh",
        mx: "auto",
        marginTop: "2vh",
        marginBottom: "2vh",
      }}
    >
      <Box width={0.49} height={1}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 1,
            height: 1,
            border: "1px solid lightgrey",
            backgroundColor: "#f5f5f5",
            borderRadius: "6px",
            flexWrap: "wrap",
          }}
        >
          <Box
            component="div"
            sx={{
              overflow: "auto",
              padding: 2,
              height: 0.85,
              marginBottom: "5vh",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <GreenCircleComponent pricePerHourEuro={data.pricePerHourEuro} />
            </Box>
            <Typography variant="h3" sx={{ marginBottom: "1rem" }}>
              {data.courseName}
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
                sx={{ width: 150, height: 150 }}
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5">
                  {data.tutoredBy.firstname + " " + data.tutoredBy.lastname}
                </Typography>
                <Typography variant="subtitle2" sx={{ marginBottom: "1.5rem" }}>
                  {data.tutoredBy.university.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} alignContent={"center"}>
                {/* ---------------------------- StudysessionRating ---------------------------- */}
                <StudysessionRating studySessionId={studySessionId} />
                {/* ---------------------------- StudysessionRating ---------------------------- */}
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              marginBottom={"1.5rem"}
            >
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <LanguageIcon sx={{ marginRight: "0.5rem" }} />
                  </Grid>
                  {data.languages.map((language) => (
                    <Grid item>
                      <Typography
                        variant="subtitle2"
                        key={language}
                        marginRight={"0.5rem"}
                      >
                        {language}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              marginBottom={"1.5rem"}
            >
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <EmojiEventsIcon sx={{ marginRight: "0.5rem" }} />
                  </Grid>
                  <Grid item>
                    {/* ---------------------------- Achievements ---------------------------- */}
                    <AchievementsDisplay user={data.tutoredBy} size={100} />
                    {/* ---------------------------- Achievements ---------------------------- */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
              Course Description
            </Typography>
            <Typography>{data.description}</Typography>
          </Box>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "auto",
              marginBottom: "auto",
            }}
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
      </Box>
      <Box width={0.49} height={1}>
        {<ChatBox />}
      </Box>
    </Box>
  );
};

export default StudysessionDetailsPage;
