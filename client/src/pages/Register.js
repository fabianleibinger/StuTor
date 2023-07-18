import React, { useState, useContext, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Typography, Input, Step, StepLabel, Stepper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import uploadProfilePic from "../utils/uploadProfilePic";
import newRequest from "../utils/newRequest";
import { useUserContext } from "../context/UserProvider";
import { searchUniversities } from "../utils/searchUniversities";
import RegisterStripe from "../components/Payment/RegisterStripe";
import {
  FormContainer,
  LoginTitle,
  LoginTextField,
  SubmitButton,
  ErrorMessage,
  ProfilePicInputLabel,
  theme,
  ProgressContainer,
  stepContentContainer
} from '../styles';
import studentLogo from '../img/student_logo.png';
import tutorLogo from '../img/tutor_logo.png';

const Register = () => {
  const { user, setUser } = useUserContext();
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [allUniversities, setAllUniversities] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    lastname: '',
    firstname: '',
    picture: '',
    university: '',
    role: ''
  });

  useEffect(() => {
    const fetchAllUniversities = async () => {
      try {
        const response = await newRequest.get('/university');
        setAllUniversities(response.data);
        setSearchResults(response.data.map(university => university.name));
      } catch (error) {
        console.log('Failed to get universities!');
        console.log(error);
      }
    };
    fetchAllUniversities();
  }, []);

  const handleChange = e => {
    setNewUser(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleProfilePicChange = async e => {
    const selectedFile = e.target.files[0];
    setProfilePicFile(selectedFile);
    const url = await uploadProfilePic(selectedFile);
    setProfilePicUrl(url);
    setNewUser(prev => {
      return { ...prev, picture: url };
    });
  };

  const handleRoleChange = role => {
    setSelectedRole(role);
    setNewUser(prev => {
      return { ...prev, role: role };
    });
  };

  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1);
    setErrorMessage('');
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
    setErrorMessage('');
  };

  const handleUniversityChange = (e, value) => {
    searchUniversities(
      value,
      allUniversities,
      setSearchResults,
      setNewUser,
      true,
      setSelectedUniversity
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const fields = ['username', 'firstname', 'lastname', 'email', 'password'];
    const fieldNames = {
      username: 'Username',
      firstname: 'First Name',
      lastname: 'Last Name',
      email: 'Valid Email Address',
      password: 'Password'
    };

    for (const field of fields) {
      if (!newUser[field]) {
        setErrorMessage(`Please Enter a ${fieldNames[field]}`);
        return;
      }
    }

    if (!newUser.university) {
      setErrorMessage('Please Select a University');
      return;
    }

    try {
      console.log('NEW USER: ', newUser);
      await newRequest.post('/auth/register', {
        ...newUser
      });
    } catch (err) {
      console.log(err.response.status);
      if (err.response?.status === 409) {
        setErrorMessage('Username or email is already taken');
        return;
      } else {
        const errorMessage =
          err.response?.data?.message || 'An error occurred when registering.';
        setErrorMessage(errorMessage);
        console.log('err: ', err);
        return;
      }
    }

    try {
      const res = await newRequest.post('/auth/login', {
        username: newUser.username,
        password: newUser.password
      });
      setUser(res.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('An error occurred during Log-in. Please try again later.');
      }
    }

    setActiveStep((prevStep) => prevStep + 1);
    setErrorMessage("");
  };

  const handleFinish = async (e) => {
    navigate("/");
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <FormContainer onSubmit={activeStep === 4 ? handleSubmit : undefined}>
        {/* ------------------- REGISTER TITLE ------------------- */}
        <LoginTitle>Register</LoginTitle>

        {/* ------------------- PROGRESS BAR ------------------- */}
        <ProgressContainer activeStep={activeStep} alternativeLabel>
          <Step key="Step 1" completed={activeStep > 0}>
            <StepLabel>Step 1</StepLabel>
          </Step>
          <Step key="Step 2" completed={activeStep > 1}>
            <StepLabel>Step 2</StepLabel>
          </Step>
          <Step key="Step 3" completed={activeStep > 2}>
            <StepLabel>Step 3</StepLabel>
          </Step>
          <Step key="Step 4" completed={activeStep > 3}>
            <StepLabel>Step 4</StepLabel>
          </Step>
          <Step key="Step 5" completed={activeStep > 4}>
            <StepLabel>Step 5</StepLabel>
          </Step>
        </ProgressContainer>

        {/* ------------------- STEP 1: TUTOR ACCOUNT ------------------- */}
        {activeStep === 0 && (
          <div style={stepContentContainer}>
            {/* ------------------- HEADING ------------------- */}
            <Typography
              variant="h5"
              align="center"
              sx={{
                marginBottom: "70px",
                marginTop: "50px",
                color: "#1976d2",
                fontWeight: "bold",
              }}
            >
              Which Role Do You Want to be Today? ...
            </Typography>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '50px',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div
                onClick={() => handleRoleChange('STUDENT')}
                style={{
                  border: `8px solid ${
                    selectedRole === 'STUDENT'
                      ? theme.palette.primary.main
                      : 'gray'
                  }`,
                  padding: '10px',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <img
                  src={studentLogo}
                  alt="Student Logo"
                  style={{ width: '300px', height: '300px' }}
                />
                <Typography
                  variant="h5"
                  align="center"
                  sx={{
                    position: 'absolute',
                    bottom: '-50px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontWeight: selectedRole === 'STUDENT' ? 'bold' : 'normal'
                  }}
                >
                  Student
                </Typography>
              </div>
              <div
                onClick={() => handleRoleChange('TUTOR')}
                style={{
                  border: `8px solid ${
                    selectedRole === 'TUTOR'
                      ? theme.palette.primary.main
                      : 'gray'
                  }`,
                  padding: '10px',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <img
                  src={tutorLogo}
                  alt="Tutor Logo"
                  style={{ width: '300px', height: '300px' }}
                />
                <Typography
                  variant="h5"
                  align="center"
                  sx={{
                    position: 'absolute',
                    bottom: '-50px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontWeight: selectedRole === 'TUTOR' ? 'bold' : 'normal'
                  }}
                >
                  Tutor
                </Typography>
              </div>
            </div>
          </div>
        )}

        {/* ------------------- STEP 2: SELECT UNIVERSITY ------------------- */}
        {activeStep === 1 && (
          <div style={stepContentContainer}>
            {/* ------------------- HEADING ------------------- */}
            <Typography
              variant="h5"
              align="center"
              sx={{
                marginBottom: "70px",
                marginTop: "50px",
                color: "#1976d2",
                fontWeight: "bold",
              }}
            >
              Please Select Your University ...
            </Typography>

            <Autocomplete
              options={searchResults}
              onInputChange={handleUniversityChange}
              onFocus={handleUniversityChange}
              renderInput={params => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <LoginTextField
                    {...params}
                    // label="University*"
                    name="university"
                    type="text"
                    placeholder={`${
                      newUser.university
                        ? selectedUniversity.name
                        : 'Universities*'
                    }`}
                    inputProps={{
                      ...params.inputProps,
                      style: { width: '80%', marginTop: '10px' }
                    }}
                  />
                </div>
              )}
            />
          </div>
        )}

        {/* ------------------- STEP 3: SELECT PROFILE PIC ------------------- */}
        {activeStep === 2 && (
          <div style={stepContentContainer}>
            {/* ------------------- HEADING ------------------- */}
            <Typography
              variant="h5"
              align="center"
              sx={{
                marginBottom: "70px",
                marginTop: "50px",
                color: "#1976d2",
                fontWeight: "bold",
              }}
            >
              Please Upload a Profile Picture ...
            </Typography>

            <ProfilePicInputLabel htmlFor="profile-pic">
              Profile Picture (Optional)
            </ProfilePicInputLabel>
            <Input
              id="profile-pic"
              type="file"
              onChange={handleProfilePicChange}
              style={{ width: '80%' }}
            />

            {profilePicFile && (
              <div>
                <Typography variant="subtitle1">
                  Selected Profile Picture:
                </Typography>
                <img
                  src={URL.createObjectURL(profilePicFile)}
                  alt="Profile Picture"
                  style={{
                    maxWidth: '40%',
                    height: 'auto',
                    marginTop: '10px'
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* ------------------- STEP 4: TEXTFIELDS AND SELECTIONS ------------------- */}
        {activeStep === 3 && (
          <div style={stepContentContainer}>
            {/* ------------------- HEADING ------------------- */}
            <Typography
              variant="h5"
              align="center"
              sx={{
                marginBottom: "70px",
                marginTop: "50px",
                color: "#1976d2",
                fontWeight: "bold",
              }}
            >
              Please Provide Basic Information ...
            </Typography>
            {/* ------------------- USERNAME ------------------- */}
            <LoginTextField
              label="Username*"
              name="username"
              type="text"
              placeholder="username"
              onChange={handleChange}
            />

            {/* ------------------- FIRSTNAME ------------------- */}
            <LoginTextField
              label="Firstname*"
              name="firstname"
              type="text"
              placeholder="Jason"
              onChange={handleChange}
            />

            {/* ------------------- LASTNAME ------------------- */}
            <LoginTextField
              label="Lastname*"
              name="lastname"
              type="text"
              placeholder="Wen"
              onChange={handleChange}
            />

            {/* ------------------- EMAIL ------------------- */}
            <LoginTextField
              label="Email*"
              name="email"
              type="email"
              placeholder="jasonwen@tum.de"
              onChange={handleChange}
            />

            {/* ------------------- PASSWORD ------------------- */}
            <LoginTextField
              label="Password*"
              name="password"
              type="password"
              onChange={handleChange}
            />

            {/* ------------------- MANDATORY MESSAGES ------------------- */}
            <Typography align="center" color="textSecondary">
              (All * fields are mandatory)
            </Typography>
          </div>
        )}

        {/* ------------------- STEP 5: SELECT PAYMENT METHODS ------------------- */}
        {activeStep === 4 && (
          <div
            style={{
              ...stepContentContainer,
              alignItems: "center",
            }}
          >
            {" "}
            {/* ------------------- Payment ------------------- */}
            <Typography
              variant="h5"
              align="center"
              sx={{
                marginBottom: "200px",
                marginTop: "50px",
                color: "#1976d2",
                fontWeight: "bold",
              }}
            >
              Set Up Payment Method
            </Typography>
            <RegisterStripe />
            <Typography marginTop="2rem" align="center" color="textSecondary">
              (Can complete this step later in your profile page)
            </Typography>
          </div>
        )}

        {/* ------------------- NEXT AND BACK BUTTONS ------------------- */}
        {[0, 1, 2, 3, 4].includes(activeStep) && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '0px'
            }}
          >
            {/* BACK BUTTON */}
            <SubmitButton
              variant="outlined"
              color="primary"
              onClick={handleBack}
              style={{ width: '200px', marginRight: '300px' }}
              disabled={activeStep === 0}
            >
              Back
            </SubmitButton>

            {/* NEXT BUTTON */}
            <SubmitButton
              variant="contained"
              color="primary"
              disabled={
                !selectedRole ||
                (activeStep === 0 && selectedRole === '') ||
                (activeStep === 1 && newUser.university === '')
              }
              onClick={
                activeStep < 3
                  ? handleNext
                  : activeStep === 3
                  ? handleSubmit
                  : activeStep === 4
                  ? handleFinish
                  : undefined // Add any fallback action if needed
              }
              style={{ width: "200px" }}
            >
              {activeStep < 4 ? "Next" : "Finish"}
            </SubmitButton>
          </div>
        )}

        {/* ------------------- ERROR MESSAGES (shown on all steps) ------------------- */}
        {errorMessage && (
          <ErrorMessage variant="body2" align="center" color="error">
            {errorMessage}
          </ErrorMessage>
        )}
      </FormContainer>
    </div>
  );
};

export default Register;
