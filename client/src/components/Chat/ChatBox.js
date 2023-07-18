import React, { useEffect, useRef } from "react";
import { useChatContext } from "../../context/ChatProvider";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getMessagesOfChat,
  sendMessage as sendMessageCall,
} from "../../api/Message";
import {
  Stack,
  Box,
  Chip,
  TextField,
  Button,
  Avatar,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import socket from "../../Socket";
import { useUserContext } from "../../context/UserProvider";

var selectedChatCompare;

/*
 * Displays the messages of the selected chat in a box.
 * Also contains the input field to send a new message.
 * Handles real-time chat functionality.
 */
const ChatBox = () => {
  const {
    selectedChat,
    setSelectedChat,
    messages,
    setMessages,
    newMessage,
    setNewMessage,
    typing,
    setTyping,
    isTypingInChats,
    setIsTypingInChats,
  } = useChatContext();
  const { user } = useUserContext();
  const queryClient = useQueryClient();

  // Listening for chats that are being typed in.
  useEffect(() => {
    socket.on("typing in chat", (chatId) =>
      setIsTypingInChats((prevTypingInChat) => [...prevTypingInChat, chatId])
    );
    socket.on("stop typing in chat", (chatId) =>
      setIsTypingInChats((prevTypingInChat) =>
        prevTypingInChat.filter((id) => id !== chatId)
      )
    );

    return () => {
      socket.off("typing in chat");
      socket.off("stop typing in chat");
      // Page is not visible, reset selectedChat to null
      setSelectedChat(null);
    };
  }, []);

  // Listening for new messages from other users.
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      // MyChats component has to be updated to display the latest message.
      queryClient.invalidateQueries("chatsOfUser");
      if (
        selectedChatCompare &&
        selectedChatCompare._id === newMessageReceived.chat._id
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    });

    return () => {
      socket.off("message received");
    };
  });

  // Fetch all messages of the selected chat
  const { data } = useQuery(
    ["messagesOfChat", selectedChat?._id],
    () => getMessagesOfChat(selectedChat?._id),
    {
      enabled: Boolean(selectedChat?._id),
      retry: (failureCount, error) => {
        return error.status !== 404 && failureCount < 2;
      },
      onSuccess: (data) => {
        setMessages(data);
        selectedChatCompare = selectedChat;
        // Build a real-time connection to the other users of the chat.
        socket.emit("join chat", selectedChat._id);
      },
    }
  );

  // Send a new message to the selected chat.
  const sendMessage = useMutation(
    () => sendMessageCall(user._id, newMessage, selectedChat._id),
    {
      onSuccess: (data) => {
        setMessages([...messages, data]);
        // Inform users of the chat that a new message has been sent.
        socket.emit("new message", data);
        // ChatBox and myChats component have to be updated.
        queryClient.invalidateQueries("messagesOfChat");
        queryClient.invalidateQueries("chatsOfUser");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
    // Inform other users of the chat that I am typing.
    if (!typing) {
      setTyping(true);
      socket.emit("typing in chat", selectedChat);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        // Inform other users of the chat when I stopped typing.
        socket.emit("stop typing in chat", selectedChat);
        setTyping(false);
      }
    }, timerLength);
  };

  const handleSendClick = async () => {
    await sendMessage.mutateAsync();
    socket.emit("stop typing in chat", selectedChat);
    setTyping(false);
    setNewMessage("");
  };

  const handleKeyDown = (event) => {
    if ((event.key === "Enter") & (newMessage !== "")) {
      handleSendClick();
    }
  };

  // Scroll to the bottom of the chatbox when messages change.
  const chatboxRef = useRef(null);
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const boxSx = {
    display: "flex",
    flexDirection: "column",
    width: 1,
    height: 1,
  };

  const stackSx = {
    width: 0.92,
    height: 0.94,
    padding: 2,
  };

  if (selectedChat) {
    return (
      <Box sx={boxSx}>
        <Box ref={chatboxRef} overflow={"auto"} height={1}>
          <Stack direction="column" spacing={2} sx={stackSx}>
            {data ? (
              messages.map((message, index) => {
                const createdAt = new Date(message.createdAt);
                const timeString = createdAt.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <Stack
                    key={index}
                    direction="row"
                    justifyContent={
                      user._id === message.sender._id
                        ? "flex-end"
                        : "flex-start"
                    }
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent={
                        user._id === message.sender._id
                          ? "flex-end"
                          : "flex-start"
                      }
                      sx={{ maxWidth: 0.7 }}
                    >
                      {user._id !== message.sender._id ? (
                        <Avatar
                          src={message.sender.picture}
                          sx={{ marginRight: 1 }}
                        />
                      ) : null}
                      <Chip
                        label={message.content}
                        sx={{
                          height: "auto",
                          padding: 0.75,
                          "& .MuiChip-label": {
                            display: "block",
                            whiteSpace: "normal",
                          },
                        }}
                      />
                    </Stack>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ padding: 0.75 }}
                    >
                      {timeString}
                    </Typography>
                  </Stack>
                );
              })
            ) : (
              <Chip
                label="Start a Conversation With the Tutor!"
                variant="outlined" // Add an outline to the chip
                color="primary" // Use the primary color for the chip background
                sx={{
                  fontSize: "1.2rem", // Adjust the font size as desired
                  fontWeight: "bold", // Add bold font weight
                  padding: "0.5rem 1rem", // Add padding to the chip to make it larger
                  borderRadius: "50px", // Set a higher value for a more rounded shape
                }}
              />
            )}
          </Stack>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            padding: 1,
          }}
        >
          <TextField
            label={
              isTypingInChats.includes(selectedChat._id)
                ? "Typing..."
                : "Message"
            }
            value={newMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            sx={{ width: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleSendClick}
            endIcon={<SendIcon />}
            sx={{ marginLeft: 1 }}
          >
            Send
          </Button>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box sx={boxSx}>
        <Stack direction="column" spacing={2} sx={stackSx}></Stack>
      </Box>
    );
  }
};

export default ChatBox;
