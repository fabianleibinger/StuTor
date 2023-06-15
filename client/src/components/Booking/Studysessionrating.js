import React from "react";
import { Rating, Button, Skeleton } from "@mui/material";
import { getReviewsAndRatingOfStudysession } from "../../api/StudySession";
import { useQuery } from "react-query";
import { useState } from "react";
import StudysessionReviewDialog from "./StudysessionReviewDialog";
import StarRating from "./StarRating";

const StudysessionRating = ({ studySessionId }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  let buttonText = "See Reviews";
  let rating = 0;
  let reviews = [2];
  let buttonDisabled = true;

  const queryOptions = {
    retries: 3, // Number of retries before giving up
    retryDelay: 1000, // Delay in milliseconds between retries
  };

  const { isLoading, error, data } = useQuery(["rating", studySessionId], () =>
    getReviewsAndRatingOfStudysession(studySessionId),
    queryOptions
  );
  if (isLoading) return  <Skeleton variant="text" width={80} height={24} />;
  if (error) {
    rating = 0;
    reviews = [];
    buttonText = "No Reviews";
  } else {
  rating = data.rating;
    reviews = data.reviews;
    buttonDisabled = false;
  }
  console.log("rating", rating);
  console.log("reviews", reviews);

  return (
    <div>
      <StarRating rating={rating} isReadOnly={true} />
      <Button
        variant="outlined"
        onClick={handleOpenDialog}
        disabled={buttonDisabled}
      >
        {buttonText}
      </Button>
      <StudysessionReviewDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        reviews={reviews}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default StudysessionRating;
