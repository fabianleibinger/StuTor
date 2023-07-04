import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Avatar, Menu, MenuItem, Badge } from "@mui/material";
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
} from "../styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useChatContext } from "../context/ChatProvider";
import newRequest from "../utils/newRequest";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { setUser, user } = useContext(UserContext);
  const [active, setActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { notification, setNotification } = useChatContext();
  const anchorElRef = useRef(null);
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
            <StyledLink to="/my-chats">
              {" "}
              <ChatBubbleIcon />
              My Chats
            </StyledLink>
          ) : (
            <Badge badgeContent={notification.length} color="primary">
              <StyledLink to="/my-chats">
                {" "}
                <ChatBubbleIcon />
                My Chats
              </StyledLink>
            </Badge>
          )}

          {/* ---------- USER ----------*/}
          {user ? (
            <>
              <AvatarIconButton
                ref={anchorElRef}
                onClick={handleMenuOpen}
                aria-controls="profile-menu"
                aria-haspopup="true"
              >
                <Avatar src={user.picture} alt="" />
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
