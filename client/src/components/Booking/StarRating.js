import React from "react";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const StarRating = ({ rating, isReadOnly, smallStars }) => {
  let fontSize = "1.8rem";
  if (smallStars) {
    fontSize = "1.2rem";
  }
  return (
    <Rating
      name="star-rating"
      value={rating}
      precision={0.1} // Set the precision to half stars if desired
      readOnly={isReadOnly} // Make the rating read-only
      emptyIcon={<StarBorderIcon fontSize="inherit" />}
      sx={{ fontSize: fontSize }}
    />
  );
};

export default StarRating;
