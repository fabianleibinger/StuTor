import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';
import {
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "400px",
    padding: useTheme().spacing(3),
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  formTitle: {
    marginBottom: useTheme().spacing(2),
  },
  formInput: {
    marginBottom: useTheme().spacing(2),
    width: "100%", // Set the width to 100%
  },
  formButton: {
    marginTop: useTheme().spacing(3),
  },
  formError: {
    color: "red",
    marginTop: useTheme().spacing(2),
  },
}));

function Login() {
  const classes = useStyles();
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
    <div className={classes.loginContainer}>
      <Container>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Typography variant="h5" className={classes.formTitle}>
            Sign in
          </Typography>
          <TextField
            className={classes.formInput}
            label="Username"
            name="username"
            type="text"
            placeholder="jasonwen"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className={classes.formInput}
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className={classes.formButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          {error && <Typography className={classes.formError}>{error}</Typography>}
        </form>
      </Container>
    </div>
  );
}

export default Login;
