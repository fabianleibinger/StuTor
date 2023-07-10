import * as React from 'react';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function StudySessionSearchbar({ handleSearchInputChange }) {
  return (
    <TextField
      label="Search"
      variant="outlined"
      onChange={handleSearchInputChange}
      placeholder="Search..."
      InputProps={{
        startAdornment: <SearchIcon />
      }}
      sx={{
        height: '100%',
        width: '100%' // Set the width to fill the parent container
      }}
    />
  );
}
