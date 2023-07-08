import React from "react";
import {
  Avatar,
  Divider,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useChatContext } from "../../context/ChatProvider";

const ChatListItem = ({ chat, selectedChat, setSelectedChat, isTyping, unread }) => {

  const { notification, setNotification } = useChatContext();

  return (
    <ListItemButton
      alignItems="flex-start"
      onClick={() => {
        setSelectedChat(chat);
        setNotification(notification.filter(notification => !notification.includes(chat._id)));
      }}
      sx={{
        backgroundColor:
          selectedChat?._id === chat._id ? "lightgrey" : (unread ? "grey" : "inherit"),
      }}
    >
      <ListItemAvatar>
        <Avatar src={chat.users[0].picture} />
      </ListItemAvatar>
      <ListItemText
        primary={`${chat.users[0].firstname} ${chat.users[0].lastname} - ${chat.studysession.course.name}`}
        secondary={isTyping ? "Typing..." : chat.latest_message?.content}
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
