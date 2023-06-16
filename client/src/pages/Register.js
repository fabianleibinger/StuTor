import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Switch from "@mui/material/Switch";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import uploadProfilePic from "../utils/uploadProfilePic";
import newRequest from "../utils/newRequest";

const Register = () => {
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [allUniversities, setAllUniversities] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    lastname: "",
    firstname: "",
    picture: "",
    university: "",
    role: "STUDENT",
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleProfilePicChange = (e) => {
    const selectedFile = e.target.files[0];
    setProfilePicFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      setProfilePicUrl(event.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleTutorChange = (e) => {
    setUser((prev) => {
      let role = "STUDENT";
      if (e.target.checked) {
        role = "TUTOR";
      }
      return { ...prev, role: role };
    });
  };

  useEffect(() => {
    const fetchAllUniversities = async () => {
      try {
        const response = await newRequest.get("/university");
        setAllUniversities(response.data);
        setSearchResults(response.data.map((university) => university.name));
      } catch (error) {
        console.log("Failed to get universities!");
        console.log(error);
      }
    };
    fetchAllUniversities();
  }, []);

  const handleUniversityChange = (e, value) => {
    const query = value || "";

    let filteredUniversities = allUniversities;
    if (query && query !== "") {
      filteredUniversities = allUniversities.filter((university) =>
        university.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    setSearchResults(filteredUniversities.map((university) => university.name));

    const selectedUniversity = allUniversities.find(
      (university) => university.name === query
    );
    if (selectedUniversity) {
      console.log(selectedUniversity._id);
      setUser((prev) => ({
        ...prev,
        university: selectedUniversity._id,
      }));
      setSearchResults([]);
    } else {
      setUser((prev) => ({
        ...prev,
        university: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = ["username", "firstname", "lastname", "email", "password"];
    const fieldNames = {
      username: "Username",
      firstname: "First Name",
      lastname: "Last Name",
      email: "Valid Email Address",
      password: "Password",
    };

    for (const field of fields) {
      if (!user[field]) {
        setErrorMessage(`Please Enter a ${fieldNames[field]}`);
        return;
      }
    }

    if (!user.university) {
      setErrorMessage("Please Select a University");
      return;
    }

    if (profilePicFile) {
      try {
        await uploadProfilePic(profilePicFile);
      } catch (error) {
        console.log(error);
        setErrorMessage("Error uploading the picture");
        return;
      }
    }

    try {
      console.log(user);
      await newRequest.post("/auth/register", {
        ...user,
        picture: profilePicUrl,
      });
      navigate("/");
    } catch (err) {
      console.log(err.response.status);
      if (err.response?.status === 409) {
        setErrorMessage("Username or email is already taken");
      } else {
        const errorMessage =
          err.response?.data?.message || "An error occurred when registering.";
        setErrorMessage(errorMessage);
      }
    }
  };

  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit}>
          {/* ------------------- HEADING ------------------- */}
          <Typography variant="h4" align="center" gutterBottom>
            Create a new account
          </Typography>

          {/* ------------------- USERNAME ------------------- */}
          <TextField
            fullWidth
            label="Username*"
            name="username"
            type="text"
            placeholder="username"
            onChange={handleChange}
          />

          {/* ------------------- FIRSTNAME ------------------- */}
          <TextField
            fullWidth
            label="Firstname*"
            name="firstname"
            type="text"
            placeholder="Jason"
            onChange={handleChange}
          />

          {/* ------------------- LASTNAME ------------------- */}
          <TextField
            fullWidth
            label="Lastname*"
            name="lastname"
            type="text"
            placeholder="Wen"
            onChange={handleChange}
          />

          {/* ------------------- EMAIL ------------------- */}
          <TextField
            fullWidth
            label="Email*"
            name="email"
            type="email"
            placeholder="jasonwen@tum.de"
            onChange={handleChange}
          />

          {/* ------------------- PASSWORD ------------------- */}
          <TextField
            fullWidth
            label="Password*"
            name="password"
            type="password"
            onChange={handleChange}
          />

          {/* ------------------- PROFILE PIC ------------------- */}
          <FormControl fullWidth>
            <InputLabel htmlFor="profile-pic">Profile Picture</InputLabel>
            <Input
              id="profile-pic"
              type="file"
              onChange={handleProfilePicChange}
            />
          </FormControl>

          {/* ------------------- UNIVERSITIY ------------------- */}
          <Autocomplete
            fullWidth
            options={searchResults}
            onInputChange={handleUniversityChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="University*"
                name="university"
                type="text"
                placeholder="Technische Universität München (TUM)"
              />
            )}
          />

          {/* ------------------- TUTOR ACCOUNT ------------------- */}
          <FormControl fullWidth>
            <FormControlLabel
              control={
                <Switch
                  checked={user.role === "TUTOR"}
                  onChange={handleTutorChange}
                  color="primary"
                />
              }
              label="Activate a tutor account"
              labelPlacement="start"
            />
          </FormControl>

          {/* ------------------- MANDATORY MESSAGE ------------------- */}
          <Typography align="center" color="textSecondary">
            (All * fields are mandatory)
          </Typography>

          {errorMessage && (
            <Typography variant="body2" align="center" color="error">
              {errorMessage}
            </Typography>
          )}

          {/* ------------------- SIGN UP BUTTON ------------------- */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Register;
