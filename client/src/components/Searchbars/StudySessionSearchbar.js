import * as React from 'react';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function StudySessionSearchbar({
  handleSearchInputChange,
  searchString
}) {
  return (
    <TextField
      variant="outlined"
      value={searchString}
      onChange={handleSearchInputChange}
      placeholder="Search for course name, identifier or favourite tutor"
      InputProps={{
        startAdornment: <SearchIcon />
      }}
      sx={{
        height: '100%',
        width: '100%', // Set the width to fill the parent container
        background: 'white'
      }}
    />
  );
}
