import React, { useState } from "react";
import { useTheme } from '@mui/material/styles';
import {
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Login() {
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
    }}>
      <Container>
        <form onSubmit={handleSubmit} style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "400px",
          padding: theme.spacing(3),
          backgroundColor: "#fff",
          borderRadius: "4px",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        }}>
          <Typography variant="h5" style={{ marginBottom: theme.spacing(2) }}>
            Sign in
          </Typography>
          <TextField
            style={{ marginBottom: theme.spacing(2), width: "100%" }}
            label="Username"
            name="username"
            type="text"
            placeholder="jasonwen"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            style={{ marginBottom: theme.spacing(2) }}
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            style={{ marginTop: theme.spacing(3) }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          {error && <Typography style={{ color: "red", marginTop: theme.spacing(2) }}>{error}</Typography>}
        </form>
      </Container>
    </div>
  );
}

export default Login;
