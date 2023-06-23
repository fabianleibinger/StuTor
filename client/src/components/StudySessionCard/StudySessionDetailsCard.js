import * as React from 'react';
import { useQuery } from 'react-query';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Delete } from '@mui/icons-material/';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import studySessionCardStyles from './StudySessionCardStyles';
import PricePerHourCircle from './PricePerHourCircle';
import ActionButton from './ActionButton';

import { styled } from '@mui/system';
//api

// context
import { Box } from '@mui/material';

const ScrollableCardContent = styled(CardContent)({
  maxHeight: '20vh',
  overflow: 'auto'
});

export default function StudySessionCard({
  tutorFirstName,
  tutorLastName,
  studySession,
  onDelete,
  role,
  onItemClick,
  details,
  addStudySessionComponent
}) {
  const handleDeleteClick = () => {
    onDelete(studySession._id);
  };

  return (
    <Card sx={studySessionCardStyles} raised>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          ml: 1,
          mt: 1,
          alignItems: 'left',
          textAlign: 'left',
          flexDirection: 'row'
        }}
      >
        <Avatar sx={{ width: 64, height: 64 }} aria-label="recipe">
          PP
        </Avatar>
        <Typography
          variant="h8"
          component="div"
          sx={{ ml: 2, display: 'flex', alignItems: 'center' }}
        >
          {tutorFirstName} <br /> {tutorLastName}
        </Typography>
      </Box>

      <ScrollableCardContent>
        {details && studySession ? (
          <Box
            onClick={onItemClick}
            sx={{
              '&:hover': {
                color: 'gray',
                cursor: 'pointer'
              },
              alignItems: 'left',
              textAlign: 'left'
            }}
          >
            <Typography fontWeight="bold">
              {studySession.course.name}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Prof. {studySession.course.professor}
            </Typography>
            <Typography sx={{ mb: 2, wordWrap: 'break-word' }}>
              <strong>Description: </strong>
              <br />{' '}
              {studySession.description.length > 100
                ? studySession.description.slice(0, 100) + '...'
                : studySession.description}
            </Typography>
            <Typography>
              <strong>Languages: </strong> <br />
              {studySession.languages.join(', ')}
            </Typography>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            sx={{ mt: 3 }}
          >
            {addStudySessionComponent}
          </Box>
        )}
      </ScrollableCardContent>
      <CardActions
        sx={{
          mt: 'auto'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mr: 5
          }}
        >
          {studySession && (
            <PricePerHourCircle price={studySession.pricePerHourEuro} />
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 'auto',
            gap: '10px'
          }}
        >
          {details && (
            <>
              {role === 'TUTOR' && (
                <ActionButton
                  text="Delete"
                  onClickListener={handleDeleteClick}
                />
              )}
              <ActionButton text="Details" onClickListener={onItemClick} />
            </>
          )}
        </Box>
      </CardActions>
    </Card>
  );
}
