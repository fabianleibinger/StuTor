import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [newMessage, setNewMessage] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        newMessage,
        setNewMessage,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(ChatContext);
};

export { ChatProvider, useAppContext };