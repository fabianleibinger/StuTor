import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
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
} from "../styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useChatContext } from "../context/ChatProvider";
import newRequest from "../utils/newRequest";
import { UserContext } from "../context/UserContext";
import { useBookingContext } from "../context/BookingProvider";

const DialogTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Navbar = () => {
  const { setUser, user } = useContext(UserContext);
  const [active, setActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { notification, setNotification } = useChatContext();
  const { bookingNotification, setBookingNotification } = useBookingContext();
  const anchorElRef = useRef(null);
  const aboutUsRef = useRef(null);
  const navigate = useNavigate();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      setUser(null);
      localStorage.removeItem("user"); // Remove user data from localStorage
      navigate("/");
    } catch (err) {
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

  return (
    <RootAppBar position="static">
      <RootToolbar>
        {/* ---------- LOGO ----------*/}
        <LogoContainer to="/">
          <Typography variant="h6" component="div">
            STUTOR
          </Typography>
          <span className="dot">.</span>
        </LogoContainer>

        {/* ---------- LINKS ----------*/}
        <LinksContainer>
          <StyledLink to="/search-sessions">
            <SearchIcon />
            Search Sessions
          </StyledLink>
          <StyledLink to="/MyStudySessions">
            <CalendarMonthIcon />
            My Study Sessions
          </StyledLink>
          {notification.length === 0 ? (
            <StyledLink to="/myChats">
              {" "}
              <ChatBubbleIcon />
              My Chats
            </StyledLink>
          ) : (
            <Badge badgeContent={notification.length} color="primary">
              <StyledLink to="/myChats">
                {" "}
                <ChatBubbleIcon />
                My Chats
              </StyledLink>
            </Badge>
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
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem onClick={handleDialog}>Our Mission Statement</MenuItem>
            <MenuItem onClick={handleAboutUsClose}>
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
            <DialogTitle>{"The StuTor Mission Statement"}</DialogTitle>
            <DialogContent>
              <img
                src={process.env.PUBLIC_URL + "/img/StuTor_Logo.png"}
                alt="Mission Statement"
                style={{ maxWidth: "550px", maxHeight: "550px" }}
              />
              <DialogContentText id="alert-dialog-slide-description">
                "At StuTor, our mission is to foster a culture of collaboration
                and academic excellence among students by providing a platform
                where they can connect, support, and inspire each other in their
                educational journeys. We believe that teamwork truly makes the
                dream work, and through our app, we aim to bring together
                students who can mutually benefit from their diverse knowledge
                and experiences.
              </DialogContentText>
              <DialogContentText id="alert-dialog-slide-description">
                Our primary goal is to help students excel in their studies by
                enabling them to find the perfect tutor from their own
                university or become a tutor themselves. We understand the
                importance of personalized learning and the positive impact it
                can have on educational outcomes. By facilitating these
                connections, we strive to create a dynamic and inclusive
                learning community where students can access high-quality
                academic assistance, exchange ideas, and build lasting
                relationships.
              </DialogContentText>
              <DialogContentText id="alert-dialog-slide-description">
                Through our app, we aim to revolutionize the way students
                approach their exams, transforming them into confident,
                empowered learners. We are committed to providing a safe,
                trustworthy, and supportive environment for students to
                collaborate, share knowledge, and unlock their full potential.
              </DialogContentText>
              <DialogContentText id="alert-dialog-slide-description">
                At StuTor, we are passionate about empowering students to reach
                new heights academically and create a brighter future for
                themselves. Together, let's embark on this exciting journey of
                learning, growth, and achievement. Join us today, and let's get
                studying!"
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Let's get studying!</Button>
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
                <Avatar src={user.picture || ""} alt="" />
                <UserFullName>{`${user.firstname} ${user.lastname}`}</UserFullName>
              </AvatarIconButton>

              {/* ---------- DROP DOWN MENU ----------*/}
              <Menu
                id="profile-menu"
                anchorEl={anchorElRef.current}
                open={menuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/userProfile"
                >
                  User Profile
                </MenuItem>
                {bookingNotification.length === 0 ? (
                  <MenuItem
                    onClick={handleMenuCloseBookings}
                    component={Link}
                    to="/viewBookings"
                  >
                    View Bookings
                  </MenuItem>
                ) : (
                  <Badge
                    badgeContent={bookingNotification.length}
                    color="primary"
                  >
                    <MenuItem
                      onClick={handleMenuCloseBookings}
                      component={Link}
                      to="/viewBookings"
                    >
                      View Bookings
                    </MenuItem>
                  </Badge>
                )}

                <MenuItem onClick={handleLogout}>
                  <ExitToAppIcon fontSize="small" />
                  Logout
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
