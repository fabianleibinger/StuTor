import { useEffect } from "react";
import getCurrentUser from "./utils/getCurrentUser";
import io from "socket.io-client";
import { useSocketContext } from "./context/SocketContext";
import { useChatContext } from "./context/ChatProvider";
import { useBookingContext } from "./context/BookingProvider";

export const ENDPOINT = "localhost:3001";
const socket = io(ENDPOINT);

export const Socket = () => {
  const { setSocketConnected } = useSocketContext();

  useEffect(() => {
    socket.emit("setup", getCurrentUser()?._id);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  const { selectedChat, notification, setNotification } = useChatContext();
  const { bookingNotification, setBookingNotification } = useBookingContext();

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      const chatId = newMessageReceived.chat._id;
      if (!selectedChat || selectedChat._id !== chatId) {
        setNotification((prevNotifications) => [...prevNotifications, chatId]);
      }
    });

    socket.on("booking received", (studysession) => {
      setBookingNotification((prevNotifications) => [
        ...prevNotifications,
        studysession._id,
      ]);
    });

    return () => {
      socket.off("message received");
      socket.off("booking received");
    };
  }, []);
};

export default socket;
