import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import newRequest from "../utils/newRequest";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
  },
  logoText: {
    marginLeft: theme.spacing(1),
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    marginLeft: theme.spacing(2),
    textDecoration: "none",
    color: "inherit",
  },
  avatar: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

function Navbar() {
  const classes = useStyles();
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
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {/* ---------- LOGO ----------*/}
        <Link className={classes.logoContainer} to="/">
          <Typography variant="h6" className={classes.logoText}>
            STUTOR
          </Typography>
          <span className="dot">.</span>
        </Link>

        {/* ---------- LINKS ----------*/}
        <div className={classes.links}>
          <Link className={classes.link} to="/search-sessions">
            Search Sessions
          </Link>
          <Link className={classes.link} to="/MyStudySessions">
            My Study Sessions
          </Link>
          <Link className={classes.link} to="/my-chats">
            My Chats
          </Link>
          {!currentUser?.isSeller && (
            <Link className={classes.link} to="/about-us">
              About Us
            </Link>
          )}

          {/* ---------- USER ----------*/}
          {currentUser ? (
            <>
              <IconButton
                className={classes.avatar}
                onClick={handleMenuOpen}
              >
                <Avatar
                  src={currentUser.picture || "/img/noavatar.jpg"}
                  alt=""
                />
              </IconButton>

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
              <Link className={classes.link} to="/login">
                Sign in
              </Link>
              <Link className={classes.link} to="/register">
                <Button variant="contained" color="primary">
                  Join
                </Button>
              </Link>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;