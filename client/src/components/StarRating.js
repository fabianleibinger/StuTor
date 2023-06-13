import React from 'react';
import { Rating } from '@mui/material';

const StarRating = ({ value }) => {
  return (
    <Rating
      name="star-rating"
      value={value}
      precision={0.5} // Set the precision to half stars if desired
      readOnly // Make the rating read-only
    />
  );
};

export default StarRating;
