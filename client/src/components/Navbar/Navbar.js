import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  Slide
} from '@mui/material';
import {
  RootAppBar,
  RootToolbar,
  LogoContainer,
  LinksContainer,
  StyledLink,
  AvatarIconButton,
  SignInButton,
  JoinButton,
  UserFullName,
  AboutUsButton,
  theme,
  StyledBadge
} from '../../styles';
import { useChatContext } from '../../context/ChatProvider';
import newRequest from '../../utils/newRequest';
import { useUserContext } from '../../context/UserProvider';
import { useBookingContext } from '../../context/BookingProvider';
import MissionStatementDialog from '../Dialogs/MissionStatementDialog';
import ContactSupportDialog from '../Dialogs/ContactSupportDialog';

const DialogTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Navbar = () => {
  const { user, setUser } = useUserContext();
  const [active, setActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [supportDialogOpen, setSupportDialogOpen] = useState(false);
  const { notification, setNotification } = useChatContext();
  const { bookingNotification, setBookingNotification } = useBookingContext();
  const anchorElRef = useRef(null);
  const aboutUsRef = useRef(null);
  const navigate = useNavigate();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', isActive);
    return () => {
      window.removeEventListener('scroll', isActive);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await newRequest.post('/auth/logout');
      setUser(null);
      localStorage.removeItem('user'); // Remove user data from localStorage
      navigate('/');
    } catch (err) {
      console.log('Error occured while trying to log out.');

      console.log(err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Prompt the user for confirmation
      const confirmDelete = window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      );

      if (!confirmDelete) {
        return; // User canceled the deletion
      }

      // Find user by user.username
      const res = await newRequest.get('/user/byUsername/' + user.username);
      await newRequest.delete('/user/deleteUser/' + res.data._id);
      setBookingNotification([]);
      setNotification([]);
      setUser(null);
      localStorage.removeItem('user'); // Remove user data from localStorage
      navigate('/');
    } catch (err) {
      console.log('An error occurred while trying to delete the user account.');
      console.log(err);
    }
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleMenuCloseBookings = () => {
    setMenuOpen(false);
    setBookingNotification([]);
  };

  const handleAboutUsOpen = () => {
    setAboutUsOpen(true);
  };

  const handleAboutUsClose = () => {
    setAboutUsOpen(false);
  };

  const handleDialog = () => {
    setDialogOpen(true);
    setAboutUsOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSupportDialog = () => {
    setSupportDialogOpen(true);
    setAboutUsOpen(false);
  };

  const handleSupportDialogClose = () => {
    setSupportDialogOpen(false);
  };

  return (
    <RootAppBar position="static">
      <RootToolbar>
        {/* ---------- LOGO ----------*/}
        <LogoContainer to="/">
          <Typography variant="h6" component="div" sx={{ fontSize: '2rem' }}>
            STUTOR
          </Typography>
          <span className="dot">.</span>
        </LogoContainer>

        {/* ---------- LINKS ----------*/}
        <LinksContainer>
          <StyledLink to="/SearchSessions/">
            <SearchIcon />
            <Typography sx={{ fontSize: '1.2rem' }}>Search Sessions</Typography>
          </StyledLink>
          <StyledLink to="/MyStudySessions">
            <CalendarMonthIcon />
            <Typography sx={{ fontSize: '1.2rem' }}>
              {' '}
              My Study Sessions
            </Typography>
          </StyledLink>
          {notification.length === 0 ? (
            <StyledLink to="/myChats">
              <ChatBubbleIcon />
              <Typography sx={{ fontSize: '1.2rem' }}>My Chats</Typography>
            </StyledLink>
          ) : (
            <StyledBadge badgeContent={notification.length}>
              <StyledLink to="/myChats">
                <ChatBubbleIcon />
                <Typography sx={{ fontSize: '1.2rem' }}>My Chats</Typography>
              </StyledLink>
            </StyledBadge>
          )}
          {/* ---------- ABOUT US ----------*/}
          <AboutUsButton
            ref={aboutUsRef}
            onClick={handleAboutUsOpen}
            aria-controls="about-us-menu"
            aria-haspopup="true"
          >
            About Us
          </AboutUsButton>
          <Menu
            id="about-us-menu"
            anchorEl={aboutUsRef.current}
            open={aboutUsOpen}
            onClose={handleAboutUsClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <MenuItem onClick={handleDialog}>Our Mission Statement</MenuItem>
            <MenuItem onClick={handleSupportDialog}>
              Contact Customer Support
            </MenuItem>
          </Menu>
          <Dialog
            open={dialogOpen}
            TransitionComponent={DialogTransition}
            keepMounted
            onClose={handleDialogClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <MissionStatementDialog />
            <DialogActions>
              <Button onClick={handleDialogClose}>Let's get studying!</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={supportDialogOpen}
            TransitionComponent={DialogTransition}
            keepMounted
            onClose={handleSupportDialogClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <ContactSupportDialog />
            <DialogActions>
              <Button onClick={handleSupportDialogClose}>Thanks for the help!</Button>
            </DialogActions>
          </Dialog>

          {/* ---------- USER ----------*/}
          {user ? (
            <>
              <AvatarIconButton
                ref={anchorElRef}
                onClick={handleMenuOpen}
                aria-controls="profile-menu"
                aria-haspopup="true"
              >
                <Avatar src={user.picture || ''} alt="" />
                <StyledBadge
                  badgeContent={
                    Number.isInteger(bookingNotification.length / 4)
                      ? bookingNotification.length / 4
                      : null
                  }
                >
                  <UserFullName>{`${user.firstname} ${user.lastname}`}</UserFullName>
                </StyledBadge>
              </AvatarIconButton>

              {/* ---------- DROP DOWN MENU ----------*/}
              <Menu
                id="profile-menu"
                anchorEl={anchorElRef.current}
                open={menuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
              >
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/userProfile"
                >
                  User Profile
                </MenuItem>
                {user.role === 'TUTOR' &&
                  (bookingNotification.length === 0 ? (
                    <MenuItem
                      onClick={handleMenuCloseBookings}
                      component={Link}
                      to="/viewBookings"
                    >
                      View Bookings
                    </MenuItem>
                  ) : (
                    <MenuItem
                      onClick={handleMenuCloseBookings}
                      component={Link}
                      to="/viewBookings"
                      style={{
                        backgroundColor: theme.palette.primary.notification
                      }}
                    >
                      View Bookings
                    </MenuItem>
                  ))}

                <MenuItem onClick={handleLogout}>
                  <ExitToAppIcon fontSize="small" />
                  Logout
                </MenuItem>

                <MenuItem
                  onClick={handleDeleteAccount}
                  style={{ color: 'red' }}
                >
                  <DeleteIcon fontSize="small" />
                  Delete Account
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <StyledLink to="/login">
                <SignInButton>Sign In</SignInButton>
              </StyledLink>
              <StyledLink to="/register">
                <JoinButton>Join Us</JoinButton>
              </StyledLink>
            </>
          )}
        </LinksContainer>
      </RootToolbar>
    </RootAppBar>
  );
};

export default Navbar;
