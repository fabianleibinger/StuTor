import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme, AppContainer, Content } from "./styles";
import { ThemeProvider } from "@mui/material";
import Home from "./pages/Home.js";
import Navbar from "./components/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import MyStudySessions from "./pages/MyStudySessions.js";
import StudySessionSearch from "./pages/StudySessionSearch.js";
import StudysessionDetailsPage from "./pages/StudysessionDetailsPage.js";
import UserProfile from "./pages/UserProfile.js";
import { UserContext } from "./context/UserContext";
import ChatPage from "./pages/ChatPage";
import SuccessPage from "./pages/SuccessPage.js"
import ViewBookingsPage from "./pages/ViewBookingsPage.js"
import { Stack } from "@mui/system";

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ user, setUser }}>
          <Router>
            <AppContainer>
              <Navbar />
              <Content>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/userProfile" element={<UserProfile />} />
                  <Route
                    path="/MyStudySessions"
                    element={<MyStudySessions />}
                  />
                  <Route path="/myChats" element={<ChatPage />} />
                  <Route path="/SearchSessions" element={<StudySessionSearch />} />
                  <Route
                    path="/StudysessionDetailsPage/:studySessionId"
                    element={<StudysessionDetailsPage />}
                  />
                  <Route path="/success/:bookingId" element={<SuccessPage />} />
                  <Route path="/viewBookings" element={<ViewBookingsPage />} />
                </Routes>
              </Content>
              <Footer />
            </AppContainer>
          </Router>
        </UserContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
