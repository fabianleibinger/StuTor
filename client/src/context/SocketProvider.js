import { createContext, useContext, useState } from "react";

const SocketContext = createContext();

/**
 * Provider for the socket context variables (connection of socket).
 */
const SocketProvider = ({ children }) => {
  const [socketConnected, setSocketConnected] = useState(false);

  return (
    <SocketContext.Provider
      value={{
        socketConnected,
        setSocketConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

const useSocketContext = () => {
  return useContext(SocketContext);
};

export { SocketProvider, useSocketContext };
