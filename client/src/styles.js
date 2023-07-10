import { styled } from "@mui/system";
import {
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
} from "@mui/material";
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
    },
    secondary: {
      main: "#5cbfaf",
      contrastText: "#FFFFFF",
    },
  },
});

// -------------------------- Containers --------------------------
export const RootContainer = styled("div")({
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
  justifyContent: "center", // Center items vertically
  backgroundColor: "#fff",
  borderRadius: "30px",
  boxShadow: "0px 10px 16px rgba(0, 0, 0, 0.2)", // Increased shadow values
  minWidth: "500px",
  minHeight: "600px",
  padding: theme.spacing(5), // Add padding around all items

  "& > *": {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  "& > *:nth-child(2)": {
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
  width: "800px",
  height: "1000px",
  padding: theme.spacing(5), // Add padding around all items

  "& > *": {
    marginBottom: theme.spacing(2),
  },
  // Stretch all items to fill the available vertical space
  flexGrow: 1,
}));

// -------------------------- Titles --------------------------
export const Title = styled(Typography)({
  marginBottom: (theme) => theme.spacing(4),
});
export const CardTitle = styled(Typography)({
  marginBottom: (theme) => theme.spacing(2),
});
export const LoginTitle = styled(Typography)(({ theme }) => ({
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
  border: "1px solid #FFFFFF",
  marginLeft: theme.spacing(3.5),
  fontWeight: "normal",
}));

// -------------------------- Bars --------------------------
export const RootAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));
export const RootToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

// -------------------------- Links --------------------------
export const StyledLink = styled(Link)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
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
  fontSize: "16px",
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
