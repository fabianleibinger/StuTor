import React from 'react';
import { Box, Typography } from '@mui/material';

const StudySessionBox = ({ title, tutor, description }) => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
      <Typography variant="h5" sx={{ marginBottom: '0.5rem' }}>{title}</Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: '0.5rem' }}>{tutor}</Typography>
      <Typography variant="body1">{description}</Typography>
    </Box>
  );
};

export default StudySessionBox;
