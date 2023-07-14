import React from "react";
import {
  Avatar,
  Divider,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useChatContext } from "../../context/ChatProvider";
import { theme } from "../../styles.js";
import { useUserContext } from "../../context/UserContext";

const ChatListItem = ({
  chat,
  selectedChat,
  setSelectedChat,
  isTypingInChats,
  unread,
}) => {
  const { notification, setNotification } = useChatContext();
  const { user } = useUserContext();

  return (
    <ListItemButton
      alignItems="flex-start"
      onClick={() => {
        setSelectedChat(chat);
        setNotification(
          notification.filter(
            (notification) => !notification.includes(chat._id)
          )
        );
      }}
      sx={{
        backgroundColor:
          selectedChat?._id === chat._id
            ? "lightgrey"
            : unread
            ? theme.palette.primary.notification
            : "inherit",
      }}
    >
      <ListItemAvatar>
        <Avatar
          src={
            chat.users[0]._id === user._id
              ? chat.users[1].picture
              : chat.users[0].picture
          }
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          chat.users[0]._id === user._id
            ? `${chat.users[1].firstname} ${chat.users[1].lastname} - ${chat.studysession?.courseName}`
            : `${chat.users[0].firstname} ${chat.users[0].lastname} - ${chat.studysession?.courseName}`
        }
        secondary={isTypingInChats.includes(chat._id) ? "Typing..." : chat.latest_message?.content}
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "100%",
        }}
      />
    </ListItemButton>
  );
};

export default ChatListItem;
