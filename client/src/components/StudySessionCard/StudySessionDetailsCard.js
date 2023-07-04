import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Avatar, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import studySessionCardStyles from './StudySessionCardStyles';
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
  tutorPicture,
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
        flexDirection="column"
        sx={{
          ml: 1,
          mt: 1,
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Avatar
          src={tutorPicture || '/img/noavatar.jpg'}
          sx={{ width: 64, height: 64 }}
          aria-label="recipe"
        />
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
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <Typography fontWeight="bold" sx={{ wordWrap: 'break-word' }}>
              {studySession.course.name}
            </Typography>
            <Typography>
              {tutorFirstName} {tutorLastName}
            </Typography>
            <Typography fontWeight="bold" sx={{ mt: 1 }}>
              {studySession.pricePerHourEuro} €/h
            </Typography>
            <Typography sx={{ m: 1, wordWrap: 'break-word' }}>
              <br />{' '}
              {studySession.description.length > 100
                ? studySession.description.slice(0, 100) + '...'
                : studySession.description}
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
          mt: 'auto',
          justifyContent: 'center'
        }}
      >
        <Box
          id="ActionButtonswrapper"
          sx={{
            display: 'flex',
            width: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'auto',
            gap: '10px'
          }}
        >
          {details && (
            <>
              {role === 'TUTOR' ? (
                <>
                  <ActionButton text="Bookings" />
                  <ActionButton text="Update" onClickListener={onItemClick} />
                  <ActionButton
                    text="Delete"
                    onClickListener={handleDeleteClick}
                  />
                </>
              ) : (
                <Box
                  id="StudentStudySessionButtonBox"
                  sx={{ width: 1, textAlign: 'center' }}
                >
                  <Button variant="contained" size="large">
                    Details
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </CardActions>
    </Card>
  );
}
