import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { createTheme, ThemeProvider} from "@mui/material";
import Home from "./pages/Home.js";
import Navbar from "./components/Navbar.js";
// import Footer from "./components/footer/Footer";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";

import MyStudySessions from "./pages/MyStudySessions/MyStudySessions.js"


const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", // Replace with your desired primary color
      contrastText: "#ffffff", // Replace with your desired contrast text color
    },
    // Add more palette colors as needed
  },
});

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Navbar />
            <Outlet />
            {/* <Footer /> */}
          </ThemeProvider>
        </QueryClientProvider>
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
          element: <Home />,
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
          path: "/MyStudySessions",
          element: <MyStudySessions />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;