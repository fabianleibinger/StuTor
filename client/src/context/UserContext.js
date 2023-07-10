import React, { createContext, useState, useContext, useEffect } from "react";
import getCurrentUser from "../utils/getCurrentUser";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContextProvider, useUserContext };