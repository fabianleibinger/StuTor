import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import newRequest from "../utils/newRequest";
import { useUserContext } from "../context/UserProvider";
import {
  LoginFormContainer,
  LoginTitle,
  LoginTextField,
  SubmitButton,
  ErrorMessage,
} from "../styles";

function Login() {
  const { user, setUser } = useUserContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      setUser(res.data);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("An error occurred during Log-in. Please try again later.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoginFormContainer onSubmit={handleSubmit}>
        <LoginTitle sx={{ marginBottom: "8rem" }}>Sign in</LoginTitle>
        <LoginTextField
          label="Username or Email"
          name="username"
          type="text"
          placeholder="jasonwen"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <LoginTextField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit" variant="contained" color="primary">
          Log In
        </SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {/* Add the "Forgot Password" link here */}
        <Link to="/forgot-password" style={{ color: "gray" }}>
          Forgot Password?
        </Link>
      </LoginFormContainer>
    </div>
  );
}

export default Login;
