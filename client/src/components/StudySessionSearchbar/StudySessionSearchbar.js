import * as React from 'react';
import { Stack, TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function StudySessionSearchbar() {
  return (
    <Box sx={{ mt: 10, width: '75%' }}>
      <TextField
        label="Search"
        variant="outlined"
        placeholder="Search..."
        InputProps={{
          startAdornment: <SearchIcon />
        }}
        sx={{
          width: '100%' // Set the width to fill the parent container
        }}
      />
    </Box>
  );
}
