import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";

import Home from "./pages/Home.js";
import Navbar from "./components/Navbar.js";
// import Footer from "./components/footer/Footer";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";

import MyStudySessions from "./pages/MyStudySessions/MyStudySessions.js"

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          {/* <Footer /> */}
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