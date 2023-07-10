import React from 'react';
import { Button } from '@mui/material';

export default function ClearFilterButton({ handleClick }) {
  return (
    <Button onClick={handleClick} size="small">
      Clear
    </Button>
  );
}
