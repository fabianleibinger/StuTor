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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Delete } from '@mui/icons-material/';

import studySessionCardStyles from './StudySessionCardStyles';

import Scrollbars from 'react-scrollbars-custom';
import { styled } from '@mui/system';
//api
import { getCourse } from '../../api/Course';

// context
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const handleChangeDate = ({ studySession }) => {
  const createdAt = new Date(studySession.createdAt);
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });
  const titleText = `Created ${timeAgo}`;
  return titleText;
};

const ScrollableCardContent = styled(CardContent)({
  maxHeight: '20vh',
  overflow: 'auto'
});

export default function StudySessionCard({ studySession, onDelete }) {
  const handleDeleteClick = () => {
    onDelete(studySession._id);
  };

  const { isLoading, error, data: relatedCourse } = useQuery(
    `getCourse_${studySession._id}`,
    () => getCourse(studySession.course)
  );

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Card sx={studySessionCardStyles} raised>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            PP
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleDeleteClick}>
            <Delete />
          </IconButton>
        }
        title={
          relatedCourse && relatedCourse.name
            ? relatedCourse.name
            : 'Loading...'
        }
        //subheader={handleChangeDate({ studySession })}
      />

      <ScrollableCardContent>
        <Typography sx={{ mb: 5 }}>
          <strong>Description: </strong> {studySession.description}
        </Typography>
        <Typography>
          <strong>University: </strong> {studySession.university}
        </Typography>
        <Typography>
          <strong>Costs (€): </strong> {studySession.pricePerHourEuro}
        </Typography>
        <Typography>
          <strong>Languages: </strong>
          {studySession.languages.join(', ')}
        </Typography>
      </ScrollableCardContent>
      <CardActions
        sx={{
          mt: 'auto'
        }}
      >
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
