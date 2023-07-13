import React from 'react';
import {
  Avatar,
  Divider,
  ListItemAvatar,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { useChatContext } from '../../context/ChatProvider';
import { theme } from '../../styles.js';
import getCurrentUser from '../../utils/getCurrentUser';

const ChatListItem = ({
  chat,
  selectedChat,
  setSelectedChat,
  isTyping,
  unread
}) => {
  const { notification, setNotification } = useChatContext();
  const currentUser = getCurrentUser();

  return (
    <ListItemButton
      alignItems="flex-start"
      onClick={() => {
        setSelectedChat(chat);
        setNotification(
          notification.filter(notification => !notification.includes(chat._id))
        );
      }}
      sx={{
        backgroundColor:
          selectedChat?._id === chat._id
            ? 'lightgrey'
            : unread
            ? theme.palette.primary.notification
            : 'inherit'
      }}
    >
      <ListItemAvatar>
        <Avatar
          src={
            chat.users[0]._id === currentUser._id
              ? chat.users[1].picture
              : chat.users[0].picture
          }
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          chat.users[0]._id === currentUser._id
            ? `${chat.users[1].firstname} ${chat.users[1].lastname} - ${chat.studysession.courseName}`
            : `${chat.users[0].firstname} ${chat.users[0].lastname} - ${chat.studysession.courseName}`
        }
        secondary={isTyping ? 'Typing...' : chat.latest_message?.content}
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '100%'
        }}
      />
    </ListItemButton>
  );
};

export default ChatListItem;
