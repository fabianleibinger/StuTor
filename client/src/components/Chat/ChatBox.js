import React, { useEffect, useRef } from "react";
import { useChatContext } from "../../context/ChatProvider";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getMessagesOfChat,
  sendMessage as sendMessageCall,
} from "../../api/Message";
import { Stack, Box, Chip, TextField, Button, Avatar, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import socket from "../../Socket";
import { useUserContext } from "../../context/UserContext";

var selectedChatCompare;

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
    isTyping,
    setIsTyping,
  } = useChatContext();
  const { user } = useUserContext();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    return () => {
      socket.off("typing");
      socket.off("stop typing");
      // Page is not visible, reset selectedChat to null
      setSelectedChat(null);
    };
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
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
        socket.emit("join chat", selectedChat._id);
      },
    }
  );

  const sendMessage = useMutation(
    () => sendMessageCall(user._id, newMessage, selectedChat._id),
    {
      onSuccess: (data) => {
        setMessages([...messages, data]);
        socket.emit("new message", data);
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
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat);
        setTyping(false);
      }
    }, timerLength);
  };

  const handleSendClick = async () => {
    await sendMessage.mutateAsync();
    socket.emit("stop typing", selectedChat);
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
    border: "1px solid lightgrey",
    borderRadius: "6px",
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
                const timeString = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return (<Stack
                  key={index}
                  direction="row"
                  justifyContent={
                    user._id === message.sender._id
                      ? "flex-end"
                      : "flex-start"
                  }
                >
                  <Stack direction="row" alignItems="center" justifyContent={
                    user._id === message.sender._id
                      ? "flex-end"
                      : "flex-start"
                  } sx={{ maxWidth: 0.7 }}>
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
                  <Typography variant="caption" color="textSecondary" sx={{ padding: 0.75 }}>{timeString}</Typography>
                </Stack>
                );
              })
            ) : (
              <Chip label="Start a conversation!" />
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
            label={isTyping ? "Typing..." : "Message"}
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
        <Stack direction="column" spacing={2} sx={stackSx}>
        </Stack>
      </Box>
    );
  }
};

export default ChatBox;
