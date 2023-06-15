import React from 'react';
import Rating from '@mui/material/Rating';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const StarRating = ({ rating, isReadOnly }) => {
console.log(isReadOnly)
console.log(rating)

    return (
        <Rating
        name="star-rating"
        value={rating}
        precision={0.5} // Set the precision to half stars if desired
        readOnly={isReadOnly} // Make the rating read-only
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
      />
    );
  }

  export default StarRating;