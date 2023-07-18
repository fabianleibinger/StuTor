import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import MyChats from "../components/Chat/MyChats";
import ChatBox from "../components/Chat/ChatBox";

/**
 * The Chat Page.
 * Incorporates the MyChats and ChatBox components.
 */
const ChatPage = () => {

  // Check if the screen width is below the breakpoint (sm or xs)
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));

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
            boxShadow: "0px 10px 16px rgba(0, 0, 0, 0.2)", // Increased shadow values
            padding: "1rem",
            margin: "2rem",
            overflow: "auto",
            height: "85vh", // Set a specific height to limit vertical scrolling
          }}
        >
          {<MyChats />}
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={isSmScreen ? 12 : 6}
        md={isXsScreen ? 12 : 6}
        lg={6}
      >
        <Box
          sx={{
            boxShadow: "0px 10px 16px rgba(0, 0, 0, 0.2)", // Increased shadow values
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

export default ChatPage;
