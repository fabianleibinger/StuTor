import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/ChatProvider";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getMessagesOfChat,
  sendMessage as sendMessageCall,
} from "../../api/Message";
import { Stack, Box, Chip, TextField, Button } from "@mui/material";
import getCurrentUser from "../../utils/getCurrentUser";
import io from "socket.io-client";

const ENDPOINT = "localhost:5000";
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

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // TODO: Notification.
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

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
        <Box overflow={"auto"} height={0.88}>
          <Stack direction="column" spacing={2} sx={stackSx}>
            {data ? (
              messages.map((message, index) => (
                <Stack
                  key={index}
                  direction="row"
                  justifyContent={index % 2 === 0 ? "flex-end" : "flex-start"}
                >
                  <Chip label={message.content} />
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
            marginRight={1}
            fullWidth
          />
          <Button variant="contained" onClick={handleSendClick}>
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
