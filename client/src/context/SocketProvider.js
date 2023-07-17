import { createContext, useContext, useState } from "react";

const SocketContext = createContext();

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
