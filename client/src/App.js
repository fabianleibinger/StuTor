import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Home from "./pages/Home.js";
import Navbar from "./components/Navbar.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import ChatPage from './pages/ChatPage';
import MyStudySessions from "./pages/MyStudySessions/MyStudySessions.js"
import StudysessionDetailsPage from "./pages/StudysessionDetailsPage.js"
import UserProfile from "./pages/UserProfile.js"

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
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Register />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/my-chats",
          element: <ChatPage />,
        },
        {
          path: "/userProfile",
          element: <UserProfile />,
        },
        {
          path: "/MyStudySessions",
          element: <MyStudySessions />,
        },
        { 
          path: "/StudysessionDetailsPage/:studySessionId",
          element: <StudysessionDetailsPage />,
        }
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router}>
          <Outlet />
        </RouterProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
