import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  Typography,
  FormControl,
  Button,
  TextField,
  Avatar,
  Menu,
  MenuItem,
  Grid,
  Box
} from '@mui/material';
import {
  SubmitButton,
  stepContentContainer,
  FormContainer,
  ProfileFormContainer
} from '../styles';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import newRequest from '../utils/newRequest';
import uploadProfilePic from '../utils/uploadProfilePic';
import { searchUniversities } from '../utils/searchUniversities';
import RegisterStripe from '../components/Payment/RegisterStripe';
import AchievementsDisplay from '../components/Achievement/AchievementsDisplay';
import SwitchRoleButton from '../components/SwitchRoleButton';

const UserProfile = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  // Check if the user is logged in, if not, redirect to login page
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [username, setUsername] = useState(user ? user.username : '');
  const [firstname, setFirstname] = useState(user ? user.firstname : '');
  const [lastname, setLastname] = useState(user ? user.lastname : '');
  const [email, setEmail] = useState(user ? user.email : '');

  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [currUserUniversityName, setCurrUserUniversityName] = useState('');
  const [currUserRole, setCurrUserRole] = useState(user ? user.role : '');
  const [allUniversities, setAllUniversities] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSucessMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

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

  useEffect(() => {
    const fetchCurrUserUniversity = async () => {
      if (user) {
        try {
          const universityId = user.university;
          const response = await newRequest.get(
            'university/byId/' + universityId
          );
          setCurrUserUniversityName(response.data.name);
          setSelectedUniversity(response.data);
        } catch (error) {
          console.log('Failed to get university by id!');
          console.log(error);
        }
      }
    };
    fetchCurrUserUniversity();
  }, []);

  useEffect(() => {
    const isFormValid = oldPassword && newPassword && newPasswordRepeat;
    setIsPasswordValid(isFormValid);
  }, [oldPassword, newPassword, newPasswordRepeat]);

  const handleUniversityChange = (e, value) => {
    // handleCloseMenu(); // Close the Autocomplete menu
    if (value !== currUserUniversityName) {
      setHasChanges(true);
    }
    if (value === '') setHasChanges(false);
    searchUniversities(
      value,
      allUniversities,
      setSearchResults,
      setUser,
      false,
      setSelectedUniversity
    );
  };

  const handlePasswordChange = async e => {
    // Check if new password === new password repeat,
    if (newPassword !== newPasswordRepeat) {
      setSucessMessage('');
      setErrorMessage('New password and repeat password does not match!');
      return;
    }

    let isOldPasswordCorrect = false;
    // Check if old password is valid, send request
    try {
      const requestBody = {
        username,
        oldPassword
      };
      console.log('Request Body:', requestBody); // Print the request body
      const response = await newRequest.post('auth/checkPassword', requestBody);
      isOldPasswordCorrect = response.data;
    } catch (error) {
      console.log('Failed to check if old password is correct!');
      console.log(error);
    }

    // if not, throw error message.
    if (!isOldPasswordCorrect) {
      setSucessMessage('');
      setErrorMessage('Incorrect Old Password!');
      return;
    }

    // If both, update user: user.password = new password
    try {
      const requestBody = {
        username,
        oldPassword,
        newPassword
      };
      console.log(requestBody);
      await newRequest.put('user/changePassword', requestBody);
      setErrorMessage('');
      setSucessMessage('Successfully changed password.');
    } catch (error) {
      console.log('Failed to change user password');
      console.log(error);
    }
  };

  const handleUpdatePicture = async e => {
    try {
      const file = e.target.files[0];
      const url = await uploadProfilePic(file);

      const updatedUser = { ...user, picture: url };
      setUser(updatedUser);

      await newRequest.put('/user/updateUser/' + user._id, updatedUser);
      user.picture = url;
      setErrorMessage('');
      setSucessMessage('Successfully updated profile picture.');
    } catch (err) {
      console.log(err);
      setSucessMessage('');
      setErrorMessage('An error occurred while updating the profile picture.');
    }
  };

  const handleDeletePicture = async () => {
    try {
      const updatedUser = { ...user, picture: '' };
      setUser(updatedUser);
      setAnchorEl(null);

      await newRequest.put('/user/updateUser/' + user._id, updatedUser);
      user.picture = '';
      setErrorMessage('');
      setSucessMessage('Successfully deleted profile picture.');
    } catch (err) {
      console.log(err);
      setSucessMessage('');
      setErrorMessage('An error occurred while deleting the profile picture.');
    }
  };

  const handleOpenMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Update the user state
    const updatedUser = {
      ...user,
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      university: selectedUniversity._id
    };
    console.log(updatedUser);
    setUser(updatedUser);

    try {
      const updateUserPath = '/user/updateUser/' + user._id;
      await newRequest.put(updateUserPath, updatedUser);
      window.location.reload(); // Refresh the page
      setHasChanges(false);
      setSucessMessage('Succesfully updated user profile.');
    } catch (err) {
      console.log(err);
      setSucessMessage('');
      if (err.response.status === 409) {
        setErrorMessage('Username or email is already taken');
      } else {
        setErrorMessage('An error occurred while updating the profile.');
      }
    }
  };

  useEffect(() => {
    const checkForChanges = () => {
      const hasChanges =
        username !== user?.username ||
        firstname !== user?.firstname ||
        lastname !== user?.lastname ||
        email !== user?.email;
      if (hasChanges) setHasChanges(true);
    };
    checkForChanges();
  }, [username, firstname, lastname, email, user]);

  const handleRoleSwitchClick = async role => {
    const newUser = {
      _id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      picture: user.picture,
      role: role,
      university: user.university
    };
    console.log('Switch Role to user', newUser);
    setUser(newUser);
    setCurrUserRole(role);
  };

  return (
    <div align="center">
      <Container>
        <Box sx={{ width: 1, textAlign: 'left', mt: 5 }}>
          <SwitchRoleButton
            role={user.role}
            handleRoleSwitchClick={handleRoleSwitchClick}
          />
        </Box>
        <FormControl
          sx={{ marginTop: '5rem', marginBottom: '1rem', textAlign: 'center' }}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              {/* -------------------------- Profile Picture --------------------------*/}
              <Avatar
                src={user?.picture || ''}
                sx={{
                  width: 150,
                  height: 150,
                  cursor: 'pointer',
                  margin: '0 auto'
                }}
                onClick={handleOpenMenu}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem>
                  <input
                    type="file"
                    accept="image/*"
                    id="profile-pic-input"
                    style={{ display: 'none' }}
                    onChange={handleUpdatePicture}
                  />
                  <label htmlFor="profile-pic-input">
                    Update Profile Picture
                  </label>
                </MenuItem>
                <MenuItem onClick={handleDeletePicture}>
                  Delete Profile Picture
                </MenuItem>
              </Menu>
            </Grid>
            <Grid item>
              <Box>
                {/* -------------------------- Title --------------------------*/}
                <Typography variant="h4" gutterBottom>
                  {user && `${user.firstname} ${user.lastname}`}
                </Typography>
                {/* -------------------------- Subtitle -------------------------- */}
                <Typography variant="h6" gutterBottom>
                  {currUserUniversityName}
                </Typography>
                <Typography>{currUserRole}</Typography>
              </Box>
            </Grid>
          </Grid>
        </FormControl>
        {/* -------------------------- Achievements -------------------------- */}
        {/* TODO: Add your achievements components here */}
      </Container>
      <ProfileFormContainer>
        <Typography variant="h5" align="center" gutterBottom>
          User Information
        </Typography>
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sx={{ textAlign: 'left' }}>
              {/* -------------------------- USERNAME -------------------------- */}
              <TextField
                fullWidth
                label="Username"
                name="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                sx={{ marginBottom: '1rem' }}
              />
              {/* -------------------------- FIRSTNAME -------------------------- */}
              <TextField
                fullWidth
                label="Firstname"
                name="firstname"
                type="text"
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
                sx={{ marginBottom: '1rem' }}
              />
              {/* -------------------------- LASTNAME -------------------------- */}
              <TextField
                fullWidth
                label="Lastname"
                name="lastname"
                type="text"
                value={lastname}
                onChange={e => setLastname(e.target.value)}
                sx={{ marginBottom: '1rem' }}
              />
              {/* -------------------------- EMAIL -------------------------- */}
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                sx={{ marginBottom: '1rem' }}
              />
              {/* -------------------------- UNIVERSITY -------------------------- */}
              <Autocomplete
                options={searchResults}
                // value={currUserUniversityName}
                onInputChange={handleUniversityChange}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={currUserUniversityName}
                    name="university"
                    type="text"
                    sx={{ marginBottom: '1rem' }}
                  />
                )}
              />
              {/* -------------------------- SAVE CHANGES BUTTON -------------------------- */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!hasChanges}
              >
                Save Changes
              </Button>
            </Grid>

            <Grid item xs={12} md={6} sx={{ textAlign: 'left' }}>
              {/* -------------------------- PASSWORD -------------------------- */}
              <TextField
                fullWidth
                label="Old Password"
                name="oldPassword"
                type="password"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                sx={{ marginBottom: '1rem' }}
              />

              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                sx={{ marginBottom: '1rem' }}
              />

              <TextField
                fullWidth
                label="Repeat New Password"
                name="newPasswordRepeat"
                type="password"
                value={newPasswordRepeat}
                onChange={e => setNewPasswordRepeat(e.target.value)}
                sx={{ marginBottom: '1rem' }}
              />
              {/* -------------------------- CHANGE PASSWORD BUTTON -------------------------- */}
              <Button
                variant="contained"
                color="primary"
                onClick={handlePasswordChange}
                disabled={!isPasswordValid}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>

          {/* -------------------------- ERROR MESSAGES -------------------------- */}
          <Typography variant="body1" color="error" align="center" mt={2}>
            {errorMessage}
          </Typography>
          <Typography variant="body1" color="green" align="center" mt={2}>
            {successMessage}
          </Typography>
        </form>
      </ProfileFormContainer>
      <ProfileFormContainer>
        <Typography variant="h5" align="center" gutterBottom>
          Achievements
        </Typography>
        <AchievementsDisplay user={user} size={125} showTitle={true} />
      </ProfileFormContainer>
      <ProfileFormContainer>
        <Typography variant="h5" align="center" gutterBottom>
          Payment Information
        </Typography>
        <RegisterStripe />
      </ProfileFormContainer>
    </div>
  );
};

export default UserProfile;
