import React from "react";
import {
  Avatar,
  Divider,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const ChatListItem = ({ chat, selectedChat, setSelectedChat, isTyping }) => {
  return (
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
