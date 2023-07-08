import React from "react";
import { Box, Alert, Typography } from "@mui/material";


export const ErrorIndicator = () => {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <div style={{textAlign: 'center'}}>
        <Alert severity="error">Something's wrong here. Please try again!</Alert>
        </div>
      </Box>
    );
  };