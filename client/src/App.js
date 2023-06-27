import './App.css';

import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from './styles';
import { ThemeProvider } from '@mui/material';
import Home from './pages/Home.js';
import Navbar from './components/Navbar.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import MyStudySessions from './pages/MyStudySessions';
import StudySessionSearch from './pages/StudySessionSearch';
import StudysessionDetailsPage from './pages/StudysessionDetailsPage.js';

import UserProfile from './pages/UserProfile.js';
import { UserContext } from './context/UserContext';
import ChatPage from './pages/ChatPage';

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const Layout = () => {
    return (
      <div style={{ marginTop: '200px' }}>
        <Navbar />
        <Outlet />
      </div>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ user, setUser }}>
          <Router>
            <Layout />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/userProfile" element={<UserProfile />} />
              <Route path="/MyStudySessions" element={<MyStudySessions />} />
              <Route path="/my-chats" element={<ChatPage />} />
              <Route
                path="/StudysessionDetailsPage/:studySessionId"
                element={<StudysessionDetailsPage />}
              />
            </Routes>
          </Router>
        </UserContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
