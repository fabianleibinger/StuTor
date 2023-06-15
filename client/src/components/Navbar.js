import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
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

const LogoText = styled(Typography)({
  marginLeft: "8px",
  fontWeight: "bold",
});

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
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { pathname } = useLocation();

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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
          <StyledLink to="/my-chats">My Chats</StyledLink>
          {!currentUser?.isSeller && (
            <StyledLink to="/about-us">About Us</StyledLink>
          )}

          {/* ---------- USER ----------*/}
          {currentUser ? (
            <>
              <AvatarIconButton onClick={handleMenuOpen}>
                <Avatar
                  src={currentUser.picture || "/img/noavatar.jpg"}
                  alt=""
                />
              </AvatarIconButton>

              {/* ---------- DROP DOWN MENU ----------*/}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {currentUser.isSeller && (
                  <>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/mygigs">
                      Gigs
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/add">
                      Add New Gig
                    </MenuItem>
                  </>
                )}
                <MenuItem onClick={handleMenuClose} component={Link} to="/orders">
                  Orders
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/messages">
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
