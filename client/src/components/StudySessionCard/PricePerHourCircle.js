import React from 'react';

import { Box, Typography } from '@mui/material';

export default function PricePerHourCircle({ price }) {
  return (
    <Box
      sx={{
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto'
      }}
    >
      <Typography sx={{ textAlign: 'center' }} variant="h6">
        {price} €/h
      </Typography>
    </Box>
  );
}
