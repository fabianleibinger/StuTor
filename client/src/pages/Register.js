import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import uploadProfilePic from "../utils/uploadProfilePic";
import newRequest from "../utils/newRequest";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: theme.spacing(3),
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  input: {
    marginBottom: theme.spacing(2),
    padding: "12px 16px",
    fontSize: "16px",
    height: "100px", // Update the height value
  },
  submitButton: {
    marginTop: theme.spacing(3),
  },
  error: {
    color: "red",
    marginTop: theme.spacing(2),
  },
}));

const Register = () => {
  const classes = useStyles(); // Added back useStyles

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
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handlePictureChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Use FileReader to generate a preview URL for the selected file
    const reader = new FileReader();
    reader.onload = (event) => {
      setUrl(event.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleTutor = (e) => {
    setUser((prev) => {
      let role = 'STUDENT'
      if (e.target.checked){
        role = 'TUTOR'
      }
      return { ...prev, role: role};
    });
  };

  // University Search Bar
  const [universities, setUniversities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch universities from MongoDB database
    const fetchUniversities = async () => {
      try {
        const response = await newRequest.get("/university");
        setUniversities(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUniversities();
  }, []);

  const handleUniversity = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (universities && universities.length > 0) {
      const results = universities.filter((university) =>
        university.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }
    const selectedUniversity = universities.find((university) => university.name === query);
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
      navigate("/")
    } 
    catch (err) {
      console.log(err.response.status);
      if (err.response?.status === 409) {
        // Duplicate user error
        setErrorMessage("Username or email is already taken");
      } else {
        // Other Axios error
        const errorMessage = err.response?.data?.message || "An error occurred";
        setErrorMessage(errorMessage);
      }
    }
  };

  return (
    <div className={classes.root}>
      <Container>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Typography variant="h4" align="center" gutterBottom>
            Create a new account
          </Typography>

          {/* Username */}
          <FormControl fullWidth>
            <InputLabel htmlFor="username">Username*</InputLabel>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="username"
              onChange={handleChange}
            />
          </FormControl>

          {/* Firstname */}
          <FormControl fullWidth>
            <InputLabel htmlFor="firstname">Firstname*</InputLabel>
            <Input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="Jason"
              onChange={handleChange}
            />
          </FormControl>

          {/* Lastname */}
          <FormControl fullWidth>
            <InputLabel htmlFor="lastname">Lastname*</InputLabel>
            <Input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Wen"
              onChange={handleChange}
            />
          </FormControl>

          {/* Email */}
          <FormControl fullWidth>
            <InputLabel htmlFor="email">Email*</InputLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email"
              onChange={handleChange}
            />
          </FormControl>

          {/* Password */}
          <FormControl fullWidth>
            <InputLabel htmlFor="password">Password*</InputLabel>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
            />
          </FormControl>

          {/* Profile Picture */}
          <FormControl fullWidth>
            <InputLabel htmlFor="profile-pic">Profile Picture</InputLabel>
            <Input
              id="profile-pic"
              type="file"
              onChange={handlePictureChange}
            />
          </FormControl>

          {/* University */}
          <FormControl fullWidth>
            <InputLabel htmlFor="university">University*</InputLabel>
            <Input
              id="university"
              name="university"
              type="text"
              placeholder="Technische Universität München (TUM)"
              value={searchQuery}
              onChange={handleUniversity}
              list="universities-list"
            />
            <datalist id="universities-list">
              {searchResults.map((result) => (
                <option key={result._id} value={result.name} />
              ))}
            </datalist>
          </FormControl>

          {/* Tutor or Student
          <FormControlLabel
            control={
              <Checkbox
                checked={user.role === "TUTOR"}
                onChange={handleTutor}
              />
            }
            label="Activate a tutor account"
          /> */}

          {/* Mandatory fields */}
          <Typography align="center" color="textSecondary">
            (All * fields are mandatory)
          </Typography>

          {/* Error message */}
          {errorMessage && (
            <Typography variant="body2" align="center" className={classes.error}>
              {errorMessage}
            </Typography>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submitButton}
          >
            Register
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Register;