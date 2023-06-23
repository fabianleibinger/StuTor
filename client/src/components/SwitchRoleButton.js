import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const tutorButtonStyles = {
  borderRight: 'none',
  borderTopRightRadius: '0%',
  borderBottomRightRadius: '0%',
  borderTopLeftRadius: '45%',
  borderBottomLeftRadius: '45%',
  width: '110px',
  height: '40px'
};

const studentButtonStyles = {
  borderRight: 'none',
  borderTopRightRadius: '45%',
  borderBottomRightRadius: '45%',
  borderTopLeftRadius: '0%',
  borderBottomLeftRadius: '0%',
  width: '110px',
  height: '40px'
};

export default function SwitchRoleButton({ role, handleRoleSwitchClick }) {
  return (
    <>
      {role === 'TUTOR' ? (
        <>
          <Button
            variant="contained"
            sx={tutorButtonStyles}
            onClick={() => handleRoleSwitchClick('TUTOR')}
          >
            Tutor
          </Button>
          <Button
            variant="outlined"
            sx={studentButtonStyles}
            onClick={() => handleRoleSwitchClick('STUDENT')}
          >
            Student
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            sx={tutorButtonStyles}
            onClick={() => handleRoleSwitchClick('TUTOR')}
          >
            Tutor
          </Button>
          <Button
            variant="contained"
            sx={studentButtonStyles}
            onClick={() => handleRoleSwitchClick('STUDENT')}
          >
            Student
          </Button>
        </>
      )}
    </>
  );
}
