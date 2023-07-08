import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";


export const LoadingIndicator = () => {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <div style={{textAlign: 'center'}}>
        <CircularProgress />
        <Typography marginTop={'20px'}>Loading wonderful content for you...</Typography>
        </div>
      </Box>
    );
  };