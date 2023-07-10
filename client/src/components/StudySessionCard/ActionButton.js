import React from 'react';
import { Button } from '@mui/material';

export default function ActionButton({ text, onClickListener }) {
  return (
    <Button
      sx={{
        background: '#f3f3f3',
        border: '1px solid #999999',
        borderRadius: '100px',
        padding: '10px 3px',
        color: '#6fa8dc',
        display: 'inline-block',
        width: 1/3,
        textAlign: 'center',
        fontSize: "12px",
        fontWeight: "bold",
        '@media (max-width: 600px)': {
          fontSize: '6px'
        },
        '@media (max-width: 400px)': {
          padding: '8px 20px',
          fontSize: '4px'
        },
        '&:hover': {
          color: 'white',
          background: '#1c4bb0',
          cursor: 'pointer'
        }
      }}
      onClick={onClickListener}
    >
      {text}
    </Button>
  );
}
