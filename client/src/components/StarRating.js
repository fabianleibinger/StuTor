import React from 'react';
import { Rating, Button } from '@mui/material';
import { getReviewsAndRatingOfStudysession } from '../api/StudySession';
import { useQuery } from 'react-query';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import StudysessionReviewDialog from './StudysessionReviewDialog';


const StarRating = ({ studySessionId }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  let buttonText = "See Reviews"
    let rating = 0;
    let reviews = [];
    let buttonDisabled = true;
    const { isLoading, error, data } = useQuery(['rating', studySessionId], () => getReviewsAndRatingOfStudysession(studySessionId));
  if (isLoading) return 'Loading Rating...'
  if (error) return "An error has occurred!"
  if (data == -1) {
  rating = 0
  buttonText = "No Reviews yet"
  } else {
    console.log(data)
  rating = data.rating
  reviews = data.reviews
  buttonDisabled = false
  }


  return (
    <div>
    <Rating
      name="star-rating"
      value={rating}
      precision={0.5} // Set the precision to half stars if desired
      readOnly // Make the rating read-only
      emptyIcon={<StarBorderIcon fontSize="inherit" />}
    />
    <Button variant="outlined" onClick={handleOpenDialog} disabled={buttonDisabled}>
        {buttonText}
      </Button>
      <StudysessionReviewDialog isOpen={isDialogOpen} onClose={handleCloseDialog} reviews={reviews} />
</div>
  );
};

export default StarRating;
