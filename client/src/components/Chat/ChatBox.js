import React, { useEffect, useState, useRef } from "react";
import { useAppContext } from "../../context/ChatProvider";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getMessagesOfChat,
  sendMessage as sendMessageCall,
} from "../../api/Message";
import { Stack, Box, Chip, TextField, Button, Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import getCurrentUser from "../../utils/getCurrentUser";
import io from "socket.io-client";

const ENDPOINT = "localhost:3001";
var socket, selectedChatCompare;

const ChatBox = () => {
  const { selectedChat, messages, setMessages, newMessage, setNewMessage } =
    useAppContext();
  const [socketConnected, setSocketConnected] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", getCurrentUser());
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // TODO: Notification.
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const { data } = useQuery(
    ["messagesOfChat", selectedChat?._id],
    () => getMessagesOfChat(selectedChat?._id),
    {
      enabled: Boolean(selectedChat?._id),
      onSuccess: (data) => {
        socket.emit("join chat", selectedChat._id);
        selectedChatCompare = selectedChat;
        setMessages(data);
      },
    }
  );

  const sendMessage = useMutation(
    () => sendMessageCall(getCurrentUser()._id, newMessage, selectedChat._id),
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
  };

  const handleSendClick = async () => {
    await sendMessage.mutateAsync();
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
    width: 1,
    height: 1,
    border: "1px solid lightgrey",
    borderRadius: "6px",
  };

  const stackSx = {
    width: 0.95,
    height: 0.88,
    padding: 2,
  };

  if (selectedChat)
    return (
      <Box sx={boxSx}>
        <Box ref={chatboxRef} overflow={"auto"} height={0.88}>
          <Stack direction="column" spacing={2} sx={stackSx}>
            {data ? (
              messages.map((message, index) => (
                <Stack
                  key={index}
                  direction="row"
                  justifyContent={
                    getCurrentUser()._id === message.sender._id
                      ? "flex-end"
                      : "flex-start"
                  }
                >
                  {getCurrentUser()._id !== message.sender._id ? (
                    <Avatar
                      src={message.sender.profilePicture}
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
              ))
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
            label="Message"
            value={newMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            sx={{ width: 0.8 }}
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

  return (
    <Box sx={boxSx}>
      <Stack direction="column" spacing={2} sx={stackSx}>
        <Chip label="Select a chat to start messaging!" />
      </Stack>
    </Box>
  );
};

export default ChatBox;
