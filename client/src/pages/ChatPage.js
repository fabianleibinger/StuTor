import Box from "@mui/material/Box";
import MyChats from "../components/Chat/MyChats";
import ChatBox from "../components/Chat/ChatBox";

/**
 * The Chat Page.
 * Incorporates the MyChats and ChatBox components.
 */
const ChatPage = () => {
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
        height: "90vh",
        mx: "auto",
        marginBottom: "1vh",
      }}
    >
      <Box width={0.49} height={1} sx={{marginTop: "2vh"}}>
        {<MyChats />}
      </Box>
      <Box
        width={0.45}
        height={1}
        sx={{
          boxShadow: "0px 10px 16px rgba(0, 0, 0, 0.2)",
          borderRadius: "30px",
          padding: "1rem",
          margin: "2rem",
          height: "85vh",
        }}
      >
        {<ChatBox />}
      </Box>
    </Box>
  );
};

export default ChatPage;
