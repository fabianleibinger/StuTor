import { useEffect } from "react";
import getCurrentUser from "./getCurrentUser";
import io from "socket.io-client";
import { useSocketContext } from "../context/SocketContext";

export const ENDPOINT = "localhost:3001";
const socket = io(ENDPOINT);

export const Socket = () => {
  const { setSocketConnected } = useSocketContext();

  useEffect(() => {
    socket.emit("setup", getCurrentUser());
    socket.on("connected", () => setSocketConnected(true));
  }, []);
};

export default socket;
