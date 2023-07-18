import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";
import { useUserContext } from "../context/UserProvider";
import {
  LoginFormContainer,
  LoginTitle,
  LoginTextField,
  SubmitButton,
  ErrorMessage,
} from "../styles";

function ForgotPassword() {
  const { user, setUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(60); // Initial value for countdown
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isTokenVerified, setIsTokenVerified] = useState(false);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isCodeSent && countdown > 0) {
      // Start the countdown if the code is sent and countdown is greater than 0
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Clear the interval when the component unmounts or the countdown reaches 0
      return () => clearInterval(timer);
    } else if (countdown === 0) {
      // Enable the button when the countdown reaches 0
      setIsButtonDisabled(false);
    }
  }, [isCodeSent, countdown]);

  // Track changes in the ResetToken textfield
  const handleResetTokenChange = (e) => {
    setResetToken(e.target.value);
    setIsTokenVerified(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    // Send the request to initiate password reset
    try {
      await newRequest.post("/auth/forgotPassword", { email });
      setIsCodeSent(true);
      setIsButtonDisabled(true);
      setError(null);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  const handleVerifyToken = async (e) => {
    e.preventDefault();
    try {
      //compare user input with database
      const res = await newRequest.post("/auth/verifyToken", {
        email,
        resetToken,
      });
      setUser(res.data);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError(
          "An error occurred during token verification. Please try again later."
        );
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
      <LoginFormContainer onSubmit={handleForgotPassword}>
        <LoginTitle sx={{ marginBottom: "8rem" }}>Forgot Password</LoginTitle>

        <LoginTextField
          label="Email*"
          name="email"
          type="text"
          placeholder="jasonwen@tum.de"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {isCodeSent && (
          <LoginTextField
            label="Reset Token"
            name="resetToken"
            type="text"
            placeholder="Reset Token Received from Email"
            value={resetToken}
            onChange={handleResetTokenChange}
          />
        )}

        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "5rem" }}
          disabled={isButtonDisabled}
        >
          {isButtonDisabled
            ? `Resend Code in ${countdown}s`
            : "Send Code to Email"}
        </SubmitButton>

        <SubmitButton
          type="button"
          variant="contained"
          color="primary"
          sx={{ marginTop: "0.2rem" }}
          disabled={!resetToken || resetToken === ""}
          onClick={handleVerifyToken}
        >
          Verify Token
        </SubmitButton>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginFormContainer>
    </div>
  );
}

export default ForgotPassword;
