import React from 'react';
import { Button } from '@mui/material';
import { ThemeContext } from '@emotion/react';

const tutorButtonStyles = {
  borderRight: 'none',
  borderTopRightRadius: '0%',
  borderBottomRightRadius: '0%',
  borderTopLeftRadius: '45%',
  borderBottomLeftRadius: '45%',
  width: '110px',
  height: '40px'
};

const switchButtonStyles = {
  height: 1,
  background: ThemeContext.background
};

export default function SwitchRoleButton({ role, handleRoleSwitchClick }) {
  return (
    <>
      {role === 'TUTOR' ? (
        <>
          <Button
            variant="contained"
            sx={switchButtonStyles}
            size="large"
            onClick={() => handleRoleSwitchClick('STUDENT')}
          >
            SWITCH TO STUDENT VIEW
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="contained"
            sx={switchButtonStyles}
            size="large"
            onClick={() => handleRoleSwitchClick('TUTOR')}
          >
            SWITCH TO TUTOR VIEW
          </Button>
        </>
      )}
    </>
  );
}
