import { useEffect } from "react";
import io from "socket.io-client";
import { useSocketContext } from "./context/SocketProvider";
import { useChatContext } from "./context/ChatProvider";
import { useBookingContext } from "./context/BookingProvider";
import { useUserContext } from "./context/UserProvider";

export const ENDPOINT = "localhost:3001";
const socket = io(ENDPOINT);

/**
 * Handles the notifications for the user.
 */
export const Socket = ({ children }) => {
  const { setSocketConnected } = useSocketContext();
  const { user } = useUserContext();

  // Connect to the private room of the user.
  useEffect(() => {
    if (!user) return;
    socket.emit("setup", user?._id);
    socket.on("connected", () => setSocketConnected(true));

    return () => {
      socket.off("connected");
    };
  }, [user]);

  const { selectedChat, setNotification } = useChatContext();
  const { bookingNotification, setBookingNotification } = useBookingContext();

  useEffect(() => {
    // Listen for new messages and notify the user in case he didn't see it.
    socket.on("message received", (newMessageReceived) => {
      const chatId = newMessageReceived.chat._id;
      if (!selectedChat || selectedChat._id !== chatId) {
        setNotification((prevNotifications) => [...prevNotifications, chatId]);
      }
    });

    // Listen for new bookings and notify the user.
    socket.on("booking received", (bookingId) => {
      if (bookingNotification.includes(bookingId)) {
        return;
      } else {
        setBookingNotification((prevNotifications) => [
          ...prevNotifications,
          bookingId,
        ]);
      }
    });

    return () => {
      socket.off("message received");
      socket.off("booking received");
    };
  }, []);

  return children;
};

export default socket;
