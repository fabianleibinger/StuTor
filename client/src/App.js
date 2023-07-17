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
              <Route path="/userProfile" element={<UserProfile />} />
              <Route path="/MyStudySessions" element={<MyStudySessions />} />
              <Route path="/myChats" element={<ChatPage />} />
              <Route path="/SearchSessions" element={<StudySessionSearch />} />
              <Route
                path="/StudysessionDetailsPage/:studySessionId"
                element={<StudysessionDetailsPage />}
              />
              <Route
                path="/success/:bookingId/:tutorId"
                element={<SuccessPage />}
              />
              <Route path="/viewBookings" element={<ViewBookingsPage />} />
            </Routes>
          </Content>
          <Footer />
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
