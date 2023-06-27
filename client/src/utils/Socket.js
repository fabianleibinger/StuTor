import { useEffect } from "react";
import getCurrentUser from "./getCurrentUser";
import io from "socket.io-client";
import { useSocketContext } from "../context/SocketContext";
import { useChatContext } from "../context/ChatProvider";

export const ENDPOINT = "localhost:3001";
const socket = io(ENDPOINT);

export const Socket = () => {
  const { setSocketConnected } = useSocketContext();

  useEffect(() => {
    socket.emit("setup", getCurrentUser()._id);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  const { selectedChat, notification, setNotification } = useChatContext();

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([...notification, newMessageReceived]);
        }
      }
    });
  });
};

export default socket;
