import { styled } from "@mui/system";
import {
  Badge,
  Button,
  Card,
  TextField,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Autocomplete,
  InputLabel,
  Stepper,
  Step,
  StepLabel,
  StepIcon,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { createTheme } from "@mui/material";

// -------------------------- Theme --------------------------
export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      button: "#FFFFFF",
      contrastText: "#FFFFFF",
      hoverBackground: "#1976d2",
      hoverText: "#FFFFFF",
      notification: "#808080",
      notificationBadge: "#FFFFFF",
      text: "#000000",
    },
    secondary: {
      main: "#1dbf73",
      contrastText: "#FFFFFF",
    },
  },
});

// -------------------------- Containers --------------------------
export const RootContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh", // Set the minimum height of the container to the full viewport height
  paddingTop: (theme) => theme.spacing(8),
  paddingBottom: (theme) => theme.spacing(8),
});

export const CardContainer = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: (theme) => theme.spacing(3),
});
export const LogoContainer = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "inherit",
}));
export const LinksContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));
export const LoginFormContainer = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: "30px",
  boxShadow: "0px 10px 16px rgba(0, 0, 0, 0.2)", // Increased shadow values
  minHeight: "700px",
  minWidth: "500px",
  // padding: theme.spacing(5), // Add padding around all items
  marginTop: "200px",
  "& > *": {
    marginBottom: theme.spacing(2),
  },
  "& > *:nth-of-type(3)": {
    marginTop: theme.spacing(5), // Adjust the value as needed
  },
}));

export const FormContainer = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: "30px",
  boxShadow: "0px 10px 16px rgba(0, 0, 0, 0.2)", // Increased shadow values
  maxWidth: "800px",
  height: "1000px",
  padding: theme.spacing(5), // Add padding around all items
  marginTop: "200px",

  "& > *": {
    marginBottom: theme.spacing(2),
  },
  // Stretch all items to fill the available vertical space
  flexGrow: 1,
}));

export const ProfileFormContainer = styled("div")({
  /* Add your styles here */
  maxWidth: "800px",
  margin: "0 auto",
  padding: "5rem",
  borderRadius: "20px",
  boxShadow: "0px 10px 16px rgba(0, 0, 0, 0.2)", // Increased shadow values
  marginBottom: "3rem", // Add the margin bottom for spacing
});

// -------------------------- Titles --------------------------
export const Title = styled(Typography)({
  marginBottom: (theme) => theme.spacing(4),
});
export const CardTitle = styled(Typography)({
  marginBottom: (theme) => theme.spacing(2),
});
export const LoginTitle = styled(Typography)(({ theme }) => ({
  // marginTop: theme.spacing(2), // Add top margin
  marginBottom: theme.spacing(10),
  fontSize: "30px",
  fontWeight: "bold",
  textAlign: "center",
  color: theme.palette.primary.contrastText,
  background: theme.palette.primary.main,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  width: "100%",
}));

// -------------------------- Buttons --------------------------
export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(5),
  textTransform: "none",
  fontSize: "24px",
  fontWeight: "bold",
  padding: `${theme.spacing(0.8)} ${theme.spacing(1.7)}`,
  borderRadius: "50px",
  width: "70%",
}));

export const CardButton = styled(Button)({
  marginTop: (theme) => theme.spacing(2),
});
export const AvatarIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(1),
  display: "flex",
  alignItems: "center",
}));
export const SignInButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.button,
  marginLeft: theme.spacing(5),
  color: theme.palette.primary.main,
  textTransform: "none",
  fontSize: "16px",
  "&:hover": {
    backgroundColor: theme.palette.primary.hoverBackground,
    color: theme.palette.primary.hoverText,
  },
  width: "100px",
}));
export const JoinButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  textTransform: "none",
  fontSize: "16px",
  width: "100px",
}));
export const AboutUsButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.contrastText,
  textTransform: "none",
  fontSize: "16px",
  width: "100px",
  border: "2px solid #FFFFFF",
  marginLeft: theme.spacing(3.5),
  fontWeight: "normal",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main, // Change background color on hover
    borderColor: theme.palette.primary.main,
    cursor: "pointer", // Change cursor on hover
  },
}));

