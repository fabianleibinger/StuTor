import React from "react";
import { getChatsOfUser } from "../../api/Chat";
import { useQuery } from "react-query";
import {
  Box,
  Skeleton,
  Alert,
  List,
  Divider,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { useAppContext } from "../../context/ChatProvider";
import getCurrentUser from "../../utils/getCurrentUser";

const MyChats = () => {
  const { selectedChat, setSelectedChat, isTyping } = useAppContext();

  const { isLoading, error, data } = useQuery(["chatsOfUser"], () =>
    getChatsOfUser(getCurrentUser()._id)
  );

  const boxSx = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    width: 1,
    height: 1,
  };

  const loading_skeleton = (
    <Skeleton
      variant="rounded"
      sx={{ flexGrow: 1, width: 1, marginBottom: "3vh" }}
    />
  );

  if (isLoading)
    return (
      <Box sx={boxSx}>
        {loading_skeleton}
        {loading_skeleton}
        {loading_skeleton}
        {loading_skeleton}
        {loading_skeleton}
        {loading_skeleton}
        {loading_skeleton}
        {loading_skeleton}
      </Box>
    );

  if (error)
    return (
      <Box sx={boxSx}>
        <Alert severity="info" sx={{ flexGrow: 1, width: 0.95 }}>
          Start a chat first!
        </Alert>
      </Box>
    );

  if (data)
    return (
      <Box sx={boxSx}>
        <List
          sx={{
            width: 1,
            overflow: "auto",
          }}
        >
          {data.map((chat, index) => (
            <React.Fragment key={chat.id}>
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setSelectedChat(chat)}
                sx={{
                  backgroundColor:
                    selectedChat?._id === chat._id ? "lightgrey" : "inherit",
                }}
              >
                <ListItemAvatar>
                  <Avatar src={chat.users[0].picture} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    chat.users[0].firstname +
                    " " +
                    chat.users[0].lastname +
                    " - " +
                    chat.studysession.course.name
                  }
                  secondary={
                    isTyping ? "Typing..." : chat.latest_message?.content
                  }
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "100%",
                  }}
                />
              </ListItemButton>
              {index < data.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    );
};

export default MyChats;
