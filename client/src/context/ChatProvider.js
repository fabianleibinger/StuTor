import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

/**
 * Provider for the chat context variables (selected chat, messages, typing, notification).
 */
const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [isTypingInChats, setIsTypingInChats] = useState([]);
  const [notification, setNotification] = useState([]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        newMessage,
        setNewMessage,
        messages,
        setMessages,
        typing,
        setTyping,
        isTypingInChats,
        setIsTypingInChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => {
  return useContext(ChatContext);
};

export { ChatProvider, useChatContext };
