import React from "react";
import { getChatsOfUser } from "../../api/Chat";
import { useQuery } from "react-query";
import { Box, Skeleton, Alert, List, Divider } from "@mui/material";
import { useChatContext } from "../../context/ChatProvider";
import ChatListItem from "./ChatListItem";
import { useUserContext } from "../../context/UserProvider";

const MyChats = () => {
  const {
    selectedChat,
    setSelectedChat,
    isTypingInChats,
    notification,
  } = useChatContext();
  const { user } = useUserContext();

  const { isLoading, error, data } = useQuery(
    ["chatsOfUser"],
    () => getChatsOfUser(user._id),
    {
      retry: (failureCount, error) => {
        return error.status !== 404 && failureCount < 2;
      },
    }
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

  const LoadingSkeleton = (
    <Skeleton
      variant="rounded"
      sx={{ flexGrow: 1, width: 1, marginBottom: "3vh" }}
    />
  );

  if (isLoading)
    return (
      <Box sx={boxSx}>
        {LoadingSkeleton}
        {LoadingSkeleton}
        {LoadingSkeleton}
        {LoadingSkeleton}
        {LoadingSkeleton}
        {LoadingSkeleton}
        {LoadingSkeleton}
        {LoadingSkeleton}
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
          {data.map(
            (chat, index) =>
              chat.latest_message != null && (
                <React.Fragment key={chat._id}>
                  <ChatListItem
                    chat={chat}
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                    isTypingInChats={isTypingInChats}
                    unread={notification.includes(chat._id)}
                  />
                  <Divider />
                </React.Fragment>
              )
          )}
        </List>
      </Box>
    );
};

export default MyChats;