// -------------------------- Bars --------------------------
export const RootAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  height: "80px",
}));
export const RootToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "0.8rem",
  paddingBottom: "1rem",
});

// -------------------------- Links --------------------------
export const StyledLink = styled(Link)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
  // transition: "color 0.3s", // Add transition effect
  // "&:hover": {
  //   color: theme.palette.primary.main, // Change color on hover
  //   backgroundColor: theme.palette.primary.hoverText, // Add background color on hover
  //   borderRadius: "20px", // Adjust border-radius as needed
  //   // boxShadow: theme.shadows[2], // Add box shadow on hover
  //   // padding: "12px 16px", // Increase padding
  //   fontSize: "1.2rem", // Increase font size
  // },
}));

// -------------------------- Textfields --------------------------
export const LoginTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: "80%",
}));

// -------------------------- Texts --------------------------
export const UserFullName = styled("div")(({ theme }) => ({
  marginLeft: "0.5rem",
  color: "white",
  fontSize: "1.2rem",
}));
export const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: "red",
  marginTop: theme.spacing(2),
  textAlign: "center",
}));

export const AutocompleteWrapper = styled(Autocomplete)(({ theme }) => ({
  "& .MuiAutocomplete-paper.centered-dropdown": {
    marginTop: theme.spacing(1),
  },
}));

export const ProfilePicInputLabel = styled(InputLabel)`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 80%;
`;

export const ProgressContainer = styled(Stepper)(({ theme }) => ({
  width: "100%",
  backgroundColor: "transparent",
  padding: theme.spacing(2),

  "& .MuiStepIcon-root": {
    color: "gray",
    "&.MuiStepIcon-active": {
      color: theme.palette.primary.main,
    },
    /* Add the following styles for completed steps */
    "&.MuiStepIcon-completed": {
      color: "green",
    },
  },
}));

export const CustomStepIcon = styled(StepIcon)(({ theme }) => ({
  "& .MuiStepIcon-root": {
    fontSize: theme.spacing(10), // Adjust the size as needed
  },
}));

export const CustomStep = styled(Step)(({ theme }) => ({
  "& .MuiStepIcon-root": {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepLabel-iconContainer": {
    "& > svg": {
      fontSize: theme.spacing(4), // Adjust the size as needed
    },
  },
}));

export const stepContentContainer = {
  // display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "500px",
  height: "600px",
  justifyContent: "center",
  // marginBottom: "50px", // Adjust this margin based on your preference
};

export const FooterContainer = styled("div")(({ theme }) => ({
  backgroundColor: "#f8f8f8",
  padding: theme.spacing(4, 0),
}));

export const FooterContent = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(2),
  width: "100%",
  maxWidth: "lg",
}));

export const FooterTop = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "1rem",
});

export const FooterItem = styled("div")({
  "& h2": {
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: "1rem",
  },
  "& span": {
    display: "block",
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "0.5rem",
  },
});

export const FooterBottom = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "2rem",
});

export const FooterLeft = styled("div")({
  "& h2": {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  "& span": {
    display: "block",
    fontSize: "0.9rem",
    color: "#666",
  },
});

export const FooterRight = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const SocialIcons = styled("div")({
  display: "flex",
  gap: "0.5rem",
});

export const LanguageLink = styled("div")({
  display: "flex",
  alignItems: "center",
  marginRight: "1rem",
  "& span": {
    marginLeft: "0.5rem",
  },
});

export const CurrencyLink = styled("div")({
  display: "flex",
  alignItems: "center",
  marginRight: "1rem",
  "& span": {
    marginLeft: "0.5rem",
  },
});

export const AppContainer = styled("div")`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Content = styled("div")(({ theme }) => ({
  flexGrow: 1,
  marginBottom: theme.spacing(40), // Add a large margin-bottom value here
  // marginTop: theme.spacing(20), // Add a large margin-bottom value here
  alignItems: "center",
  justifyContent: "center", // Center the content vertically
}));

export const StyledSearchIcon = styled(SearchIcon)({
  color: "black",
  marginLeft: "20px",
});
export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.primary.notificationBadge,
    color: theme.palette.primary.text,
  },
}));
