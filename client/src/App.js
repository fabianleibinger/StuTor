import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Navbar from "./components/Navbar.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import ChatPage from './pages/ChatPage';
import MyStudySessions from "./pages/MyStudySessions/MyStudySessions.js"
import StudysessionDetailsPage from "./pages/StudysessionDetailsPage.js"
import UserProfile from "./pages/UserProfile.js"
import RegisterStripe from "./components/Payment/RegisterStripe.js";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Replace with your desired shade of blue
    },
    // Add more palette colors as needed
  },
});

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div style={{ marginTop: "200px" }}>
        <Navbar />
      </div>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Layout />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/setUpStripe" element={<RegisterStripe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my-chats" element={<ChatPage />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/MyStudySessions" element={<MyStudySessions />} />
            <Route path="/StudysessionDetailsPage/:studySessionId" element={<StudysessionDetailsPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

