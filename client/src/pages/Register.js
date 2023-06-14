import React, { useState, useEffect } from "react";
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
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

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
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      setUrl(event.target.result);
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

  const [universities, setUniversities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await newRequest.get("/university/");
        setUniversities(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUniversities();
  }, []);

  const handleUniversityChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (universities && universities.length > 0) {
      const results = universities.filter((university) =>
        university.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }
    const selectedUniversity = universities.find(
      (university) => university.name === query
    );
    if (selectedUniversity) {
      setUser((prev) => ({
        ...prev,
        university: selectedUniversity._id,
      }));
      setSearchQuery(selectedUniversity.name);
      setSearchResults([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.username) {
      setErrorMessage("Please Enter an Username");
      return;
    }
    if (!user.firstname) {
      setErrorMessage("Please Enter a First Name");
      return;
    }
    if (!user.lastname) {
      setErrorMessage("Please Enter a Last Name");
      return;
    }
    if (!user.email) {
      setErrorMessage("Please Enter a Valid Email Address");
      return;
    }
    if (!user.password) {
      setErrorMessage("Please Enter a Password");
      return;
    }
    if (!user.university) {
      setErrorMessage("Please Pick a University");
      return;
    }

    let uploadedUrl = "";
    if (file) {
      try {
        uploadedUrl = await uploadProfilePic(file);
      } catch (error) {
        console.log(error);
        setErrorMessage("Error uploading the picture");
        return;
      }
    }

    try {
      await newRequest.post("/auth/register", {
        ...user,
        picture: url,
      });
      navigate("/");
    } catch (err) {
      console.log(err.response.status);
      if (err.response?.status === 409) {
        setErrorMessage("Username or email is already taken");
      } else {
        const errorMessage = err.response?.data?.message || "An error occurred";
        setErrorMessage(errorMessage);
      }
    }
  };

  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" align="center" gutterBottom>
            Create a new account
          </Typography>

          <TextField
            fullWidth
            label="Username*"
            name="username"
            type="text"
            placeholder="username"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Firstname*"
            name="firstname"
            type="text"
            placeholder="Jason"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Lastname*"
            name="lastname"
            type="text"
            placeholder="Wen"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Email*"
            name="email"
            type="email"
            placeholder="jasonwen@tum.de"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Password*"
            name="password"
            type="password"
            onChange={handleChange}
          />

          <FormControl fullWidth>
            <InputLabel
              htmlFor="profile-pic"
              className={classes.fileInputLabel}
            >
              Profile Picture
            </InputLabel>
            <Input
              id="profile-pic"
              type="file"
              onChange={handleProfilePicChange}
            />
          </FormControl>

          <TextField
            fullWidth
            label="University*"
            name="university"
            type="text"
            placeholder="Technische Universität München (TUM)"
            value={searchQuery}
            onChange={handleUniversityChange}
            list="universities-list"
          />
          <datalist id="universities-list">
            {searchResults.map((result) => (
              <option key={result._id} value={result.name} />
            ))}
          </datalist>

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

          <Typography align="center" color="textSecondary">
            (All * fields are mandatory)
          </Typography>

          {errorMessage && (
            <Typography variant="body2" align="center" color="error">
              {errorMessage}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Register
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Register;
