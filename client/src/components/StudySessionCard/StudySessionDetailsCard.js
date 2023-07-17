import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Avatar, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import ActionButton from './ActionButton';

import { styled } from '@mui/system';
//api

// context
import { Box } from '@mui/material';

const ScrollableCardContent = styled(CardContent)({
  maxHeight: '30vh',
  overflow: 'auto'
});

export default function StudySessionCard({
  tutoredBy,
  text,
  studySession,
  onDelete,
  role,
  onUpdateClick,
  details,
  addStudySessionComponent,
  backgroundColor
}) {
  const navigate = useNavigate();

  const handleContentClick = () => {
    if (studySession) {
      if (role === 'STUDENT') {
        navigate(`/StudysessionDetailsPage/${studySession._id}`);
      } else {
        onUpdateClick(studySession);
      }
    }
  };

  const handleDeleteClick = () => {
    if (studySession) {
      onDelete(studySession._id);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        minHeight: '350px',
        mr: '15px',
        mt: 2,
        mb: 2,
        pt: 1,
        pb: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        background: backgroundColor
      }}
      raised
    >
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        sx={{
          ml: 1,
          mt: 1,
          alignItems: 'center',
          textAlign: 'center',
          '&:hover': {
            color: 'gray',
            cursor: 'pointer'
          }
        }}
        onClick={handleContentClick}
      >
        <Avatar
          src={tutoredBy.picture || '/img/noavatar.jpg'}
          sx={{ width: 68, height: 68 }}
          aria-label="recipe"
        />
      </Box>
      {studySession ? (
        <>
          <ScrollableCardContent>
            {details && studySession ? (
              <Box
                onClick={handleContentClick}
                sx={{
                  '&:hover': {
                    color: 'gray',
                    cursor: 'pointer'
                  },
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <Typography
                  fontWeight="bold"
                  sx={{
                    wordWrap: 'break-word',
                    display: '-webkit-box',
                    webkitBoxOrient: 'vertical',
                    webkitLineClamp: 2,
                    minHeight: '2.6rem',
                    lineHeight: '1.1rem',
                    justifyContent: 'center'
                  }}
                >
                  {studySession.courseName}
                </Typography>
                <Typography>
                  {tutoredBy.firstname} {tutoredBy.lastname}
                </Typography>
                <Typography fontWeight="bold" sx={{ mt: 1 }}>
                  {studySession.pricePerHourEuro} €/h
                </Typography>
                <Typography
                  sx={{
                    ml: 1,
                    pt: 1,
                    mr: 1,
                    wordWrap: 'break-word',
                    verticalAlign: 'center'
                  }}
                >
                  {studySession.description.length > 75
                    ? studySession.description.slice(0, 75) + '...'
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
              pt: 0.5,
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
                gap: '10px'
              }}
            >
              {details && (
                <>
                  {role === 'TUTOR' ? (
                    <>
                      <ActionButton text="Bookings" />
                      <ActionButton
                        text="Update"
                        onClickListener={onUpdateClick}
                      />
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
                      <Button
                        variant="contained"
                        size="large"
                        onClick={handleContentClick}
                      >
                        Details
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </CardActions>
        </>
      ) : (
        <ScrollableCardContent>
          <Typography
            sx={{
              textAlign: 'center',
              alignItems: 'center',
              wordWrap: 'break-word'
            }}
          >
            {text}
          </Typography>
          <Typography sx={{ textAlign: 'center', mb: 3 }}>
            {tutoredBy.firstname} {tutoredBy.lastname}
          </Typography>
          <Typography sx={{ textAlign: 'center' }}>
            Your description could appear here...
          </Typography>
        </ScrollableCardContent>
      )}
    </Card>
  );
}
