import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useChatContext } from "../context/ChatProvider";
import newRequest from "../utils/newRequest";

const RootAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const RootToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const LogoContainer = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "inherit",
}));

const LinksContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  textDecoration: "none",
  color: "inherit",
}));

const AvatarIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { notification, setNotification } = useChatContext();
  const anchorElRef = useRef(null);

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
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
    <RootAppBar position="fixed">
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
          <StyledLink to="/search-sessions">Search Sessions</StyledLink>
          <StyledLink to="/MyStudySessions">My Study Sessions</StyledLink>
          {notification.length === 0 ? (
            <StyledLink to="/my-chats">My Chats</StyledLink>
          ) : (
            <Badge badgeContent={notification.length} color="primary">
              <StyledLink to="/my-chats" onClick={() => {
                setNotification([])
              }}>My Chats</StyledLink>
            </Badge>
          )}

          {!currentUser?.isSeller && (
            <StyledLink to="/about-us">About Us</StyledLink>
          )}

          {/* ---------- USER ----------*/}
          {currentUser ? (
            <>
              <AvatarIconButton
                ref={anchorElRef}
                onClick={handleMenuOpen}
                aria-controls="profile-menu"
                aria-haspopup="true"
              >
                <Avatar
                  src={currentUser.picture || "/img/noavatar.jpg"}
                  alt=""
                />
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
                {/* {currentUser.isTutor && (
                  <>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/mygigs">
                      Gigs
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/add">
                      Add New Gig
                    </MenuItem>
                  </>
                )} */}
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/userProfile"
                >
                  User Profile
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/messages"
                >
                  Messages
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ExitToAppIcon fontSize="small" />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <StyledLink to="/login">Sign in</StyledLink>
              <StyledLink to="/register">
                <Button variant="contained" color="primary">
                  Join
                </Button>
              </StyledLink>
            </>
          )}
        </LinksContainer>
      </RootToolbar>
    </RootAppBar>
  );
};

export default Navbar;
