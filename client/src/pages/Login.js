import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";
import { UserContext } from "../context/UserContext";
import {
  FormContainer,
  LoginTitle,
  LoginTextField,
  SubmitButton,
  ErrorMessage,
} from "../styles";

function Login() {
  const { user, setUser } = useContext(UserContext);
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
    <FormContainer onSubmit={handleSubmit}>
      <LoginTitle>Sign in</LoginTitle>
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
    </FormContainer>
  );
}

export default Login;
