import React, { useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";
import RegisterStripe from "../components/Payment/RegisterStripe";

const UserProfile = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [user, setUser] = useState({ ...currentUser });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await newRequest.put("/auth/user", user);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrorMessage("An error occurred when updating the profile.");
    }
  };

  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit}>
          {/* ------------------- HEADING ------------------- */}
          <Typography variant="h4" align="center" gutterBottom>
            User Profile
          </Typography>

          {/* ------------------- USERNAME ------------------- */}
          <TextField
            fullWidth
            label="Username"
            name="username"
            type="text"
            value={user.username}
            onChange={handleChange}
          />

          {/* ------------------- FIRSTNAME ------------------- */}
          <TextField
            fullWidth
            label="Firstname"
            name="firstname"
            type="text"
            value={user.firstname}
            onChange={handleChange}
          />

          {/* ------------------- LASTNAME ------------------- */}
          <TextField
            fullWidth
            label="Lastname"
            name="lastname"
            type="text"
            value={user.lastname}
            onChange={handleChange}
          />

          {/* ------------------- EMAIL ------------------- */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
          />

          {/* ------------------- PASSWORD ------------------- */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />

          {/* ------------------- PROFILE PIC ------------------- */}
          <FormControl fullWidth>
            <InputLabel htmlFor="profile-pic">Profile Picture</InputLabel>
            <Input
              id="profile-pic"
              type="text"
              value={user.picture}
              name="picture"
              onChange={handleChange}
            />
          </FormControl>

          {/* ------------------- UNIVERSITIY ------------------- */}
          <TextField
            fullWidth
            label={user.university || "University"}
            name="university"
            type="text"
            value={user.university}
            onChange={handleChange}
          />

          {/* ------------------- UPDATE PROFILE BUTTON ------------------- */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Profile
          </Button>
        </form>
      </Container>
      <RegisterStripe />
    </div>
  );
};

export default UserProfile;
