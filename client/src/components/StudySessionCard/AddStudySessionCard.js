import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';
import { blue } from '@mui/material/colors';

import studySessionCardStyles from './StudySessionCardStyles';

export default function AddStudySessionCard({ children }) {
  return (
    <Card sx={studySessionCardStyles} raised>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            PP
          </Avatar>
        }
        title="Here you can offer a new Study Session"
        subheader="click on this card to fill out the required information"
      />
      <CardContent
        sx={{
          overflow: 'auto',
          mt: 3
        }}
      >
        <Box textAlign="center">{children}</Box>
      </CardContent>
    </Card>
  );
}
