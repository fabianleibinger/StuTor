import { styled, Box } from '@mui/system';
import {
  AppBar,
  Button,
  Card,
  Container,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  Dialog
} from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme } from '@mui/material';

// -------------------------- Theme --------------------------
export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      button: '#FFFFFF',
      contrastText: '#FFFFFF',
      hoverBackground: '#1976d2',
      hoverText: '#FFFFFF'
    },
    secondary: {
      main: '#5cbfaf',
      contrastText: '#FFFFFF'
    }
  }
});

// -------------------------- Containers --------------------------
export const RootContainer = styled('div')({
  paddingTop: theme => theme.spacing(8),
  paddingBottom: theme => theme.spacing(8)
});
export const CardContainer = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme => theme.spacing(3)
});
export const LogoContainer = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'inherit'
}));
export const LinksContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));
export const FormContainer = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  // padding: theme.spacing(3),
  backgroundColor: '#fff',
  borderRadius: '4px',
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
  minWidth: '400px',
  minHeight: '400px',
  // Added spacing between child elements
  '& > *': {
    marginBottom: theme.spacing(2),
    width: '100%'
  }
}));

export const FilterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end'
}));

// -------------------------- Titles --------------------------
export const Title = styled(Typography)({
  marginBottom: theme => theme.spacing(4)
});
export const CardTitle = styled(Typography)({
  marginBottom: theme => theme.spacing(2)
});
export const LoginTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(10),
  fontSize: '30px', // Increase the font size to make it bigger
  fontWeight: 'bold', // Apply a bold font weight for emphasis
  textAlign: 'center', // Center-align the text
  color: theme.palette.primary.contrastText, // Apply a custom color if desired
  background: theme.palette.primary.main, // Apply a background color from the theme
  paddingTop: theme.spacing(2), // Add padding to the title
  paddingBottom: theme.spacing(2) // Add padding to the title
}));

// -------------------------- Buttons --------------------------
export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(5),
  textTransform: 'none',
  fontSize: '24px', // Adjust the font size to make it slightly smaller
  fontWeight: 'bold',
  padding: `${theme.spacing(0.8)} ${theme.spacing(1.7)}`, // Adjust the padding to make it slightly smaller
  borderRadius: '50px',
  width: '70%'
}));

export const CardButton = styled(Button)({
  marginTop: theme => theme.spacing(2)
});
export const AvatarIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(1),
  display: 'flex',
  alignItems: 'center'
}));
export const SignInButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.button,
  marginLeft: theme.spacing(5),
  color: theme.palette.primary.main,
  textTransform: 'none',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: theme.palette.primary.hoverBackground,
    color: theme.palette.primary.hoverText
  },
  width: '100px'
}));
export const JoinButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  textTransform: 'none',
  fontSize: '16px',
  width: '100px'
}));

// -------------------------- Bars --------------------------
export const RootAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText
}));
export const RootToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

// -------------------------- Links --------------------------
export const StyledLink = styled(Link)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center'
}));

// -------------------------- Textfields --------------------------
export const LoginTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '80%'
}));

// -------------------------- Texts --------------------------
export const UserFullName = styled('div')(({ theme }) => ({
  marginLeft: '0.5rem',
  color: 'white',
  fontSize: '16px'
}));
export const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: 'red',
  marginTop: theme.spacing(2),
  textAlign: 'center' // Center-align the error message
}));

// --------------------------- Dialogs ---------------------------------------
export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  },
  '& .MuiPaper-root': {
    maxWidth: '600px',
    minWidth: '45vw',
    minHeight: '40vh',
    maxHeight: '65vh'
  }
}));
