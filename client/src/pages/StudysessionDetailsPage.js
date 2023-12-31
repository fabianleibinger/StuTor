import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Button,
  Box,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
import TutorHourProgressBar from "../components/Achievement/TutorHourProgressBar.js";
import newRequest from "../utils/newRequest.js";

const StudysessionDetailsPage = () => {
  const { studySessionId } = useParams();
  const { user } = useUserContext();
  const [studysession, setStudysession] = useState(false);
  const { selectedChat, setSelectedChat } = useChatContext();
  const [hoursTutored, setHoursTutored] = useState(0);

  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));

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

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        // Fetch the user by _id from the MongoDB database
        const tutor = data.tutoredBy;
        const tutorResponse = await newRequest.get("/user/byId/" + tutor._id);
        if (tutorResponse) {
          // If the user is found, update the hoursTutored state
          setHoursTutored(tutorResponse.data.hours_tutored);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    if (data) {
      fetchTutor();
    }
  }, [data]);

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
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sm={isSmScreen ? 12 : 6}
        md={isXsScreen ? 12 : 6}
        lg={6}
      >
        {/* Course Details */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f5f5f5",
            borderRadius: "30px",
            flexWrap: "wrap",
            boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.2)",
            padding: "1rem",
            margin: "2rem",
            overflow: "auto",
            height: "85vh",
          }}
        >
          <Box
            component="div"
            sx={{
              overflow: "auto",
              padding: 2,
              marginBottom: "5vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%",
                paddingBottom: "2rem",
              }}
            >
              <Typography variant="h3">{data.courseName}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
                width: "90%",
              }}
            >
              <Avatar
                src={data.tutoredBy.picture}
                alt=""
                sx={{ width: 150, height: 150 }}
              />
              <GreenCircleComponent pricePerHourEuro={data.pricePerHourEuro} />
            </Box>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">
                {data.tutoredBy.firstname + ' ' + data.tutoredBy.lastname}
              </Typography>
              <Typography variant="subtitle2" sx={{ marginBottom: '1.5rem' }}>
                {data.tutoredBy.university.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} alignContent={'center'}>
              <StudysessionRating studySessionId={studySessionId} />
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
                    <Grid item key={language}>
                      <Typography variant="subtitle2" marginRight={"0.5rem"}>
                        {language}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            {/* ---------------------------- Buttons ---------------------------- */}
            <Box
              mt={2}
              sx={{
                display: "flex",
                justifyContent: "left",
                gap: "2rem",
                marginBottom: "2rem",
              }}
            >
              <Grid item key="booking-history">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleHistoryOpenDialog}
                >
                  View bookings
                </Button>
              </Grid>
              <Grid item key="book-now">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenDialog}
                >
                  Book now
                </Button>
              </Grid>
            </Box>
            {/* ---------------------------- Buttons ---------------------------- */}

            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              marginBottom={"1.5rem"}
            >
              {/* ---------------------------- Tutor Hour Progress Bar ---------------------------- */}
              <Grid item xs={12} md={6}>
                <Box
                  mt={2}
                  mb={2}
                  display="flex"
                  flexDirection="column"
                  width="100%" // Set the container to take full width of the grid item
                >
                  <Typography
                    variant="h5"
                    sx={{
                      marginBottom: "1rem",
                      color: "#1976d2",
                    }}
                  >
                    Tutor Experience
                  </Typography>
                  <div
                    style={{
                      marginLeft: "36px",
                      width: "400px",
                      marginBottom: "40px",
                    }}
                  >
                    <TutorHourProgressBar hoursTutored={hoursTutored} />
                  </div>
                </Box>
              </Grid>
              {/* ---------------------------- Tutor Hour Progress Bar ---------------------------- */}

            </Grid>
            {/* ---------------------------- Achievements ---------------------------- */}
            <Box mt={2} mb={2}>
              <Typography
                variant="h5"
                sx={{
                  marginBottom: "1rem",
                  color: "#1976d2",
                }}
              >
                Achievements
              </Typography>{" "}
              <div
                style={{
                  width: "90%",
                  overflowX: "auto",
                }}
              >
                <AchievementsDisplay
                  user={data.tutoredBy}
                  size={100}
                  showTitle={true}
                />
              </div>
            </Box>
            {/* ---------------------------- Achievements ---------------------------- */}

            {/* ---------------------------- Course Description ---------------------------- */}
            <Typography
              variant="h5"
              sx={{
                marginBottom: "1rem",
                color: "#1976d2",
              }}
            >
              Course Description
            </Typography>

            <div
            >
              <Typography>{data.description}</Typography>
            </div>
            {/* ---------------------------- Course Description ---------------------------- */}
          </Box>

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
      </Grid>

      <Grid
        item
        xs={12}
        sm={isSmScreen ? 12 : 6}
        md={isXsScreen ? 12 : 6}
        lg={6}
      >
        {/* Chat Box */}
        <Box
          sx={{
            boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "30px",
            padding: "1rem",
            margin: "2rem",
            height: "85vh",
          }}
        >
          {<ChatBox />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default StudysessionDetailsPage;
