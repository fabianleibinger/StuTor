import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ChatPage from "./pages/ChatPage";
import SuccessPage from "./pages/SuccessPage.js";
import ViewBookingsPage from "./pages/ViewBookingsPage.js";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContainer>
          <Navbar />
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route path="/" element={<PrivateRoute />}>
                <Route path="/userProfile" element={<UserProfile />} />
              </Route>

              <Route path="/" element={<PrivateRoute />}>
                <Route path="/MyStudySessions" element={<MyStudySessions />} />
              </Route>

              <Route path="/" element={<PrivateRoute />}>
                <Route path="/myChats" element={<ChatPage />} />
              </Route>

              <Route path="/" element={<PrivateRoute />}>
                <Route
                  path="/SearchSessions"
                  element={<StudySessionSearch />}
                />
              </Route>

              <Route path="/" element={<PrivateRoute />}>
                <Route
                  path="/StudysessionDetailsPage/:studySessionId"
                  element={<StudysessionDetailsPage />}
                />
              </Route>
              <Route path="/" element={<PrivateRoute />}>
                <Route
                  path="/success/:bookingId/:tutorId"
                  element={<SuccessPage />}
                />
              </Route>
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/viewBookings" element={<ViewBookingsPage />} />
              </Route>
            </Routes>
          </Content>
          <Footer />
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
