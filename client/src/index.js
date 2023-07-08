import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@mui/material/styles";

import { SocketProvider } from "./context/SocketContext";
import { UserContextProvider } from "./context/UserContext";
import { ChatProvider } from "./context/ChatProvider";

import { QueryClient, QueryClientProvider } from "react-query";
import { Socket } from "./Socket";
import { BookingProvider } from "./context/BookingProvider";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ChatProvider>
          <BookingProvider>
            <SocketProvider>
              <Socket />
              <App />
            </SocketProvider>
          </BookingProvider>
        </ChatProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
